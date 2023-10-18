import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { useState } from "react";
import { handleUpdateNote } from "../../utils/Notes/NotesFunctions";
import { NoteProps } from "../../@types/note";
import { Text } from "react-native-elements";

export default function ViewNote({ route }: any) {
    const { note } = route.params
    const [title, setTitle] = useState(note!.title)
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
        <ScrollView>
            <Header title="Anotação" color={"#0645ad"} taskId={""} productId={""} />
            <View style={styles.container}>
                <TextInput
                    style={styles.title}
                    value={title}
                    multiline={true}
                    placeholder="Sem titulo"
                    onChangeText={handleInputTitleChange}
                    scrollEnabled={false}
                    maxLength={30}
                />
                <TextInput
                    style={styles.text}
                    multiline={true}
                    scrollEnabled={false}
                    value={text}
                    onChangeText={handleInputDescriptionChange}
                />
                <TouchableOpacity style={[styles.addButton, updated ? {display: "flex"} : {display: "none"}]} onPress={() => {handleUpdateNote(note._id, title, text), setUpdated(false)}}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}