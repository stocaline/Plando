export const TaskChildrenSchema = {
    name: "TaskChildren",
    properties: {
        _id: "string",
        title: "string",
        description: "string",
        color: "string",
        priority: "string",
        created_at: "date",
        deadline: "string",
        finished_at: "string",
    },
    
    primaryKey: "_id",
}

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
        super: "bool",
        children: { type: "list", objectType: "TaskChildren" },
    },
    
    primaryKey: "_id",
}



