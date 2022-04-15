import React from 'react';
import{
    Text,
    TouchableOpacity,
    SafeAreaView,
    StatusBar
} from 'react-native';


export default function CurrencyConverter(){
    return(
        <SafeAreaView style={{justifyContent:"center",flex:1,}}>
            <TouchableOpacity>
                <Text>This page allows you convert currencies.</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};