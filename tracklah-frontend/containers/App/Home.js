import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts';
import{
    View, 
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { styles, cardStyles, btnStyles } from '../../styles';
import {Card, calculateTotal} from '../../components';
import { AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import expensesAPI from '../../api/expenses';

export default function Home({navigation}){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);
    const [buttonIconSize, setButtonIconSize] = useState();

    console.log(buttonIconSize);

    //Get Current Month Items
    const getItems =  async () => {
        await expensesAPI.get('protected/currentmonthitems', {
            headers: {
                Authorization : userLoggedIn.jwt
            }
        })
            .then((response) => {
            setItemData(response.data.data);
            })
            .catch((err)=> {
            console.log(err)
            })
        };

    useFocusEffect( 
        React.useCallback(
        () => {
        getItems();
    }, [])
    );

    const totalExpenses = calculateTotal(itemData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thousand separator(String)

    let todayData = itemData.filter((item => item.date === moment().format("MMM Do YYYY") ))
    //console.log("todayData", todayData)
 
    const Item = ({ onPress, date, title, amount }) => (
        <View style={styles.item}>
            {/* <Text style={styles.date}>{date.slice(0,8)}</Text> */}
            <Text style={styles.title}>{title}</Text>          
            <Text style={styles.amount}>${amount.$numberDecimal}</Text>
        </View>
    );

    const renderItem = ({ item }) => {

        // console.log("item in renderItem", item);

        return (
            <Item 
                onPress={()=>handleDeleteItem(item._id)}
                date={item.date}
                title={item.description}
                amount={item.amount}
            />           
        )
    };

    todayData.sort();

    return(
        <View style={[styles.container,{alignItems:"center"}]}>

            <View style={styles.row}>
                <Text style={styles.welcomeText}>Welcome {userLoggedIn.name}</Text>
            </View>

            <View style={styles.row}>          
                <Card>
                    <Text style={{fontWeight: "bold", color: "#E2E2E2", left:5, fontSize:15}}>{moment().format("MMMM").toString().toUpperCase()} EXPENSES:</Text>
                    <Text style={{color: "#E2E2E2", left:5, fontSize:12}}>(Up till {moment().format("Do MMM").toString()})</Text>
                    <Text style={cardStyles.totalExText}>${totalExpenses}</Text>
                </Card>
            </View>
            <View style={[cardStyles.graphsCard, {justifyContent:"space-between"}, styles.row]}>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Graph Chart"
                    onPress={()=>navigation.navigate("Income and Expenses Chart")}
                    onLayout={layoutEvent =>
                        setButtonIconSize(layoutEvent.nativeEvent.layout.width*0.75)
                      }
                >
                    <Entypo 
                        name="bar-graph" 
                        size={buttonIconSize}
                        color="lightgrey" 
                    />
                {/* Income & Expenses Chart (small version) */}
                </TouchableOpacity>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Pie Chart" 
                    onPress={()=>navigation.navigate("Expenses Pie Chart")}

                >
                    <AntDesign 
                        name="piechart" 
                        size={buttonIconSize} 
                        color="lightgrey" 
                    />
                    {/* Pie Chart (Small Version) */}
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate("List Current Month Items")}>
                    <Card>
                        <FlatList
                        data={todayData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        >
                        </FlatList>
                    </Card>                   
                </TouchableOpacity>
            </View>
            <View style={{position:"absolute", bottom:50}}>
                <TouchableOpacity

                    style={{borderColor:"red", borderWidth:0}} 
                    onPress={()=>navigation.navigate("Add Expense Item")}>

                <AntDesign 
                    style={styles.addIcon}
                    name="pluscircle"
                    size= {60} 
                />
                </TouchableOpacity>
            </View>
        </View>
    )
};