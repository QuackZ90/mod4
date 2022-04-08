import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../containers/App/Home";


const AppStack = createDrawerNavigator();

export default function AppNav(){
    return(
        <AppStack.Navigator tabBar={()=>null} initialRouteName="home">
            <AppStack.Screen name = "home" component = {Home} />

        </AppStack.Navigator>
    )
}