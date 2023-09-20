import { ChildrenProps } from "../../@types/task";
import { getRealm } from "../../database/realm";

export async function updateTaskTitleSubTask(taskid: string, newTitle: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const task = realm.objectForPrimaryKey<ChildrenProps>("TaskChildren", taskid);
            task!.title = newTitle;
        });
    } catch (error) {
        console.log("Erro ao atualizar o título da tarefa:", error);
    } finally {
        realm.close
    }
}

export async function updateDesciptionTitleSubTask(taskid: string, newDescription: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const task = realm.objectForPrimaryKey<ChildrenProps>("TaskChildren", taskid);
            task!.description = newDescription;
        });
    } catch (error) {
        console.log("Erro ao atualizar o descrição da tarefa:", error);
    } finally {
        realm.close
    }
}

export async function deleteSubTask(id: string){
    const realm = await getRealm()

    try {
        realm.write(() => {
            const objectToDelete = realm.objectForPrimaryKey("TaskChildren", id);
            realm.delete(objectToDelete);
        });
    } catch (e) {
        console.log(e)
    } finally {
        realm.close
    }
}