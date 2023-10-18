import { Animated, Easing, StatusBar, Text, TouchableOpacity, View, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"

type Props = {
    title: string
}

export default function BtnReturn({ title }: Props) {

    const navigation = useNavigation();

    if (title == "Tarefa" || title == "Super Tarefa") {
        const handleNavigateToHome = () => {
            navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'Tasks' }]
            });
        };
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateToHome}
            >
                <Icon
                    name='chevron-left'
                    color={"#fff"}
                    size={40}
                />
            </TouchableOpacity>
        )
    } else if (title == "Tarefas") {
        const handleNavigateToHome = () => {
            navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'Home' }]
            });
        };
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateToHome}
            >
                <Icon
                    name='chevron-left'
                    color={"#fff"}
                    size={40}
                />
            </TouchableOpacity>
        )
    } else if (title == "Produtos") {
        const handleNavigateToHome = () => {
            navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'Home' }]
            });
        };
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateToHome}
            >
                <Icon
                    name='chevron-left'
                    color={"#fff"}
                    size={40}
                />
            </TouchableOpacity>
        )
    } else if (title == "Produto") {
        const handleNavigateToProducts = () => {
            navigation.reset({
                index: 0,
                //@ts-ignore
                routes: [{ name: 'Products' }]
            });
        };
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={handleNavigateToProducts}
            >
                <Icon
                    name='chevron-left'
                    color={"#fff"}
                    size={40}
                />
            </TouchableOpacity>
        )
    } else {
        return (
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
        )
    }
}