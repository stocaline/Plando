import { Animated, Easing, StatusBar, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRealm } from "../../database/realm";
import { ChildrenProps, TaskProps } from '../../@types/task';
import uuid from "react-native-uuid"
import ViewTask from '../../screens/ViewTask';
import { TaskBuilder } from '../../utils/task/Builder';

type Props = {
    title: string;
    color: string;
    taskId: string;
}

export function Header({ title, color, taskId }: Props) {

    const navigation = useNavigation();

    const [input, setInput] = useState("");

    const [visible, setVisible] = useState(false);
    const [modalAddvisible, setModalAddvisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current

    const options = [
        {
            title: "Excluir",
            color: "red",
            action: () => handlePrepareTaskForDelete()
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

    async function handlePrepareTaskForDelete() {
        const realm = await getRealm()

        try {
            realm.write(() => {
                const objectToDelete = realm.objectForPrimaryKey("Task", taskId);
                objectToDelete!.title = "DELETED";
            });
            navigation.goBack()
        } catch (e) {
            console.log(e)
        }
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
                if(title == "Tarefa"){
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
                        onPress: () => {},
                      },
                    ],
                    { cancelable: true }
                  ); 
                  
            }
            
        } catch (error) {
            console.log("Message error:", error);
        }
    }

    function returnBtn() {
        if (title == "Tarefa" || title == "Super Tarefa") {
            const handleNavigateToHome = () => {
                navigation.reset({
                    index: 0,
                    //@ts-ignore
                    routes: [{ name: 'Tasks' }]
                });
            };
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNavigateToHome}
                >
                    <Icon
                        name='chevron-left'
                        color={"#fff"}
                        size={40}
                    />
                </TouchableOpacity>
            )
        } else if (title == "Tarefas") {
            const handleNavigateToHome = () => {
                navigation.reset({
                    index: 0,
                    //@ts-ignore
                    routes: [{ name: 'Home' }]
                });
            };
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNavigateToHome}
                >
                    <Icon
                        name='chevron-left'
                        color={"#fff"}
                        size={40}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Icon
                        name='chevron-left'
                        color={"#fff"}
                        size={40}
                    />
                </TouchableOpacity>
            )
        }
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

    function buttonHeader() {
        if (title == "Tarefas") {
            return (
                <TouchableOpacity
                    style={styles.button}
                    //@ts-ignore
                    onPress={() => navigation.navigate("NewTask")}
                >
                    <Icon
                        name='plus'
                        color={"#fff"}
                        size={20}
                    />
                </TouchableOpacity>
            )
        } else if (title == "Tarefa" || title == "Super Tarefa") {
            return (
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
            )
        } else {
            return <View></View>
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <StatusBar
                animated={true}
                backgroundColor={color}
                barStyle={"default"}
                showHideTransition={"slide"}
                hidden={false}
            />
            {returnBtn()}

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            {buttonHeader()}
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
        </View>

    );
}

export const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: '#0645ad',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        height: 80,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        flex: 1,
        borderRadius: 8,
        borderColor: "#333",
        padding: 10,
        position: "absolute",
        top: 50,
        right: 20,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    popupAddTask: {
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
        marginBottom: 10
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#303030",
        borderRadius: 10,
        color: "#000",
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 7,
        borderBottomColor: "#ccc",
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