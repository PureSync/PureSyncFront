import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetMemberDashboardData } from 'services/DashboardService'

export const getMemberDashboardData = createAsyncThunk(
    'memberDashboard/data/getMemberDashboardData',
    async (selectedDate) => {
        const response = await apiGetMemberDashboardData(selectedDate)
        return response.data
    }
)

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'memberDashboard/data',
    initialState: {
        loading: true,
        dashboardData: {},
    },
    reducers: {},
    extraReducers: {
        [getMemberDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload.data
            console.log(state.dashboardData);
            state.loading = false
        },
        [getMemberDashboardData.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
