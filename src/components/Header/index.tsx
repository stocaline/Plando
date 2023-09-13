import { Animated, Easing, StatusBar, Text, TouchableOpacity, View, Modal } from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteTask } from '../../utils/task/TaskFunctions';

type Props = {
    title: string;
    color: string;
    taskId: string;
}

export function Header({ title, color, taskId }: Props) {

    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current

    const options = [
        {
            title: "Excluir",
            color: "red",
            action: () => handleDeleteTask(taskId)
        }
    ]

    function handleDeleteTask(id: string){
        deleteTask(id)
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

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <StatusBar
                animated={true}
                backgroundColor={color}
                barStyle={"default"}
                showHideTransition={"slide"}
                hidden={false}
            />
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

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>

            </View>
            {taskId ?
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
                
                :
            <View></View>
            }
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
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 7,
        borderBottomColor: "#ccc",
    }
});