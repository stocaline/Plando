import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRealm } from "../../database/realm";
import uuid from "react-native-uuid"
import { Header } from "../../components/Header";

export default function NewTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Normal');
    const [selectedColor, setSelectedColor] = useState('green');
    const colorsPallet = ['crimson', 'chartreuse', '#6495ED', '#303030', '#9932cc', 'orange'];

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
                    super: false,
                    children: [],
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
        <SafeAreaView >
            <Header title="Nova Tarefa" color={"#0645ad"} taskId="" productId={""} />
            <View style={styles.container}>
                <Text style={styles.label}>Título:</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Título da tarefa"
                    placeholderTextColor="#303030"
                    maxLength={30}
                />

                <Text style={styles.label}>Descrição:</Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descrição da tarefa"
                    placeholderTextColor="#303030"
                />

                <Text style={styles.label}>Prioridade:</Text>
                <Picker
                    selectedValue={priority}
                    onValueChange={setPriority}
                    style={styles.picker}
                >
                    <Picker.Item label="Normal" value="Normal" />
                    <Picker.Item label="Opcional" value="Opcional" />
                    <Picker.Item label="Urgente" value="Urgente" />
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
            </View>
        </SafeAreaView >
    )
}