import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createContext, useContext, useState } from "react";
import {UserContext, defaultUserLoggedIn} from "../contexts/UserContext";

import IntroNav from "./introduction-navigator";
import AccountNav from "./account-navigator";
import AppNav from "./app-navigator";

const MainStack = createNativeStackNavigator();

export default function MainNav(){

    console.log(UserContext, defaultUserLoggedIn);


    const [userLoggedIn, setUserLoggedIn] = useState(defaultUserLoggedIn);


    return(
    <UserContext.Provider value = {{userLoggedIn, setUserLoggedIn}}>
        <MainStack.Navigator initialRouteName="intro" screenOptions={{
            headerShown:false,
        }}>
            <MainStack.Screen name="intro" component={IntroNav} screenOptions={{
            headerShown:false,
        }}/>
            <MainStack.Screen name="account" component={AccountNav} screenOptions={{
            headerShown:false,
        }}/>
            <MainStack.Screen name="app" component={AppNav} screenOptions={{
            headerShown:false,
        }}/>
    
        </MainStack.Navigator>
    </UserContext.Provider>
    )
};