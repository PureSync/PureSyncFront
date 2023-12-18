import React, { useState } from 'react'
import { InputGroup,Input, Button, FormItem, FormContainer, Alert, Radio, SendCompareButton } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup' //유효성검사
import useAuth from 'utils/hooks/useAuth'




const validationSchema = Yup.object().shape({
    memId: Yup.string().required('이름을 다시 확인해주세요.'),
    memEmail: Yup.string()
        .email('이메일을 입력해주세요.')
        .required('Please enter your email'),
    memGender: Yup.string().required('성별을 선택해주세요.'),
    memPassword: Yup.string().required('비밀번호를 입력해주세요.'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
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
        const { memId, memNick, memPassword, memGender, memEmail } = values
        setSubmitting(true)
        const result = await signUp({ memId, memNick, memPassword, memGender, memEmail })

        if (result.status === 'failed') {
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
                    memBirth: '',
                    memGender: '',
                    memPassword: '',
                    confirmMemPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSubmit(values)
                        // onSignUp(values, setSubmitting)
                        // } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting, values, setFieldError }) => (
                    <Form>
                        <FormContainer>
                            {/* 아이디 인풋박스 -  */}
                            <FormItem
                                label="아이디"
                                invalid={errors.memId && touched.memId}
                                errorMessage={errors.memId}
                            >
                                <InputGroup className="mb-4">
                                    <Field as={Input} placeholder="아이디를 입력해주세요" name="memId" />
                                    <SendCompareButton type="button" field={FILED_MEM_ID} inputValue={values.memId} onDuplicateCheck={handleDuplicateCheck} setFieldError={setFieldError}>아이디 중복 검사</SendCompareButton>
                                </InputGroup>
                            </FormItem>
                            {/* 아이디 끝 */}
                            {/* 닉네임 인풋박스 */}
                            <FormItem
                                label="닉네임"
                                invalid={errors.memNick && touched.memNick}
                                errorMessage={errors.memNick}
                            >
                                <InputGroup className="mb-4">
                                    <Field as={Input} placeholder="닉네임을 입력해주세요" name="memNick" />
                                    <SendCompareButton  type="button" field={FILED_MEM_NICKNAME} inputValue={values.memNick} onDuplicateCheck={handleDuplicateCheck} setFieldError={setFieldError}>닉네임 중복 검사</SendCompareButton>
                                </InputGroup>
                            </FormItem>
                            {/* 이메일 */}
                            {/* 이메일 중복검사 */}
                            <FormItem
                                label="Email"
                                invalid={errors.memEmail && touched.memEmail}
                                errorMessage={errors.memEmail}
                            >
                                <InputGroup className="mb-4">
                                    <Field as={Input} placeholder="Email 중복 검사" name="memEmail" />
                                    <SendCompareButton  type="button" field={FILED_MEM_EMAIL} inputValue={values.memEmail} onDuplicateCheck={handleDuplicateCheck} setFieldError={setFieldError}>이메일 중복 검사</SendCompareButton>
                                </InputGroup>
                            </FormItem>
                            {/* 출생년도 */}
                            <FormItem
                                label="출생년도"
                                invalid={errors.memBirth && touched.memBirth}
                                errorMessage={errors.memBirth}
                            >
                                <Field
                                    type="Date"
                                    autoComplete="off"
                                    name="memBirth"
                                    component={Input}
                                    
                                />
                            </FormItem>
                            {/* 성별 */}
                            <FormItem
                                label="성별"
                                invalid={errors.memGender && touched.memGender}
                                errorMessage={errors.memGender}>
                                <Field as={Radio.Group} name="memGender">
                                    <label>
                                        <Field type="radio" name="memGender" value="M" />
                                        남성
                                    </label>
                                    <label>
                                        <Field type="radio" name="memGender" value="W" />
                                        여성
                                    </label>
                                </Field>

                            </FormItem>

                            <FormItem
                                label="비밀번호"
                                invalid={errors.memPassword && touched.memPassword}
                                errorMessage={errors.memPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="memPassword"
                                    placeholder="memPassword"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호 재확인"
                                invalid={
                                    errors.confirmMemPassword &&
                                    touched.confirmMemPassword
                                }
                                errorMessage={errors.confirmMemPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmMemPassword"
                                    placeholder="Confirm Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : '건강 정보 입력하기'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>회원가입 하셨나요? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
