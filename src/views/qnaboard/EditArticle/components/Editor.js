import React, { useState, useEffect } from 'react'
import {
    Input,
    FormItem,
    FormContainer,
    Button,
    Notification,
    Upload
} from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field, Form, Formik, setIn } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { apiPostArticle, apiPutArticle } from 'services/QnaBoardService'

// const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title required'),
//     category: Yup.string().required('Category required'),
//     content: Yup.string().required('Content required'),
// })

const Editor = () => {
    const navigate = useNavigate();

    const { state } = useLocation();
    const { updateData } = state || {};
    const [initFile, setInitFile] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (updateData && updateData.qnaBoardFile) {
                const fileObjects = await convertDataToFileObjects(updateData);
                setInitFile(fileObjects);
                // console.log(fileObjects)
            }
        };

        fetchData();
    }, [updateData]);


    const beforeUpload = (files) => {
        let valid = true

        const allowedFileType = ['image/jpeg', 'image/png', 'image/gif']
        const maxFileSize = 500000

        for (let file of files) {
            if (!allowedFileType.includes(file.type)) {
                valid = 'jpeg/png/gif 파일만 업로드 가능합니다.'
            }
            if (file.size >= maxFileSize) {
                valid = '500kb미만의 파일만 업로드 가능합니다.'
            }
        }

        return valid
    }

    const onSetFormFile = (form, field, files) => {

        const dataTransfer = new DataTransfer();

        if (files && files.length > 0) {
            for (const file of files) {
                dataTransfer.items.add(file);
            }
        }

        form.setFieldValue(field.name, dataTransfer.files);
    }

    const createFileObject = async (fileInfo) => {
        const { boardfileName, boardfileSize, fileUrl } = fileInfo;
        console.log("===fileUrl");
        console.log(fileUrl);

        const mimeType = boardfileName.endsWith('.jpg') ? 'image/jpeg' : 'image/png';

        const response = await fetch(fileUrl);
        const blob = await response.blob();

        const file = new File([blob], boardfileName, { type: mimeType, lastModified: Date.now() });
        return file;
    };

    const convertDataToFileObjects = async (updateData) => {
        if (updateData && updateData.qnaBoardFile && updateData.qnaBoardFile.length > 0) {
            const fileObjects = await Promise.all(updateData.qnaBoardFile.map((fileInfo) => createFileObject(fileInfo)));
            return fileObjects;
        }

        return [];
    };

    function stripHtmlUsingDOM(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    }

    const onComplete = async (values, setSubmitting) => {
        setSubmitting(true);
        values.qnaBoardContents = stripHtmlUsingDOM(values.qnaBoardContents)

        const formData = new FormData();
        formData.append("qnaBoardName", values.qnaBoardName);
        formData.append("qnaBoardContents", values.qnaBoardContents);
        console.log("***************************" + values.file);
        if (values.file.length != 0) {
            Array.from(values.file).forEach(file => {
                formData.append('file', file);
            });
        }

        console.log("====================");
        console.log(values);
        console.log(values.file);
        console.log(values.file.length);

        for (let key of formData.keys()) {
            console.log(key, formData.get(key));
        }

        const confirmationMessage = updateData
            ? '게시글을 수정하시겠습니까?'
            : '게시글을 등록하시겠습니까?';

        const shouldSubmit = window.confirm(confirmationMessage);

        if (shouldSubmit) {
            try {
                if (updateData == null) {
                    const res = await apiPostArticle(formData)
                    console.log('파일 업로드 성공:', res.data);
                    navigate(`/qnaboard/view?id=${res.data.data.qnaBoard.qnaBoardSeq}`);
                } else {
                    console.log(updateData);
                    const res = await apiPutArticle(updateData.articleId, formData)
                    console.log('파일 업로드 성공:', res.data);
                    navigate(`/qnaboard/view?id=${updateData.articleId}`);
                }
            } catch (error) {
                console.log(error);
            }
        }

        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                qnaBoardName: updateData ? updateData.qnaBoardName : '',
                qnaBoardContents: updateData && updateData.qnaBoardContents ? updateData.qnaBoardContents : '',
                file: updateData && updateData.qnaBoardFile ? initFile : [],
                // file: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting);
            }}
        >
            {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                <Form enctype="multipart/form-data" name="myform">
                    <FormContainer>
                        <FormItem label="제목">
                            <Field autoComplete="off" name="qnaBoardName" component={Input} />
                        </FormItem>
                        <FormItem
                            label="내용"
                            className="mb-0"
                            labelClass="!justify-start"
                            invalid={errors.content && touched.content}
                            errorMessage={errors.content}
                        >
                            <Field name="qnaBoardContents">
                                {({ field, form }) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(val) => form.setFieldValue(field.name, val)}
                                    />
                                )}
                            </Field>
                        </FormItem>
                        <Field name="file">
                            {({ field, form }) => {
                                return (
                                    <Upload
                                        className="mt-3"
                                        uploadLimit={5}
                                        multiple
                                        beforeUpload={beforeUpload}
                                        onChange={(files) =>
                                            onSetFormFile(
                                                form,
                                                field,
                                                files
                                            )
                                        }
                                        onFileRemove={(files) => {
                                            console.log(files);
                                            onSetFormFile(
                                                form,
                                                field,
                                                files
                                            )
                                        }
                                        }
                                        name="file"
                                        fileList={updateData ? initFile : undefined}
                                    />
                                )
                            }}
                        </Field>

                        <div className="mt-4 flex justify-end">
                            <Button loading={isSubmitting} variant="solid" type="submit">
                                등록
                            </Button>
                        </div>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default Editor;