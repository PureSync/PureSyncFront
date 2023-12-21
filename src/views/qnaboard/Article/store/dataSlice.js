import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetOthersArticleList,
    apiGetQnaArticle,
    
} from 'services/QnaBoardService'

export const getArticle = createAsyncThunk(
    'knowledgeBaseArticle/data/getArticle',
    async (param) => {
        const response = await apiGetQnaArticle(param)
        return response.data
    }
)

export const getOthersArticle = createAsyncThunk(
    'knowledgeBaseArticle/data/getOthersArticle',
    async (param) => {
        const response = await apiGetOthersArticleList(param)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'knowledgeBaseArticle/data',
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
             console.log( "***********************************");
             console.log( state.article);
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