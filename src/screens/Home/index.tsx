import React, { useState, useCallback } from "react"
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRealm } from "../../database/realm";
import { TaskCard } from "../../components/TaskCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Feather";

type TaskProps = {
    _id: string,
    title: string,
    description: string,
    color: string,
    priority: string,
    created_at: Date,
    finished_at: string,
}

export default function Home() {

    const navigation = useNavigation();

    const [data, setData] = useState<TaskProps[]>();

    async function handleFetchData() {
        const realm = await getRealm()

        try {
            const response = realm.objects("Task").filtered('historic == false');
            //@ts-ignore
            orderTasks(response)

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
        
    }

    async function doVerification() {
        const realm = await getRealm()
        const tasksToUpdate = realm.objects('Task').filtered('finished_at != "" AND historic == false');
        realm.write(() => {
            tasksToUpdate.forEach((task) => {
                task.historico = true;
            });
        });
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

    function orderTasks(tasks:TaskProps[]) {
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
            var orderedTasks = taskPriority1.concat(taskPriority2, taskPriority3, taskFinished);
            setData(orderedTasks)

        }
    }

    useFocusEffect(useCallback(() => {
        handleFetchData()
        checkLastVerificationTime()
    }, []))

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Plando</Text>
            {data ?
                <FlatList
                    data={data}
                    keyExtractor={item => item._id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) =>
                        <TaskCard
                            data={item}
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
    )
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
        backgroundColor: "#fff"
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