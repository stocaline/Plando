import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0645ad",
        color: "#fff",
        alignItems: "center",
        gap: 100,
    },
    header: {
        width: "80%"
    },
    title: {
        fontSize: 30,
        textAlign: "left",
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginTop: 20,
    },
    text: {
        fontSize: 15,
        textAlign: "left",
        fontWeight: '500',
        color: '#fff',
    },
    containerContent: {
        flex: 1,
        width: "100%",
        display: "flex",
        backgroundColor: "#fff",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,

    },
    menu: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        gap: 30
    },
    btn: {
        display: "flex",
        width: 80,
        height: 80,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 50,
    },
    btnDisable: {
        display: "flex",
        width: 80,
        height: 80,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, .8)",
        borderRadius: 50,
    },
    btnText: {
        color: "#0645ad",
        fontSize: 14,
        fontWeight: "bold",
    },
    backgroundImage: {
        position: "absolute",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        width: 500,
        height: 500,
        borderRadius: 500,
        bottom: -100,
        right: -400,
        zIndex: -1
    },
    bottomContent: {
        display: "flex",
        height: "90%",
        alignItems: "center",
        justifyContent: "center"
    }
})