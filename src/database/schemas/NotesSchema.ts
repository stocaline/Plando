export const NotesSchema = {
    name: "Notes",
    properties: {
        _id: "string",
        title: "string",
        text: "string",
        updated_at: "date",
        created_at: "date",
    },
    
    primaryKey: "_id",
}
