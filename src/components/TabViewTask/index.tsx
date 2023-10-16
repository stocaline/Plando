import React, { useState, useCallback } from "react"
import { styles } from "./styles";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRealm } from "../../database/realm";
import { TaskCard } from "../../components/TaskCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { TaskProps } from "../../@types/task";
import { useGlobalContext } from "../../contexts/GlobalContex";


export default function TabViewTask() {

    const navigation = useNavigation();

    const { tasksList, setTasksList } = useGlobalContext()

    const [dataHistoric, setDataHistoric] = useState<TaskProps[]>();
    const [totalTasksNumber, setTotalTasksNumber] = useState(0);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Tarefas' },
        { key: 'second', title: 'Histórico' },
    ]);

    async function handleFetchData() {
        const realm = await getRealm()

        try {
            const response = realm.objects("Task").filtered('historic == false AND title != "DELETED"');
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
            setTasksList(orderedTasks)

        }
    }
    
    async function deleteCache() {
        const realm = await getRealm()
        try {
            realm.write(() => {
                var tasksToUpdate = realm.objects('Task').filtered('title == "DELETED"');
                tasksToUpdate.forEach((task) => {
                    realm.delete(task);
                });
            });

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    const FirstRoute = () => (
        <SafeAreaView style={styles.container}>
            {totalTasksNumber != 0 ? <Text style={styles.totalTasks}>Total de tarefas: {totalTasksNumber}</Text> : <Text style={{ color: "#000", margin: 10 }}>Sem Tarefas registradas</Text>}
            {tasksList?.length != 0 ?
                <FlatList
                    data={tasksList}
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
                <View></View>
            }
        </SafeAreaView>
    );

    const SecondRoute = () => (
        <SafeAreaView style={styles.container}>
            {dataHistoric?.length != 0 ? <Text style={styles.totalTasks}>Tarefas Finalizadas: {dataHistoric?.length}</Text> : <Text style={{ color: "#000", margin: 10 }}>Sem Tarefas Finalizadas</Text>}
            {dataHistoric?.length != 0 ?
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
                <View></View>
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


    useFocusEffect(useCallback(() => {
        checkLastVerificationTime()
        handleFetchData()
        deleteCache()
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
