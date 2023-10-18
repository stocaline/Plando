import React from "react"
import { styles } from "./styles";
import { SafeAreaView, Text, TouchableOpacity, View, StatusBar } from "react-native"
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