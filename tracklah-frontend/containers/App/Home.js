import React from 'react';
import{
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from '../../styles/home-styles';
import cardStyles from '../../styles/card-styles';
import Card from '../../components/card';


export default function Home(navigation){

    return(
        <View style={styles.container}>
            <View>          
                <Card style={cardStyles.totalExCard}>
                    <Text style={cardStyles.totalExText}>Total Expenses</Text>
                </Card>
            </View>
            <View style={cardStyles.graphsCard}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Income and Expenses Bar Chart')}    
                >
                    <Card style={cardStyles.graphCard}>
                        <Text>Pie Chart</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Expense Pie Chart')}
                >
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
};