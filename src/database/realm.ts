import Realm from "realm";
import { TaskSchema, TaskChildrenSchema } from "./schemas/TaskSchema"
import { ProductsSchema } from "./schemas/ProductsSchema"
import { NotesSchema } from "./schemas/NotesSchema"

export const getRealm = async () => await Realm.open({
    path: "taskcrafter-app",
    schema: [TaskSchema, TaskChildrenSchema, ProductsSchema, NotesSchema],
    schemaVersion: 3,
})