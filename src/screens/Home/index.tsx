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

    function goToProducts() {
        //@ts-ignore
        navigation.navigate("Products")
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
                <View style={styles.backgroundImage}></View>
            </View>
            <View style={styles.containerContent}>
                <View style={styles.menu}>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goToTasks}
                    >
                        <Icon
                            name='clipboard'
                            color={"#0645ad"}
                            size={20}
                        />
                        <Text style={styles.btnText}>Tarefas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goToProducts}
                    >
                        <Icon
                            name='shopping-bag'
                            color={"#0645ad"}
                            size={20}
                        />
                        <Text style={styles.btnText}>Compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goToNotes}
                    >
                        <Icon
                            name='bookmark'
                            color={"#0645ad"}
                            size={20}
                        />
                        <Text style={styles.btnText}>Anotações</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContent}>
                    <Icon
                        name='codesandbox'
                        color={"#ccc"}
                        size={100}
                    />
                    <Text style={{color: "#ccc", fontSize: 20}}>Área em Desenvolvimento</Text>
                </View>
            </View>
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
    containerContent: {
        flex: 1,
        width: "100%",
        display: "flex",
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,

    },
    menu: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        gap: 30
    },
    btn: {
        display: "flex",
        width: 80,
        height: 80,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 50,
    },
    btnDisable: {
        display: "flex",
        width: 80,
        height: 80,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, .8)",
        borderRadius: 50,
    },
    btnText: {
        color: "#0645ad",
        fontSize: 14,
        fontWeight: "bold",
    },
    backgroundImage: {
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: 500,
        height: 500,
        borderRadius: 500,
        bottom: -100,
        right: -400,
        zIndex: -1
    },
    bottomContent: {
        display: "flex",
        height: "90%",
        alignItems: "center",
        justifyContent: "center"
    }
})