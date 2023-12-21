import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetOthersArticleList,
    apiGetQnaArticle,
    
} from 'services/QnaBoardService'

export const getArticle = createAsyncThunk(
    'knowledgeBaseQnaArticle/data/getArticle',
    async (param) => {
        const response = await apiGetQnaArticle(param)
        return response.data
    }
)

export const getOthersArticle = createAsyncThunk(
    'knowledgeBaseQnaArticle/data/getOthersArticle',
    async (param) => {
        const response = await apiGetOthersArticleList(param)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'knowledgeBaseQnaArticle/data',
    initialState: {
        loading: false,
        otherLoading: false,
        qnaArticle: [],
        othersArticle: {
            relatedArticle: [],
            popularArticle: [],
        },
    },
    extraReducers: {
        [getArticle.fulfilled]: (state, action) => {
            state.loading = false
            state.qnaArticle = action.payload.data.qnaBoardDetailDto;
             console.log( "***********************************");
             console.log( state.qnaArticle);
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