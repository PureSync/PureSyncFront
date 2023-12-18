import React, { useState } from 'react'
import { Button, FormItem, FormContainer, Alert, Input } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import { apiResetPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    memId: Yup.string().required('아이디를 제대로 입력해주세요.'),
    memEmail: Yup.string().required('Email을 제대로 입력해주세요.')

})

const ResetmemIdForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()

    const onSubmit = async (values, setSubmitting) => {
        const { memId, memEmail } = values
        setSubmitting(true)
        try {
            const resp = await apiResetPassword({ memId, memEmail })
            if (resp.data) {
                setSubmitting(false)
                setResetComplete(true)
            }
        } catch (errors) {
            setMessage(errors?.response?.data?.message || errors.toString())
            setSubmitting(false)
        }
    }

    const onContinue = () => {
        navigate('/sign-in')
    }

    return (
        <div className={className}>
            <div className="mb-6">
                {resetComplete ? (
                    <>
                        <h3 className="mb-1">비밀번호가 임시비밀번호로 변경되었습니다.</h3>
                        <p>입력하신 이메일로 임시 비밀번호가 전송되었습니다.</p>
                    </>
                ) : (
                    <>
                        <h3 className="mb-1">비밀 번호 찾기</h3>
                        <p>
                            회원 가입 시 등록한 이메일과 아이디를 적어주세요.
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
                    memId: '',
                    memEmail: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSubmit(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            {!resetComplete ? (
                                <>
                                    <FormItem
                                        label="ID"
                                        invalid={
                                            errors.memId && touched.memId
                                        }
                                        errorMessage={errors.memId}
                                    >
                                        <Field as={Input} placeholder="아이디 입력해주세요." name="memId" />
                                    </FormItem>
                                    <FormItem
                                        label="Email"
                                        invalid={
                                            errors.memEmail &&
                                            touched.memEmail
                                        }
                                        errorMessage={errors.memEmail}
                                    >
                                        <Field as={Input} placeholder="Email 입력해주세요." name="memEmail" />
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? '전송 중입니다.'
                                            : '전송'}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    block
                                    variant="solid"
                                    type="button"
                                    onClick={onContinue}
                                >
                                    로그인 이동
                                </Button>
                            )}

                            <div className="mt-4 text-center">
                                <span>Back to </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ResetmemIdForm
