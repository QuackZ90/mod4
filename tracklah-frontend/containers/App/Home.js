import React from 'react';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import{
    View, 
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import styles from '../../styles/Home-styles';
import cardStyles from '../../styles/card-styles';
import Card from '../../components/card';




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
                <TouchableOpacity>
                    <Card style={cardStyles.graphCard}>
                        <Text>Pie Chart</Text>
                        <Button title="View Charts" onPress={()=>navigation.navigate("View Charts")} />
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={cardStyles.pieCard}>
                        <Text>Graph</Text>
                    </Card>
                </TouchableOpacity>
            </View>
            <Card style={cardStyles.exListCard}>
                    <Text>Expense List</Text>
            </Card>
        </View>
    )
}