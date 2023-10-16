import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: '#0645ad',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    button: {
        height: 80,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
});