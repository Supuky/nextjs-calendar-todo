// todoContextを管理 (todoリストのみのステートを持っておいた方がいいかも)
import { createContext, useContext, useReducer } from "react";
import { initialState, todoListReducer } from "../lib/utils";

// ↓anyはやめておきたい
const TodoListContext = createContext<any>([{}]);
const TodoListDispatchContext = createContext<any>({});

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