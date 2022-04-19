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
                    <Text style={cardStyles.totalExText}>Total Expenses</Text>
                </Card>
            <TouchableOpacity>
                <Card style={cardStyles.card2}>
                    <Text>Pie Chart</Text>
                </Card>
            </TouchableOpacity>
            <TouchableOpacity>
                <Card style={cardStyles.card3}>
                    <Text>Graph</Text>
                </Card>
            </TouchableOpacity>
        </View>
    )
};