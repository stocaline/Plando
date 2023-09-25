import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../screens/Home"
import NewTask from "../screens/NewTask"
import ViewTask from "../screens/ViewTask"
import ViewSuperTask from "../screens/ViewSuperTask"
import Tasks from "../screens/Tasks"
import Notes from "../screens/Notes"
import ViewNote from "../screens/ViewNote"
import Products from "../screens/Products"
import ViewProduct from "../screens/ViewProduct"

const Stack = createNativeStackNavigator()

function AppRoutes() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />
                <Stack.Screen name="NewTask" component={NewTask} options={{ headerShown: false }} />
                <Stack.Screen name="ViewTask" component={ViewTask} options={{ headerShown: false }} />
                <Stack.Screen name="ViewSuperTask" component={ViewSuperTask} options={{ headerShown: false }} />
                <Stack.Screen name="Notes" component={Notes} options={{ headerShown: false }} />
                <Stack.Screen name="ViewNote" component={ViewNote} options={{ headerShown: false }} />
                <Stack.Screen name="Products" component={Products} options={{ headerShown: false }} />
                <Stack.Screen name="ViewProduct" component={ViewProduct} options={{ headerShown: false }} />
            </Stack.Navigator>
    )
}

export default AppRoutes