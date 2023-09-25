import { Alert, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { getRealm } from "../../database/realm";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteNote } from "../../utils/Notes/NotesFunctions";
import { Text } from "react-native-elements";
import { NoteProps } from "../../@types/note";

export default function Notes() {

    //@ts-ignore
    const [notes, setNotes] = useState<NoteProps[]>([])
    const navigation = useNavigation();

    function handleDeleteNote(id: string) {
        Alert.alert(
            'Excluir anotação',
            'Clique em excluir para concluir a exclusão',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelar Pressionado'),
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    onPress: () => { deleteNote(id), handleFetchData() },
                },
            ],
            { cancelable: false }
        );
    }

    async function handleFetchData() {
        const realm = await getRealm()

        try {
            const response = realm.objects("Notes")
            //@ts-ignore
            setNotes(response)

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    function openNote(note: NoteProps) {
        const item = {
            "_id": note._id,
            "title": note.title,
            "text": note.text,
            "created_at": note.created_at.toISOString(),
        }
        //@ts-ignore
        navigation.navigate("ViewNote", { note: item })
    }

    useFocusEffect(useCallback(() => {
        handleFetchData()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Anotações" color={"#0645ad"} taskId={""} />
            <View style={styles.container}>
                {notes.length > 0 ?
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={{gap: 30}}
                        data={notes}
                        keyExtractor={item => item._id}
                        numColumns={2}  
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={styles.cardNote}
                                onPress={() => openNote(item)}
                                onLongPress={() => handleDeleteNote(item._id)}
                            >
                                <Text style={{color: "#fff", alignSelf: "center",}}>{item.title}</Text>
                            </TouchableOpacity>
                        }
                    />
                    :
                    <Text>Nenhuma anotação registrada</Text>
                }
            </View>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        display: "flex",
        width: "80%",
        marginTop: 20,
    },
    listContent: {
        display: "flex",
        alignItems: "center",
        gap: 30,
    },
    cardNote: {
        width: 130,
        height: 130,
        backgroundColor: "#0645ad",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
    },
})