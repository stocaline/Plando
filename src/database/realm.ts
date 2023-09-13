import Realm from "realm";
import { TaskSchema, TaskChildrenSchema } from "./schemas/TaskSchema"

export const getRealm = async () => await Realm.open({
    path: "taskcrafter-app",
    schema: [TaskSchema, TaskChildrenSchema],
    schemaVersion: 2,
})