"use client";
import FullCalendar from "@fullcalendar/react";
// import useSWR from "swr";
import CalendarSkeleton from "../skeleton";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import Filter from "../filter";
import { filterVal } from "@/app/lib/utils";
import { TodoDetail } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import {
  useTodoContext,
  useTodoDispatchContext,
} from "@/app/context/todoContext";
import { useDateDispatchContext } from "@/app/context/dateContext";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";
import { useTodoListDispatchContext } from "@/app/context/todoListContext";


export default function Calendar() {
  const router = useRouter();
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [priorityTodo, setPriorityTodo] = useState<TodoDetail[]>([]);
  const [fetchData, setFetchData] = useState<{}[] | null>(null);
  const events = useTodoContext();
  const todoDispatch = useTodoDispatchContext();
  const todoListDispatch = useTodoListDispatchContext();
  const dayDispatch = useDateDispatchContext();

  useEffect(() => {
    const getHolidays = async () => {
      try {
        const response = await fetch(
          "https://holidays-jp.github.io/api/v1/date.json"
        );
        const data = await response.json();
        const fetchData = setFetchData(data);
        const events: TodoDetail[] = [];
        // data: {2023-01-01: "元日"}の形式で渡ってくるので、[{ title: "元日", date: "2023-01-01", display: "background" }] の形式に変換する
        for (const [key, value] of Object.entries(data)) {
          events.push({
            title: value as string,
            date: key,
            display: "background",
            backgroundColor: "#fffb00",
          });
        }
        // reducerを使って状態を更新
        todoDispatch({ type: "setHolidays", payload: events });
      } catch (error) {
        console.error("Error fetching holidays data:", error);
      }
    };
    getHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filteredTodos: TodoDetail[];
    if(priorityFilter !== "All") {
      filteredTodos = events.filter((todo: TodoDetail) => todo.date || todo.priority === priorityFilter);
    } else {
      filteredTodos = events;
    }
    setPriorityTodo(filteredTodos);
  }, [priorityFilter, events])

  const dateClick = (info: DateClickArg) => {
    dayDispatch({ type: "changeDate", payload: info.dateStr });
  };

  const eventClick = (info: EventClickArg) => {
    router.push(`/todos/${info.event.id}/edit`);
  };

  // const getEventDrop = (info: EventDropArg) => {
  const getEventDrop = (info: any) => {
    // console.log(info.event.extendedProps);
    const { title } = info.event;
    const { id } = info.event;
    const start = info.event._instance.range.start.toISOString().split("T")[0];
    const { category } = info.event.extendedProps;
    const { priority } = info.event.extendedProps;
    todoDispatch({ type: "add/update", payload: [{title: title, id: id, start: start, category: category, priority: priority}] });

    todoListDispatch({ type: "add/update", payload: {title: title, id: id, start: start, category: category, priority: priority} });
  }

  // const getEventRisizeStop = (info: any) => {
  //   console.log(info)
  // }

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center sm:mb-6 mb-3">
        <h2 className="sm:text-xl font-bold">Calender</h2>
        <Filter
          filterList={filterVal}
          filterName="priority"
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </div>
      {
        fetchData ? 
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          titleFormat={{ month: 'long' }  }
          headerToolbar={{
            // start: "prev,next,today",
            // center: "title",
            // end: "dayGridMonth,timeGridWeek",
            start: "prev",
            center: "title",
            end: "next"
          }}
          events={priorityTodo}
          height={"auto"}
          // aspectRatio={0.8}
          businessHours={true}
          selectable={true}
          dateClick={dateClick}
          eventClick={eventClick}
          editable={true}
          droppable={true}
          eventDrop={getEventDrop}
          // eventResizeStop={getEventRisizeStop}
        /> 
        :
        <CalendarSkeleton />
    }
    </div>
  );
}
