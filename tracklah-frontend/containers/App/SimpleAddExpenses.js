import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import expensesAPI from '../../api/expenses';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function SimpleAddExpenses({navigation}){

    const { userLoggedIn } = useContext(UserContext);
    console.log("userLoggedIn", userLoggedIn);

    let initialDate = moment().format("MMM Do YYYY");
    let item = {
        amount: null,
        date: null,
        description: null,
        category: null
    };

    const defaultCurr = userLoggedIn.defaultCurrency; // getting the user default currency from userContext

    const [ amount, setAmount ] = useState(null);
    const [ date, setDate ] = useState(initialDate);
    const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);

    const [ description, setDes ] = useState(null);

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

    const [ tickBgCol, setTickBgCol ] = useState("#D3BABA");

    const colorTick = () => {
        if(date != null && amount != null && description != null & category != null){
            setTickBgCol('#34B233'); // green colour
        } else {
            setTickBgCol("#D3BABA");               
        }
    }

    useEffect(()=>{
        colorTick();
    },[amount, date, description, category]);

    const handleSubmit = async () => {
        item = {
            amount: amount,
            date: date,
            description: description,
            category: category,
        }

        console.log("userLoggedIn", userLoggedIn);
        console.log(item);

        if(date === null || amount === null || description === null || category === null){
            Alert.alert(
                `Oh no!`,
                `Please ensure all fields are filled in.`,
                [
                { text: "OK", onPress: () => console.log("OK Pressed back to form") }
                ]
            );
            return;         
        }

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
                `Your expense item has been added to the list. Add another item?`,
                [
                { text: "Yes", onPress: () => navigation.navigate("Add Expense Item") },
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
        setDes(null);
        setCat(null);
    };
    

    return(
        <View style={{justifyContent:"center",flex:1, paddingTop:15, backgroundColor: "#F4E0DB"}}>

            <View style={styles.pane}>

                <TouchableOpacity onPress={() => navigation.navigate("Add Expense or Income Item")}>
                    <Text style={[styles.text, {color:"#F4E0DB", textTransform:'uppercase', textAlign:'right', padding:0, margin:0,}]}>Switch to the Detailed Form</Text>
                </TouchableOpacity>

                
                <Text style={[styles.text, {marginTop:80}]}>Amount:</Text>
                <View style={styles.inputView}>
                    <Text style={styles.boldtext}>{defaultCurr}$</Text>                
                    <TextInput
                        style={[styles.input, {alignSelf:'flex-end'}]}
                        onChangeText={setAmount}
                        value={amount}
                        placeholder="0.00"
                        keyboardType="numeric"            
                    />
                </View>

                

                <View style={styles.rowstretch}>
                    <View style={[styles.innercol, {paddingRight:0}]}>
                        <Text style={[styles.text, {marginLeft:5}]}>Category:</Text>
                        <DropDownPicker
                            style={[styles.inputView, {marginHorizontal:0, paddingLeft:15, }]}
                            open={openDropDown}
                            value={category}
                            items={fixedCat}
                            setOpen={setOpenDropDown}
                            setValue={setCat}
                            setItems={setFixedCat}
                            containerStyle={{
                                width: '100%',
                                borderWidth:0,
                            }}
                        />
                    </View>
                    
                    <View style={[styles.innercol, {paddingLeft:10}]}>
                        <Text style={[styles.text, {marginLeft:5}]}>Date:</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setDatePickerVisibility(true)}>
                            <View style={[styles.inputView, {marginHorizontal:0, borderWidth:0, paddingLeft:0, paddingRight:10}]}>
                                <TextInput
                                    style={[styles.input, {fontSize:15, marginLeft:0}]}
                                    value={date.toString().slice(0,8)}
                                    editable={false} // optional
                                />
                                <Ionicons 
                                    name="calendar-outline"
                                    size={25}
                                    style={{alignSelf:'center'}}
                                />
                            </View>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            onConfirm={(date) => {
                                setDatePickerVisibility(false); // <- first thing
                                setDate(moment(date).format("MMM Do YYYY"));
                            }}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                    </View>

                    
                </View>             
                
                <Text style={styles.text}>Description:</Text>
                <View style={[styles.inputView, {paddingLeft:0}]}>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={[styles.input, {height: 120, width:'100%'}]}
                        onChangeText={setDes}
                        value={description}         
                    />
                </View>
                

                <TouchableOpacity
                    style={[styles.button, {backgroundColor: tickBgCol}]}
                    onPress={handleSubmit}
                >
                    <Ionicons 
                        name="checkmark-outline"
                        size={40}
                        color='white'
                    />
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
    rowstretch: {
        flexDirection: 'row',
        marginHorizontal: 12,

    },
    innercol: {
        flex:1,
        flexDirection: 'column',
    },
    inputView:{
        backgroundColor: "#D3BABA",
        flexDirection: 'row',
        borderRadius: 20,
        paddingLeft: 10,
        marginHorizontal: 12,
        marginTop: 5,

    },
    input: {
        height: 50,
        paddingVertical: 10,
        paddingRight: 25,
        borderRadius: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        width: '75%',
        textAlign: 'right',
        color: 'black',
    },
    text: {
        marginLeft: 20,
        color: 'white',
        paddingTop: 12,
        paddingBottom: 5,
        textAlign: 'left',
    },
    boldtext: {
        fontWeight: "700",
        margin: 12,
        color: "black",
        fontSize: 20,
    },
    button: {
        alignItems: "center",
        borderRadius: 25,
        width: 50,
        height: 50,
        padding: 5,
        alignSelf: 'center',
        marginTop: 20,
        zIndex: 10,
        top: 25,

    },
});
