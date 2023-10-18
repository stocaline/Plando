import React, { useState } from "react";
import { styles } from "./styles";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getRealm } from "../../database/realm";
import uuid from "react-native-uuid"
import { Header } from "../../components/Header";
import { extractSiteName } from "../../utils/Products/WebScrapping";
import { updateProduct } from "../../utils/Products/ProductFunctions";
import { useNavigation } from "@react-navigation/native";

export default function NewProduct({ route }: any) {
    const { product, title } = route.params || { product: null, title: "Novo Produto" }

    const navigation = useNavigation();

    const [id, setId] = useState(product?._id || uuid.v4());
    const [name, setName] = useState(product?.name || "");
    const [link, setLink] = useState(product?.link || "");
    const [price, setPrice] = useState(product?.price || "");
    const [img, setImg] = useState(product?.img || "");

    function cleanFormInputs() {
        setName("")
        setLink("")
        setPrice("")
        setImg("")
    }

    async function handleSubmit(goBack: boolean) {
        const realm = await getRealm()
        if (name == "" || link == "") {
            return
        }
        const from = extractSiteName(link)
        if (product != null) {
            await updateProduct(product._id, name, img, price)
        }
        try {
            realm.write(() => {
                realm.create("Products", {
                    _id: id,
                    name: name,
                    link: link,
                    price: price,
                    img: "",
                    from: from,
                    purchased: false,
                    created_at: new Date().toISOString().slice(0, 10),
                })
            })

            cleanFormInputs()

        } catch (e) {
            console.log(e)
        } finally {
            if (goBack) {
                navigation.goBack()
            }
            realm.close
        }
    }

    return (
        <SafeAreaView >
            <Header title={title} color={"#0645ad"} taskId="" productId={""} />
            <View style={styles.container}>
                <Text style={styles.label}>Nome do Produto:</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                    placeholderTextColor="#303030"
                    maxLength={20}
                />

                <Text style={styles.label}>Preço:</Text>
                <TextInput
                    style={styles.input}
                    value={price}
                    onChangeText={setPrice}
                    placeholder="valor do produto"
                    placeholderTextColor="#303030"
                />

                <Text style={styles.label}>Link:</Text>
                <TextInput
                    style={styles.input}
                    value={link}
                    onChangeText={setLink}
                    placeholder="URL do produto"
                    placeholderTextColor="#303030"
                />

                {title == "Novo Produto" ?
                    <TouchableOpacity onPress={() => handleSubmit(false)} style={styles.addButton}>
                        <Text style={styles.buttonText}>Adicionar Produto</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => handleSubmit(true)} style={styles.addButton}>
                        <Text style={styles.buttonText}>Editar Produto</Text>
                    </TouchableOpacity>
                }
            </View>
        </SafeAreaView >
    )
}