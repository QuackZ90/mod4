import React, {useContext, useState} from 'react';
import UserContext from '../../contexts/UserContext';
import{
    View, 
    Text,
    TouchableOpacity,
} from 'react-native';
import styles from '../../styles/home-styles';
import cardStyles from '../../styles/card-styles';
import btnStyles from '../../styles/button-styles';
import Card from '../../components/card';
import { AntDesign, Entypo } from '@expo/vector-icons';
import expensesAPI from '../../api/expenses'
// import colorScale from '../../components/PieChartColorScale';
// import { VictoryPie, VictoryTheme, VictoryAxis, VictoryLabel, VictoryChart, VictoryBar} from 'victory-native';
import { useFocusEffect } from '@react-navigation/native';


export default function Home({navigation}){

    const {userLoggedIn} = useContext(UserContext);

    const [itemData, setItemData] = useState([]);

    const getItems =  async () => {
        await expensesAPI.get('protected/currentmonthitems', {
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
        // Fetch data upon loading
        useFocusEffect( 
            React.useCallback(
            () => {
            console.log('Home useFocusEffect')
            getItems();
        }, [])
        );

    const foodGroceriesTotal = itemData.filter(data => data.category == "food").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const transportTotal = itemData.filter(data => data.category == "transport").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const entertainmentTotal = itemData.filter(data => data.category == "entertainment").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const fashionTotal = itemData.filter(data => data.category == "fashion").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const subUtilitieTotal = itemData.filter(data => data.category == "utilities").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const healthCareTotal = itemData.filter(data => data.category == "healthcare").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const miscTotal = itemData.filter(data => data.category == "misc").reduce((acc, array ) => acc + Number(array.amount.$numberDecimal), 0)
    const totalExpenses = foodGroceriesTotal + transportTotal + entertainmentTotal + fashionTotal + subUtilitieTotal + healthCareTotal + miscTotal

    // const chartTitle = "Current Month Expenses"

    const displayData = [
        { category: "Food and Groceries", amount: foodGroceriesTotal},
        { category: "Transport", amount: transportTotal },
        { category: "Entertainment", amount: entertainmentTotal },
        { category: "Fashion", amount: fashionTotal },
        { category: "Subscription and Utilities", amount: subUtilitieTotal },
        { category: "Healthcare", amount: healthCareTotal },
        { category: "All Other Miscellaneous", amount: miscTotal },
    ]

    // const dataIncomeExpenses = [
    //     { type: "Income Jan", amount: 3000},
    //     { type: "Expense Jan", amount: 1800},
    //     { type: "Income Feb", amount: 4000},
    //     { type: "Expense feb", amount: 2500},
    //     { type: "Income Mar", amount: 8000},
    //     { type: "Expense Mar", amount: 7000},
    // ]

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome {userLoggedIn.username}</Text>

            <View>          
                <Card style={cardStyles.totalExCard}>
                    <TouchableOpacity onPress={()=>navigation.navigate("List Current Month Items")}
                >
                    <Text style={cardStyles.totalExText}>${totalExpenses}</Text>
                    </TouchableOpacity>
                </Card>
            </View>

            <View style={cardStyles.graphsCard}>
                <TouchableOpacity
                    style={btnStyles.button}
                    title="Graph Chart"
                    onPress={()=>navigation.navigate("Income and Expenses Bar Chart")}
                >
                    <Entypo 
                        name="bar-graph" 
                        size={100} 
                        color="lightgrey" 
                        style={styles.graphIcon}
                    />
                {/* Income & Expenses Chart (small version) */}
                {/* <VictoryChart 
                    domainPadding={50} 
                    theme={VictoryTheme.material}
                    padding={{ left: 10, top: 20, bottom: 80, right: 55 }}
                    width={200}
                    height={200}
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
                            tickLabelComponent={<VictoryLabel angle={-90} y={295} />}/>
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
                    </VictoryChart> */}
                </TouchableOpacity>

                <TouchableOpacity
                    style={btnStyles.button}
                    title="Pie Chart" 
                    onPress={()=>navigation.navigate("Expenses Pie Chart")} 
                >
                    <AntDesign 
                        name="piechart" 
                        size={100} 
                        color="lightgrey" 
                        style={styles.pieIcon}
                    />

                    {/* Pie Chart (Small Version) */}
                    {/* <VictoryPie
                    width={190} height={190}
                    padding={{ left: 10, top: 30, bottom: 80, right: 55 }}
                    data={displayData} 
                    x="category"
                    y="amount"
                    theme={VictoryTheme.material} 
                    colorScale={colorScale}
                    style={{
                        data: {
                        fillOpacity: 0.9, 
                        stroke: "black", 
                        strokeWidth: 1
                        },
                        labels: {
                        fontSize: 10, fill: "black",
                        },
                    }}
                    labelRadius={50}
                    labelComponent={
                        <VictoryLabel angle={0} textAnchor="middle" 
                        text={({ datum }) => (datum.amount > 0 ? `${datum.category} \n $${Math.round(datum.amount)}` : "" )}
                        />
                      }
                /> */}
                </TouchableOpacity>

            </View>
            <View>
                <Card style={cardStyles.exListCard}>
                        <Text style={{color: "#E2E2E2"}}>Expense List</Text>
                </Card>
                <TouchableOpacity
                    style={{left: 160, top: 120, width: 65, height: 65}} 
                    onPress={()=>navigation.navigate("Add Expense or Income Item")}>
                <AntDesign 
                    style={styles.addIcon}
                    name="pluscircle"
                    size= {60} 
                />
                </TouchableOpacity>


            </View>

        </View>
    )
};