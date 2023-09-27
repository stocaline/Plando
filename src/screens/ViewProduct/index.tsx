import { SafeAreaView, StyleSheet, TextInput, Touchable, TouchableOpacity, View, Text } from "react-native";
import { Header } from "../../components/Header";
import { Image } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Feather";

//@ts-ignore
export default function ViewProduct({ route }) {
    const { product } = route.params

    return (
        <SafeAreaView style={{backgroundColor: "#dbdbdb"}}>
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

            <View style={styles.container}>
                <View style={styles.productContainer}>
                    <Text style={styles.text}>Item 1</Text>
                    <Text style={styles.text}>Preço: {product.price || "Não sincronizado"}</Text>
                    <Text style={styles.text}>{product.link}</Text>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>Comprar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export const styles = StyleSheet.create({
    container: {
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