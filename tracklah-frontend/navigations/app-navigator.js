import { createDrawerNavigator } from "@react-navigation/drawer";
import AddExpenses from "../containers/App/AddExpenses";
import Home from "../containers/App/Home";
import ViewPie from "../containers/App/ViewPie";
import ViewBar from "../containers/App/ViewBar";
import ShowItems from "../containers/App/ShowItems";

const AppStack = createDrawerNavigator();

export default function AppNav(){
    return(
        <AppStack.Navigator tabBar={()=>null} initialRouteName="home">
            <AppStack.Screen name = "Overview" component = {Home} />
            <AppStack.Screen name = "Add Expense or Income Item" component = {AddExpenses} />
            <AppStack.Screen name = "List Current Month Items" component = {ShowItems} />
            <AppStack.Screen name = 'Expenses Pie Chart' component={ViewPie} />
            <AppStack.Screen name = 'Income and Expenses Bar Chart' component={ViewBar} />
        </AppStack.Navigator>
    )
};