import { View, Text, StatusBar, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import expensesAPI from '../../api/expenses';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;

export default function ThisMonthItems({navigation}){

    const [listItems, setListItems] = useState([]);
    const {userLoggedIn} = useContext(UserContext);
    
    const getItems =  async () => {
        const { status, data } = await expensesAPI.get(
            '/protected/currentmonthitems', 
            { headers: {
                Authorization : userLoggedIn.jwt
            }}
        )   
        
        if (status === 200) {
            // console.log("data in getitems", data.data)
            console.log(data.data);
            data.data.sort((data1,data2)=>moment(data1.date, "MMM Do YYYY").date()-moment(data2.date, "MMM Do YYYY").date());
            console.log(data.data);

            setListItems(data.data);
        } else {
            console.log("Error in data retrieval");
        }
    }

    const deleteItem =  async (itemId) => {

        let body = { itemId: itemId };
        console.log("body in deleteItem", body);

        await expensesAPI.delete(
            '/protected/items', {
                headers: {
                    authorization : userLoggedIn.jwt
                },
                data: body
            }        
        )   
        .then((response) => {
            const data = response.data;
            console.log("Database has been updated");
        })
        .catch((err)=> {
            console.log(err);
        });
    }

    const handleDeleteItem = async (itemId) => {
        // delete the corresponding item from list.

        console.log("itemId in handleDeleteItem", itemId);

        let newArray = [...listItems];
        let deleteIndex = newArray.findIndex( e => e._id == itemId);
        newArray.splice(deleteIndex,1);
        setListItems(newArray);

        // console.log("newArray", newArray);

        // update the database.
        await deleteItem(itemId);
    }

    useFocusEffect( 
        React.useCallback(
        () => {
        console.log("Calling useFocusEffect in ShowItems");
        getItems();
    }, [])
    );

    const Item = ({ onPressDelete, date, title, amount, onPress }) => (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            {/* <Text style={styles.date}>{date.slice(0,8)}</Text> */}
            <Text style={styles.title}>{title}</Text>          
            <Text style={styles.amount}>${amount.$numberDecimal}</Text>
            <TouchableOpacity style={styles.trashcontainer} onPress={onPressDelete}>
                    <Ionicons 
                        name="trash-outline"
                        size= {20}
                    />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {

        console.log("item in renderItem", item);

        return (
            <Item 
                onPressDelete={()=>handleDeleteItem(item._id)}
                date={item.date}
                title={item.description}
                amount={item.amount}
                onPress={()=>navigation.navigate("Show One Item", item)}
            />           
        )
    };

    listItems.sort()
    
    return(
        <View style={styles.mainBg}>
            <View style={styles.pane}>
                <TouchableOpacity onPress={() => navigation.navigate("Overview")}>
                    <Ionicons 
                        name="chevron-down-outline"
                        size= {20}
                        color='white'
                    />
                </TouchableOpacity>
                <FlatList
                    data={listItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pane: {
        backgroundColor: "#968484",
        marginBottom: 60,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    mainBg: {
        backgroundColor: "#F4E0DB",
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flexDirection: 'row',
        width: windowWidth*0.8,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F4E0DB",
        borderRadius: 20,
        marginVertical: 5,
    },
    title: {
        fontSize: 12,
        paddingHorizontal: 0,
        textTransform: 'uppercase',
        width: 120,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    date: {
        fontSize: 20,
        paddingHorizontal: 10,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    amount: {
        fontSize: 20,
        marginLeft: 70,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    trashcontainer:{
        flexDirection: 'column',
        justifyContent: 'center',

    }
});