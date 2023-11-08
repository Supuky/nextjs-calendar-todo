// todoContextを管理 (todoリストのみのステートを持っておいた方がいいかも)
import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../lib/utils";

// ↓anyはやめておきたい
const TodoContext = createContext<any>([{}]);
const TodoDispatchContext = createContext<any>({});

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    // useReducerフックを使用してstateとdispatch関数を取得
    const [events, dispatch] = useReducer(reducer, initialState);

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