import React, { useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink } from 'components/shared'
import { apiForgotPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string().required('이메일을 다시 확인해주세요.'),
})

const ForgotPasswordForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [emailSent, setEmailSent] = useState(false);

    const [message, setMessage] = useTimeOutMessage();
    
    const [responseData, setResponseData] = useState(null);

    const onSendMail = async (values, setSubmitting) => {
        setSubmitting(true)
       
        try {
            const response = await apiForgotPassword(values)
            console.log("response::",response)
            if(response.status!==200){
                setSubmitting(false)
                setMessage(response?.response?.data?.message || response.toString())
                return;
            }
            setResponseData(response);
            setEmailSent(true)
        } catch (errors) {
            setMessage(errors?.response?.data?.message || errors.toString())
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <div className="mb-6">
                {emailSent ? (
                    <>
                        <h3 className="mb-1">당신의 아이디는</h3>
                        <h2>
                        {JSON.stringify(responseData.data.data.memId)} 입니다.
                        </h2>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1">아이디를 잊으셨나요?</h3>
                        <p>
                            회원가입 시 등록한 이메일을 입력해주세요.
                        </p>
                    </>
                )}
            </div>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSendMail(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className={emailSent ? 'hidden' : ''}>
                                <FormItem
                                    invalid={errors.email && touched.email}
                                    errorMessage={errors.email}
                                >
                                    <Field
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email을 입력하세요."
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            {!emailSent && (
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                color = "green-600"
                            >
                                 이메일을 입력하세요
                            </Button>
                            )}
                            <div className="mt-4 text-center">
                                <ActionLink to={signInUrl}>로그인</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPasswordForm
