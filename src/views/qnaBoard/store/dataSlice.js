import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetQnaCrmCustomers,
    apPutQnaCrmCustomer,
    apiGetQnaCrmCustomersStatistic,
} from 'services/QnaBoardService'

export const getCustomerStatistic = createAsyncThunk(
    'qnaCrmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetQnaCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'qnaCrmCustomers/data/getCustomers',
    async (params) => {
        const response = await apiGetQnaCrmCustomers(params)
        return response.data
    }
)

export const putCustomer = createAsyncThunk(
    'qnaCrmCustomers/data/putCustomer',
    async (data) => {
        const response = await apPutQnaCrmCustomer(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'qnaCrmCustomers/data',
    initialState: {
        loading: false,
        customerList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.customerList = action.payload.data.qnaBoardPage
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
            state.loading = true
        },
        [getCustomerStatistic.pending]: (state) => {
            state.statisticLoading = true
        },
        [getCustomerStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },
    },
})

export const { setTableData, setCustomerList, setFilterData } =  dataSlice.actions

export default dataSlice.reducer