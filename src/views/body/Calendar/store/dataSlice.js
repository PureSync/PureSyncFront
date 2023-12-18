import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSleepCalendar } from 'services/BodyService'

export const getEvents = createAsyncThunk(
    'sleepCalendar/data/getEvents',
    async () => {
        const response = await apiGetSleepCalendar()

        let sleepList = response.data.data.sleepList;
       
        sleepList.map(element => {
            element.eventColor = element.sleepCategory===1 ? 'purple' : 'yellow';
            element.id = element.sleepSeq;
            element.start= element.sleepGodate.substr(0, 10);
            element.end= element.sleepWudate.substr(0, 10);
            element.title = element.sleepCategory===1 ? '밤잠' : '낮잠';
            return element;
        });
        console.log( sleepList );
        return response.data;
    }
)

const dataSlice = createSlice({
    name: 'sleepCalendar/data',
    initialState: {
        loading: false,
        eventList: [],
    },
    reducers: {
        updateEvent: (state, action) => {
            state.eventList = action.payload;
            console.log(action.payload);
        },apiGetSleepCalendar
    },
    extraReducers: {
        [getEvents.fulfilled]: (state, action) => {
            state.eventList = action.payload
        },
    },
})

export const { updateEvent } = dataSlice.actions

export default dataSlice.reducer
