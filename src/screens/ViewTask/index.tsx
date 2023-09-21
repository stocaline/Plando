import { useCallback, useState, useRef, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Animated, Easing, Modal, FlatList, ProgressBarAndroidBase } from "react-native";
import { CheckBox } from "react-native-elements";
import { getRealm } from "../../database/realm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { Header } from "../../components/Header";
import { updateDesciptionTitle, updateTaskTitle } from "../../utils/task/TaskFunctions";
import { ChildrenProps, TaskProps } from "../../@types/task";
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
    btns: {
        display: 'flex',
        justifyContent: "center",
    },
});