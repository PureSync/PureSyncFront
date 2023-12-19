import React, { useState } from 'react'
import {
    Input,
    FormItem,
    FormContainer,
    Select,
    Button,
    DatePicker,
} from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import DOMPurify from 'dompurify';
import { apiPostDiary, apiPutDiary } from 'services/MindDiaryService'
import 'dayjs/locale/ko'

const validationSchema = Yup.object().shape({
    dyTitle: Yup.string().required('제목을 입력해주세요'),
    emoState: Yup.string().required('감정을 선택해주세요'),
    dyContents: Yup.string().max(1000, '1000자 이하로 입력해주세요')
})

const Editor = (props) => {
    const navigate = useNavigate()

    const diary = props.diary ? props.diary : '';

    const emotionList = [
        { label: "좋음", value: "좋음" },
        { label: "행복", value: "행복" },
        { label: "상쾌", value: "상쾌" },
        { label: "사랑", value: "사랑" },
        { label: "감사", value: "감사" },
        { label: "만족", value: "만족" },
        { label: "평범", value: "평범" },
        { label: "무난", value: "무난" },
        { label: "안정", value: "안정" },
        { label: "슬픔", value: "슬픔" },
        { label: "분노", value: "분노" },
        { label: "불안", value: "불안" },
        { label: "걱정", value: "걱정" },
        { label: "외로움", value: "외로움" },
        { label: "우울", value: "우울" }
    ]

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 문자열로 변환
    const day = String(today.getDate()).padStart(2, '0'); // 일을 문자열로 변환하고 2자리로 맞춤
    const formattedDate = `${year}-${month}-${day}`;
    const [selectDate, setSelectDate] = useState(formattedDate);

    const DatePickerClick = (date) => {
        setSelectDate(date);
    }

    const onComplete = async (values, setSubmitting) => {
        setSubmitting(true);
        values.dyContents = DOMPurify.sanitize(values.dyContents);
        const data = {
            dyDate: values.dyDate,
            dyTitle: values.dyTitle,
            dyContents: values.dyContents,
            emoState: values.emoState,
        }


        const response = diary ?
            await apiPutDiary(diary.dySeq, data) :
            await apiPostDiary(data)

        if (response.data.code === 201 || response.data.code === 200) {
            navigate('/mind/diary');
        }

        setSubmitting(false);
    };


    return (
        <>
            <Formik
                initialValues={{
                    dyTitle: diary.dyTitle ? diary.dyTitle : '',
                    dyContents: diary.dyContents ? diary.dyContents : '',
                    emoState: diary.emoState ? diary.emoState : '',
                    dyDate: diary.dyDate ? diary.dyDate : selectDate,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onComplete(values, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem label="날짜">
                                <Field name="dyDate">
                                    {({ field, form }) => (
                                        <DatePicker
                                            locale = 'ko'
                                            DatePickerClick={(date) => {
                                                form.setFieldValue(field.name, date);
                                                setSelectDate(date);
                                            }}
                                            placeholder={values.dyDate}
                                            defaultValue={values.dyDate}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem 
                            label="제목"
                            className="mb-6"
                            labelClass="!justify-start"
                            invalid={errors.dyTitle && touched.dyTitle}
                            errorMessage={errors.dyTitle}
                            >
                                <Field
                                    name="dyTitle"
                                    autoComplete="off"
                                    component={Input}
                                    value={values.dyTitle}
                                />
                            </FormItem>
                            <FormItem label="감정"
                            className="mb-6"
                            labelClass="!justify-start"
                            invalid={errors.emoState && touched.emoState}
                            errorMessage={errors.emoState}>
                                <Field name="emoState">
                                    {({ field, form }) => (
                                        <Select
                                            placeholder="Emotion"
                                            field={field}
                                            form={form}
                                            options={emotionList}
                                            value={emotionList.filter(
                                                (emotion) =>
                                                    emotion.value ===
                                                    values.emoState
                                            )}
                                            onChange={(emotion) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    emotion.value,
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                label="내용"
                                className="mb-0"
                                labelClass="!justify-start"
                                invalid={errors.dyContents && touched.dyContents}
                                errorMessage={errors.dyContents}
                            >
                                <Field name="dyContents">
                                    {({ field, form }) => (

                                        <RichTextEditor
                                            value={field.value}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                            initialValue={field.value}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <div className="mt-4 flex justify-end">
                                {props.diary ? (
                                    <Button loading={isSubmitting} variant="solid">
                                        수정하기
                                    </Button>
                                ) :
                                    (
                                        <Button loading={isSubmitting} variant="solid">
                                            등록하기
                                        </Button>
                                    )
                                }

                            </div>
                        </FormContainer>
                    </Form>
                )}

            </Formik>

        </>

    )
}

export default Editor