import React from 'react';
import{
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import colors from '../../styles/colors';
import { ConversionInput } from '../../components/ConversionInput';
import currencyStyles from '../../styles/CurrencyConverter-styles';

export default function CurrencyConverter(){
    return(
        <SafeAreaView style={currencyStyles.container}>
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