import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"
import uuid from "react-native-uuid"
import { getRealm } from '../../../database/realm';
import { useNavigation } from '@react-navigation/native';

export default function BtnActionNotes() {

    const navigation = useNavigation();

    async function handleAddNote() {
        const realm = await getRealm()
        var item = {
            _id: uuid.v4(),
            title: "Sem Titulo",
            text: "",
            updated_at: new Date().toISOString().slice(0, 10),
            created_at: new Date().toISOString().slice(0, 10),
        }
        try {
            realm.write(() => {
                realm.create("Notes", item)
            })
            //@ts-ignore
            navigation.navigate("ViewNote", { note: item })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <TouchableOpacity
            style={styles.button}
            //@ts-ignore
            onPress={() => handleAddNote()}
        >
            <Icon
                name='plus'
                color={"#fff"}
                size={20}
            />
        </TouchableOpacity>
    )
}