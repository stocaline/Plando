export type TaskProps = {
    _id: string;
    title: string;
    description: string,
    color: string,
    priority: string,
    super: Boolean,
    historic: Boolean
    finished_at: string,
    children: ChildrenProps[]
    created_at: Date,
}

export type ChildrenProps = {
    _id: any;
    title: string;
    description: string,
    color: string,
    priority: string,
    deadline: string,
    finished_at: string,
    created_at: string,
}