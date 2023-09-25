import React from "react"
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View, StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function Home() {

    const navigation = useNavigation();

    function goToTasks() {
        //@ts-ignore
        navigation.navigate("Tasks")
    }

    function goToNotes() {
        //@ts-ignore
        navigation.navigate("Notes")
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#0645ad"
                barStyle={"default"}
                showHideTransition={"fade"}
                hidden={false}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Plando</Text>
                <Text style={styles.text}>Olá, qual será sua próxima realização?</Text>
            </View>
            <View style={styles.menu}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goToTasks}
                    >
                        <Icon
                            name='clipboard'
                            color={"#0645ad"}
                            size={40}
                        />
                        <Text style={styles.btnText}>Tarefas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnDisable}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='shopping-bag'
                            color={"#0645ad"}
                            size={40}
                        />
                        <Text style={styles.btnText}>Lista de compras</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goToNotes}
                    >
                        <Icon
                            name='bookmark'
                            color={"#0645ad"}
                            size={40}
                        />
                        <Text style={styles.btnText}>Anotações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnDisable}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='calendar'
                            color={"#0645ad"}
                            size={40}
                        />
                        <Text style={styles.btnText}>Calendario</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.backgroundImage}></View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0645ad",
        color: "#fff",
        alignItems: "center",
        gap: 100,
    },
    header: {
        width: "80%"
    },
    title: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginTop: 20,
    },
    text: {
        fontSize: 15,
        textAlign: "left",
        fontWeight: '500',
        color: '#fff',
    },
    menu: {
        display: "flex",
        width: "40%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    row: {
        flexDirection: 'row',
        gap: 10
    },
    btn: {
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    btnDisable: {
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, .8)",
        borderRadius: 10,
    },
    btnText: {
        color: "#0645ad",
        fontSize: 20,
        fontWeight: "bold",
    },
    backgroundImage: {
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: 500,
        height: 500,
        borderRadius: 500,
        bottom: -250,
        right: -200,
        zIndex: -1
    },
})