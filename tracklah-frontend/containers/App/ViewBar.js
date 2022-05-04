import{View, Text, Alert, TouchableOpacity} from 'react-native';
import {VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis, VictoryTooltip, Background} from 'victory-native';
import React, {useContext, useState} from "react";
import { UserContext} from '../../contexts';
import {styles, barChartWidth,barChartHeight,chartStyles} from "../../styles/"
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

    const exportIncExp = () => {
        Alert.alert("Export", "Exporting..." )
    }

    const displayTable = () => {


        return (
            <View style={chartStyles.tablecontainer}>
                <View style={chartStyles.row}>
                    <View style={chartStyles.tablecell}>
                    <Text></Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text>{dataIncomeExpenses[0].type}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text>{dataIncomeExpenses[2].type}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text>{dataIncomeExpenses[4].type}</Text>
                    </View>
                </View>
                <View style={chartStyles.row}>
                    <View style={chartStyles.tablecell}>
                    <Text>Income:</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[1].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[3].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[5].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                </View>
                <View style={chartStyles.row}>
                    <View style={chartStyles.tablecell}>
                    <Text>Expenses:</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[0].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[2].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[4].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                </View>
                <View style={chartStyles.row}>
                    <View style={chartStyles.tablecell}>
                    <Text>Balance:</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[1].amount - dataIncomeExpenses[0].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text  style={chartStyles.text}>{(dataIncomeExpenses[3].amount - dataIncomeExpenses[2].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                    <View style={chartStyles.tablecell}>
                    <Text style={chartStyles.text}>{(dataIncomeExpenses[5].amount - dataIncomeExpenses[4].amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                    </View>
                </View>
            </View>
        )
        
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

                <View style={chartStyles.tablecontainer}>
                {/* Income & Expenses Chart */}
                    <VictoryChart 
                    domainPadding={50} 
                    theme={VictoryTheme.material}
                    padding={{ left: 80, top: 20, bottom: 100, right: 80 }}
                    width={barChartWidth} height={barChartHeight}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 },
                        easing: "bounce",
                      }}
                    style={{
                    background: { fill: "#D3BABA" },
                    }}
                    backgroundComponent={<Background/>}
                    >
                        <VictoryBar
                            style={{ 
                                data: { 
                                    fill: ({ datum }) => 
                                    datum.spend_vs_earn === true ? "#BFD2B5" : "#DDA4A4",
                                } 
                            }}
                            data={dataIncomeExpenses}
                            x="type"
                            y="amount"
                            labels={({ datum }) => `$ ${datum.amount}`}
                            labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} renderInPortal={false} />}
                            // events={[{
                            //     target: "data",
                            //     eventHandlers: {
                            //       onPressIn: () => {
                            //         return [
                            //           {
                            //             target: "data",
                            //             mutation: (props) => {
                            //               const fill = props.style && props.style.fill;
                            //               return fill === "#968484" ? null : { style: { fill: "#968484" } };
                            //             }
                            //           }
                            //         ];
                            //       },
                            //     }
                            //   }]}
                        />
                            <VictoryAxis
                            tickLabelComponent={<VictoryLabel angle={-90} y={barChartHeight*0.82} />}
                            style={{
                                axisLabel: { padding: 85},
                                grid: { stroke: 'none' },
                                // tickLabels: { fill: 'black' }, // or orignal grey better?
                                // axis: { stroke: 'black' },
                                }}
                            label="Month / Year"
                            axisLabelComponent={<VictoryLabel 
                                // style={{ fill: 'black'}}
                                />}
                            animate={{
                                duration: 2000,
                                easing: "bounce"
                              }}
                            />
                            <VictoryAxis
                            dependentAxis={true}
                            axisLabelComponent={<VictoryLabel 
                                // style={{ fill: 'black'}}
                                />}
                            label="Amount"
                            style={{
                                axisLabel: { padding: 50 },
                                grid: { stroke: 'none' },
                                // tickLabels: { fill: 'black'}, 
                                // axis: { stroke: 'black' },
                                }}
                            animate={{
                                duration: 2000,
                                easing: "bounce"
                                }}
                            />
                    </VictoryChart>
                    </View>
                    {displayTable()}
            </View>
    )
}