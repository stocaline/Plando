import { Animated, Easing, StatusBar, Text, TouchableOpacity, View, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRealm } from "../../database/realm";
import { ChildrenProps, TaskProps } from '../../@types/task';
import uuid from "react-native-uuid"
import { TaskBuilder } from '../../utils/task/Builder';
import { getProduct } from '../../utils/Products/ProductFunctions';
import { searchProduct } from '../../utils/Products/WebScrapping';
import { openProduct } from '../../utils/Products/Builder';
import { deleteTask } from '../../utils/task/TaskFunctions';


type Props = {
    title: string;
    color: string;
    taskId: string;
    productId: string;
}

export function Header({ title, color, taskId, productId }: Props) {

    const navigation = useNavigation();

    const [input, setInput] = useState("");

    const [visible, setVisible] = useState(false);
    const [modalAddvisible, setModalAddvisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    function errorSinc() {
        Alert.alert(
            'Não foi possivel sincronizar seu produto',
            'No momento não foi possivel sincronizar, verifique sua conexão de rede e tente novamente mais tarde.',
            [
                {
                    text: 'OK',
                    onPress: () => { },
                },
            ],
            { cancelable: true }
        );
    }

    async function handleSincInfo() {
        setIsLoading(true)
        var product = await getProduct(productId)
        await searchProduct(product!._id, product!.link)
        var item = await getProduct(productId)
        if (item) {
            setIsLoading(false)
            //@ts-ignore 
            openProduct(item, navigation)
        } else {
            setIsLoading(false)
            errorSinc()
        }
    }

    async function handleAddNote() {
        const realm = await getRealm()
        var item = {
            _id: uuid.v4(),
            title: "Sem Titulo",
            text: "",
            updated_at: new Date().toISOString().slice(0, 10),
            created_at: new Date().toISOString().slice(0, 10),
        }
        try {
            realm.write(() => {
                realm.create("Notes", item)
            })
            //@ts-ignore
            navigation.navigate("ViewNote", { note: item })

        } catch (e) {
            console.log(e)
        }
    }

    async function handleTaskDelete() {
        await deleteTask(taskId)
        navigation.goBack()
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
        } else if (title == "Produtos") {
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
        } else if (title == "Produto") {
            const handleNavigateToProducts = () => {
                navigation.reset({
                    index: 0,
                    //@ts-ignore
                    routes: [{ name: 'Products' }]
                });
            };
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleNavigateToProducts}
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
        } else if (title == "Anotações") {
            return (
                <TouchableOpacity
                    style={styles.button}
                    //@ts-ignore
                    onPress={() => handleAddNote()}
                >
                    <Icon
                        name='plus'
                        color={"#fff"}
                        size={20}
                    />
                </TouchableOpacity>
            )
        } else if (title == "Produto") {
            return (
                <TouchableOpacity
                    style={styles.button}
                    //@ts-ignore
                    onPress={() => handleSincInfo()}
                >
                    <Icon
                        name='refresh-cw'
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
            {isLoading ?
                <Modal transparent>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Carregando...</Text>
                    </View>
                </Modal>
                :
                <View></View>
            }

        </View>

    );
}