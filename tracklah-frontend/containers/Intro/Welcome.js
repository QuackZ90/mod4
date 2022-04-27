import React from 'react';
import{
    View, 
    StatusBar,
    Image
} from 'react-native';
import styles from '../../styles/welcome-styles';

export default function Welcome(){
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={"#F4E0DB"}/>
            <Image
                style={styles.image}
                source={require('../../assets/TracklahCover.png')}
            />
            <Image 
                style={styles.circle}
                source={require('../../assets/WelcomeCircle.png')}
            />
            <Image
                style={styles.arrow}
                source={require('../../assets/WelcomeArrow.png')}
            />
        </View>
    );
};