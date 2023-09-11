import React, { useState, useCallback } from "react"
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRealm } from "../../database/realm";
import { TaskCard } from "../../components/TaskCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

type TaskProps = {
    _id: string,
    title: string,
    description: string,
    color: string,
    priority: string,
    created_at: Date,
    finished_at: string,
}

export default function TabViewTask() {

    const navigation = useNavigation();

    const [data, setData] = useState<TaskProps[]>();
    const [dataHistoric, setDataHistoric] = useState<TaskProps[]>();
    const [totalTasksNumber, setTotalTasksNumber] = useState(0);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Tarefas' },
        { key: 'second', title: 'Histórico' },
    ]);

    const FirstRoute = () => (
        <SafeAreaView style={styles.container}>
            <Text style={styles.totalTasks}>Total de tarefas: {totalTasksNumber}</Text>
            {data ?
                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) =>
                        <TaskCard
                            data={item}
                            disable={false}
                        />
                    }
                />
                :
                <Text style={{ color: "#000" }}>Sem Tarefas registradas</Text>
            }
            <View style={styles.bottomBar}>
                <View style={styles.bottomButtons}></View>
                <TouchableOpacity
                    style={styles.btnAddTask}
                    //@ts-ignore
                    onPress={() => navigation.navigate("NewTask")}
                >
                    <Icon
                        name='plus'
                        color={"#fff"}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    const SecondRoute = () => (
        <SafeAreaView style={styles.container}>
            <Text style={styles.totalTasks}>Tarefas Finalizadas: {dataHistoric?.length}</Text>
            {dataHistoric ?
                <FlatList
                    data={dataHistoric}
                    keyExtractor={item => item._id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) =>
                        <TaskCard
                            data={item}
                            disable={true}
                        />
                    }
                />
                :
                <Text style={{ color: "#000" }}>Sem Taredas Finalizadas</Text>
            }
        </SafeAreaView>
    );

    //@ts-ignore
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#6495ED' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: '#6495ED' }}
        />
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });



    async function handleFetchData() {
        const realm = await getRealm()

        try {
            const response = realm.objects("Task").filtered('historic == false');
            const responseHistoric = realm.objects("Task").filtered('historic == true');
            //@ts-ignore
            orderTasks(response)
            //@ts-ignore
            setDataHistoric(responseHistoric)

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }

    }

    async function doVerification() {
        const realm = await getRealm()
        try {
            const tasksToUpdate = realm.objects('Task').filtered('finished_at != "" AND historic == false');
            realm.write(() => {
                tasksToUpdate.forEach((task) => {
                    task.historic = true;
                });
            });

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    async function checkLastVerificationTime() {
        try {
            const lastVerificationTime = await AsyncStorage.getItem('lastVerificationTime');
            if (!lastVerificationTime) {
                await doVerification();
                await AsyncStorage.setItem('lastVerificationTime', new Date().toISOString());
            } else {
                const currentTime = new Date();
                const lastTime = new Date(lastVerificationTime);
                //@ts-ignore
                const timeDiff = currentTime - lastTime;
                const hoursDiff = timeDiff / (1000 * 60 * 60);

                if (hoursDiff >= 24) {
                    await doVerification();
                    await AsyncStorage.setItem('lastVerificationTime', new Date().toISOString());
                }
            }
        } catch (error) {
            console.error('Erro ao verificar:', error);
        }
    }

    function orderTasks(tasks: TaskProps[]) {
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
            setTotalTasksNumber(taskPriority1.length + taskPriority2.length + taskPriority3.length)
            var orderedTasks = taskPriority1.concat(taskPriority2, taskPriority3, taskFinished);
            setData(orderedTasks)

        }
    }

    useFocusEffect(useCallback(() => {
        checkLastVerificationTime()
        handleFetchData()
    }, []))


    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e7e7e7",
        color: "#fff",
    },
    title: {
        fontSize: 36,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
        position: 'relative',
        bottom: -10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginBottom: 10,
    },
    totalTasks: {
        margin: 10,
        color: "#303030"
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        padding: 24,
        paddingBottom: 150,
        gap: 10,
    },
    bottomBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomButtons: {
        height: 50,
        width: "100%",
    },
    btnAddTask: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0645ad",
        borderRadius: 100,
        width: 50,
        height: 50,
    },
})