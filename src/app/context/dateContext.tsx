// todoContextを管理 (todoリストのみのステートを持っておいた方がいいかも)
import { createContext, useContext, useReducer } from "react";
import { dateReducer } from "../lib/utils";

const today = new Date().toISOString().split("T")[0];

// ↓anyはやめておきたい
const dateContext = createContext(today);
const dateDispatchContext = createContext<any>({});

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