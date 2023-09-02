import { useCallback, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
import { getRealm } from "../../database/realm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

type TaskProps = {
    _id: string;
    title: string;
    description: string,
    color: string,
    priority: string,
    finished_at: string,
    created_at: Date,
}

//@ts-ignore
export default function ViewTask({ route }) {
    const navigation = useNavigation();
    const { task } = route.params
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState(task.title);

    async function ToggleTaskStatus(idTask: string): Promise<void> {
        const realm = await getRealm();
        try {
            realm.write(() => {
                const task = realm.objectForPrimaryKey<TaskProps>("Task", idTask);
                if (task!.finished_at == "") {
                    task!.finished_at = new Date().toISOString().slice(0, 10);
                } else {
                    task!.finished_at = ""
                }
                setIsChecked(!isChecked)
            });
        } catch (error) {
            console.log("Erro ao mudar status tarefa:", error);
        }
    }

    async function handleDeleteTask(idTask: string) {
        const realm = await getRealm()

        try {
            realm.write(() => {
                const objectToDelete = realm.objectForPrimaryKey("Task", idTask);
                realm.delete(objectToDelete);
            });
            navigation.goBack()
        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    async function updateTaskTitle(taskid: string, newTitle: string) {
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

    function handleInputChange(text: string) {
        setTitle(text);
    }

    function dateFormat(date: string) {
        const year = date.slice(0, 4)
        const mouth = date.slice(5, 7)
        const day = date.slice(8, 10)
        const dateFormated = `${day}/${mouth}/${year}`
        return dateFormated
    }

    useFocusEffect(useCallback(() => {
        if (task.finished_at != "") {
            setIsChecked(true)
        }
    }, []))

    return (
        <SafeAreaView>
            <View style={[styles.main, { backgroundColor: task.color }]}>

                <TextInput
                    style={styles.title}
                    value={title}
                    onChangeText={handleInputChange}
                    onSubmitEditing={() => updateTaskTitle(task._id, title)}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Desrição: {task.description}</Text>
                <Text style={styles.text}>Prioridade: {task.priority}</Text>
                <Text style={styles.text}>Criado em: {dateFormat(task.created_at.slice(0, 10))}</Text>
                {task.finished_at != "" ?
                    <Text style={styles.text}>Está tarefa foi finalizada em {dateFormat(task.finished_at.slice(0, 10))}</Text>
                    :
                    <Text style={styles.text}>Está tarefa ainda não foi finalizada</Text>
                }
            </View>
            <View style={styles.btns}>
                <CheckBox
                    title={isChecked ? 'Concluida' : "Em Andamento"}
                    checked={isChecked}
                    onPress={() => ToggleTaskStatus(task._id)}
                />
                <TouchableOpacity
                    style={styles.btnDelete}
                    onPress={() => handleDeleteTask(task._id)}
                >
                    <Icon
                        name='trash-2'
                        color={"#fff"}
                        size={20}
                    />
                    
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    main: {
        display: "flex",
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 30,
    },
    text: {
        color: "#000"
    },
    textWhite: {
        color: "#fff"
    },
    btns: {
        display: 'flex',
        justifyContent: "center",
    },
    btnDelete: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#e60000",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        width: "10%",
    },

});