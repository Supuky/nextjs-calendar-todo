import { TodoDetail } from '@/app/lib/definitions';

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
      // end: "2023-11-10",
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
    {
      id: 'g',
      title: '誕生日',
      start: '2023-11-18',
      priority: "middle",
      category: "private"
    },
    {
      id: 'h',
      title: 'サウナ',
      start: '2023-11-28',
      priority: "middle",
      category: "private"
    },
];