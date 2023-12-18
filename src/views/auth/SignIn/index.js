import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Pure Sync 어서오세요.</h3>
                <p>로그인을 하시고 Pure Sync와 함께하세요.</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn