import { Alert, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { getRealm } from "../../database/realm";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { deleteNote } from "../../utils/Notes/NotesFunctions";
import { Text } from "react-native-elements";
import { NoteProps } from "../../@types/note";
import { dateFormat } from "../../utils/DateFunctions";

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
            const response = realm.objects("Notes").sorted('updated_at', true)
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
            _id: note._id,
            title: note.title,
            text: note.text,
            updated_at: note.updated_at.toISOString(),
            created_at: note.created_at.toISOString()
        }
        //@ts-ignore
        navigation.navigate("ViewNote", { note: item })
    }

    useFocusEffect(useCallback(() => {
        handleFetchData()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Anotações" color={"#0645ad"} taskId={""} productId={""} />
            <View style={styles.container}>
                {notes.length > 0 ?
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={{ gap: 30 }}
                        data={notes}
                        keyExtractor={item => item._id}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={styles.cardNote}
                                onPress={() => openNote(item)}
                                onLongPress={() => handleDeleteNote(item._id)}
                            >

                                <Text style={{ color: "#0645ad" }}>{item.title}</Text>
                                <Text style={{ color: "#303030" }}>{item.text.slice(0, 20)}</Text>
                                <Text style={{ color: "#252525" }}>{dateFormat(item.updated_at.toISOString())}</Text>

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
        width: "90%",
        marginTop: 20,
    },
    listContent: {
        display: "flex",
        alignItems: "center",
        gap: 30,
    },
    cardNote: {
        width: 150,
        height: 120,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        display: "flex",
        justifyContent: "space-between",
        elevation: 2,
    },
})