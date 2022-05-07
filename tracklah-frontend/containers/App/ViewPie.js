import{View, Text, TouchableOpacity, Alert} from 'react-native';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory-native';
import React, { useContext, useState } from "react";
import { UserContext } from '../../contexts';
import {chartStyles, colorScale, victoryStyles, height, width} from "../../styles/"
import { AntDesign } from '@expo/vector-icons';
import { calculateCategoryTotal} from '../../components/';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import expensesAPI from '../../api/expenses'

export default function ViewPie(){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);
    const [titleLabel, setTitleLabel] = useState('');
    const [selectedData, setSelectedData] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Current Month', value: 'currentmth'},
        {label: 'Today', value: 'today'},
        {label: 'Last month', value: 'lastmth'},
        {label: 'Last 7 Days', value: 'last7days'},
        {label: 'Last 30 Days', value: 'last30days'},
        {label: 'Last 60 Days', value: 'last60days'},
        {label: 'Last 90 Days', value: 'last90days'},
        {label: 'Current Year', value: 'currentyr'},
    ]);

    function setSelectDataByPeriod(period) {

        const ourDateFormat = 'MMM Do YYYY'
        const today = moment().format()
        const day7before = moment().subtract(7, 'days')
        const day30before = moment().subtract(30, 'days')
        const day60before = moment().subtract(60, 'days')
        const day90before = moment().subtract(90, 'days')
        const lastmth = moment().subtract(1,'months')

            switch (period) {
                case "currentmth":

                    let currentmthData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(today,'month')));
                    setSelectedData(currentmthData)
                    console.log(`---Filtering data for: ${period}---`, currentmthData)
                    break;

                case "today":

                    let todayData = itemData.filter((item => item.date === moment().format("MMM Do YYYY") ))
                    setSelectedData(todayData)
                    console.log(`---Filtering data for: ${period}---`, todayData)
                    break;

                case "lastmth":

                    let lastmthData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(lastmth,'month')));
                    setSelectedData(lastmthData)
                    console.log(`---Filtering data for: ${period}---`, lastmthData)
                    break;

                case "last7days":

                    let last7DaysData = itemData.filter((item) => moment(item.date,ourDateFormat).isBetween(day7before,today));
                    setSelectedData(last7DaysData)
                    console.log(`---Filtering data for: ${period}---`, last7DaysData)
                    break;
                case "last30days":

                    let last30DaysData = itemData.filter((item) => moment(item.date,ourDateFormat).isBetween(day30before,today));
                    setSelectedData(last30DaysData)
                    console.log(`---Filtering data for: ${period}---`, last30DaysData)
                    break;

                case "last60days":
                    
                    let last60DaysData = itemData.filter((item) => moment(item.date,ourDateFormat).isBetween(day60before,today));
                    setSelectedData(last60DaysData)
                    console.log(`---Filtering data for: ${period}---`, last60DaysData)
                    break;
                    
                case "last90days":
                    
                    let last90DaysData = itemData.filter((item) => moment(item.date,ourDateFormat).isBetween(day90before,today));
                    setSelectedData(last90DaysData)
                    console.log(`---Filtering data for: ${period}---`, last90DaysData)
                    break;

                case "currentyr":

                    let currentYrData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(today,'year')));
                    setSelectedData(currentYrData)
                    console.log(`---Filtering data for: ${period}---`, currentYrData)
                    break;

                default:
                    let defaultData = itemData.filter((item => moment(item.date,ourDateFormat).isSame(today,'month')));
                    setSelectedData(defaultData)
                    console.log(`---Default: Currenth Month Data---`,defaultData)
            }
    }

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

    const chartTitle = `${userLoggedIn.name}'s ${titleLabel}'s Expenses`
    const displayData = [
        { category: "Food and \n Groceries", amount: calculateCategoryTotal('food', selectedData)},
        { category: "Transport", amount: calculateCategoryTotal('transport', selectedData) },
        { category: "Entertainment", amount: calculateCategoryTotal('entertainment', selectedData) },
        { category: "Fashion", amount: calculateCategoryTotal('fashion', selectedData) },
        { category: "Subscription \n and Utilities", amount: calculateCategoryTotal('utilities', selectedData) },
        { category: "Healthcare", amount: calculateCategoryTotal('healthcare', selectedData) },
        { category: "All Other \n Miscellaneous", amount: calculateCategoryTotal('misc', selectedData) },
    ]

    const filteredDisplayData = displayData.filter(item => item.amount > 0)
    const totalforPercentage = filteredDisplayData.reduce((acc, array ) => acc + (Number(array.amount) || 0 ), 0)
    const legendName = filteredDisplayData.map(legend => ( { name: legend.category } ))

    let displayDataWithPercentage = filteredDisplayData.map((item) => {
        let percentage = (item.amount / totalforPercentage * 100).toFixed(0);
        return {
            label: `${item.category} \n $${Math.round(item.amount)} \n ${percentage ?? 0 }%`,
            amount: Number(item.amount),
            name: item.category,
            category: item.category,
        }
    })

    const exportExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    return(
            <View style={chartStyles.chart}>
                <View style={chartStyles.view}>
                    <Text style={chartStyles.title}>{chartTitle}</Text>
                    <TouchableOpacity onPress={exportExp}>
                        <AntDesign name="export" size={24} color="black" style={chartStyles.exportIcon} />
                    </TouchableOpacity>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onSelectItem={(item) => {
                        setSelectedData(item.value)
                        setSelectDataByPeriod(item.value)
                        setTitleLabel(item.label)
                        }}
                        style={chartStyles.dropdownpicker}
                        dropDownContainerStyle={chartStyles.dropdowncontainerstyle}
                    />
                    <VictoryPie
                        width={width*0.9} height={height*0.4}
                        data={displayDataWithPercentage} 
                        x="category" y="amount"
                        colorScale={colorScale}
                        radius={width*0.324}
                        style={victoryStyles.pieStyle}
                        labelRadius={(width*0.36)/2.8}
                            labelComponent={<VictoryTooltip
                            renderInPortal={false} 
                            labelComponent={<VictoryLabel lineHeight={1.3} 
                            /> }
                        />} 
                        animate={victoryStyles.chartAnimation} 
                    />
                    <View style={chartStyles.pielegend}>
                        <VictoryLegend 
                            x={width*0.054} 
                            y={height*0.144}
                            orientation="horizontal"
                            symbolSpacer={5}
                            gutter={15}
                            itemsPerRow={3}
                            colorScale={colorScale}
                            data={legendName}
                            borderPadding={10}
                            width={width*0.9} 
                        />
                    </View>
                </View>
            </View>
    )
}