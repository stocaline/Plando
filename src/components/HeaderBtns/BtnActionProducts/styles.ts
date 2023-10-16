import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        height: 80,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        backgroundColor: "rgba(0,0,0,0.2)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        zIndex: 999,
    },
})