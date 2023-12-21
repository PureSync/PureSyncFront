import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetQnaArticle } from 'services/KnowledgeBaseService'

export const getArticle = createAsyncThunk(
    'knowledgeBaseEditArticle/data/getArticle',
    async (param) => {
        const response = await apiGetQnaArticle(param)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'knowledgeBaseEditArticle/data',
    initialState: {
        loading: false,
        article: {},
    },
    reducers: {
        setArticle: (state, action) => {
            state.article = action.payload
        },
    },
    extraReducers: {
        [getArticle.fulfilled]: (state, action) => {
            state.loading = false
            state.article = action.payload
        },
        [getArticle.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setArticle } = dataSlice.actions

export default dataSlice.reducer