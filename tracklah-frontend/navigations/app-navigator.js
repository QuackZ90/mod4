import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import SimpleAddExpenses from "../containers/App/SimpleAddExpenses";
import AddExpenses from "../containers/App/AddExpenses";
import Home from "../containers/App/Home";
import ViewPie from "../containers/App/ViewPie";
import ViewBar from "../containers/App/ViewBar";
import ShowItems from "../containers/App/ShowItems";
import ShowOneItem from "../containers/App/ShowOneItem";
import { colors } from '../styles'
import AmendUserData from "../containers/Account/UserData";
import CurrencyConverter from "../containers/App/CurrencyConverter";
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { UserContext, defaultUserLoggedIn} from "../contexts";
import { useContext } from "react";
import { data } from "currency-codes";

const AppStack = createDrawerNavigator();
const itemData = { value: 'hello'};

export default function AppNav(){

    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    return(
        <AppStack.Navigator 
            tabBar={()=>null} 
            initialRouteName="home"
            screenOptions={{
                    headerShown: false,
                    headerStyle: { 
                        backgroundColor: colors.mainBackground
                    },
                    drawerStyle: {
                        backgroundColor: colors.drawer,
                        width: 320,
                        borderRadius: 20,
                    },
                    drawerActiveTintColor: colors.mainBackground,
                    // drawerInactiveTintColor: colors.listBackground,
                    drawerLabelStyle: {
                        // fontWeight: "bold",
                        // borderRadius: 20,
                        // backgroundColor: colors.mainBackground,
                        // color: colors.homeText,
                        padding: 10,
                    },
                }}
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="Logout"
                        labelStyle={{
                            // color: colors.homeText, 
                            padding: 10,
                        }}
                        onPress={() => {
                            setUserLoggedIn(()=>defaultUserLoggedIn);
                            props.navigation.navigate("account")
                        }} 
                        icon={({ focused }) => <Ionicons name="log-out-outline" size={24} color={focused ? colors.homeText : '#ccc'} /> }
                        />
                    </DrawerContentScrollView>
                )
            }}
        >
            <AppStack.Screen name = "Overview" component = {Home} 
                options={{ 
                    headerShown: false,
                    drawerIcon: ({focused}) => ( <Ionicons name="home-outline" size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
            <AppStack.Screen name = "Add Expense Item" component = {SimpleAddExpenses} 
                options={{ 
                    drawerIcon: ({focused}) => ( <Ionicons name="add-outline" size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
            <AppStack.Screen name = "Add Expense or Income Item" 
                component = {AddExpenses} 
                options={{
                    drawerItemStyle: { display: 'none' }
                }} 
            />

            <AppStack.Screen name = "Show One Item" 
                options={{
                    drawerItemStyle: { display: 'none' }
                }} 
            >
            {props => <ShowOneItem {...props} extraData={itemData} />}
            </AppStack.Screen>
            <AppStack.Screen name = "List Current Month Items" component = {ShowItems} 
                options={{ 
                    drawerIcon: ({focused}) => ( <Ionicons name="list-outline" size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
            <AppStack.Screen name = 'Expenses Pie Chart' component={ViewPie} 
                options={{ 
                    drawerIcon: ({focused}) => ( <AntDesign name="piechart" size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
            <AppStack.Screen name = 'Income and Expenses Chart' component={ViewBar} 
                options={{ drawerIcon: ({focused}) => ( <Entypo name="bar-graph"  size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
            <AppStack.Screen name = 'Currency Converter' component={CurrencyConverter} 
                options={{ 
                    drawerIcon: ({focused}) => ( <Ionicons name="cash-outline" size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
            <AppStack.Screen name = 'Amend User Profile' component={AmendUserData} 
                options={{ 
                    drawerIcon: ({focused}) => ( <Ionicons name="person-outline" size={24} color={focused ? colors.homeText : '#ccc'} /> )
                }}
            />
        </AppStack.Navigator>
    )
};