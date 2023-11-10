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