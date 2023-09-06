import React, { useState, useCallback } from "react"
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, FlatList, View } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export default function Home() {

    const navigation = useNavigation();

    function goToHome() {
        //@ts-ignore
        navigation.navigate("Tasks")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Plando</Text>
            <View style={styles.menu}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goToHome}
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
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='shopping-bag'
                            color={"#0645ad"}
                            size={20}
                        />
                        <Text style={styles.btnText}>Lista de compras</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='bookmark'
                            color={"#0645ad"}
                            size={20}
                        />
                        <Text style={styles.btnText}>Anotações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='calendar'
                            color={"#0645ad"}
                            size={50}
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
    title: {
        fontSize: 36,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginTop: 20,
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
    btnText:{ 
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