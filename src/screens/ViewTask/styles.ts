import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        width: "100%",
        height: "100%",
    },
    container: {
        paddingHorizontal: 30,
        paddingTop: 20,
        height: "90%",
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    main: {
        display: "flex",
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 25,
        alignSelf: "center",
        textAlign: "center",
        paddingHorizontal: 10,
    },
    text: {
        color: "#000"
    },
    btns: {
        display: 'flex',
        justifyContent: "center",
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
});