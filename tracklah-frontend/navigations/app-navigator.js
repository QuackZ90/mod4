import { createDrawerNavigator } from "@react-navigation/drawer";
import AddExpenses from "../containers/App/AddExpenses";
import Home from "../containers/App/Home";
import ViewCharts from "../containers/App/ViewCharts";

const AppStack = createDrawerNavigator();

export default function AppNav(){
    return(
        <AppStack.Navigator tabBar={()=>null} initialRouteName="home">
            <AppStack.Screen name = "home" component = {Home} />
            <AppStack.Screen name = "addExpenses" component = {AddExpenses} />
            <AppStack.Screen name = 'View Charts' component={ViewCharts} />

        </AppStack.Navigator>
    )
}