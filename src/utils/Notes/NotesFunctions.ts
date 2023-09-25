import { getRealm } from "../../database/realm";

export async function getNote(id: string) {
    const realm = await getRealm();
    const note = realm.objectForPrimaryKey("Notes", id);
    if(note){
        return note
    }
}

export async function updateNoteTitle(id: string, newTitle: string) {
    const realm = await getRealm();
    var title = newTitle
    if(newTitle == ""){
        title = "Sem Titulo"
    }
    try {
        realm.write(() => {
            const note = realm.objectForPrimaryKey("Notes", id);
            note!.title = title;
        });
    } catch (error) {
        console.log("Erro ao atualizar o título da tarefa:", error);
    } finally {
        realm.close
    }
}

export async function handleUpdateNote(id: string, newText: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const note = realm.objectForPrimaryKey("Notes", id);
            note!.text = newText;
        });
    } catch (error) {
        console.log("Erro ao atualizar o título da tarefa:", error);
    } finally {
        realm.close
    }
}

export async function deleteNote(id: string) {
    const realm = await getRealm()

    try {
        realm.write(() => {
            const objectToDelete = realm.objectForPrimaryKey("Notes", id);
            realm.delete(objectToDelete);
        });
    } catch (e) {
        console.log(e)
    } finally {
        realm.close
    }
}
