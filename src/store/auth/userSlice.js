import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    avatar: '',
    userName: '',
    email: '',
    authority: [],
    nickName: ''
}

export const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        userLoggedOut: () => initialState,
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
