import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateLogin from "../containers/Account/CreateLogin";
import CreateAccount from "../containers/Account/CreateAccount";
import Login from "../containers/Account/Login";


const AccountStack = createNativeStackNavigator()

export default function AccountNav(){
    return(
        <AccountStack.Navigator tabBar={()=>null} initialRouteName="welcome">
            <AccountStack.Screen name = "createLogin" component = {CreateLogin} />
            <AccountStack.Screen name = "createAccount" component={CreateAccount} />
            <AccountStack.Screen name = "login" component={Login} />
        </AccountStack.Navigator>
    )
}