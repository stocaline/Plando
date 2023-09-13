import { StyleSheet, SafeAreaView } from "react-native"
import { Header } from "../../components/Header";
import TabViewTask from "../../components/TabViewTask";

export default function Tasks() {

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Tarefas" color={"#0645ad"} taskId={""} />
            <TabViewTask/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})