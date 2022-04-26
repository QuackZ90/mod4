import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createContext, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

import IntroNav from "./introduction-navigator";
import AccountNav from "./account-navigator";
import AppNav from "./app-navigator";

const MainStack = createNativeStackNavigator();

export default function MainNav(){

    let user = {
        username: null,
        userId: null,
        jwt: null,
        name: null,
        defaultCurrency:null,
    }

    const [userLoggedIn, setUserLoggedIn] = useState(user);


    return(
    <UserContext.Provider value = {{userLoggedIn, setUserLoggedIn}}>
        <MainStack.Navigator initialRouteName="intro" screenOptions={{
            headerShown:false,
        }}>
            <MainStack.Screen name = "intro" component = {IntroNav} />
            <MainStack.Screen name = "account" component = {AccountNav} />
            <MainStack.Screen name = "app" component = {AppNav} />
    
        </MainStack.Navigator>
    </UserContext.Provider>
    )
};