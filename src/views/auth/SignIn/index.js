import React from 'react'
import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">PureSync</h3>
                <p>로그인 후 PureSync와 함께하세요.</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn