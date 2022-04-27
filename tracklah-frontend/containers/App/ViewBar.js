import{View, Text, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, Bar} from 'victory-native';
import React, {useContext} from "react";
import { UserContext, ExpenseContext } from '../../contexts';
import {styles} from "../../styles/"
import { AntDesign } from '@expo/vector-icons';
import {colorScale, calculateTotal, calculateCategoryTotal} from '../../components/';
import moment from 'moment';

export default function ViewBar(){

    const {userLoggedIn} = useContext(UserContext);
    const {itemData} = useContext(ExpenseContext);

    const chartTitle = "Income and Expenses"
    
    //const totalExpenses = calculateTotal(false,itemData)
    //const totalIncome = calculateTotal(true,itemData)
    //console.log(`Current Month Total Income: $ ${totalIncome}` ?? 0)

    const currentMthYr = moment().format("MMM-YY"); 

    const dataIncomeExpenses = [
        { type: "Income Jan", amount: 3000},
        { type: "Expenses Jan", amount: 1800},
        { type: "Income Feb", amount: 8000}, // bar chart doesn't show >2,564.99 label to check
        { type: "Expenses feb", amount: 2500},
        { type: `Income ${currentMthYr}`, amount: 2000},
        { type: `Expenses ${currentMthYr}`, amount: 3000},
    ]

    const chartHeight = Dimensions.get("window").height * 0.4
    const chartWidth = Dimensions.get("window").width;

    const exportIncExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    return(
            <View style={styles.container}>
                <Text style={{textAlign:"center", marginTop: 20}}>{userLoggedIn.username}'s {chartTitle}</Text>
                <TouchableOpacity onPress={exportIncExp}>
                <AntDesign name="export" size={24} color="black"  style={{ 
                                                                            height: 25, 
                                                                            width: 25, 
                                                                            alignSelf: 'flex-end',
                                                                            position: 'relative',
                                                                            right: 50,
                                                                        }} />
                </TouchableOpacity>
                {/* Income & Expenses Chart */}
                    <VictoryChart 
                    domainPadding={50} 
                    theme={VictoryTheme.material}
                    padding={{ left: 100, top: 20, bottom: 100, right: 50 }}
                    width={chartWidth} height={chartHeight}
                    >
                        <VictoryBar
                            style={{ 
                                data: { 
                                    fill: ({ datum }) => 
                                    datum.type.startsWith('Income') ? "green" : "red", //use spend_vs_earn
                                    stroke: "black",
                                    strokeWidth: 2,
                                } 
                            }}
                            data={dataIncomeExpenses}
                            x="type"
                            y="amount"

                            dataComponent={
                                <Bar
                                  events={{
                                    onPress: (evt) => Alert.alert(`(${evt.test}, ${evt.test})`) // work on this
                                  }}
                                />
                              }
                        />
                            <VictoryAxis
                            tickLabelComponent={<VictoryLabel angle={-90} y={chartHeight*0.82} />}
                            // axisLabelComponent={<VictoryLabel />}
                            // label="Income 🟩 / Expense 🟥"
                            // style={{
                            //     axisLabel: { 
                            //         padding: -230,
                            //         y: 10
                            //     },
                            // }}
                            />
                            {/* <VictoryLabel text="Income 🟩 / Expense 🟥" x={280} y={30} textAnchor="middle"/> */}

                            <VictoryAxis
                            dependentAxis={true}
                            axisLabelComponent={<VictoryLabel />}
                            label="Amount"
                            style={{
                                axisLabel: {
                                    padding: 60
                                    },
                                }}
                            />
                    </VictoryChart>
            </View>
    )
}