import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/Feather"
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    color: string;
}

export function Header({ title, color }: Props) {

    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <StatusBar
                animated={true}
                backgroundColor={color}
                barStyle={"default"}
                showHideTransition={"slide"}
                hidden={false}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    name='chevron-left'
                    color={"#fff"}
                    size={40}
                />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>

            </View>
        </View>

    );
}

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