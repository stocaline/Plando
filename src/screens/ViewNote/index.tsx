import { SafeAreaView, StyleSheet, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getNote, handleUpdateNote, updateNoteTitle } from "../../utils/Notes/NotesFunctions";
import { NoteProps } from "../../@types/note";
import { Text } from "react-native-elements";

//@ts-ignore
export default function ViewNote({ route }) {
    const { note } = route.params
    //@ts-ignore
    const [title, setTitle] = useState(note!.title)
    //@ts-ignore
    const [text, setText] = useState(note!.text)
    const [updated, setUpdated] = useState(false)

    function handleInputDescriptionChange(text: string) {
        setText(text);
        setUpdated(true)
    }
    
    function handleInputTitleChange(text: string) {
        setTitle(text);
        setUpdated(true)
    }

    return (
        <SafeAreaView>
            <Header title="Anotação" color={"#0645ad"} taskId={""} productId={""} />
            <View style={styles.container}>
                <TextInput
                    style={styles.title}
                    value={title}
                    onChangeText={handleInputTitleChange}
                    maxLength={30}
                />
                <TextInput
                    style={styles.text}
                    multiline={true}
                    numberOfLines={4}
                    value={text}
                    onChangeText={handleInputDescriptionChange}
                />
                <TouchableOpacity style={[styles.addButton, updated ? {display: "flex"} : {display: "none"}]} onPress={() => {handleUpdateNote(note._id, title, text), setUpdated(false)}}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
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
    addButton: {
        backgroundColor: '#0645ad',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },

})