import{View, Text, Alert, TouchableOpacity} from 'react-native';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, VictoryTooltip, Background} from 'victory-native';
import React, {useContext, useState} from "react";
import { UserContext} from '../../contexts';
import {width, height, chartStyles, victoryStyles} from "../../styles/"
import { AntDesign } from '@expo/vector-icons';
import {calculateTotal} from '../../components/';
import moment from 'moment';
import expensesAPI from '../../api/expenses';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function ViewBar(){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);

    const getAllItems =  async () => {
        await expensesAPI.get('protected/items', {
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
        }
        useFocusEffect( 
            React.useCallback(
            () => {
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
        { type: `${twoMthAgo.format('MMM-YYYY')} `, amount: Number(calculateTotal(twomthAgoData)), spend_vs_earn: false},
        { type: `${twoMthAgo.format('MMM-YYYY')}`, amount: Number(calculateTotal(twomthAgoData,true)), spend_vs_earn: true},
        { type: `${oneMthAgo.format('MMM-YYYY')} `, amount: Number(calculateTotal(oneMthAgoData)), spend_vs_earn: false},
        { type: `${oneMthAgo.format('MMM-YYYY')}`, amount: Number(calculateTotal(oneMthAgoData,true)), spend_vs_earn: true}, 
        { type: `${currentMthYr} `, amount: Number(calculateTotal(currentMthData)), spend_vs_earn: false},
        { type: `${currentMthYr}`, amount: Number(calculateTotal(currentMthData,true)), spend_vs_earn: true},
    ]

    const convertToCSV = (objArray) => {
        var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
        var str = "";
        var headerLine = "Month, Amount, Income";
        str += headerLine + "\r\n";
        for (var i = 0; i < array.length; i++) {
            var line = "";
            for (var index in array[i]) {
            if (line != "") line += ",";
            line += array[i][index];
            }
            str += line + "\r\n";
        }
        return str;
        };
        
    const exportFile = async () => {
        console.log("first");
        let fileName = "Income_Expense_Data_";
        let fileUri = FileSystem.documentDirectory + fileName + ".csv";
        let txtFile = convertToCSV(dataIncomeExpenses);
        await FileSystem.writeAsStringAsync(fileUri, txtFile, {
            encoding: FileSystem.EncodingType.UTF8,
        });
        await Sharing.shareAsync(fileUri);
        await FileSystem.deleteAsync(fileUri);
        };


    const renderRowName = (text) => {
        return (
        <View style={chartStyles.tablecell}>
            <Text>{text}</Text>
        </View>
        )
    }

    const renderColumnName = (i) => {
        return (
            <View style={chartStyles.tablecell}>
                <Text>{dataIncomeExpenses[i].type}</Text>
            </View>
        )
    }
    const renderCell = (i) => {
        return (
            <View style={chartStyles.tablecell}>
                <Text style={chartStyles.text}>
                    {(dataIncomeExpenses[i].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
            </View>
        )
    }

    const renderBalance = (i,n) => {
        return (
            <View style={chartStyles.tablecell}>
                <Text style={chartStyles.text}>
                    {(dataIncomeExpenses[i].amount - dataIncomeExpenses[n].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
            </View>
        )
    }

    const displayTable = () => {

        return (
            <View style={chartStyles.tablecontainer}>
                <View style={chartStyles.row}>
                        {renderRowName(" ")}
                        {renderColumnName(0)}
                        {renderColumnName(2)}
                        {renderColumnName(4)}
                </View>
                <View style={chartStyles.row}>
                        {renderRowName("Income:")}
                        {renderCell(1)}
                        {renderCell(3)}
                        {renderCell(5)}
                </View>
                <View style={chartStyles.row}>
                        {renderRowName("Expense:")}
                        {renderCell(0)}
                        {renderCell(2)}
                        {renderCell(4)}
                </View>
                <View style={chartStyles.row}>
                        {renderRowName("Balance:")}
                        {renderBalance(1,0)}
                        {renderBalance(3,2)}
                        {renderBalance(5,4)}
                </View>
            </View>
        )
    }

    return(
            <View style={chartStyles.chart}>
                <View style={chartStyles.view}>
                    <Text style={chartStyles.title}>{chartTitle}</Text>
                    <TouchableOpacity onPress={exportFile}>
                    <AntDesign name="export" size={24} color="black" style={chartStyles.exportIcon} />
                    </TouchableOpacity>
                        <View style={chartStyles.tablecontainer}>
                            <VictoryChart 
                            domainPadding={50} 
                            theme={VictoryTheme.material}
                            padding={{ left: 80, top: 20, bottom: 100, right: 80 }}
                            width={width *0.9} height={height*0.4}
                            animate={victoryStyles.chartAnimation}
                            style={victoryStyles.barChart}
                            backgroundComponent={<Background/>}
                            >
                                <VictoryBar
                                    style={victoryStyles.barDataStyle}
                                    data={dataIncomeExpenses}
                                    x="type"
                                    y="amount"
                                    labels={({ datum }) => `$ ${datum.amount}`}
                                    labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} renderInPortal={false} />}
                                />
                                <VictoryAxis
                                tickLabelComponent={<VictoryLabel angle={-90} y={height*0.315} />}
                                style={victoryStyles.barXaxis}
                                label="Month / Year"
                                axisLabelComponent={<VictoryLabel />}
                                animate={victoryStyles.barAxisAnimation}
                                />
                                <VictoryAxis
                                dependentAxis={true}
                                axisLabelComponent={<VictoryLabel />}
                                label="Amount"
                                style={victoryStyles.barYaxis}
                                animate={victoryStyles.barAxisAnimation}
                                />
                            </VictoryChart>
                        </View>
                        {displayTable()}
                </View>
            </View>
    )
}