import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ShowOneItem( {route, navigation} ){

    console.log('data in ShowOneItem', route.params);

    return(
        <ScrollView>
            <Text>_id: {route.params._id}</Text>
            <Text>amount: {route.params.amount.$numberDecimal}</Text>
            <Text>category: {route.params.category}</Text>
            <Text>date: {route.params.date}</Text>
            <Text>time: {route.params.time ? route.params.time: "-"}</Text>
            {route.params.receipt_image && <Image source={{ uri: route.params.receipt_image }} style={{ width: 300, height: 300 }} />}

            <TouchableOpacity>
                
            </TouchableOpacity>
        </ScrollView>


    )
}