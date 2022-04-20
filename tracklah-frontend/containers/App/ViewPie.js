import{View, Text, ScrollView} from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryLabel } from 'victory-native';
import React, { useState, useEffect } from "react";
import {API} from '../../api/API'
import colorScale from '../../components/PieChartColorScale';
import ViewBar from './ViewBar';

export default function ViewPie(props){

    const [itemData, setItemData] = useState([]);

    const getItems =  async () => {
        const {status, data} = await API.get('/protected/items');
        if (status === 200) {
        setItemData(data);

        } 
    }

    // Fetch data upon loading
    useEffect( () => {
        console.log('ViewPie useEffect')
        getItems();
      }, [])

    const chartTitle = "Current Month"
    // const pieChartTitle = "Jan Expenses"

    console.log("itemData",itemData);

    const dummyData = [
        { category: "Grocery", amount: 280 },
        { category: "Clothing", amount: 232 },
        { category: "Cable", amount: 60 },
        { category: "Maintenance", amount: 160 },
        { category: "School", amount: 112 },
        { category: "Others", amount: 74 },
        { category: "Dining Out", amount: 63 },
        { category: "Fuel", amount: 200 },
        { category: "Misc Bills", amount: 50 },
        { category: "Travel", amount: 1000 }
    ]

    const legendName = dummyData.map(legend => ( { name: legend.category } )) //require { "name": category }

    return(
        <ScrollView>
            <View style={{justifyContent:"center", backgroundColor:"#F4E0DB"}}>
                <Text style={{textAlign:"center", marginTop: 10}}>{chartTitle}</Text>
                    {/* <View style={{ position: 'absolute', top: '17%', left: "39%", width: 80}}>
                        <Text style={{textAlign: 'center', color: '#000000'}}>{pieChartTitle}</Text> */}
                    {/* </View> */}
                <VictoryPie
                    width={350} height={350}
                    data={dummyData} 
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
                        fontSize: 8, fill: "black"
                        },
                    }}
                    labelRadius={133}
                    // labelComponent={
                    //     <VictoryLabel angle={45} textAnchor="start"/>
                    //   }
                    // labels={(datum) => `${datum.y}`}

                    
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
            </View>
        </ScrollView>
    )
}