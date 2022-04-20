import React from 'react';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import{
    View, 
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import styles from '../../styles/home-styles';
import cardStyles from '../../styles/card-styles';
import Card from '../../components/card';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';


export default function Home({navigation}){

    const {userLoggedIn} = useContext(UserContext);

    return(
        <View style={styles.container}>
            <Text>Welcome {userLoggedIn.username}</Text>
            <View>          
                <Card style={cardStyles.totalExCard}>
                    <Text style={cardStyles.totalExText}>Total Expenses</Text>
                </Card>
            </View>
            <View style={cardStyles.graphsCard}>
                <TouchableOpacity onPress={()=>navigation.
                                    navigate("Income and Expenses Bar Chart")}>
                    <Card style={cardStyles.graphCard}>
                        <Text>Graph</Text>
                        <Entypo name="bar-graph" size={60} color="black" />
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.
                                    navigate("Expenses Pie Chart")}>
                    <Card style={cardStyles.pieCard}>
                        <Text>Pie Chart</Text>
                        <AntDesign name="piechart" size={60} color="black" />
                    </Card>
                </TouchableOpacity>
            </View>
            <Card style={cardStyles.exListCard}>
                    <Text>Expense List</Text>
            </Card>
            <TouchableOpacity onPress={()=>navigation.
                            navigate("addExpenses")}>
            <Ionicons name="ios-add-circle-outline" size={60} color="black"/>
            </TouchableOpacity>
        </View>
    )
};