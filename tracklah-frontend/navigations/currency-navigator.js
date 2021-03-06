import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/native-stack";
import CurrencyConverter from "../containers/App/CurrencyConverter";
import Home from "../containers/App/Home";

const CurrencyStack = createDrawerNavigator();
//CurrencyConverter Screen should have a side drawer which displays list of currencies to choose
export default function CurrencyNav(){
    return(
        <CurrencyStack.Navigator tabBar={()=>null} initialRouteName="home" screenOptions={{headerStyle: {
            backgroundColor: colors.mainBackground,
          }}}>
            <CurrencyStack.Screen name = "home" component = {Home} />
            <CurrencyStack.Screen name = "currencyConverter" component = {CurrencyConverter} />

        </CurrencyStack.Navigator>
    )
};