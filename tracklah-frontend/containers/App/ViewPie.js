import{View, Text, TouchableOpacity, Alert} from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory-native';
import React, { useState, useEffect, useContext } from "react";
import expensesAPI from '../../api/expenses'
import colorScale from '../../components/PieChartColorScale';
import UserContext from '../../contexts/UserContext';
import styles from "../../styles/home-styles"
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

export default function ViewPie(){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);

    const getItems =  async () => {
        await expensesAPI.get('protected/currentmonthitems', {
            headers: {
                Authorization : userLoggedIn.jwt
            }
        })
            .then((response) => {
            setItemData(response.data.data);
            //console.log("Data has been receieved", itemData);
            })
            .catch((err)=> {
            console.log(err)
            })
        }
        // Fetch data upon loading
        useFocusEffect( 
            React.useCallback(
            () => {
            console.log('ViewPie useFocusEffect')
            getItems();
        }, [])
        );

    // console.log("-----------testing-----------",itemData[0].amount.$numberDecimal);
    const foodGroceriesTotal = itemData.filter(data => data.category == "food").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const transportTotal = itemData.filter(data => data.category == "transport").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const entertainmentTotal = itemData.filter(data => data.category == "entertainment").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const fashionTotal = itemData.filter(data => data.category == "fashion").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const subUtilitieTotal = itemData.filter(data => data.category == "utilities").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const healthCareTotal = itemData.filter(data => data.category == "healthcare").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const miscTotal = itemData.filter(data => data.category == "misc").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    //const totalExpenses = foodGroceriesTotal + transportTotal + entertainmentTotal + fashionTotal + subUtilitieTotal + healthCareTotal + miscTotal

    const chartTitle = "Current Month Expenses"

    const displayData = [
        { category: "Food and Groceries", amount: foodGroceriesTotal},
        { category: "Transport", amount: transportTotal },
        { category: "Entertainment", amount: entertainmentTotal },
        { category: "Fashion", amount: fashionTotal },
        { category: "Subscription and Utilities", amount: subUtilitieTotal },
        { category: "Healthcare", amount: healthCareTotal },
        { category: "All Other Miscellaneous", amount: miscTotal },
    ]

    const legendName = displayData.map(legend => ( { name: legend.category } )) //require { "name": category }

    const exportExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    return(
            <View style={styles.container}>
                <Text style={{textAlign:"center", marginTop: 20}}>{userLoggedIn.username}'s {chartTitle}</Text>
                <TouchableOpacity onPress={exportExp}>
                <AntDesign name="export" size={24} color="black"  style={{ 
                                                                            height: 25, 
                                                                            width: 25, 
                                                                            alignSelf: 'flex-end',
                                                                            position: 'relative',
                                                                            right: 50,
                                                                        }} />
                </TouchableOpacity>
                    {/* <View style={{ position: 'absolute', top: '17%', left: "39%", width: 80}}>
                        <Text style={{textAlign: 'center', color: '#000000'}}>{pieChartTitle}</Text> */}
                    {/* </View> */}
                <VictoryPie
                    width={350} height={360}
                    data={displayData} 
                    x="category"
                    y="amount"
                    theme={VictoryTheme.material} 
                    colorScale={colorScale}
                    // innerRadius={50}
                    style={{
                        data: {
                        fillOpacity: 0.9, 
                        stroke: "black", 
                        strokeWidth: 1
                        },
                        labels: {
                        fontSize: 11, fill: "black",
                        },
                    }}
                    labelRadius={150}
                    labelComponent={
                        <VictoryLabel angle={0} textAnchor="middle" 
                        text={({ datum }) => (datum.amount > 0 ? `${datum.category} \n $${Math.round(datum.amount)}` : "" )}
                        />
                      }
                />
                    {/* Legend */}
                    <VictoryLegend x={50}
                    // <VictoryLegend x={30} y={10}
                            title="Category"
                            centerTitle
                            orientation="horizontal"
                            gutter={20}
                            itemsPerRow={2}
                            style={{ border: { stroke: "black" } }}
                            colorScale={colorScale}
                            data={legendName}
                            height={400}
                            borderPadding={10}
                    />
                    {/* insert Percent Label on Pie Chart */}
            </View>
    )
}