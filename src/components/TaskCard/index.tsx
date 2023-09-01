import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRealm } from '../../database/realm';
import { useCallback, useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';

type TaskProps = {
    _id: string;
    title: string;
    description: string,
    color: string,
    priority: string,
    finished_at: string,
    created_at: Date,
}

type Props = {
    data: TaskProps;
}


export function TaskCard({ data }: Props) {

    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);

    function handleOpenTask() {
        //@ts-ignore
        navigation.navigate("ViewTask", { task: objectConstruction(data) });
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

    function objectConstruction(data: TaskProps) {
        const task = {
            _id: data._id,
            title: data.title,
            description: data.description,
            color: data.color,
            priority: data.priority,
            finished_at: data.finished_at,
            created_at: data.created_at.toISOString()
        }
        return task
    }

    return (
        <View style={data.finished_at == "" ? styles.container : styles.containerStatusDone}>
            <View style={[styles.tag, {backgroundColor: data.color}]}></View>
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.cardName}
                    onPress={() => handleOpenTask()}
                >
                    <Text style={{color: "#303030", fontWeight: "600"}}>{data.title}</Text>
                </TouchableOpacity>
                <CheckBox
                    checked={data.finished_at == "" ? false : true}
                    onPress={() => ToggleTaskStatus(data._id)}
                />
            </View>
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
});