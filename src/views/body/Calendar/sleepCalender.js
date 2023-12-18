import React, { useEffect } from 'react'
import { Container } from 'components/shared'
import CalendarViewSleep from 'components/shared/CalendarViewSleep'
import EventDialog from './components/EventDialog'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getEvents, updateEvent } from './store/dataSlice'
import { setSelected, openDialog } from './store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios';

injectReducer('sleepCalendar', reducer)

const SleepCalendar = () => {
    const dispatch = useDispatch();
    
    
    let events = useSelector((state) => state.sleepCalendar.data.eventList.data);
    if( events == undefined)
        events = [];
    else 
        events = events.sleepList;
    console.log("************************");
    console.log(events);
    
    useEffect(() => {
        dispatch(getEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCellSelect = (event) => {
      
        const { start, end , sleepGodate, sleepWudate} = event
        dispatch(
            setSelected({
                type: 'NEW',
                sleepGodate:start,
                sleepWudate:end,
            })
        )
        dispatch(openDialog())
    }

    const onEventClick = (arg) => {
        console.log( "@@@@@@@@@@@@@", arg.event );
        const { start, end, id, title, extendedProps, sleepGodate, sleepWudate } = arg.event
        console.log( sleepGodate , sleepWudate, start, end );
        dispatch(
            setSelected({
                type: 'EDIT',
                eventColor: extendedProps.eventColor,
                sleepGodate:extendedProps.sleepGodate,
                sleepWudate:extendedProps.sleepWudate,
                title,
                start,
                end,
                id,
            })
        )
        dispatch(openDialog())
    }

    const onSubmit = async (data, type) => {
        let newEvents = cloneDeep(events)
        let response;
        if (type === 'NEW') {
            console.log(data);
            newEvents.push(data)
            response = await axios.post('http://localhost:9000/api/sleep/save', data);
            // 여가 ㅛㅔㄹ이브
        }

        if (type === 'EDIT') {
            // ㅑㅇ기 스정
            newEvents = newEvents.map((event) => {
                if (data.id === event.id) {
                    event = data
                }
                return event
            })
        }
        dispatch(updateEvent(newEvents))
    }

    const onEventChange = (arg) => {
        console.log( "**** arg : " , arg );
        const newEvents = cloneDeep(events).map((event) => {
            if (arg.event.id === event.id) {
                const { id, extendedProps, start, end, title} = arg.event
                event = {
                    id,
                    start,
                    end,
                    title,
                    sleepGodate:extendedProps.sleepGodate,
                    sleepWudate:extendedProps.sleepWudate,
                    eventColor: extendedProps.eventColor,
                }

                console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!", event);
            }
            return event
        })
        dispatch(updateEvent(newEvents))
    }

    return (
        <Container className="h-full">
            <CalendarViewSleep
                events={events}
                eventClick={onEventClick}
                select={onCellSelect}
                editable
                selectable
                eventDrop={onEventChange}
            />
            <EventDialog submit={onSubmit} />
        </Container>
    )
}

export default SleepCalendar
