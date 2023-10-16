import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e7e7e7",
        color: "#fff",
    },
    title: {
        fontSize: 36,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
        position: 'relative',
        bottom: -10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        marginBottom: 10,
    },
    totalTasks: {
        margin: 10,
        color: "#303030"
    },
    list: {
        flex: 1,
        width: '100%',
    },
    listContent: {
        padding: 24,
        paddingBottom: 150,
        gap: 10,
    },
    bottomBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomButtons: {
        height: 50,
        width: "100%",
    },
    btnAddTask: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0645ad",
        borderRadius: 100,
        width: 50,
        height: 50,
    },
})