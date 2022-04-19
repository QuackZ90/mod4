import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroNav from "./introduction-navigator";
import AccountNav from "./account-navigator";
import AppNav from "./app-navigator";

const MainStack = createNativeStackNavigator();

export default function MainNav(){
    return(
    <MainStack.Navigator initialRouteName="intro" screenOptions={{
        headerShown:false,
    }}>
        <MainStack.Screen name = "intro" component = {IntroNav} />
        <MainStack.Screen name = "account" component = {AccountNav} />
        <MainStack.Screen name = "app" component = {AppNav} />

    </MainStack.Navigator>
    )
};