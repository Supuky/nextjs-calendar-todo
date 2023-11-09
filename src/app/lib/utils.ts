import { TodoDetail } from '@/app/lib/definitions';
import { Dispatch } from 'react';

export const filterVal = ["high", "middle", "low"];

export const initialState: TodoDetail[] = [
    {
      id: 'a',
      title: 'ジム',
      start: '2023-11-03',
      priority: "high",
      category: "private"
    },
    {
      id: 'b',
      title: 'ジム',
      start: '2023-11-01',
      priority: "low",
      category: "private"
    },
    {
      id: 'd',
      title: 'ランニング',
      start: '2023-11-08',
      priority: "low",
      category: "private"
    },
    {
      id: 'f',
      title: '買い物',
      start: '2023-11-08',
      priority: "middle",
      category: "private"
    },
  ];

// 画面上のtodoを管理 reducer関数を定義
export const reducer = (state: TodoDetail[], action: {type: string, payload: TodoDetail[] }) => {
  switch (action.type) {
    case 'setHolidays':
      return [...state, ...action.payload];
    case "add": 
      return [...state, ...action.payload];
    case "delete":
      const newState = state.filter(_state => _state.id !== action.payload[0].id);
      return [...newState];
    default:
      return state;
  }
};

// createContextの初期値用オブジェクト
export type todoDispatch = Dispatch<{ type: string, payload: TodoDetail[] }>;

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

export type todoListDispatch = Dispatch<{ type: string, payload: TodoDetail }>;

// ページ全体の日にちを管理
export const dateReducer = (state: string, action: {type: string, payload: string}) => {
  switch (action.type) {
    case 'changeDate':
      return action.payload;
    default:
      return state;
  }
};

export type dateDispatch = Dispatch<{ type: string, payload: string }>;