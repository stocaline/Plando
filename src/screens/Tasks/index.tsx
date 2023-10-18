import { SafeAreaView } from "react-native"
import { styles } from "./styles";
import { Header } from "../../components/Header";
import TabViewTask from "../../components/TabViewTask";

export default function Tasks() {

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Tarefas" color={"#0645ad"} taskId="" productId={""}/>
            <TabViewTask/>
        </SafeAreaView>
    );
}