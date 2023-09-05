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
                            color={"#fff"}
                            size={20}
                        />
                        <Text style={{ color: "#fff" }}>Tarefas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='shopping-bag'
                            color={"#fff"}
                            size={20}
                        />
                        <Text style={{ color: "#fff" }}>Lista de compras</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='bookmark'
                            color={"#fff"}
                            size={20}
                        />
                        <Text style={{ color: "#fff" }}>Anotações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => console.log('clicou')}
                    >
                        <Icon
                            name='calendar'
                            color={"#fff"}
                            size={20}
                        />
                        <Text style={{ color: "#fff" }}>Calendario</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
    menu: {
        display: "flex",
        width: "100%",
        height: "100%",
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
        width: 90,
        height: 100,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0645ad",
        borderRadius: 10,
    }
})