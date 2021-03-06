import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles, cardStyles, btnStyles } from '../../styles';
import { Card, calculateTotal} from '../../components';
import { AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import expensesAPI from '../../api/expenses';
import { height, width } from './CurrencyConverter';

export default function Home({navigation}){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [buttonIconSize, setButtonIconSize] = useState();

    console.log(buttonIconSize);

    const getItems =  async () => {
        try {
            const response = await expensesAPI.get('protected/currentmonthitems', {
            headers: {
                Authorization : userLoggedIn.jwt
            }
        })
            response.data.data.sort((data1, data2)=>moment(data1.date, "MMM Do YYYY").date()-moment(data2.date, "MMM Do YYYY").date());

            setItemData(response.data.data);
            } catch(err) {
            console.log(err)
            } finally {
                setLoading(false);
            }
        };
    useFocusEffect( 
        React.useCallback(
        () => {
        getItems();
    }, [])
    );
     
    const totalExpenses = calculateTotal(itemData).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thousand separator(String)
 
    const Item = ({ onPress, date, onPressDelete, title, amount }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>          
            <Text style={styles.amount}>${amount.$numberDecimal}</Text>
        </View>
    );

    const renderItem = ({ item }) => {

        return (
            <Item 
                date={item.date}
                title={item.description}
                amount={item.amount}
            />           
        )
    };

    let recentItems = [];
    itemData.reverse();
    console.log("ITEM DATA", itemData);

    recentItems.push(itemData[0], itemData[1], itemData[2], itemData[3], itemData[4]);
    console.log("RECENT", recentItems);

    return(
        <View style={[styles.container,{alignItems:"center"}]}>
            <View style={styles.row}>
                <Text style={styles.welcomeText}>Welcome {userLoggedIn.name}</Text>
            </View>

            <View style={{position:"absolute", top:34, right:50, zIndex:1000}}>
                <TouchableOpacity
                    style={{borderColor:"#968484", borderWidth:0, top: 0, backgroundColor: "#968484", borderRadius:70, borderWidth:3 }} 
                    onPress={()=>navigation.navigate("Add Expense Item")}>
                <AntDesign 
                    style={styles.addIcon}
                    name="pluscircle"
                    size= {60}
                />
                </TouchableOpacity>
            </View>

            <View style={[styles.row, {zIndex:0}]}>          
                <Card>
                    <Text style={{fontWeight: "bold", color: "#E2E2E2", left:5, fontSize:15}}>{moment().format("MMMM").toString().toUpperCase()} EXPENSES:</Text>
                    <Text style={{color: "#E2E2E2", left:5, fontSize:12}}>(Up till {moment().format("Do MMM").toString()})</Text>
                    <Text style={cardStyles.totalExText}>
                        {loading && <Text>Loading...</Text>}
                        {!loading && error && <Text>Error</Text>}
                        {!loading && !error && itemData && <Text>${totalExpenses ?? 0}</Text>}
                        {!loading && !error && !itemData && <Text>Nothing to display</Text>}
                    </Text>
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
                </TouchableOpacity>
            </View>
            
            <View style={[styles.row, {maxHeight: 0.28*height}]}>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate("List Current Month Items")}>
                    <Card>
                        {recentItems[0]?
                        <FlatList
                        style={[styles.row, {width: width*0.9, left: -width*0.05}]}
                        data={recentItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        />:null}
                    </Card>                   
                </TouchableOpacity>
            </View>

        </View>
    )
};

