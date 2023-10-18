import { useCallback, useState } from "react";
import { styles } from "./styles";
import { Alert, FlatList, Modal, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { Header } from "../../components/Header";
import { getRealm } from "../../database/realm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ProductsProps } from "../../@types/product";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import { addProductOnlyLink, deleteProduct } from "../../utils/Products/ProductFunctions";
import { openProduct } from "../../utils/Products/Builder";

export default function Products() {

    const navigation = useNavigation();
    const tagImage = "../../assets/imgs/kabum.png"
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

    function handleAddProduct() {
        //@ts-ignore
        navigation.navigate("NewProduct")
    }

    function handleAddProductOnlyLink() {
        setModalAddvisible(true)
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

    function handleInputChange(text: string) {
        setInputLink(text)
    }

    useFocusEffect(useCallback(() => {
        handleFetchData()
    }, []))

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Produtos" color={"#0645ad"} taskId={""} productId={""} />
            <View style={styles.container}>
                {products.length > 0 ?
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={{ gap: 10 }}
                        data={products}
                        keyExtractor={item => item._id}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={styles.cardProduct}
                                onPress={() => openProduct(item, navigation)}
                                onLongPress={() => handleDeleteNote(item._id)}
                            >
                                {item.img == "" ?
                                    <View style={styles.imageContainer}>
                                        <Icon
                                            name='image'
                                            color={"#fff"}
                                            size={40}
                                        />
                                    </View>
                                    :
                                    // <Image
                                    //     source={require('./caminho-da-imagem/minha-imagem.jpg')}
                                    //     style={{ width: 200, height: 200 }}
                                    // />
                                    <Icon
                                        name='chevron-left'
                                        color={"#fff"}
                                        size={40}
                                    />
                                }
                                <View style={styles.productInfo}>
                                    <Text style={{ color: "#000" }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    />
                    :
                    <Text>Nenhum produto cadastrado</Text>
                }
            </View>
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => handleAddProduct()}
                onLongPress={() => handleAddProductOnlyLink()}
            >
                <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20 }}>+</Text>
            </TouchableOpacity>
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
                                placeholder="www.exemplo.com"
                                onChangeText={handleInputChange}
                            />
                            <Text style={{ color: "#000" }}>Sites integrados: Kabum - Mercado livre.</Text>
                        </View>
                        <TouchableOpacity onPress={() => { addProductOnlyLink(inputLink), setModalAddvisible(false), setInputLink(""), handleFetchData() }} style={styles.modalAddBtn}>
                            <Text style={styles.btnText}>Adicionar Produto</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    )
}