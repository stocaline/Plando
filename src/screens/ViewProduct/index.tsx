import { SafeAreaView, StyleSheet, TextInput, Touchable, TouchableOpacity, View, Text, Linking, Image } from "react-native";
import { Header } from "../../components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { getProduct } from "../../utils/Products/ProductFunctions";
import { builderProduct } from "../../utils/Products/Builder";

//@ts-ignore
export default function ViewProduct({ route }) {
    const { product } = route.params

    const navigation = useNavigation();
    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [tagImage, setTagImage] = useState("")

    function openWebsite() {
        const url = product.link
        Linking.openURL(url);
    }

    function openEditProduct() {
        const item = builderProduct(product)
        //@ts-ignore
        navigation.navigate("NewProduct", { product: item, title:"Editar Produto" })
    }

    useFocusEffect(useCallback(() => {
    }, []))

    return (
        <SafeAreaView style={{ backgroundColor: "#dbdbdb" }}>
            <Header title="Produto" color={"#0645ad"} taskId={""} productId={product._id} />
            {product.img == "" ?
                <View style={styles.imageContainer}>
                    <Icon
                        name='image'
                        color={"#fff"}
                        size={40}
                    />
                </View>
                :
                <Image
                    source={{ uri: product.img }}
                    style={{ width: 0, height: 0 }}
                />
                // <Icon
                //     name='chevron-left'
                //     color={"#fff"}
                //     size={40}
                // />
            }

            <View style={styles.container}>
                <View style={styles.productContainer}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text}>Preço: {price || "Não sincronizado"}</Text>
                    <TouchableOpacity style={styles.btn} onPress={openWebsite}>
                        <Text style={styles.btnText}>Visitar Site</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={openEditProduct}>
                        <Text style={styles.btnText}>Editar Produto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    container: {
        height: "100%",
        display: "flex",
        backgroundColor: "#dbdbdb"
    },
    imageContainer: {
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    productContainer: {
        display: "flex",
        height: "100%",
        padding: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadiusRadius: 30,
        backgroundColor: "#fff",
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
    btn: {
        backgroundColor: '#0645ad',
        marginTop: 100,
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