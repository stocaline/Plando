import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRealm } from '../../database/realm';
import { useCallback, useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { TaskProps } from '../../@types/task';
import { CalculateTaskPercent } from '../../utils/task/CalculateTaskPercent';
//@ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { TaskBuilder } from '../../utils/task/Builder';

type Props = {
    data: TaskProps;
    disable: boolean;
}

export function TaskCard({ data, disable }: Props) {

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
                    <TouchableOpacity
                        style={styles.cardNameSuper}
                        onPress={() => handleOpenTask()}
                    >
                        <Text style={{ color: "#303030", fontWeight: "600" }}>{data.title}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{color: data.color, fontWeight: '900'}}>CONCLUIDO!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.contentSuper}>
                    <TouchableOpacity
                        style={styles.cardNameSuper}
                        onPress={() => handleOpenTask()}
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
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View style={data.finished_at == "" ? styles.container : styles.containerStatusDone}>
            <View style={[styles.tag, { backgroundColor: data.color }]}></View>
            {data.super ?
                generateCardSuper()
                :
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.cardName}
                        onPress={() => handleOpenTask()}
                    >
                        <Text style={{ color: "#303030", fontWeight: "600" }}>{data.title}</Text>
                    </TouchableOpacity>
                    <CheckBox
                        checked={data.finished_at == "" ? false : true}
                        onPress={() => ToggleTaskStatus(data._id)}
                        disabled={disable}
                    />
                </View>
            }
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    contentSuper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    contentSuperDone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        opacity: 0.5,
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
        width: "95%",
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
    cardNameSuper: {
        display: 'flex',
        width: "80%",
        marginLeft: "10%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
});