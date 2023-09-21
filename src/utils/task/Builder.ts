import { ChildrenProps, TaskProps } from "../../@types/task"

export function TaskBuilder(data: TaskProps) {
    const task = {
        _id: data._id,
        title: data.title,
        description: data.description,
        color: data.color,
        super: data.super,
        children: SubTaskBuilder(data.children),
        historic: data.historic,
        priority: data.priority,
        finished_at: data.finished_at,
        created_at: data.created_at.toISOString()
    }
    return task
}

export function SubTaskBuilder(data: ChildrenProps[]) {
    //@ts-ignore
    var subTaskList: any = []
    
    data.forEach(subtask => {
        const subTask = {
            _id: subtask._id,
            title: subtask.title,
            description: subtask.description,
            color: subtask.color,
            priority: subtask.priority,
            finished_at: subtask.finished_at,
            created_at: subtask.created_at.toISOString()
        }
        subTaskList.push(subTask)
    })
    return subTaskList
}