import React from 'react';
import { 
    View,
 } from 'react-native';
 import cardStyles from '../styles/card-styles';

 export default function Card(props){
    return (
        <View style={cardStyles.card}>
            <View style={cardStyles.cardContent}>
                {props.children}
            </View>
        </View>
    )
 };