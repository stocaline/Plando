import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from "@react-navigation/native";
import { getRealm } from '../../database/realm';
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { TaskProps } from '../../@types/task';
import { CalculateTaskPercent } from '../../utils/task/CalculateTaskPercent';
//@ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { TaskBuilder } from '../../utils/task/Builder';
import { deleteTask } from '../../utils/task/TaskFunctions';
import { useGlobalContext } from '../../contexts/GlobalContex';
import {orderTasks} from '../../utils/task/TaskFunctions'

type Props = {
    data: TaskProps;
    disable: boolean;
}

export function TaskCard({ data, disable }: Props) {

    const { tasksList, setTasksList } = useGlobalContext()
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);

    function handleOpenTask() {
        if(data.super){
            //@ts-ignore
            navigation.navigate("ViewSuperTask", { task: TaskBuilder(data) });
        } else {
            //@ts-ignore
            navigation.navigate("ViewTask", { task: TaskBuilder(data) });
        }
    }

    async function handleDeleteTask(idTask: string) {
        Alert.alert(
            'Excluir tarefa?',
            'Clique em excluir para concluir a exclusão',
            [
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    //@ts-ignore
                    onPress: () => { 
                        deleteTask(idTask), getDataTasks()
                    },
                },
            ],
            { cancelable: false }
            );
    }

    async function getDataTasks() {
        const realm = await getRealm()
    
        try {
            const response = realm.objects("Task").filtered('historic == false AND title != "DELETED"');
            //@ts-ignore
            setTasksList(orderTasks(response))
        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    
    }

    async function ToggleTaskStatus(idTask: string) {
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
            });
        } catch (error) {
            console.log("Erro ao mudar status tarefa:", error);
        }
    }

    function generateCardSuper() {
        var conclusionPercente = CalculateTaskPercent(data.children)
        if (conclusionPercente == 1) {
            return (
                <View style={styles.contentSuperDone}>
                    <View
                        style={styles.cardNameSuper}
                    >
                        <Text style={{ color: "#303030", fontWeight: "600" }}>{data.title}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{color: data.color, fontWeight: '900'}}>CONCLUIDO!</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.contentSuper}>
                    <View
                        style={styles.cardNameSuper}
                    >
                        <Text style={{ color: "#303030", fontWeight: "600", width: "45%" }}>{data.title}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ProgressBar
                                progress={CalculateTaskPercent(data.children)}
                                width={150}
                                height={10}
                                color={data.color}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }

    return (
        <TouchableOpacity onLongPress={() => handleDeleteTask(data._id)} onPress={() => handleOpenTask()} style={data.finished_at == "" ? styles.container : styles.containerStatusDone}>
            <View style={[styles.tag, { backgroundColor: data.color }]}></View>
            {data.super ?
                generateCardSuper()
                :
                <View style={styles.content}>
                    <View
                        style={styles.cardName}
                    >
                        <Text style={{ color: "#303030", fontWeight: "600" }}>{data.title}</Text>
                    </View>
                    <CheckBox
                        checked={data.finished_at == "" ? false : true}
                        onPress={() => ToggleTaskStatus(data._id)}
                        disabled={disable}
                    />
                </View>
            }
        </TouchableOpacity>
    );
}