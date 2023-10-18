import { StyleSheet } from "react-native";

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