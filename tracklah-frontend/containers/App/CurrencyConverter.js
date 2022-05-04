import React from 'react';
import{
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    View
} from 'react-native';
import { ConversionInput } from '../../components/ConversionInput';
import currencyStyles from '../../styles/CurrencyConverter-styles';
import { Ionicons } from '@expo/vector-icons';

export default function CurrencyConverter(){
    return(
        <SafeAreaView style={currencyStyles.container}>
            <StatusBar barStyle='dark-content'/>
            <View>
                <Ionicons
                    name="repeat-outline"
                    size={30}
                    style={currencyStyles.icon}
                />
                <Image
                    style={currencyStyles.image}
                    source={require('../../assets/ConverterCircle.png')}
                />
            </View>
            <TouchableOpacity>
                <ConversionInput
                    style={currencyStyles.input} 
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