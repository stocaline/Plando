import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    list: {
        display: "flex",
        width: "100%",
        marginTop: 20,
    },
    listContent: {
        display: "flex",
        alignItems: "center",
        gap: 30,
    },
    cardProduct: {
        width: 140,
        height: 200,
        borderColor: "#303030",
        borderRadius: 10,
        display: "flex",
        overflow: "hidden",
        borderWidth: .5
    },
    imageContainer: {
        height: "40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dbdbdb",
    },
    productInfo: {
        height: "60%",
        padding: 10,
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
        marginRight: 20,
        marginBottom: 20,
        width: 50,
        height: 50,
        backgroundColor: '#0645ad',
        borderRadius: 50,
        padding: 5,
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "flex-end"
    },
    modalAddBtn: {
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