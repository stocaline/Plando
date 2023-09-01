export const TaskSchema = {
    name: "Task",
    properties: {
        _id: "string",
        title: "string",
        description: "string",
        color: "string",
        priority: "string",
        created_at: "date",
        deadline: "string",
        finished_at: "string",
        historic: "bool",
    },
    
    primaryKey: "_id",
}

