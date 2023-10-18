import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Icon from "react-native-vector-icons/Feather"
import BtnReturn from '../HeaderBtns/BtnReturn/index';
import BtnActionNotes from '../HeaderBtns/BtnActionNotes';
import BtnActionProducts from '../HeaderBtns/BtnActionProducts';
import BtnActionAllTasks from '../HeaderBtns/BtnActionAllTasks';
import BtnActionTask from '../HeaderBtns/BtnActionTask';

type Props = {
    title: string;
    color: string;
    taskId: string;
    productId: string;
}

export function Header({ title, color, taskId, productId }: Props) {

    function buttonHeader() {
            if (title == "Tarefas") {
                return (
                    <BtnActionAllTasks />
                )
            } else if (title == "Tarefa" || title == "Super Tarefa") {
                return (
                    <BtnActionTask title={title} taskId={taskId} color={color} />
                )
        } else if (title == "Anotações") {
            return (
                <BtnActionNotes />
            )
        } else if (title == "Produto") {
            return (
                <BtnActionProducts productId={productId}/>
            )
        } else {
            return <View></View>
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <StatusBar
                animated={true}
                backgroundColor={color}
                barStyle={"default"}
                showHideTransition={"slide"}
                hidden={false}
            />

            <BtnReturn title={title} />

            <View style={styles.content}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
            {buttonHeader()}
        </View>

    );
}