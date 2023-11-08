import { TodoDetail } from "./definitions";

export const filterVal = ["high", "middle", "low"];

export const initialState: TodoDetail[] = [
    {
        id: 'a',
        title: 'ジム',
        start: '2023-11-03',
        priority: "high"
    },
    {
        id: 'b',
        title: 'ジム',
        start: '2023-11-01',
        priority: "low"
    },
    {
        id: 'd',
        title: 'ランニング',
        start: '2023-11-08',
        priority: "low"
    },
    {
        id: 'e',
        title: 'デート',
        start: '2023-11-08',
        priority: "high"
    },
    {
        id: 'f',
        title: '買い物',
        start: '2023-11-08',
        priority: "middle"
    },
  ];

// 画面上のtodoを管理 reducer関数を定義
export const reducer = (state: TodoDetail[], action: {type: string, payload: TodoDetail[]}) => {
    switch (action.type) {
      case 'setHolidays':
          // console.log([...action.payload]);
        return [...state, ...action.payload];
      default:
        return state;
    }
};

//dispatch({ type: 'setHolidays', payload: events });

// 画面下のtodoを管理
export const todoListReducer = (state: TodoDetail[], action: {type: string, payload?: string}) => {
    switch (action.type) {
      case 'filterTodays':
        const newState = state.filter(_state => _state.start === new Date().toISOString().split("T")[0]);
        return [...newState];
      default:
        return state;
    }
};