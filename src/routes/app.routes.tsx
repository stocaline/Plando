import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../screens/Home"
import NewTask from "../screens/NewTask"
import ViewTask from "../screens/ViewTask"
import Tasks from "../screens/Tasks"

const Stack = createNativeStackNavigator()

function AppRoutes() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
                <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
                <Stack.Screen name="ViewTask" component={ViewTask} options={{ headerShown: false }} />
            </Stack.Navigator>
    )
}

export default AppRoutes