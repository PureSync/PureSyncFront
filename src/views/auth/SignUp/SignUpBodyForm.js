import React from 'react'
import { Input, FormItem, FormContainer, Alert, Button } from 'components/ui'
import { ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup' //유효성검사
import Axios from 'axios'

const validationSchema = Yup.object().shape({
    bodyHeight: Yup.number("소수점 둘째자리까지 입력 가능합니다.").required("현재 키를 입력해주세요").positive("양수여야 합니다.").lessThan(300, '세상에서 제일 키가 큰 사람은 251cm 입니다.'),
    
    bodyWeight: Yup.number("소수점 둘째자리까지 입력 가능합니다.").required("현재 몸무게를 입력해주세요").positive("양수여야 합니다.").lessThan(500, '500보다 작아야합니다.'),
    
    bodyWishWeight: Yup.number("소수점 둘째자리까지 입력 가능합니다.").required("원하시는 몸무게를 입력해주세요.").positive("양수여야 합니다."),
    
    bodyWishConscal: Yup.number("소수점 둘째자리까지 입력 가능합니다.").required("원하시는 소모 칼로리를 입력해주세요.").positive("양수여야 합니다."),
    
})



const SignUpBodyForm = ({ formData, className, signInUrl }) => {
    // const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    // const { signUp } = useAuth()
    const disableSubmit = false;
    const [message, setMessage] = useTimeOutMessage()


    const onSignUp = async (values, setSubmitting) => {
        const finalData = { ...formData, ...values };
        setSubmitting(true);
        try {
            const response = await Axios.post('http://localhost:9000/api/member/signup', finalData);
            alert("등록하신 이메일로 계정을 활성화 해주세요.");
            window.location.href = signInUrl;
        } catch (e) {
            console.error(e);
        }

        setSubmitting(false)
    }


    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    bodyHeight: '',
                    bodyWeight: '',
                    bodyWishWeight: '',
                    bodyWishConscal: '',
                }}
                validationSchema={validationSchema} 
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (

                    <Form>
                        <FormContainer>
                            <FormItem
                                label="키"
                                asterisk
                                invalid={errors.bodyHeight && touched.bodyHeight}
                                errorMessage={errors.bodyHeight}
                            >
                                <div className='flex items-center'>
                                    <Field as={Input} placeholder="현재 키" name="bodyHeight" />
                                    <span className='ml-2'>cm</span>
                                </div>

                            </FormItem>
                            {/* 키끝 */}
                            <FormItem
                                label="몸무게"
                                asterisk
                                invalid={errors.bodyWeight && touched.bodyWeight}
                                errorMessage={errors.bodyWeight}
                            >
                                <div className='flex items-center'>
                                    <Field as={Input} placeholder="현재 몸무게" name="bodyWeight" />
                                    <span className='ml-2'>Kg</span>
                                </div>
                                {/* 몸무게 끝 */}
                            </FormItem>
                            <FormItem
                                label="원하는 몸무게"
                                asterisk
                                invalid={errors.bodyWishWeight && touched.bodyWishWeight}
                                errorMessage={errors.bodyWishWeight}
                            >
                                <div className='flex items-center'>
                                    <Field as={Input} placeholder="원하는 몸무게" name="bodyWishWeight" />
                                    <span className='ml-2'>Kg</span>
                                </div>
                            </FormItem>
                            {/* 원하는 몸무게 끝 */}
                            <FormItem
                                label="하루 소모 칼로리"
                                asterisk
                                invalid={errors.bodyWishConscal && touched.bodyWishConscal}
                                errorMessage={errors.bodyWishConscal}
                            >
                                <div className='flex items-center'>
                                    <Field as={Input} placeholder="소모칼로리" name="bodyWishConscal" />
                                    <span className='ml-2'>Kcal</span>
                                </div>
                            </FormItem>
                            <Button
                                block
                                color="green-600"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                disabled={isSubmitting || Object.keys(errors).length > 0}
                            >
                                {isSubmitting
                                    ? '생성 중'
                                    : '회원 가입'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>회원가입 하셨나요? </span>
                                <ActionLink to={signInUrl}>로그인</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default SignUpBodyForm;
