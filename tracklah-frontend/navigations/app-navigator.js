import { createDrawerNavigator } from "@react-navigation/drawer";
import SimpleAddExpenses from "../containers/App/SimpleAddExpenses";
import AddExpenses from "../containers/App/AddExpenses";
import Home from "../containers/App/Home";
import ViewPie from "../containers/App/ViewPie";
import ViewBar from "../containers/App/ViewBar";
import ShowItems from "../containers/App/ShowItems";
import colors from '../styles/colors'
import AmendUserData from "../containers/Account/UserData";
import CurrencyConverter from "../containers/App/CurrencyConverter";


const AppStack = createDrawerNavigator();

export default function AppNav(){
    return(
        <AppStack.Navigator 
            tabBar={()=>null} 
            initialRouteName="home" 
            screenOptions={{
                headerStyle: {
                backgroundColor: colors.mainBackground,
                }
          }}>
            <AppStack.Screen name = "Overview" component = {Home} />
            <AppStack.Screen name = "Add Expense Item" component = {SimpleAddExpenses} />
            <AppStack.Screen name = "Add Expense or Income Item" 
                component = {AddExpenses} 
                options={{
                    drawerItemStyle: { display: 'none' }
                }} 
            />
            <AppStack.Screen name = "List Current Month Items" component = {ShowItems} />
            <AppStack.Screen name = 'Expenses Pie Chart' component={ViewPie} />
            <AppStack.Screen name = 'Income and Expenses Bar Chart' component={ViewBar} />
            <AppStack.Screen name = 'Currency Converter' component={CurrencyConverter} />
            <AppStack.Screen name = 'Amend User Profile' component={AmendUserData} />
        </AppStack.Navigator>
    )
};