import React from 'react'
import { Input,  FormItem, FormContainer, Alert, Button} from 'components/ui'
import {  ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup' //유효성검사
import Axios from 'axios'





const SignUpBodyForm = ({formData, className, signInUrl}) => {
    // const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    // const { signUp } = useAuth()
    const disableSubmit = false;
    const [message, setMessage] = useTimeOutMessage()
    
    
    const onSignUp = async (values, setSubmitting) => {
        const finalData = { ...formData, ...values };
        setSubmitting(true);
        try{
            const response = await Axios.post('http://localhost:9000/api/member/signup', finalData);
            console.log(response.data);
            window.location.href = signInUrl;
            //추후 변경 필요 지금 급해서.
        } catch(e){
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
                                invalid={errors.bodyHeight && touched.bodyHeight}
                                errorMessage={errors.bodyHeight}
                            >
                                <Field as={Input} placeholder="현재 키" name="bodyHeight" />

                            </FormItem>
                            {/* 키끝 */}
                            <FormItem
                                label="몸무게"
                                invalid={errors.bodyWeight && touched.bodyWeight}
                                errorMessage={errors.bodyWeight}
                            >
                                <Field as={Input} placeholder="현재 몸무게" name="bodyWeight" />
                                {/* 몸무게 끝 */}
                            </FormItem>
                            <FormItem
                                label="원하는 몸무게"
                                invalid={errors.bodyWishWeight && touched.bodyWishWeight}
                                errorMessage={errors.bodyWishWeight}
                            >
                                <Field as={Input} placeholder="원하는 몸무게" name="bodyWishWeight" />
                            </FormItem>
                            {/* 원하는 몸무게 끝 */}
                            <FormItem
                                label="하루 소모 칼로리"
                                invalid={errors.bodyWishConscal && touched.bodyWishConscal}
                                errorMessage={errors.bodyWishConscal}
                            >
                               <Field as={Input} placeholder="소모칼로리" name="bodyWishConscal" /> 
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>회원가입 하셨나요? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

export default SignUpBodyForm;
