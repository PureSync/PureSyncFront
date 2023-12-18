import React, { useState, useEffect } from 'react'
import {
  Input,
  FormItem,
  FormContainer,
  Select,
  Button,
  Notification,
  toast,
} from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { apiPostArticle } from 'services/KnowledgeBaseService'
import { useNavigate } from 'react-router-dom'
import ReactHtmlParser from 'html-react-parser'
import * as Yup from 'yup'
import axios from 'axios'
import Upload from 'components/ui/Upload'
import { useLocation } from 'react-router-dom';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
// const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title required'),
//     category: Yup.string().required('Category required'),
//     content: Yup.string().required('Content required'),
// })


const Editor = () => {
  const navigate = useNavigate();
  const memId = 'aaa';
  const { state } = useLocation();
  const { updateData } = state || {};
  console.log(updateData);
  //const updateData = location.state && location.state.updateData;
  const onUpload = (files) => {

    console.log(files);
  }


  function stripHtmlUsingDOM(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  const onComplete = async (values, setSubmitting) => {
    setSubmitting(true);
    values.qnaBoardContents = stripHtmlUsingDOM(values.qnaBoardContents)
    const formData = new FormData(window.document.myform);

    formData.append("qnaBoardContents", values.qnaBoardContents);
    console.log("****", formData);

    //formData.append("qnaBoardContents",  values.qnaBoardContents);
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }
    // formData.append('qnaBoardDto', new Blob([JSON.stringify({
    //   qnaBoardName: values.qnaBoardName,
    //   qnaBoardContents: values.qnaBoardContents,
    //   memId: memId,
    // })], { type: 'application/json' }));

    // formData.append("qnaBoardName", values.qnaBoardName);
    // formData.append("qnaBoardContents", values.qnaBoardContents);
    // formData.append("memId", memId);

    // console.log( values.files);
    // // Add file to the FormData
    // formData.append('file', values.file);


    try {
      if (updateData == null) {
        const response = await axios.post('http://localhost:9000/api/qnaBoard', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',

          },
          data: formData,
        });

        console.log('파일 업로드 성공:', response.data);
        alert('게시글이 작성되었습니다.');
        navigate('/qnaBoard');
      } else {
        console.log(updateData);

        const response = await axios.put(`http://localhost:9000/api/qnaBoard/${updateData.articleId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',

          },
          data: formData,
        });

        console.log('파일 업로드 성공:', response.data);

        alert('게시글이 수정되었습니다.');
        navigate('/qnaBoard');
      }
    } catch (error) {
      // Handle errors
      console.error('Error while saving article:', error);
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        qnaBoardName: updateData ? updateData.qnaBoardName : '',
        qnaBoardContents: updateData ? updateData.qnaBoardContents : '',
        memId: memId,
        files: updateData ? updateData.qnaBoardFile : '',
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
            {/* {({ field, form }) => {
              <Upload 
                fileList={field.value}
              />
            }} */}
            
            {/* <div className="upload-file-list">
              {files.map((file, index) => (
                <FileItem file={file} key={file.qnaBoardfileName + index}>
                  <CloseButton
                    onClick={() => removeFile(index)}
                    className="upload-file-remove"
                  />
                </FileItem>
              ))}
            </div> */}
            <FormItem label="파일 업로드">

              <Field
                type="file"
                name="file"
                multiple
              />
              {({ field, form }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={(val) => form.setFieldValue(field.name, val)}
                />
              )}
            </FormItem>
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