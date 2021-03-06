import React, { useState, useContext, useEffect } from 'react';
import{
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Image,
    View,
    Text,
    Dimensions
} from 'react-native';
import { ConversionInput } from '../../components/ConversionInput';
import currencyStyles from '../../styles/CurrencyConverter-styles';
import moment from 'moment';
import { UserContext } from '../../contexts';
import getCurrencyRates from '../../actions/ConvertCurrency';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

 
export default function CurrencyConverter(){

    const {userLoggedIn} = useContext(UserContext);    
    
    const [baseCurrency, setBaseCurrency] = useState(userLoggedIn.defaultCurrency);
    const [currencyRate, setCurrencyRate] = useState([]);
    const [quoteCurrency, setQuoteCurrency] = useState(userLoggedIn.defaultCurrency);
    const [baseAmount, setBaseAmount] = useState(0);
    const [quoteAmount, setQuoteAmount] = useState(0)

    useEffect( 
        () => {
            if (baseCurrency === quoteCurrency){
                setCurrencyRate(1);
            }else{
                console.log('base currency',baseCurrency);
                console.log('quote currency', quoteCurrency);
                getCurrencyRates(baseCurrency, quoteCurrency).then(response=>{
                console.log('conversion rate', response[quoteCurrency]);
                setCurrencyRate(response[quoteCurrency])
                }).catch(err=>{
                    console.log(err);
                });
            }
    }, [quoteCurrency, baseCurrency]);

    const converted = baseAmount * currencyRate;

    return(
        <SafeAreaView style={currencyStyles.container}>
            <StatusBar barStyle='dark-content'/>
            <View style={currencyStyles.view}>
                
                <TouchableOpacity onPress={() =>{
                    const temp = baseCurrency;
                    setBaseCurrency(quoteCurrency);
                    setQuoteCurrency(temp);
                }}>
                    <Image
                        style={currencyStyles.image}
                        source={require('../../assets/ConverterCircle.png')}
                    />          
                </TouchableOpacity>

            </View>
            <View>
                <ConversionInput
                    style={{left: -width*0.3}}
                    amount={baseAmount}
                    setAmount = {setBaseAmount}
                    onChangeText={text => {setBaseAmount(text)}}
                    currency = {baseCurrency}
                    setCurrency = {setBaseCurrency}
                    keyboardType="numeric"
                />
                <ConversionInput 
                    style={{left: -width*0.3}}
                    amount={converted}
                    setAmount = {setQuoteAmount}
                    editable={false}
                    currency ={quoteCurrency}
                    setCurrency = {setQuoteCurrency}
                />
            </View>
            <Text style={currencyStyles.text}>{`1 ${baseCurrency} = ${currencyRate} ${quoteCurrency} as of ${moment().format("MMM Do YYYY")}.`}</Text>
        </SafeAreaView>
    );
};