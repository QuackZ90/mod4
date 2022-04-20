import{View, Text} from 'react-native';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis} from 'victory-native';
import React, {useContext} from "react";
import UserContext from '../../contexts/UserContext';
import expensesAPI from '../../api/expenses';
import styles from "../../styles/home-styles"

export default function ViewBar(){

    const {userLoggedIn} = useContext(UserContext);
    const chartTitle = "Income and Expenses"

    const dataIncomeExpenses = [
        { type: "Income Jan", amount: 3000},
        { type: "Expense Jan", amount: 1800},
        { type: "Income Feb", amount: 4000},
        { type: "Expense feb", amount: 2500},
        { type: "Income Mar", amount: 8000},
        { type: "Expense Mar", amount: 7000},
    ]

    return(
            <View style={styles.container}>
            {/* <View style={{justifyContent:"center", backgroundColor:"#F4E0DB"}}> */}
            
                <Text style={{textAlign:"center", marginTop: 20}}>{userLoggedIn.username}'s {chartTitle}</Text>

                {/* Income & Expenses Chart */}
                    <VictoryChart 
                    domainPadding={50} 
                    theme={VictoryTheme.material}
                    padding={{ left: 100, top: 20, bottom: 100, right: 50 }}
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
                        />
                            <VictoryAxis
                            tickLabelComponent={<VictoryLabel angle={-90} y={295} />}
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