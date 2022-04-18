import React from 'react';
import{
    View, 
    Text,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import colors from '../../styles/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
});

export default function Welcome(){
    return(
        <View style={styles.container}>
            <StatusBar barStyle='light-content'/>
            <Image
                source={require('../../assets/TracklahCover.png')}
            />
            <Text>Welcome page. swipe left to continue</Text>
        </View>
    )
};