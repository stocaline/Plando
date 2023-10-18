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
        width: "90%",
        marginTop: 20,
    },
    listContent: {
        display: "flex",
        alignItems: "center",
        gap: 30,
    },
    cardNote: {
        width: 150,
        height: 120,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        display: "flex",
        justifyContent: "space-between",
        elevation: 5,
        shadowColor: '#0645ad',
    },
    titleView: {
        width: "100%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    }
})