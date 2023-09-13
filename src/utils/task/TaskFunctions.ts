import { getRealm } from "../../database/realm";

type TaskProps = {
    _id: string;
    title: string;
    description: string,
    color: string,
    priority: string,
    finished_at: string,
    created_at: Date,
}

export async function updateTaskTitle(taskid: string, newTitle: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const task = realm.objectForPrimaryKey<TaskProps>("Task", taskid);
            task!.title = newTitle;
        });
    } catch (error) {
        console.log("Erro ao atualizar o título da tarefa:", error);
    }
}

export async function updateDesciptionTitle(taskid: string, newDescription: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const task = realm.objectForPrimaryKey<TaskProps>("Task", taskid);
            task!.description = newDescription;
        });
    } catch (error) {
        console.log("Erro ao atualizar o descrição da tarefa:", error);
    }
}

export async function deleteTask(id: string){
    const realm = await getRealm()

    try {
        realm.write(() => {
            const objectToDelete = realm.objectForPrimaryKey("Task", id);
            realm.delete(objectToDelete);
        });
    } catch (e) {
        console.log(e)
    } finally {
        realm.close
    }
}