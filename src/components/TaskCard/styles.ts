import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    contentSuper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden'
    },
    contentSuperDone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        opacity: 0.5,
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
        width: "95%",
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
        width: "70%"
    },
    cardNameSuper: {
        display: 'flex',
        width: "80%",
        marginLeft: "10%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
    },
});