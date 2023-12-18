import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignUpBodyForm from './SignUpBodyForm';

const SignUp = () => {
    const [formData, setFormData] = useState(null);
    const handleFormSubmit = (data) => {
        setFormData(data);
    };
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">회원 가입</h3>
                <p>And lets get started with your free trial</p>
            </div>
            {!formData ? (
                <SignUpForm onSubmit={handleFormSubmit} />
            ) : (
                <SignUpBodyForm formData={formData}
                    className={""}
                    signInUrl="/sign-in" />
            )}
            {/* <SignUpForm disableSubmit={false} /> */}
        </>
    )
}

export default SignUp
