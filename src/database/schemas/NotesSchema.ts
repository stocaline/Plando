export const NotesSchema = {
    name: "Notes",
    properties: {
        _id: "string",
        title: "string",
        text: "string",
        created_at: "date",
    },
    
    primaryKey: "_id",
}
