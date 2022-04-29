import{View, Text, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, Bar, VictoryTooltip} from 'victory-native';
import React, {useContext, useState} from "react";
import { UserContext} from '../../contexts';
import {styles} from "../../styles/"
import { AntDesign } from '@expo/vector-icons';
import {calculateTotal} from '../../components/';
import moment from 'moment';
import expensesAPI from '../../api/expenses'
import { useFocusEffect } from '@react-navigation/native'

export default function ViewBar(){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);

    
    //Get All Items
    const getAllItems =  async () => {
        await expensesAPI.get('protected/items', {
            headers: {
                Authorization : userLoggedIn.jwt
            }
        })
            .then((response) => {
            setItemData(response.data.data);
            //console.log("ViewBar Getting all items:",response.data.data)
            })
            .catch((err)=> {
            console.log(err)
            })
        }
    
        useFocusEffect( 
            React.useCallback(
            () => {
            //console.log('UseFocusEffect: Getting all items for ViewBar...')
            getAllItems();
        }, [])
        );
    

    const chartTitle = `${userLoggedIn.name}'s Income and Expenses`
    
    const ourDateFormat = 'MMM Do YYYY'
    const today = moment()
    const currentMthYr = moment().format("MMM-YYYY"); 
    const oneMthAgo = moment().subtract(1, 'month')
    const twoMthAgo = moment().subtract(2, 'month')


    let currentMthData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(today,'month')));
    let oneMthAgoData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(oneMthAgo,'month')));
    let twomthAgoData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(twoMthAgo,'month')));

    const dataIncomeExpenses = [
        { type: `${twoMthAgo.format('MMM-YYYY')} `, amount: Number(calculateTotal(false,twomthAgoData)), spend_vs_earn: false},
        { type: `${twoMthAgo.format('MMM-YYYY')}`, amount: Number(calculateTotal(true,twomthAgoData)), spend_vs_earn: true},
        { type: `${oneMthAgo.format('MMM-YYYY')} `, amount: Number(calculateTotal(false,oneMthAgoData)), spend_vs_earn: false},
        { type: `${oneMthAgo.format('MMM-YYYY')}`, amount: Number(calculateTotal(true,oneMthAgoData)), spend_vs_earn: true}, 
        { type: `${currentMthYr} `, amount: Number(calculateTotal(false,currentMthData)), spend_vs_earn: false},
        { type: `${currentMthYr}`, amount: Number(calculateTotal(true,currentMthData)), spend_vs_earn: true},
    ]

    const chartHeight = Dimensions.get("window").height * 0.4
    const chartWidth = Dimensions.get("window").width;

    const exportIncExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    return(
            <View style={styles.container}>
                <Text style={{textAlign:"center", marginTop: 20}}>{chartTitle}</Text>
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
                                    datum.spend_vs_earn === true ? "green" : "red",
                                    stroke: "black",
                                    strokeWidth: 2,
                                } 
                            }}
                            data={dataIncomeExpenses}
                            x="type"
                            y="amount"

                            // dataComponent={
                            //     <Bar
                            //       events={{
                            //         onPress: (evt) => Alert.alert(`(${evt.amount})`) // work on this
                            //       }}
                            //     />
                            //   }
                            labels={({ datum }) => `$ ${datum.amount}`}
                            labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} renderInPortal={false} />}
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
                            {/* <VictoryLabel text="Income 🟩 / Expense 🟥" x={280} y={25} textAnchor="middle" /> */}

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
                    <View>
                        <Text style={{textAlign:'center'}}>Income 🟩 / Expense 🟥</Text>
                        <Text style={{textAlign:'center'}}>Some information here $ $ $ 3 months</Text>
                    </View>
            </View>
    )
}