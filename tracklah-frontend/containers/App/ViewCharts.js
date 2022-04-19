import{View, Text, ScrollView, Button} from 'react-native';
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, VictoryLegend } from 'victory-native';
import React from "react";
import {API} from '../../api/API'
import { useEffect } from 'react';

export default function ViewCharts(props){

    const getItems =  async () => {
        const {status, data} = await API.get('/protected/items');
        if (status === 200) {
          console.log(data)
        } 
    }

    useEffect( () => {
        console.log('App.useEffect')
        getItems();
      }, [])

    const chartTitle = "Current Month"
    const pieChartTitle = "Jan Expenses"
    const data = [
        { category: "Grocery", amount: 280 },
        { category: "Clothing", amount: 232 },
        { category: "Cable", amount: 60 },
        { category: "Maintenance", amount: 160 },
        { category: "School", amount: 112 },
        { category: "Others", amount: 74 },
        { category: "Dining Out", amount: 63 },
        { category: "Fuel", amount: 200 },
        { category: "Misc Bills", amount: 50 },
        { category: "Travel", amount: 1000 },
        // { category: "Food", amount: 500 },
        // { category: "Entertainment", amount: 100 },
        // { category: "Uncategorised", amount: 50 },
        // { category: "Others", amount: 50 },
        // { category: "Movies", amount: 50 }, 
        // { category: "Donation", amount: 100 },
        // { category: "Taxes", amount: 50 },
        // { category: "Utilities", amount: 150 },
        // { category: "Mobile Plan", amount: 120 },
        // { category: "Clothing", amount: 150 },

    ]

    const legendName = data.map(legend => ( //require { "name": category }
                                            { name: legend.category } 
                                        )
                                )

    const dataIncomeExpenses = [
        { type: "Income Jan", amount: 3000},
        { type: "Expense Jan", amount: 1800},
        { type: "Income Feb", amount: 4000},
        { type: "Expense feb", amount: 2500},
        { type: "Income Mar", amount: 8000},
        { type: "Expense Mar", amount: 7000},
    ]

    const colorScale= [
        "lightskyblue",
        "tomato", 
        "hotpink", 
        "orange", 
        "green", 
        "navy", 
        "gold",
        "brown", 
        "red",
        "purple",
        "cyan", 
        "rosybrown",
        "plum",
        "chocolate",
        "silver",
        "mediumaquamarine",
        "olive",
        "lawngreen",
        "coral",
        "teal"
        //one colour per category. total 20
    ]


    return(
        <ScrollView>
            <Button title="Get Item Data" onPress={getItems} />

            <View style={{justifyContent:"center", backgroundColor:"#F4E0DB"}}>
                <Text>{chartTitle}</Text>
                    <View style={{ position: 'absolute', top: '17%', left: "39%", width: 80}}>
                        <Text style={{textAlign: 'center', color: '#000000'}}>{pieChartTitle}</Text>
                    </View>
                <VictoryPie
                    width={400} height={400}
                    data={data} 
                    x="category"
                    y="amount"
                    theme={VictoryTheme.material} 
                    colorScale={colorScale}
                    innerRadius={50}
                    style={{
                        data: {
                        fillOpacity: 0.9, 
                        stroke: "black", 
                        strokeWidth: 2
                        },
                        labels: {
                        fontSize: 10, fill: "#483D8B"
                        },
                    }}
                    // labels={(datum) => `${datum.y}`}
                    // labelRadius={({ innerRadius }) => ( 1.5 + innerRadius) / 2.5}

                />
                    {/* Legend */}
                    {/* try hide legend, select to view all */}
                    <VictoryLegend x={60} y={5}
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
        </ScrollView>
    )
}