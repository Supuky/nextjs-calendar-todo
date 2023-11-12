"use client"
import { createContext, useContext, useReducer } from "react";
import { initialState } from "../lib/utils";
import { todoListDispatch } from "../lib/definitions";
import { TodoDetail } from "../lib/definitions";


const TodoListContext = createContext<TodoDetail[]>([]);
const TodoListDispatchContext = createContext<todoListDispatch>(() => {});

// 画面下のtodoを管理
export const todoListReducer = (state: TodoDetail[], action: {type: string, payload: TodoDetail}) => {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      case "add/update":
        const updateState = state.filter(_state => _state.id !== action.payload.id);
        return [...updateState, action.payload]
      case "delete":
        const newState = state.filter(_state => _state.id !== action.payload.id);
        return [...newState];
      default:
        return state;
    }
};

const TodoListProvider = ({ children }: { children: React.ReactNode }) => {
    // useReducerフックを使用してstateとdispatch関数を取得
    const [todoLists, dispatch] = useReducer(todoListReducer, initialState);

    return (
        <TodoListContext.Provider value={todoLists}>
            <TodoListDispatchContext.Provider value={dispatch} >
                {children}
            </TodoListDispatchContext.Provider>
        </TodoListContext.Provider>
    )
}

// コンポーネントで値やdispatchを使用したいとき
const useTodoListContext = () => useContext(TodoListContext);
const useTodoListDispatchContext = () => useContext(TodoListDispatchContext);

export { TodoListProvider, useTodoListContext, useTodoListDispatchContext }