import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Welcome from "../containers/Intro/Welcome";
import Onboarding1 from "../containers/Intro/Onboarding1";
import Onboarding2 from "../containers/Intro/Onboarding2";
import Onboarding3 from "../containers/Intro/Onboarding3";

const IntroStack = createMaterialTopTabNavigator();

export default function MainNav(){
    return(
    <IntroStack.Navigator initialRouteName="welcome" tabBar={()=>null}>
        <IntroStack.Screen name = "welcome" component = {Welcome} />
        <IntroStack.Screen name = "onboarding1" component = {Onboarding1} />
        <IntroStack.Screen name = "onboarding2" component = {Onboarding2} />
        <IntroStack.Screen name = "onboarding3" component = {Onboarding3} />
    </IntroStack.Navigator>
    )
};