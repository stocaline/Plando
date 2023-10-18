import { SafeAreaView, TouchableOpacity, View, Text, Linking, Image } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { builderProduct } from "../../utils/Products/Builder";

export default function ViewProduct({ route }: any) {
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