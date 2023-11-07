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
        id: 'c',
        title: '買い物',
        start: '2023-11-01',
        priority: "middle"
    },
  ];

// reducer関数を定義
export const reducer = (state: TodoDetail[], action: {type: string, payload: TodoDetail[]}) => {
    switch (action.type) {
      case 'setHolidays':
          // console.log([...action.payload]);
        return [...state, ...action.payload];
      default:
        return state;
    }
};

export const eventFilter = (allEvents: TodoDetail[]) => {
    return allEvents.filter(event => event.id !== undefined);
}