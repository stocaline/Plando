import { TaskProps } from "../../@types/task";
import { getRealm } from "../../database/realm";

export function orderTasks(tasks: TaskProps[]) {
    if (tasks) {
        var taskPriority1: TaskProps[] = []
        var taskPriority2: TaskProps[] = []
        var taskPriority3: TaskProps[] = []
        var taskFinished: TaskProps[] = []
        tasks.forEach(task => {
            if (task.finished_at == "") {
                if (task.priority == "Urgente") {
                    taskPriority1.push(task)
                } else if (task.priority == "Normal") {
                    taskPriority2.push(task)
                } else {
                    taskPriority3.push(task)
                }
            } else {
                taskFinished.unshift(task)
            }
        })
        //var TotalTasksAmount = taskPriority1.length + taskPriority2.length + taskPriority3.length
        var orderedTasks = taskPriority1.concat(taskPriority2, taskPriority3, taskFinished);
        return orderedTasks
    }
}

export async function getTask(taskId: string) {
    const realm = await getRealm();
    const task = realm.objectForPrimaryKey("Task", taskId);
    return task
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
    } finally {
        realm.close
    }
}

export async function changeTaskToNormal(taskid: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const task = realm.objectForPrimaryKey<TaskProps>("Task", taskid);
            task!.super = false;
        });
    } catch (error) {
        console.log("Erro ao atualizar o título da tarefa:", error);
    } finally {
        realm.close
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
    } finally {
        realm.close
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