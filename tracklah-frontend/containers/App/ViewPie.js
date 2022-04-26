import{View, Text, TouchableOpacity, Alert, Dimensions} from 'react-native';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory-native';
import React, { useContext } from "react";
import { UserContext, ExpenseContext } from '../../contexts';
import {styles} from "../../styles/"
import { AntDesign } from '@expo/vector-icons';
import {colorScale, calculateTotal, calculateCategoryTotal} from '../../components/';
import moment from 'moment';

export default function ViewPie(){

    const {userLoggedIn} = useContext(UserContext);
    const {itemData} = useContext(ExpenseContext);
    //const [labelStatus,setLabelStatus] = useState(false);

    const totalExpenses = calculateTotal(false,itemData)
    const chartTitle = "Current Month Expenses"

    const displayData = [
        { category: "Food and \n Groceries", amount: calculateCategoryTotal('food', itemData)},
        { category: "Transport", amount: calculateCategoryTotal('transport', itemData) },
        { category: "Entertainment", amount: calculateCategoryTotal('entertainment', itemData) },
        { category: "Fashion", amount: calculateCategoryTotal('fashion', itemData) },
        { category: "Subscription \n and Utilities", amount: calculateCategoryTotal('utilities', itemData) },
        { category: "Healthcare", amount: calculateCategoryTotal('healthcare', itemData) },
        { category: "All Other \n Miscellaneous", amount: calculateCategoryTotal('misc', itemData) },
    ]

    // const toggleLabel = () => setLabelStatus(labelStatus => ! labelStatus)
    const pieHeight = Dimensions.get("window").height * 0.5
    const pieWidth = Dimensions.get("window").width;
    const legendName = displayData.map(legend => ( { name: legend.category } ))

    let displayDataWithPercentage = displayData.map((item) => {
        let percentage = (item.amount / totalExpenses * 100).toFixed(0)
        return {
            label: `${item.category} \n $${Math.round(item.amount)} \n ${percentage ?? 0 }%`,
            amount: item.amount,
            name: item.category,
            category: item.category,
        }
    })

    const exportExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    return(
            <View style={styles.chart}>
                <Text style={{textAlign:"center", marginTop: 20}}>{userLoggedIn.username}'s {chartTitle}</Text>
                <TouchableOpacity onPress={exportExp}>
                <AntDesign name="export" size={24} color="black"  style={{ alignSelf: 'flex-end', position: 'relative'}} />
                </TouchableOpacity>
                <VictoryPie
                    width={pieWidth} height={pieHeight}
                    data={displayDataWithPercentage} 
                    x="category" y="amount"
                    colorScale={colorScale}
                    radius={pieWidth*0.36}
                    style={{
                        data: {
                        fillOpacity: 0.9, 
                        stroke: "#968484", 
                        strokeWidth: 0
                        },
                        labels: {
                        fontSize: 12, 
                        fill: "brown",
                        },
                    }}
                    labelRadius={(pieWidth*0.4)/2.8}
                    labelComponent={<VictoryTooltip 
                    renderInPortal={false} 
                    labelComponent={<VictoryLabel lineHeight={1.3} /> }
                    />}
                    
                    events={[
                    {
                        target: 'data',
                        eventHandlers: {
                        onPressIn: () => {
                            return [
                            {
                                target: 'labels',
                                eventKey: 'all',
                                mutation: () => ({active: false}),
                            },
                            ];
                        },
                        onPressOut: () => {
                            return [
                            {
                                target: 'labels',
                                mutation: () => ({active: true}),
                                }
                            ];
                        },
                        },
                    },
                    ]}
                />
                <View style={styles.chart}>
                    <VictoryLegend x={pieWidth*0.11} y={0}
                            title="Categories"
                            centerTitle
                            orientation="horizontal"
                            gutter={30}
                            itemsPerRow={2}
                            colorScale={colorScale}
                            data={legendName}
                            borderPadding={10}
                            width={pieWidth*0.95} 
                            // style={{ border: { stroke: "black" } }}
                            // borderComponent={<Border width={pieWidth*0.85}/>}
                    />
                </View>
            </View>
    )
}