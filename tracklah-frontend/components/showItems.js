import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { API } from '../../api/API';

export default function ThisMonthItems(props){

    [items, setItems] = useState([]);

    const getItems =  async () => {
        const { status, data } = await API.get('/protected/currentmonthitems');
        if (status === 200) {
          console.log(data)
        } 
    }

    useEffect( () => {
        console.log('App.useEffect')
        getItems();
    }, []);




    return(
        <ScrollView>







        </ScrollView>




    )
}