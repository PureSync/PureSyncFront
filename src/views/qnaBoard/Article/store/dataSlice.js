import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetQnaArticle,
    apiGetQnaOthersArticleList,
} from 'services/QnaBoardService'

export const getArticle = createAsyncThunk(
    'knowledgeBaseQnaArticle/data/getQnaArticle',
    async (param) => {
        const response = await apiGetQnaArticle(param)
        return response.data
    }
)

export const getOthersArticle = createAsyncThunk(
    'knowledgeBaseQnaArticle/data/getQnaOthersArticle',
    async (param) => {
        const response = await apiGetQnaOthersArticleList(param)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'knowledgeBaseQnaArticle/data',
    initialState: {
        loading: false,
        otherLoading: false,
        article: [],
        othersArticle: {
            relatedArticle: [],
            popularArticle: [],
        },
    },
    extraReducers: {
        [getArticle.fulfilled]: (state, action) => {
            state.loading = false
            state.article = action.payload.data.qnaBoardDetailDto;
        },
        [getArticle.pending]: (state) => {
            state.loading = true
        },
        [getOthersArticle.fulfilled]: (state, action) => {
            state.otherLoading = false
            state.othersArticle = action.payload
        },
        [getOthersArticle.pending]: (state) => {
            state.otherLoading = true
        },
    },
})

export default dataSlice.reducer