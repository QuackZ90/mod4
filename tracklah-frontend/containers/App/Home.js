import React from 'react';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import{
    View, 
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import styles from '../../styles/home-styles';
import cardStyles from '../../styles/card-styles';
import btnStyles from '../../styles/button-styles';
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
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Graph Chart"
                    onPress={()=>navigation.navigate("Income and Expenses Bar Chart")}
                >
                    <Entypo 
                        name="bar-graph" 
                        size={60} color="lightgrey" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={btnStyles.button}
                    title="Pie Chart" 
                    onPress={()=>navigation.navigate("Expense Pie Chart")} 
                >
                    <AntDesign 
                        name="piechart" 
                        size={60} color="lightgrey" />
                </TouchableOpacity>

            </View>

            <Card style={cardStyles.exListCard}>
                    <Text>Expense List</Text>
            </Card>
            <TouchableOpacity 
                onPress={()=>navigation.navigate("addExpenses")}>
            <Ionicons 
                style={styles.addIcon}
                name="ios-add-circle-outline"
                size= {60} 
            />
            </TouchableOpacity>
        </View>
    )
};