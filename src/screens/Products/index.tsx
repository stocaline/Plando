import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { getRealm } from "../../database/realm";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ProductsProps } from "../../@types/products";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import { deleteProduct, handleAddProduct } from "../../utils/Products/ProductFunctions";

export default function Products() {

    const navigation = useNavigation();
    const [products, setProducts] = useState<ProductsProps[]>([])
    const [inputLink, setInputLink] = useState("")
    const [modalAddvisible, setModalAddvisible] = useState(false)

    function handleDeleteNote(id: string) {
        Alert.alert(
            'Excluir produto',
            'Clique em excluir para concluir a exclusão',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelar Pressionado'),
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    onPress: () => { deleteProduct(id), handleFetchData() },
                },
            ],
            { cancelable: false }
        );
    }

    async function handleFetchData() {
        const realm = await getRealm()

        try {
            const response = realm.objects("Products")
            //@ts-ignore
            setProducts(response)

        } catch (e) {
            console.log(e)
        } finally {
            realm.close
        }
    }

    function handleInputChange(text: string){
        setInputLink(text)
    }

    function openProduct(product: ProductsProps) {
        const item = {
            "_id": product._id,
            "name": product.name,
            "price": product.price,
            "img": product.img,
            "link": product.link,
            "created_at": product.created_at.toISOString(),
        }
        //@ts-ignore
        navigation.navigate("ViewProduct", { product: item })
    }

    useFocusEffect(useCallback(() => {
        handleFetchData()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Produtos" color={"#0645ad"} taskId={""} productId={""} />
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={{ gap: 30 }}
                    data={products}
                    keyExtractor={item => item._id}
                    numColumns={2}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style={styles.cardNote}
                            onPress={() => openProduct(item)}
                            onLongPress={() => handleDeleteNote(item._id)}
                        >
                            <Text style={{ color: "#fff", alignSelf: "center", }}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                />
                <TouchableOpacity
                    style={styles.cardNote}
                    onPress={() => setModalAddvisible(true)}
                >
                    <Text style={{ color: "#fff", alignSelf: "center", }}>+</Text>
                    <Text style={{ color: "#fff", alignSelf: "center", }}>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent visible={modalAddvisible}>
                    <SafeAreaView
                        style={{ flex: 1, display: 'flex', justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, .5)" }}
                    >
                        <View style={styles.popupAddProduct}>
                            <View>
                                <View style={styles.label}>
                                    <Text style={{ color: "#000" }}>Digite o link do seu produto:</Text>
                                    <TouchableOpacity onPress={() => setModalAddvisible(false)}>
                                        <Icon
                                            name='x'
                                            color={"crimson"}
                                            size={30}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    value={inputLink}
                                    onChangeText={handleInputChange}
                                    maxLength={30}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { handleAddProduct(inputLink), setModalAddvisible(false), setInputLink("") }} style={styles.addBtn}>
                                <Text style={styles.btnText}>Adicionar Produto</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
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
    popupAddProduct: {
        flex: 1,
        width: "80%",
        borderRadius: 8,
        borderColor: "#333",
        padding: 10,
        position: "absolute",
        alignSelf: 'center',
        gap: 20,
        backgroundColor: "white",
        zIndex: 100,
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#303030",
        borderRadius: 10,
        color: "#000",
    },
    addBtn: {
        backgroundColor: '#0645ad',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
    },
})