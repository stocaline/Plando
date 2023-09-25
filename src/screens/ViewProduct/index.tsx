import { SafeAreaView, StyleSheet, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getNote, handleUpdateNote, updateNoteTitle } from "../../utils/Notes/NotesFunctions";
import { NoteProps } from "../../@types/note";
import { Text } from "react-native-elements";

//@ts-ignore
export default function ViewProduct({ route }) {
    const { product } = route.params

    return (
        <SafeAreaView>
            <Header title="Produto" color={"#0645ad"} taskId={""} productId={product._id} />
            <Text>{product.link}</Text>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        margin: 20,
    },
    title: {
        color: "#000",
        fontWeight: "500",
        fontSize: 30
    },
    text: {
        color: "#000",
        fontSize: 15
    },

})