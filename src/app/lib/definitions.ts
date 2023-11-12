import { Dispatch } from "react";

// export type FilterList = ["hight", "middle", "low"];
export type FilterList = string[];

export type TodoDetail = {
    title: string,
    date?: string,
    id?: string,
    start?: string,  // Date?
    end?: string,
    category?: string,
    priority?: "high" | "middle" | "low",
    display?: string,
    backgroundColor?: string
}

// createContextの初期値用オブジェクト
export type todoDispatch = Dispatch<{ type: string, payload: TodoDetail[] }>;
export type todoListDispatch = Dispatch<{ type: string, payload: TodoDetail }>;
export type dateDispatch = Dispatch<{ type: string, payload: string }>;
