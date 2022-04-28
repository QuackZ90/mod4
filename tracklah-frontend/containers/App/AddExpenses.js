import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import expensesAPI from '../../api/expenses';
import { useContext } from 'react';
import {UserContext} from '../../contexts/UserContext';


export default function AddExpenses({navigation}){

    const {userLoggedIn} = useContext(UserContext);
    const defaultCurr = userLoggedIn.defaultCurrency;

    let initialDate = moment().format("MMM Do YYYY");
    let initialTime = moment().format("hh:mm a");
    let item = {
        amount: null,
        date: null,
        time: null,
        description: null,
        notes: null,
        category: null,
        receipt_image: null,
        auto_recurring: null,
        spend_vs_earn: null,
    }

    const [ amount, setAmount ] = useState(null);
    const [ date, setDate ] = useState(initialDate);
    const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
    const [ time, setTime ] = useState(initialTime);
    const [ isTimePickerVisible, setTimePickerVisibility ] = useState(false);

    const [ description, setDes ] = useState("");
    const [ notes, setNotes ] = useState("");
    
    const [ openDropDown, setOpenDropDown ] = useState(false);
    const [ category, setCat ] = useState(null);
    const [ fixedCat, setFixedCat ] = useState([
        {label: 'Food and Groceries', value: 'food'},
        {label: 'Transport', value: 'transport'},
        {label: 'Entertainment', value: 'entertainment'},
        {label: 'Fashion', value: 'fashion'},
        {label: 'Subscription and Utilities', value: 'utilities'},
        {label: 'Healthcare', value: 'healthcare'},
        {label: 'All Other Miscellaneous', value: 'misc'},
    ]);

    const [ autorecurring, setAutoRecur ] = useState(false);
    const [ spendEarn, setSpendEarn ] = useState(false); // false for spend, true for earn.

    const toggleSwitchAR = () => setAutoRecur(previousState => !previousState);
    const toggleSwitchSE = () => setSpendEarn(previousState => !previousState);

    const handleSubmit = async () => {
        item = {
            amount: amount,
            date: date,
            time: time,
            description: description,
            notes: notes,
            category: category,
            receipt_image: null,
            auto_recurring: autorecurring,
            spend_vs_earn: spendEarn,
        }

        console.log("userLoggedIn", userLoggedIn);
        console.log(item);

        await expensesAPI.post(
            '/protected/items', 
            item, 
            { headers: {
                Authorization : userLoggedIn.jwt
            }}
        )
        .then((response) => {
            const data = response.data;
            console.log("Data has been receieved", data);
            Alert.alert(
                `Hey There!`,
                `Your ${spendEarn? 'income': 'expense'} item has been added to the list. Add another item?`,
                [
                { text: "Yes", onPress: () => navigation.navigate("Add Expense or Income Item") },
                { text: "No, show me all items", onPress: () => navigation.navigate("List Current Month Items") }
                ]
            );
        })
        .catch((err)=> {
            console.log(err);
            Alert.alert(
                `Oh no!`,
                `An error occurred, do try again as your entry was not added.`,
                [
                { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        });

        // reset the variables to initial state after submission.
        setAmount(null);
        setDate(moment().format("MMM Do YYYY"));
        setTime(moment().format("hh:mm a"))
        setDes(null);
        setNotes(null);
        setCat(null);
        setAutoRecur(false);
        setSpendEarn(false);
    };
    

    return(
        <View style={{justifyContent:"center",flex:1, paddingTop:15, backgroundColor: "#F4E0DB"}}>

            <View style={styles.pane}>

                <TouchableOpacity onPress={() => navigation.navigate("Add Expense")}>
                    <Text style={[styles.text, {color:"#F4E0DB", textTransform:'uppercase', textAlign:'right', padding:0, margin:0,}]}>Switch to the Detailed Form</Text>
                </TouchableOpacity>

                <Text style={styles.text}>Amount:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setAmount}
                    value={amount}
                    placeholder="0.00"
                    keyboardType="numeric"            
                />
                <Text style={styles.text}>Date:</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setDatePickerVisibility(true)}>
                    <TextInput
                        style={styles.input}
                        value={date.toString()}
                        editable={false} // optional
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    onConfirm={(date) => {
                        setDatePickerVisibility(false); // <- first thing
                        setDate(moment(date).format("MMM Do YYYY"));
                    }}
                    onCancel={() => setDatePickerVisibility(false)}
                />      
                <Text style={styles.text}>Time (optional):</Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setTimePickerVisibility(true)}>
                    <TextInput
                        style={styles.input}
                        value={time.toString()}
                        editable={false} // optional
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    mode="time"
                    locale="en_GB"
                    isVisible={isTimePickerVisible}
                    onConfirm={(time) => {
                        setTimePickerVisibility(false); // <- first thing
                        setTime(moment(time).format("hh:mm a"));
                    }}
                    onCancel={() => setTimePickerVisibility(false)}
                />

                <Text style={styles.text}>Description:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDes}
                    value={description}         
                />

                <Text style={styles.text}>Notes (optional):</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNotes}
                    value={notes}         
                />

                <Text style={styles.text}>Category:</Text>
                <DropDownPicker
                    style={styles.input}
                    open={openDropDown}
                    value={category}
                    items={fixedCat}
                    setOpen={setOpenDropDown}
                    setValue={setCat}
                    setItems={setFixedCat}
                    containerStyle={{
                        width: '94%',
                    }}
                />

                <View style={styles.toggleContainer}>
                    <Text style={styles.text}>Is this item Auto-recurring?</Text>
                    <Text style={styles.boldtext}>{autorecurring? "YES": "NO"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#F4C2C2" }}
                        thumbColor={autorecurring ? "#fc8eac" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchAR}
                        value={autorecurring}
                    />
                </View>

                <View style={styles.toggleContainer}>
                    <Text style={styles.text}>Is this item an Income or Expense?</Text>
                    <Text style={styles.boldtext}>{spendEarn ? "INCOME": "EXPENSE"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#F4C2C2" }}
                        thumbColor={spendEarn ? "#fc8eac" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchSE}
                        value={spendEarn}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttontext}>ADD MY ITEM TO LIST</Text>
                </TouchableOpacity>

            </View>


        </View>
    )
};

const styles = StyleSheet.create({
    pane: {
        backgroundColor: "#968484",
        marginBottom: 50,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 20,
    },
    input: {
        height: 40,
        marginHorizontal: 12,
        marginTop: 5,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#D3BABA",
        borderRadius: 20
    },
    text: {
        marginLeft: 20,
    },
    boldtext: {
        fontWeight: "700",
        margin: 12,
        color: "#968484",
    },
    toggleContainer: {
        flexDirection: 'row',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F4E0DB"
    },
    button: {
        alignItems: "center",
        backgroundColor: "#968484",
        padding: 8,
    },
    buttontext: {
        fontWeight: "700",
        margin: 12,
    }
});

