"use client";
import FullCalendar from '@fullcalendar/react';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import Filter from '../filter';
import { filterVal } from '@/app/lib/utils';
import { TodoDetail } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import { useTodoContext, useTodoDispatchContext } from '@/app/context/todoContext';
import { useDateDispatchContext } from '@/app/context/dateContext';

export default function Calendar() {
    const [priorityFilter, setPriorityFilter] = useState("All");
    const events = useTodoContext();
    const todoDispatch = useTodoDispatchContext();
    const dayDispatch = useDateDispatchContext();

    useEffect(() => {
        const getHolidays = async () => {
          try {
            const response = await fetch("https://holidays-jp.github.io/api/v1/date.json");
            const data= await response.json();
            const events: TodoDetail[] = [];
            // data: {2023-01-01: "元日"}の形式で渡ってくるので、[{ title: "元日", date: "2023-01-01", display: "background" }] の形式に変換する
            for (const [key, value] of Object.entries(data)) {
              events.push({ title: value as string, date: key, display: 'background'});
            }
            // reducerを使って状態を更新
            todoDispatch({ type: 'setHolidays', payload: events });
          } catch (error) {
            console.error('Error fetching holidays data:', error);
          }
        };
        getHolidays();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dateClick = (info: DateClickArg) => {
      console.log(info.dateStr);
      dayDispatch({ type: "changeDate", payload: info.dateStr })
    }
    
    // const getDragStop = (info: any) => {
    //   console.log(info);
    // }

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>Calender</h2>
                <Filter filterList={filterVal} filterName='priority' priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter} />
            </div>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                locale="ja"
                headerToolbar={{start: "prev,next,today", center: "title", end: "dayGridMonth,timeGridWeek"}}
                events={events}
                height={"auto"}
                businessHours={true}
                selectable={true}
                // editable={true}
                // droppable={true} 
                // eventDragStop={getDragStop}
                dateClick={dateClick}
            />
        </div>
    )
}