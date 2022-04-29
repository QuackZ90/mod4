import{View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet} from 'react-native';
import { VictoryPie, VictoryLegend, VictoryLabel, VictoryTooltip } from 'victory-native';
import React, { useContext, useState } from "react";
import { UserContext } from '../../contexts';
import {styles, colorScale} from "../../styles/"
import { AntDesign } from '@expo/vector-icons';
import {calculateTotal, calculateCategoryTotal} from '../../components/';
import { useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import expensesAPI from '../../api/expenses'

export default function ViewPie(){

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);
    const [titleLabel, setTitleLabel] = useState('');
    const [selectedData, setSelectedData] = useState([]);

    //Dropdown Picker useState
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Current Month', value: 'currentmth'},
        {label: 'Today', value: 'today'},
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

    //Get All Items
    const getAllItems =  async () => {
    await expensesAPI.get('protected/items', {
        headers: {
            Authorization : userLoggedIn.jwt
        }
    })
        .then((response) => {
        setItemData(response.data.data);
        // console.log("ViewPie Getting all items:",response.data.data)
        })
        .catch((err)=> {
        console.log(err)
        })
    }

    useFocusEffect( 
        React.useCallback(
        () => {
        console.log('UseFocusEffect: Getting all items for ViewPie...')
        getAllItems();
    }, [setSelectedData])
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

    const pieHeight = Dimensions.get("window").height * 0.5
    const pieWidth = Dimensions.get("window").width;
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
    //console.log("----Display Data With Percentage", displayDataWithPercentage)

    const exportExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    return(
            <View style={styles.chart}>
                <Text style={{textAlign:"center", marginTop: 20}}>{chartTitle}</Text>
                <TouchableOpacity onPress={exportExp}>
                    <AntDesign name="export" size={24} color="black"  style={{ alignSelf: 'flex-end', position: 'relative'}} />
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
                    style={tempStyles.dropdownpicker}
                />
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
                        strokeWidth: 0,
                        },
                        labels: {
                        fontSize: 12, 
                        fill: "brown",
                        },
                    }}
                    labelRadius={(pieWidth*0.4)/2.8}
                        labelComponent={<VictoryTooltip
                        renderInPortal={false} 
                        labelComponent={<VictoryLabel lineHeight={1.3} 
                        /> }
                    />} 
                    animate={{
                        duration: 2000,
                        easing: "bounce",
                      }} 
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
                    <VictoryLegend x={pieWidth*0.01} y={55}
                            //title="Categories"
                            centerTitle
                            orientation="horizontal"
                            gutter={20}
                            itemsPerRow={3}
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

const tempStyles = StyleSheet.create({
    dropdownpicker: {
        backgroundColor: "#D3BABA",
        borderRadius: 20
    },
})