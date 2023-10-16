import { Animated, Easing, StatusBar, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from 'react';
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteTask } from '../../../utils/task/TaskFunctions';
import { ChildrenProps } from '../../../@types/task';
import uuid from "react-native-uuid"
import { getRealm } from '../../../database/realm';
import { TaskBuilder } from '../../../utils/task/Builder';

type Props = {
    title: string
    taskId: string;
    color: string;
}

export default function BtnActionTask({ title, taskId, color }: Props) {

    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [input, setInput] = useState("");
    const [modalAddvisible, setModalAddvisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current

    const options = [
        {
            title: "Excluir",
            color: "red",
            action: () => handleTaskDelete()
        },
        {
            title: "+ Tarefa",
            color: "#0645ad",
            action: () => setModalAddvisible(true)
        }
    ]

    function handleInputChange(text: string) {
        setInput(text);
    }

    function handleAddSubTask() {
        if (input != "") {
            var children: ChildrenProps = {
                _id: uuid.v4(),
                title: input,
                description: "",
                color: color,
                priority: "Normal",
                deadline: "",
                finished_at: "",
                created_at: new Date(),
            }
            addSubTask(children)
        }
    }

    async function addSubTask(children: ChildrenProps) {
        const realm = await getRealm();

        try {
            const task = realm.objectForPrimaryKey("Task", taskId);
            if (task!.historic == false) {
                realm.write(() => {
                    task!.super = true
                    //@ts-ignore
                    task.children.push(children);
                });
                setInput("")
                setModalAddvisible(false)
                if (title == "Tarefa") {
                    //@ts-ignore
                    navigation.navigate("ViewSuperTask", { task: TaskBuilder(task) });
                }
            } else {
                setInput("")
                setModalAddvisible(false)
                Alert.alert(
                    'Não é possivel adicionar tarefa',
                    'Tarefas que já foram arquivadas não podem ser modificadas',
                    [
                        {
                            text: 'OK',
                            onPress: () => { },
                        },
                    ],
                    { cancelable: true }
                );

            }

        } catch (error) {
            console.log("Message error:", error);
        }
    }

    async function handleTaskDelete() {
        await deleteTask(taskId)
        navigation.goBack()
    }

    function resizeBox(to: number) {
        to === 1 && setVisible(true)
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 200,
            easing: Easing.linear
        }).start(() => to === 0 && setVisible(false))
    }

    return (<>
        <TouchableOpacity
            style={styles.button}
            onPress={() => resizeBox(1)}
        >
            <Icon
                name='more-vertical'
                color={"#fff"}
                size={20}
            />
        </TouchableOpacity>
        <Modal transparent visible={visible}>
            <SafeAreaView
                style={{ flex: 1 }}
                onTouchStart={() => resizeBox(0)}
            >
                <Animated.View
                    style={[
                        styles.popup,
                        { opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) },
                        {
                            transform: [{ scale }],
                        },
                    ]}
                >
                    {options.map((op, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.option, { borderBottomWidth: i === options.length - 1 ? 0 : 1 }]}
                            onPress={op.action}
                        >
                            <Text style={{ color: op.color }}>{op.title}</Text>
                        </TouchableOpacity>
                    ))

                    }
                </Animated.View>
            </SafeAreaView>
        </Modal>
        <Modal transparent visible={modalAddvisible}>
            <SafeAreaView
                style={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, .5)" }}
            >
                <View style={styles.popupAddTask}>
                    <View>
                        <View style={styles.label}>
                            <Text style={{ color: "#000" }}>Nome da nova tarefa:</Text>
                            <TouchableOpacity onPress={() => setModalAddvisible(false)}>
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
                        />
                    </View>
                    <TouchableOpacity onPress={handleAddSubTask} style={styles.addButton}>
                        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    </>
    )
}
