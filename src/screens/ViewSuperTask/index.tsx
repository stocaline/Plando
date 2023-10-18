import { useCallback, useState, useRef, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Animated, Easing, Modal, FlatList, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { getRealm } from "../../database/realm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { Header } from "../../components/Header";
import { changeTaskToNormal, updateTask, updateTaskTitle } from "../../utils/task/TaskFunctions";
import { ChildrenProps, TaskProps } from "../../@types/task";
import { CalculateTaskPercent } from "../../utils/task/CalculateTaskPercent";
//@ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { deleteSubTask, updateTaskTitleSubTask } from "../../utils/task/SubTaskFunctions";
import { dateFormat } from "../../utils/DateFunctions";

//@ts-ignore
export default function ViewSuperTask({ route }) {
    const navigation = useNavigation();
    const { task } = route.params
    const [isChecked, setIsChecked] = useState(false);
    const [modalEditvisible, setModalEditvisible] = useState(false);
    const [input, setInput] = useState("");
    const [idEditSubTask, setIdEditSubTask] = useState("");
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [taskChildren, setTaskChildren] = useState(task.children)
    const [taskProgress, setTaskProgress] = useState(0)
    const [taskFinishDate, setTaskFinishDate] = useState(task.finished_at);
    const [saveBTNVisibility, setSaveBTNVisibility] = useState(false);

    async function getChildrenTask() {
        const realm = await getRealm()

        try {
            const childrens = realm.objectForPrimaryKey<TaskProps>("Task", task._id)?.children;
            //@ts-ignore
            setTaskChildren(childrens)
            //@ts-ignore
            markTaskAsCompleted(childrens)
            if (childrens?.length == 0) {
                changeTaskToNormal(task._id)
                //@ts-ignore
                navigation.navigate("ViewTask", { task: task });
            }

        } catch (e) {
            console.log(e)
        }
    }

    async function setFinishedData(idTask: string, status: boolean): Promise<void> {
        const realm = await getRealm();
        if (status == true) {
            try {
                realm.write(() => {
                    const task = realm.objectForPrimaryKey<TaskProps>("Task", idTask);
                    task!.finished_at = new Date().toISOString().slice(0, 10);

                    setTaskFinishDate(task!.finished_at)
                });
            } catch (error) {
                console.log("Erro ao mudar status tarefa:", error);
            }
        } else if (status == false) {
            try {
                realm.write(() => {
                    const task = realm.objectForPrimaryKey<TaskProps>("Task", idTask);
                    task!.finished_at = ""
                    setTaskFinishDate(task!.finished_at)
                });
            } catch (error) {
                console.log("Erro ao mudar status tarefa:", error);
            }
        }
    }

    async function ToggleSubTaskStatus(idTask: string) {
        const realm = await getRealm();
        try {
            realm.write(() => {
                const task = realm.objectForPrimaryKey<ChildrenProps>("TaskChildren", idTask);
                if (task!.finished_at == "") {
                    task!.finished_at = new Date().toISOString().slice(0, 10);
                } else {
                    task!.finished_at = ""
                }
                setIsChecked(!isChecked)
                getChildrenTask()
            });
        } catch (error) {
            console.log("Erro ao mudar status tarefa:", error);
        }
    }

    function markTaskAsCompleted(childrens: ChildrenProps[]) {
        var value = CalculateTaskPercent(childrens)
        setTaskProgress(value)
    }

    function footerSuper() {
        return (
            <View style={styles.footer}>
                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <ProgressBar
                        progress={taskProgress}
                        width={300}
                        height={10}
                        color={task.color}
                    />
                </View>
                <FlatList
                    data={taskChildren}
                    keyExtractor={item => item._id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) =>
                        <View style={item.finished_at == "" ? styles.containerCard : styles.containerStatusDone}>
                            <View style={styles.content}>
                                <View style={styles.cardName}>
                                    <Text style={{ color: item.color, fontWeight: "600" }}>{item.title}</Text>
                                </View>
                                <View style={styles.btnCard}>
                                    <TouchableOpacity onPress={() => { setIdEditSubTask(item._id), setInput(item.title), setModalEditvisible(true) }}>
                                        <Icon
                                            name='edit-3'
                                            color={item.color}
                                            size={18}
                                        />
                                    </TouchableOpacity>
                                    <CheckBox
                                        checked={item.finished_at == "" ? false : true}
                                        onPress={() => ToggleSubTaskStatus(item._id)}
                                        disabled={task.historic}
                                    />
                                </View>
                            </View>
                        </View>
                    }
                />
            </View>
        )
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

    function handleInputChange(text: string) {
        setInput(text);
    }

    function handleDeleteSubTask() {
        deleteSubTask(idEditSubTask)
    }

    useFocusEffect(useCallback(() => {
        if (taskProgress == 1) {
            setFinishedData(task._id, true)
        } else {
            setFinishedData(task._id, false)
        }

        getChildrenTask()
    }, [modalEditvisible, taskProgress]))

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: task.color }]}>
            <Header title="Super Tarefa" color={task.color} taskId={task._id} productId={""} />

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
                        style={[styles.text, { textAlignVertical: "top", }]}
                        multiline={true}
                        scrollEnabled={false}
                        value={description}
                        onChangeText={handleInputDescriptionChange}
                    />
                    <Text style={styles.text}>Criado em: {dateFormat(task.created_at.slice(0, 10))}</Text>
                    {taskFinishDate != "" ?
                        <Text style={styles.text}>Está tarefa foi finalizada em {dateFormat(taskFinishDate.slice(0, 10))}</Text>
                        :
                        <Text style={styles.text}></Text>
                    }
                    <TouchableOpacity style={[styles.addButton, saveBTNVisibility ? { display: "flex" } : { display: "none" }]} onPress={() => { updateTask(task._id, title, description), setSaveBTNVisibility(false) }}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                <Modal transparent visible={modalEditvisible}>
                    <SafeAreaView
                        style={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, .5)" }}
                    >
                        <View style={styles.popupEditTask}>
                            <View>
                                <View style={styles.label}>
                                    <Text style={{ color: "#000" }}>Digite o novo nome para tarefa:</Text>
                                    <TouchableOpacity onPress={() => setModalEditvisible(false)}>
                                        <Icon
                                            name='x'
                                            color={"crimson"}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={input}
                                    onChangeText={handleInputChange}
                                    maxLength={30}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { updateTaskTitleSubTask(idEditSubTask, input), setModalEditvisible(false) }} style={styles.editBtn}>
                                <Text style={styles.btnText}>Editar Tarefa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { handleDeleteSubTask(), setModalEditvisible(false) }} style={styles.deleteBtn}>
                                <Text style={styles.btnText}>Excluir Tarefa</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
                {footerSuper()}
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
        width: '100%',
        marginTop: 20,
    },
    listContent: {
        marginTop: 20,
        gap: 10,
    },
    footer: {
        height: "50%"
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