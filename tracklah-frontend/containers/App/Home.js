import React from 'react';
import{
    View, 
    Text
} from 'react-native';
import styles from '../../styles/Home-styles';

export default function Home(){
    return(
        <View style={styles.container}>
            <Text>This is the home page after login</Text>
        </View>
    )
};