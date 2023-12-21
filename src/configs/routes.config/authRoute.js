import React from 'react'

const authRoute = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: React.lazy(() => import('views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: React.lazy(() => import('views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgotId`,
        component: React.lazy(() => import('views/auth/ForgotId')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: React.lazy(() => import('views/auth/ResetPassword')),
        authority: [],
    },
    {
        key: 'landing',
        path: `/landing`,
        component: React.lazy(() => import('views/landing/landing')),
        authority: [],
        meta: {
            layout: 'blank'
        }
    },
]

export default authRoute