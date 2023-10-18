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
    textWhite: {
        color: "#fff"
    },
    containerConfig: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    btns: {
        display: 'flex',
        justifyContent: "center",
    },
    btnDelete: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#e60000",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        width: "100%",
    },
    button: {
        height: 80,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: '100%',
        marginTop: 20,
    },
    listContent: {
        marginTop: 20,
        gap: 10,
    },
    footer: {
        height: "50%"
    },
    containerCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    containerStatusDone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        opacity: 0.5,
    },
    content: {
        display: 'flex',
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tag: {
        height: "100%",
        width: 10,
    },
    cardName: {
        marginLeft: "10%",
    },
    btnCard: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    popupEditTask: {
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
    editBtn: {
        backgroundColor: '#0645ad',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    deleteBtn: {
        backgroundColor: 'crimson',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 18,
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