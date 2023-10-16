import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"

export default function BtnActionAllTasks() {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.button}
            //@ts-ignore
            onPress={() => navigation.navigate("NewTask")}
        >
            <Icon
                name='plus'
                color={"#fff"}
                size={20}
            />
        </TouchableOpacity>
    )
} 