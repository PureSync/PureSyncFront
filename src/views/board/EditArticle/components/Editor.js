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
import { apiPostArticle, apiPutArticle } from 'services/BoardService'

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
            if (updateData && updateData.boardFile) {
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
        if (updateData && updateData.boardFile && updateData.boardFile.length > 0) {
            const fileObjects = await Promise.all(updateData.boardFile.map((fileInfo) => createFileObject(fileInfo)));
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
        values.boardContents = stripHtmlUsingDOM(values.boardContents)

        const formData = new FormData();
        formData.append("boardName", values.boardName);
        formData.append("boardContents", values.boardContents);
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


        if (updateData == null) {
            await apiPostArticle(formData)
                .then((res) => {
                    console.log('파일 업로드 성공:', res.data);
                    alert('게시글이 작성되었습니다.');
                    navigate(`/board/view?id=${res.data.data.board.boardSeq}`);
                })
                .catch((error) => { console.log(error) })

        } else {
            console.log(updateData);
            await apiPutArticle(updateData.articleId, formData)
                .then((res) => {
                    console.log('파일 업로드 성공:', res.data);
                    alert('게시글이 수정되었습니다.');
                    navigate(`/board/view?id=${updateData.articleId}`);
                })
                .catch((error) => { console.log(error) })
        }

        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                boardName: updateData ? updateData.boardName : '',
                boardContents: updateData ? updateData.boardContents : '',
                file: updateData && updateData.boardFile ? initFile : [],
                // file: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
                onComplete(values, setSubmitting);
            }}
        >
            {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                <Form encType="multipart/form-data" name="myform">
                    <FormContainer>
                        <FormItem label="제목">
                            <Field autoComplete="off" name="boardName" component={Input} />
                        </FormItem>
                        <FormItem
                            label="내용"
                            className="mb-0"
                            labelClass="!justify-start"
                            invalid={errors.content && touched.content}
                            errorMessage={errors.content}
                        >
                            <Field name="boardContents">
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