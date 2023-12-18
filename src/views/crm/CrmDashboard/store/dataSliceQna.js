import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetQnaCrmDashboardData } from 'services/QnaCrmService'

export const getCrmDashboardData = createAsyncThunk(
    'crmDashboard/data/getCrmDashboardData',
    async () => {
        const response = await apiGetQnaCrmDashboardData()
        return response.data
    }
)

export const initialFilterData = {
    status: '',
}

const dataSliceQna = createSlice({
    name: 'crmDashboard/data',
    initialState: {
        loading: true,
        dashboardData: {},
    },
    reducers: {},
    extraReducers: {
        [getCrmDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload
            state.loading = false
        },
        [getCrmDashboardData.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSliceQna.reducer
