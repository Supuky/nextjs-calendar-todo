"use client"
// todoContextを管理 (カレンダーの方)
import { createContext, useContext, useReducer } from "react";
import { initialState } from "../lib/utils";
import { todoDispatch } from "../lib/definitions";
import { TodoDetail } from "../lib/definitions";

const TodoContext = createContext<TodoDetail[]>([]);
const TodoDispatchContext = createContext<todoDispatch>(() => {});

const todoReducer = (state: TodoDetail[], action: {type: string, payload: TodoDetail[] }) => {
    switch (action.type) {
      case 'setHolidays':
        let mergedArray = Array.from(new Set([...state, ...action.payload].map(item => JSON.stringify(item)))).map(item => JSON.parse(item) as TodoDetail);
        return [...mergedArray];
      case "add": 
        return [...state, ...action.payload];
      case "add/update": 
        const updateState = state.filter(_state => _state.id !== action.payload[0].id);
        return [...updateState, ...action.payload];
      case "delete":
        const newState = state.filter(_state => _state.id !== action.payload[0].id);
        return [...newState];
      default:
        return state;
    }
};

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    // useReducerフックを使用してstateとdispatch関数を取得
    const [events, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider value={events}>
            <TodoDispatchContext.Provider value={dispatch} >
                {children}
            </TodoDispatchContext.Provider>
        </TodoContext.Provider>
    )
}

// コンポーネントで値やdispatchを使用したいとき
const useTodoContext = () => useContext(TodoContext);
const useTodoDispatchContext = () => useContext(TodoDispatchContext);

export { TodoProvider, useTodoContext, useTodoDispatchContext }