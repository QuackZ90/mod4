import React from 'react';
import{
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from '../../styles/Home-styles';
import cardStyles from '../../styles/card-styles';
import Card from '../../components/card';


export default function Home(){

    return(
        <View style={styles.container}>           
            <Card style={cardStyles.totalExCard}>
                <Text style={cardStyles.cardContent}>Total Expenses</Text>
            </Card>
            <TouchableOpacity>
                <Card style={cardStyles.graphCard}>
                    <Text>Pie Chart</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity>
                <Card style={cardStyles.pieCard}>
                    <Text>Graph</Text>
                </Card>
            </TouchableOpacity>
        </View>
    )
};