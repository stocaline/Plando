import { useCallback, useState, useRef, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Animated, Easing, Modal, FlatList, ProgressBarAndroidBase } from "react-native";
import { CheckBox } from "react-native-elements";
import { getRealm } from "../../database/realm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { Header } from "../../components/Header";
import { updateDesciptionTitle, updateTaskTitle } from "../../utils/task/TaskFunctions";
import { ChildrenProps, TaskProps } from "../../@types/task";
import { deleteSubTask, updateTaskTitleSubTask } from "../../utils/task/SubTaskFunctions";
import { dateFormat } from "../../utils/data";

//@ts-ignore
export default function ViewTask({ route }) {
    const navigation = useNavigation();
    const { task } = route.params
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [historic, sethistoric] = useState(task.historic);
    const [taskFinishDate, setTaskFinishDate] = useState(task.finished_at);

    async function verifyIfIsSuper() {
        const realm = await getRealm()

        try {
            const isTaskSuper = realm.objectForPrimaryKey<TaskProps>("Task", task._id)?.super;
            console.log(isTaskSuper)
            if(isTaskSuper){
                //@ts-ignore
                navigation.navigate("ViewSuperTask", { task: task });
            }
        } catch (e) {
            console.log(e)
        }
    }


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
    }

    function handleInputDescriptionChange(text: string) {
        setDescription(text);
    }

    useFocusEffect(useCallback(() => {
        if (task.finished_at != "") {
            setIsChecked(true)
        }

    },[]))

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: task.color }]}>
            <Header title="Tarefa" color={task.color} taskId={task._id} />
            <View style={[styles.main, { backgroundColor: task.color }]}>

                <TextInput
                    style={styles.title}
                    value={title}
                    onChangeText={handleInputTitleChange}
                    onSubmitEditing={() => updateTaskTitle(task._id, title)}
                    maxLength={30}
                />

            </View>

            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Descrição:</Text>
                    <TextInput
                        style={styles.text}
                        multiline={true}
                        numberOfLines={4}
                        value={description}
                        onChangeText={handleInputDescriptionChange}
                        onSubmitEditing={() => updateDesciptionTitle(task._id, description)}
                        onPressOut={() => updateDesciptionTitle(task._id, description)}
                    />
                    <Text style={styles.text}>Prioridade: {task.priority}</Text>
                    <Text style={styles.text}>Criado em: {dateFormat(task.created_at.slice(0, 10))}</Text>
                    {taskFinishDate != "" ?
                        <Text style={styles.text}>Está tarefa foi finalizada em {dateFormat(taskFinishDate.slice(0, 10))}</Text>
                        :
                        <Text style={styles.text}>Está tarefa ainda não foi finalizada</Text>
                    }
                </View>
                <View style={[styles.btns, historic ? { opacity: .5 } : { opacity: 1 }]}>
                <CheckBox
                    title={isChecked ? 'Concluida' : "Em Andamento"}
                    checked={isChecked}
                    onPress={() => ToggleTaskStatus(task._id)}
                    disabled={historic}
                />
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
        paddingHorizontal: 20,
        height: "90%",
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
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
    },
    text: {
        color: "#000"
    },
    textWhite: {
        color: "#fff"
    },
    containerConfig: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
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
        width: "100%",
    },
    button: {
        height: 80,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        padding: 24,
        gap: 10,
    },
    footer: {
        flex: 1
    },
    progressBar: {
        width: "100%",
        height: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 25,
        overflow: "hidden",
    },
    containerCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    containerStatusDone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        opacity: 0.5,
    },
    content: {
        display: 'flex',
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tag: {
        height: "100%",
        width: 10,
    },
    cardName: {
        marginLeft: "10%",
    },
    btnCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    popupEditTask: {
        flex: 1,
        width: "80%",
        borderRadius: 8,
        borderColor: "#333",
        padding: 10,
        position: "absolute",
        alignSelf: 'center',
        gap: 20,
        backgroundColor: "white",
        zIndex: 100,
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#303030",
        borderRadius: 10,
        color: "#000",
    },
    editBtn: {
        backgroundColor: '#0645ad',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    deleteBtn: {
        backgroundColor: 'crimson',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
});