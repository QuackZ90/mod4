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
import { Entypo } from '@expo/vector-icons';

export default function CurrencyConverter(){
    return(
        <SafeAreaView style={currencyStyles.container}>
            <TouchableOpacity>
                <StatusBar barStyle='dark-content'/>
                    <View>
                        <Image
                            style={currencyStyles.image}
                            source={require('../../assets/ConverterCircle.png')}
                        />
                    </View>
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