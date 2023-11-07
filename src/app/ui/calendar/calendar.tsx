"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import Filter from '../filter';
import { filterVal } from '@/app/lib/utils';
import { useEffect, useState } from 'react';


export default function Calendar() {
    const [holidays, setHolidays] = useState<{}[]>([]);

    useEffect(() => {
        const getHolidays = async () => {
            const response = await fetch("https://holidays-jp.github.io/api/v1/date.json");
            const data = await response.json();
            // console.log(Object.entries(data));
            const events = [];
            for(const [key, value] of Object.entries(data)) {
                events.push({title: value, date: key,  display: 'background'})
            }
            setHolidays(events);
        }
        getHolidays();
    }, []);

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>Calender</h2>
                <Filter filterList={filterVal} filterName='priority' />
            </div>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="dayGridMonth"
                locale="ja"
                headerToolbar={{start: "prev,next, today", center: "title", end: "dayGridMonth,timeGridWeek"}}
                events={holidays}
                height={"auto"}
                businessHours={true}
            />
        </div>
    )
}