"use client"
import { createContext, useContext, useReducer } from "react";
import { dateDispatch } from "../lib/definitions";

const today = new Date().toISOString().split("T")[0];
const dateContext = createContext(today);
const dateDispatchContext = createContext<dateDispatch>(() => {});

// ページ全体の日にちを管理
export const dateReducer = (state: string, action: {type: string, payload: string}) => {
    switch (action.type) {
      case 'changeDate':
        return action.payload;
      default:
        return state;
    }
};

const DateProvider = ({ children }: { children: React.ReactNode }) => {
    // useReducerフックを使用してstateとdispatch関数を取得
    const [dateState, dispatch] = useReducer(dateReducer, today);

    return (
        <dateContext.Provider value={dateState}>
            <dateDispatchContext.Provider value={dispatch} >
                {children}
            </dateDispatchContext.Provider>
        </dateContext.Provider>
    )
}

// コンポーネントで値やdispatchを使用したいとき
const useDateContext = () => useContext(dateContext);
const useDateDispatchContext = () => useContext(dateDispatchContext);

export { DateProvider, useDateContext, useDateDispatchContext }