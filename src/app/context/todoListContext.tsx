// todoContextを管理 (todoリストのみのステートを持っておいた方がいいかも)
import { createContext, useContext, useReducer } from "react";
import { initialState, todoListDispatch, todoListReducer } from "../lib/utils";
import { TodoDetail } from "../lib/definitions";


const TodoListContext = createContext<TodoDetail[]>([]);
const TodoListDispatchContext = createContext<todoListDispatch>(() => {});

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