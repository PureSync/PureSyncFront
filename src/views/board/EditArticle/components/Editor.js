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
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Title required'),
//     category: Yup.string().required('Category required'),
//     content: Yup.string().required('Content required'),
// })


const Editor = () => {
  const navigate = useNavigate();

  const access_token = getHeaderCookie();
  let parse_token = parseJwt(access_token);
  let { memId } = getMemInfoFromToken(parse_token);

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
    values.boardContents = stripHtmlUsingDOM(values.boardContents)
    const formData = new FormData(window.document.myform);

    formData.append("boardContents", values.boardContents);
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }
    
    if (values.file == undefined) {
        formData.delete("file");
    }
    
    try {

      if (updateData == null) {
        const response = await axios.post('http://localhost:9000/api/board', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
          },
          data: formData,
        });

        console.log('파일 업로드 성공:', response.data);
        alert('게시글이 작성되었습니다.');
        navigate('/board');
      } else {
        console.log(updateData);

        const response = await axios.put(`http://localhost:9000/api/board/${updateData.articleId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${access_token}`
          },
          data: formData,
        });

        console.log('파일 업로드 성공:', response.data);

        alert('게시글이 수정되었습니다.');
        navigate('/board');
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
        boardName: updateData ? updateData.boardName : '',
        boardContents: updateData ? updateData.boardContents : '',

        files: updateData ? updateData.boardFile : '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        onComplete(values, setSubmitting);
      }}
    >
      {({ values, touched, errors, isSubmitting, setFieldValue }) => (
        <Form enctype="multipart/form-data" name="myform">
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
            <FormItem label="파일 업로드">

              <Field
                type="file"
                name="file"
                multiple
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue('files', file || null);

                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue('filePreview', reader.result);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setFieldValue('filePreview', null);
                  }
                }}
              />
              {values.filePreview && (
                <img
                  src={values.filePreview}
                  alt="이미지 미리보기"
                  style={{ width: '200px', height: 'auto', marginTop: '10px' }}
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