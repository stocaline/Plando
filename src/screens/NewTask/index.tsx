import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { ColorPicker } from "react-native-color-picker";
import { getRealm } from "../../database/realm";
import uuid from "react-native-uuid"

export default function NewTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('normal');
    const [selectedColor, setSelectedColor] = useState('green');
    const colorsPallet = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

    function cleanFormInputs() {
        setTitle("")
        setDescription("")
        setPriority("normal")
    }

    async function handleSubmit() {
        const realm = await getRealm()
        if (title == "") {
            return
        }
        try {
            realm.write(() => {
                realm.create("Task", {
                    _id: uuid.v4(),
                    title: title,
                    description: description,
                    priority: priority,
                    color: selectedColor,
                    finished_at: "",
                    historic: false,
                    deadline: "",
                    created_at: new Date().toISOString().slice(0, 10),
                })
            })
            cleanFormInputs()

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Título da tarefa"
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição da tarefa"
            />

            <Text style={styles.label}>Prioridade:</Text>
            <Picker
                selectedValue={priority}
                onValueChange={setPriority}
                style={styles.picker}
            >
                <Picker.Item label="Opcional" value="opcional" />
                <Picker.Item label="Normal" value="normal" />
                <Picker.Item label="Urgente" value="urgente" />
            </Picker>

            <Text style={styles.label}>Selecione uma cor para tarefa:</Text>
            <View style={styles.colorContainer}>
                {colorsPallet.map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.colorCircle,
                            { backgroundColor: color },
                            selectedColor === color ? styles.selectedColorCircle : null,
                        ]}
                        onPress={() => setSelectedColor(color)}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                <Text style={styles.buttonText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
        </SafeAreaView >
    )
}

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        marginBottom: 10,
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    selectedColorCircle: {
        borderWidth: 2,
        borderColor: 'black',
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
