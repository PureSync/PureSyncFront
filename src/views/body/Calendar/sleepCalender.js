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
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

injectReducer('sleepCalendar', reducer)

const SleepCalendar = () => {
    const dispatch = useDispatch();
    const access_token = getHeaderCookie();
    let parse_token = parseJwt(access_token);
    let { memId } = getMemInfoFromToken(parse_token);

    
    let events = useSelector((state) => state.sleepCalendar.data.eventList.data);
    if( events == undefined)
        events = [];
    else 
        events = events.sleepList;
    
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
        const { start, end, id, title, extendedProps, sleepGodate, sleepWudate } = arg.event
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
            // response = await axios.post('http://localhost:9000/api/sleep/save', data, {
            //     headers: {
            //       'Content-Type': 'application/json',
            //       Authorization: `Bearer ${access_token}`
            //     }
            //   });
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
