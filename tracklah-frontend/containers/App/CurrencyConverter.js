import React from 'react';
import{
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    StyleSheet
} from 'react-native';
import colors from '../../styles/colors';
import { ConversionInput } from '../../components/ConversionInput';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.beige,
        flex: 1,
        justifyContent: "center"
    },
});


export default function CurrencyConverter(){
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <StatusBar barStyle='light-content' backgroundColor={colors.beige}/>
                <Text>This page allows you convert currencies.</Text>
                <ConversionInput 
                    text="SGD"
                    value="123"
                    onButtonPress={() => alert('todo!')}
                />
                <ConversionInput 
                    text="USD"
                    value="123"
                    onButtonPress={() => alert('todo!')}
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};