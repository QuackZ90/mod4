import{View, Text} from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory-native';
import React, { useState, useEffect, useContext } from "react";
import expensesAPI from '../../api/expenses'
import colorScale from '../../components/PieChartColorScale';
import UserContext from '../../contexts/UserContext';
import moment from 'moment';

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
        useEffect( () => {
            console.log('ViewPie useEffect')
            getItems();
        }, [])

    // console.log("-----------testing-----------",itemData[0].amount.$numberDecimal);
    
    const foodGroceries = itemData.filter(data => data.category == "food")
    const foodGroceriesTotal = foodGroceries.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const transport = itemData.filter(data => data.category == "transport")
    const transportTotal = transport.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const entertainment = itemData.filter(data => data.category == "entertainment")
    const entertainmentTotal = entertainment.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const fashion = itemData.filter(data => data.category == "fashion")
    const fashionTotal = fashion.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const subUtilities = itemData.filter(data => data.category == "utilities")
    const subUtilitieTotal = subUtilities.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const healthCare = itemData.filter(data => data.category == "utilities")
    const healthCareTotal = healthCare.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const misc = itemData.filter(data => data.category == "utilities")
    const miscTotal = misc.reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const totalExpenses = foodGroceriesTotal + transportTotal + entertainmentTotal + fashionTotal + subUtilitieTotal + healthCareTotal + miscTotal


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

    return(
            <View style={{justifyContent:"center", backgroundColor:"#F4E0DB"}}>
                <Text style={{textAlign:"center", marginTop: 20}}>{userLoggedIn.username}'s {chartTitle}</Text>
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
                    labelRadius={140}
                    labelComponent={
                        <VictoryLabel angle={0} textAnchor="start" 
                        text={({ datum }) => (datum.amount > 0 ? `${datum.category} \n $${Math.round(datum.amount)}` : "" )}
                        />
                      }
                />
                    {/* Legend */}
                    {/* try hide legend, select to view all */}
                    <VictoryLegend x={60} y={10}
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