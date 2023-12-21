import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'qnaArticle/state',
    initialState: {
        categoryValue: '',
        categoryLabel: '',
        mode: 'edit',
    },
    reducers: {
        setCategory: (state, action) => {
            state.categoryValue = action.payload.categoryValue
            state.categoryLabel = action.payload.categoryLabel
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
    },
})

export const { setCategory, setMode } = stateSlice.actions

export default stateSlice.reducer