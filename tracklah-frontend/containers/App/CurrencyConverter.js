import React, { useState, useContext, useEffect } from 'react';
import{
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    View,
    Text
} from 'react-native';
import { ConversionInput } from '../../components/ConversionInput';
import currencyStyles from '../../styles/CurrencyConverter-styles';
import styles from '../../styles/ConversionInput-styles';
import moment from 'moment';
import currencyAPI from '../../api/currencyAPI';
import { UserContext} from '../../contexts';
import { CURRENCY_KEY } from '@env';


 
export default function CurrencyConverter(){

    const baseCurrency = "SGD"
    // const quoteCurrency = "USD"
    const conversionRate = 1.8973

    const {userLoggedIn} = useContext(UserContext);
    const [currencyRate, setCurrencyRate] = useState([]);
    const [quoteCurrency, setQuoteCurrency] = useState([]);

    const getCurrencyRates =  async (base, symbols) => {
        await currencyAPI.get(`latest?access_key=${CURRENCY_KEY}& base = USD
        & symbols = GBP,JPY,EUR`, {
            headers: {
                // Authorization : userLoggedIn.jwt,
            }
        })
            .then((response) => {
            setCurrencyRate(response.data);
            console.log(response.data);
            })
            .catch((err)=> {
            console.log(err)
            })
        };

    useEffect( 
        React.useCallback(
        () => {
        getCurrencyRates();
    }, [])
    );


    return(
        <SafeAreaView style={currencyStyles.container}>
            <StatusBar barStyle='dark-content'/>
            <View style={currencyStyles.view}>
                <TouchableOpacity onPress={() => alert('todo!')}>
                    <Image
                        style={currencyStyles.image}
                        source={require('../../assets/ConverterCircle.png')}
                    />
                </TouchableOpacity>
            </View>
                <ConversionInput
                    text={baseCurrency}
                    value="123"
                    onButtonPress={() => alert('todo!')}
                    onChangeText={text => console.log('text', text)}
                    keyboardType="numeric"
                />
                <ConversionInput 
                    text={quoteCurrency}
                    value="123"
                    onButtonPress={() => alert('todo!')}
                    editable={false}
                />
            <Text style={currencyStyles.text}>{`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as of ${moment().format("MMM Do YYYY")}.`}</Text>
        </SafeAreaView>
    );
};