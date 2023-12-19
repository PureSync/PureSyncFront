import React, { useState } from 'react'
import { InputGroup, Input, Button, FormItem, FormContainer, Alert, Radio, SendCompareButton, DatePickerUpdate } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup' //유효성검사
import dayjs from 'dayjs';
import useAuth from 'utils/hooks/useAuth'

const today = new Date();
const minAgeDate = dayjs(today).subtract(14, 'year').toDate();
const ALERT_MEMBIRT = `만 15세 미만은 가입할 수 없습니다.`;


const validationSchema = Yup.object().shape({
    memId: Yup.string()
        .required('아이디를 확인해주세요.')
        .matches(/^[a-zA-Z0-9]*$/, '영문과 숫자 조합으로 이루어진 아이디어야 합니다.')
        .min(8, '아이디는 최소 8글자 이상입니다..')
        .max(16, '아이디는 최대 16글자 이하입니다..'),

    memEmail: Yup.string()
        .required('이메일을 확인해주세요.')
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, '정확한 이메일을 입력해주세요.')
        .email('이메일을 입력해주세요.'),

    memNick: Yup.string()
        .required('닉네임을 확인해주세요..')
        .matches(/^[a-zA-Z0-9]*$/, '영문과 숫자 조합으로 이루어진 닉네임이어야 합니다.')
        .min(2, '닉네임은 최소 2글자 이상입니다..')
        .max(20, '닉네임은 최대 20글자 이하입니다.'),


    memGender: Yup.string()
        .required('성별을 선택해주세요.'),

    memBirth: Yup.date()
    .required('생년월일을 입력해주세요.')
        .max(minAgeDate, ALERT_MEMBIRT),
        memPassword: Yup.string()
        .required('비밀번호를 입력해주세요.')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, '영문 숫자 특수문자를 조합하여 비밀번호를 만들어주세요.')
        .min(8, '비밀번호는 최소 8글자 이상입니다.'),

    confirmMemPassword: Yup.string().oneOf(
        [Yup.ref('memPassword'), null],
        '비밀번호가 일치하지 않습니다.'
    ),
})

const SignUpForm = ({ onSubmit, ...props }) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const FILED_MEM_ID = "memId";
    const FILED_MEM_NICKNAME = "memNick";
    const FILED_MEM_EMAIL = "memEmail";
    const { signUp } = useAuth()
    const [duplicateCheckMessage, setDuplicateCheckMessage] = useState({});
    const [message, setMessage] = useTimeOutMessage()


    const onSignUp = async (values, setSubmitting) => {
        const { memId, memNick, memEmail, memBirth, memGender, memPassword } = values;
        setSubmitting(true)
        const result = await signUp({ memId, memNick, memEmail, memBirth, memGender, memPassword })
        console.debug("result bodyd", result);
        if (result.status == 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }
    const handleDuplicateCheck = (field, message) => {
        setDuplicateCheckMessage({ ...duplicateCheckMessage, [field]: message });
    };


    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    memId: '',
                    memNick: '',
                    memEmail: '',
                    memBirth: null,
                    memGender: '',
                    memPassword: '',
                    confirmMemPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, setErrors }) => {
                    console.log(values);
                    if (!disableSubmit) {
                        validationSchema
                            .validate(values, { abortEarly: false })
                            .then(() => {
                                onSubmit(values);
                                onSignUp(values, setSubmitting);
                            })
                            .catch((validationErrors) => {
                                const formErrors = {};
                                validationErrors.inner.forEach((error) => {
                                    formErrors[error.path] = error.message;
                                });
                                setErrors(formErrors);
                            });
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting, values, setFieldError, setFieldValue, isValid }) => (
                    <Form>
                        <FormContainer>
                            {/* 아이디 인풋박스 -  */}
                            <FormItem
                                label="아이디"
                                asterisk
                                invalid={errors.memId && touched.memId}
                                errorMessage={errors.memId}
                            >
                                <InputGroup className="mb-4">
                                    <Field as={Input} name="memId" />
                                    <SendCompareButton color="green-600" variant="solid" type="button" field={FILED_MEM_ID} inputValue={values.memId} onDuplicateCheck={handleDuplicateCheck} setFieldError={setFieldError}>아이디 중복 검사</SendCompareButton>
                                </InputGroup>
                            </FormItem>
                            {/* 아이디 끝 */}
                            {/* 닉네임 인풋박스 */}
                            <FormItem
                                label="닉네임"
                                asterisk
                                invalid={errors.memNick && touched.memNick}
                                errorMessage={errors.memNick}
                            >
                                <InputGroup className="mb-4">
                                    <Field as={Input} name="memNick" />
                                    <SendCompareButton color="green-600" variant="solid" type="button" field={FILED_MEM_NICKNAME} inputValue={values.memNick} onDuplicateCheck={handleDuplicateCheck} setFieldError={setFieldError}>닉네임 중복 검사</SendCompareButton>
                                </InputGroup>
                            </FormItem>
                            {/* 이메일 */}
                            {/* 이메일 중복검사 */}
                            <FormItem
                                label="이메일"
                                asterisk
                                invalid={errors.memEmail && touched.memEmail}
                                errorMessage={errors.memEmail}
                            >
                                <InputGroup className="mb-4">
                                    <Field as={Input} name="memEmail" />
                                    <SendCompareButton color="green-600" variant="solid" type="button" field={FILED_MEM_EMAIL} inputValue={values.memEmail} onDuplicateCheck={handleDuplicateCheck} setFieldError={setFieldError}>이메일 중복 검사</SendCompareButton>
                                </InputGroup>
                            </FormItem>
                            {/* 출생년도 */}
                            <FormItem
                                label="생년월일"
                                asterisk
                                invalid={errors.memBirth && touched.memBirth}
                                errorMessage={errors.memBirth}
                            >
                                <Field name="memBirth">
                                    {({ field, form }) => (
                                        <DatePickerUpdate
                                            field={field}
                                            form={form}
                                            value={field.value}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            {/* 성별 */}
                            <FormItem
                                label="성별"
                                asterisk
                                invalid={errors.memGender && touched.memGender}
                                errorMessage={errors.memGender}
                            >
                                <Field name="memGender">
                                    {({ field, form }) => (
                                        <Radio.Group
                                            value={values.radio}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio color="green-600" value={'M'}>남</Radio>
                                            <Radio color="green-600" value={'W'}>여</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>


                            <FormItem
                                asterisk
                                label="비밀번호"
                                invalid={errors.memPassword && touched.memPassword}
                                errorMessage={errors.memPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="memPassword"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="비밀번호 확인"
                                invalid={
                                    errors.confirmMemPassword &&
                                    touched.confirmMemPassword
                                }
                                errorMessage={errors.confirmMemPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmMemPassword"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                color="green-600"
                                disabled={!isValid}
                            >
                                {isSubmitting
                                    ? '페이지 이동 중...'
                                    : '건강 정보 입력하기'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>이미 회원가입 하셨나요? </span>
                                <ActionLink to={signInUrl}>로그인</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default SignUpForm
