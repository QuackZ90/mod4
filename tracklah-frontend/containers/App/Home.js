import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts';
import{
    View, 
    Text,
    TouchableOpacity,
    Animated,
    Dimensions, 
} from 'react-native';
import { styles, colors, cardStyles,btnStyles } from '../../styles';
import {Card, calculateTotal} from '../../components';
import { AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import {
    GestureHandlerRootView,
    PanGestureHandler
} from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import expensesAPI from '../../api/expenses';
// import SwipeUp from '../../components/gestureHandlerUp';
// import { VictoryPie, VictoryTheme, VictoryAxis, VictoryLabel, VictoryChart, VictoryBar} from 'victory-native';

// const {width} = Dimensions.get('screen');
// const circleRadius = 30;

export default function Home({navigation}){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([])

    //Get Current Month Items
    const getItems =  async () => {
        await expensesAPI.get('protected/currentmonthitems', {
            headers: {
                Authorization : userLoggedIn.jwt
            }
        })
            .then((response) => {
            setItemData(response.data.data);
            })
            .catch((err)=> {
            console.log(err)
            })
        }

    useFocusEffect( 
        React.useCallback(
        () => {
        getItems();
    }, [])
    );

    const totalExpenses = calculateTotal(false,itemData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // better than toLocaleString memory leak issue. Display as string with thousand separator
    //console.log(`Current Month Total Expenses: $ ${totalExpenses}` ?? 0);

    // touchX = new Animated.Value(width/2 - circleRadius);

    // onPanGestureEvent = Animated.event([{ nativeEvent: { x: this.touchX }}], {
    //     useNativeDriver: true
    // });

    let todayData = itemData.filter((item => item.date === moment().format("MMM Do YYYY") ))
    console.log("todayData", todayData)
 
    return(
        <View style={styles.container}>

            <Text style={styles.welcomeText}>Welcome {userLoggedIn.name}</Text>

            <View>          
                <Card style={cardStyles.totalExCard}>
                    <TouchableOpacity onPress={()=>navigation.navigate("List Current Month Items")}>
                    <Text style={{fontWeight: "bold", color: "#E2E2E2", left:5, fontSize:15}}>{moment().format("MMMM").toString().toUpperCase()} EXPENSES:</Text>
                    <Text style={{color: "#E2E2E2", left:5, fontSize:12}}>(Up till {moment().format("Do MMM").toString()})</Text>
                    <Text style={cardStyles.totalExText}>${totalExpenses}</Text>
                    </TouchableOpacity>
                </Card>
            </View>
            <View style={[cardStyles.graphsCard, {justifyContent:"space-between"}]}>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Graph Chart"
                    onPress={()=>navigation.navigate("Income and Expenses Bar Chart")}
                >
                    <Entypo 
                        name="bar-graph" 
                        size={100} 
                        color="lightgrey" 
                        style={styles.graphIcon}
                    />
                {/* Income & Expenses Chart (small version) */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Pie Chart" 
                    onPress={()=>navigation.navigate("Expenses Pie Chart")} 
                >
                    <AntDesign 
                        name="piechart" 
                        size={100} 
                        color="lightgrey" 
                        style={styles.pieIcon}
                    />
                    {/* Pie Chart (Small Version) */}
                </TouchableOpacity>
            </View>
            <GestureHandlerRootView>
                <PanGestureHandler>
                    <View>
                    {/* <Animated.View
                        style={[
                            {transform: [
                                {
                                    translateX: Animated.add(this.touchX, new Animated.Value(-circleRadius))
                                }
                            ]}
                        ]}
                    /> */}
                        <Card style={cardStyles.exListCard}>
                                <Text style={{color:"#E2E2E2", fontSize:20}}>Expense List</Text>
                        </Card>
                    </View>
                </PanGestureHandler>
            </GestureHandlerRootView>
            <View>
                <TouchableOpacity
                    style={{left: 160, top: 120, width: 65, height: 65}} 
                    onPress={()=>navigation.navigate("Add Expense or Income Item")}>
                <AntDesign 
                    style={styles.addIcon}
                    name="pluscircle"
                    size= {60} 
                />
                </TouchableOpacity>
            </View>
        </View>
    )
};