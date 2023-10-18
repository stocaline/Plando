import { useCallback, useState, useRef, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Animated, Easing, Modal, FlatList, ProgressBarAndroidBase } from "react-native";
import { CheckBox } from "react-native-elements";
import { getRealm } from "../../database/realm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { Header } from "../../components/Header";
import { updateTask, updateTaskTitle } from "../../utils/task/TaskFunctions";
import { ChildrenProps, TaskProps } from "../../@types/task";
import { dateFormat } from "../../utils/DateFunctions";

//@ts-ignore
export default function ViewTask({ route }) {
    const { task } = route.params
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [historic, sethistoric] = useState(task.historic);
    const [taskFinishDate, setTaskFinishDate] = useState(task.finished_at);
    const [saveBTNVisibility, setSaveBTNVisibility] = useState(false);

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
                setTaskFinishDate(task!.finished_at)
            });
        } catch (error) {
            console.log("Erro ao mudar status tarefa:", error);
        }
    }

    function handleInputTitleChange(text: string) {
        if (text != "") {
            setTitle(text);
        }
        setSaveBTNVisibility(true)
    }

    function handleInputDescriptionChange(text: string) {
        setDescription(text);
        setSaveBTNVisibility(true)
    }

    useFocusEffect(useCallback(() => {
        if (task.finished_at != "") {
            setIsChecked(true)
        }

    }, []))

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: task.color }]}>
            <Header title="Tarefa" color={task.color} taskId={task._id} productId={""} />
            <View style={[styles.main, { backgroundColor: task.color }]}>

                <TextInput
                    style={styles.title}
                    value={title}
                    multiline={true}
                    scrollEnabled={false}
                    onChangeText={handleInputTitleChange}
                    maxLength={50}
                />

            </View>

            <View style={styles.container}>
                <View>
                    <View style={styles.flex}>
                        <Text style={styles.text}>Descrição:</Text>
                        <Text style={[styles.text, { opacity: .5 }]}>{task.priority}</Text>
                    </View>
                    <TextInput
                        style={[styles.text,{textAlignVertical: "top",}]}
                        multiline={true}
                        scrollEnabled={false}
                        value={description}
                        onChangeText={handleInputDescriptionChange}
                    />
                    <Text style={styles.text}>Criado em: {dateFormat(task.created_at.slice(0, 10))}</Text>
                    {taskFinishDate != "" ?
                        <Text style={styles.text}>Finalizada em {dateFormat(taskFinishDate.slice(0, 10))}</Text>
                        :
                        <Text style={styles.text}></Text>
                    }
                </View>
                <View style={[styles.btns, historic ? { opacity: .5 } : { opacity: 1 }]}>
                    <CheckBox
                        title={isChecked ? 'Concluida' : "Em Andamento"}
                        checked={isChecked}
                        onPress={() => ToggleTaskStatus(task._id)}
                        disabled={historic}
                    />
                    <TouchableOpacity style={[styles.addButton, saveBTNVisibility ? { display: "flex" } : { display: "none" }]} onPress={() => { updateTask(task._id, title, description), setSaveBTNVisibility(false) }}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    safeArea: {
        width: "100%",
        height: "100%",
    },
    container: {
        paddingHorizontal: 30,
        paddingTop: 20,
        height: "90%",
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
        fontSize: 25,
        alignSelf: "center",
        textAlign: "center",
        paddingHorizontal: 10,
    },
    text: {
        color: "#000"
    },
    btns: {
        display: 'flex',
        justifyContent: "center",
    },
    addButton: {
        backgroundColor: '#0645ad',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
});