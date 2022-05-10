import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Alert, Modal, Image, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import expensesAPI from '../../api/expenses';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from "@onytgvx/react-native-aws3";
import { S3ACCESSKEY, S3SECRETKEY } from "@env";
import cc from 'currency-codes';
import getCurrencyRates from '../../actions/ConvertCurrency'
import currencyAPI from '../../api/currencyAPI';
import styles from '../../styles/addExpense-styles';

const FormData = require('form-data');

function  CurrencyExchangeRateStatus({status}){

    switch(status.toLowerCase()){
        case "idle":
            return(<></>);
        case "fetching":
            return(<><Text style={[styles.text,{color:'black'}]}>Fetching exchange rate data...</Text></>);
        case "error":
            return(<><Text style={[styles.text, {color:'red'}]}>Error fetching exchange rate. Please try again later or input your desired exchange rate.</Text></>);
        default:
            return(<></>);
    }

}

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
        category: null,
        receipt_image: null,
        auto_recurring: null,
        spend_vs_earn: null,
    }

    const [ amount, setAmount ] = useState(null);
    const [ convertedAmount, setConvertedAmount] = useState(null);
    const [ currency, setCurr ] = useState(defaultCurr);
    const [ getCurrStatus, setGetCurrStatus] = useState('idle'); //idle,fetching,error
    const [ openCurrDropDown, setOpenCurrDropDown ] = useState(false);
    const [ fixedCurr, setFixedCurr ] = useState(
        cc.codes().map(curr=>{
            return{label:curr,value:curr}
        })
    );

    const [ exchangeRate, setExchangeRate ] = useState("1.00");

    const [ date, setDate ] = useState(initialDate);
    const [ isDatePickerVisible, setDatePickerVisibility ] = useState(false);
    const [ time, setTime ] = useState(initialTime);
    const [ isTimePickerVisible, setTimePickerVisibility ] = useState(false);

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
        {label: 'Salary', value: 'salary'},
        {label: 'Business Profits', value: 'business'},
        {label: 'Interest/Dividends', value: 'dividends'},
    ]);

    const [ autorecurring, setAutoRecur ] = useState(false);
    const [ spendEarn, setSpendEarn ] = useState(false); // false for spend, true for earn.

    const toggleSwitchAR = () => setAutoRecur(previousState => !previousState);
    const toggleSwitchSE = () => setSpendEarn(previousState => !previousState);

    const [image, setImage] = useState(null);
    const [imgModalVisible, setImgModalVisible] = useState(false);

    const uploadToS3 = async (imageUri) => {

        const file = {
            uri: imageUri,
            name: `${new Date().getTime()}.jpg`,
            type: "image/jpeg"
        };

        console.log("file details in uploadToS3", file);

        const s3options = {
            keyPrefix: "",
            bucket: "tracklah",
            region: "us-east-1",
            accessKey: S3ACCESSKEY,
            secretKey: S3SECRETKEY,
            successActionStatus: 201,
        };

        let aws3URL;

        await RNS3.put(file, s3options)
            .then(response => {

                console.log(response);
                if (response.status !== 201)
                    throw new Error("Failed to upload image to S3");
                else {
                    aws3URL = response.body.postResponse.location;
                    console.log(
                    "Successfully uploaded image to s3. s3 bucket url: ",
                    response.body.postResponse.location
                    );                    
                }
            })
            .catch(error => {
                console.log(error);
            });
        
        return aws3URL;
    };

    const pickImage = async () => {
        // This function is to allow use to pick image from their library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };

    const snapImage = async () => {
        // This function is to allow use of camera to snap an image of the receipt.

        let permission = await ImagePicker.requestCameraPermissionsAsync();

        console.log("camera permission", permission);

        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        };
    };

    const [ tickBgCol, setTickBgCol ] = useState("#D3BABA");

    const colorTick = () => {
        if(date != null && amount != null && description != null & category != null){
            setTickBgCol('#34B233'); // green tick
        } else {
            setTickBgCol("#D3BABA");               
        }
    }

    useEffect(()=>{
        colorTick();
    },[amount, date, description]);

    useEffect(()=>{
        colorTick();
        switch(category){
            case 'food':
            case 'transport':
            case 'entertainment':
            case 'fashion':
            case 'utilities':
            case 'healthcare':
            case 'misc':
                setSpendEarn(false);
                break;
            case 'salary':
            case 'business':
            case 'dividends':
                setSpendEarn(true);
                break;
        }
    },[category]);

    //fetch conversion rate upon change in currency / default currency
    useEffect(()=>{
        
        if (currency===defaultCurr){
            setGetCurrStatus(()=>"idle");
            setExchangeRate (()=>"1.00");
        }else{
            setGetCurrStatus(()=>"fetching");
            getCurrencyRates(currency, defaultCurr).then(response=>{
                console.log(response[defaultCurr]);
                setExchangeRate(()=>response[defaultCurr].toFixed(4));
                setGetCurrStatus(()=>"idle");
            }).catch(err=>{
                console.log(err);
                setGetCurrStatus(()=>"error")
            })
        }
    }, [currency,defaultCurr]);

    //convert to default currency upon change in amount or rates

    useEffect(()=>{

        const converted = amount===null||parseFloat(amount)==0?0:parseFloat(amount) * parseFloat(exchangeRate);
        setConvertedAmount(converted.toFixed(2));

    },[amount, exchangeRate])

    const handleSubmit = async () => {

        let awsURL = await uploadToS3(image);
        console.log("imageURL in handleSubmit", awsURL);

        item = {
            amount: convertedAmount, // converted amount
            foreign_currency: currency,
            foreign_currency_amount: amount,
            forex: exchangeRate,
            date: date,
            time: time,
            description: description,
            category: category,
            receipt_image: awsURL,
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
        setConvertedAmount(null);
        setCurr(defaultCurr);
        setExchangeRate("1.00")
        setDate(moment().format("MMM Do YYYY"));
        setTime(moment().format("hh:mm a"))
        setDes(null);
        setCat(null);
        setImage(null);
        setAutoRecur(false);
        setSpendEarn(false);
    };
    
    const MyCloseIcon = () => (
            <View style={styles.modalCloseIconStyle}>
                <Ionicons 
                    name="close-outline"
                    size= {30}
                    color='white'
                />
            </View>
    );




    return(
        <View style={{justifyContent:"center",flex:1, paddingTop:0, backgroundColor: "#F4E0DB"}}>

            <View style={styles.pane}>

                <TouchableOpacity onPress={() => navigation.navigate("Add Expense Item")}>
                    <Text style={[styles.text, {color:"#F4E0DB", textTransform:'uppercase', textAlign:'right', padding:0, margin:0}]}>Switch to the Simple Form</Text>
                </TouchableOpacity>

                <Text style={[styles.text, {marginTop:5, paddingTop:0}]}>Amount:</Text>
                <View style={[styles.inputView, { paddingLeft:15, borderWidth:0 }]}>
                    <DropDownPicker
                        style={{
                            backgroundColor: 'transparent', 
                            borderRadius: 20, 
                            paddingVertical:0,
                            borderWidth:0
                        }}
                        open={openCurrDropDown}
                        value={currency}
                        items={fixedCurr}
                        setOpen={setOpenCurrDropDown}
                        setValue={setCurr}
                        setItems={setFixedCurr}
                        placeholder={currency}
                        searchable={true}
                        searchPlaceholder="Search..."
                        searchPlaceholderTextColor="white"
                        searchContainerStyle={{
                            borderBottomWidth: 0,
                        }}
                        searchTextInputStyle={{
                            color: "white",
                            backgroundColor: "#968484",
                            borderWidth: 0,
                            borderRadius: 20,
                            fontSize: 15,
                            fontWeight: 'normal',
                        }}
                        listMode="MODAL"
                        modalContentContainerStyle={{
                            backgroundColor: "#F4E0DB",
                        }}
                        listItemContainerStyle={{
                            backgroundColor: "#968484",
                            borderRadius: 20,
                            height: 40,
                            margin: 5,
                        }}
                        listItemLabelStyle={{
                            color: "white",
                            fontSize: 15,
                            fontWeight: 'normal',
                        }}
                        selectedItemLabelStyle={{
                            fontWeight: "bold"
                        }}
                        CloseIconComponent={() => <MyCloseIcon/>}  
                        textStyle={[styles.boldtext, { margin:0, borderWidth:0 }]}
                        containerStyle={{
                            width: '33%',
                            paddingVertical:0,                                                  
                        }}
                        
                    />
                                        
                    <TextInput
                        style={[styles.input, {alignSelf:'flex-end', borderWidth:0}]}
                        onChangeText={setAmount}
                        value={amount}
                        placeholder="0.00"
                        keyboardType="numeric"            
                    />
                </View>

                <View style={styles.rowstretch}>
                    <View style={[styles.innercol, {paddingRight:5}]}>
                        <Text style={[styles.text, {marginLeft:5, maxWidth:100}]}>Exchange Rate:</Text>
                        <View style={[styles.inputView, {paddingLeft:0, marginHorizontal:0, alignItems:'center'}]}>
                            <Text style={[styles.text, {maxWidth:40, marginLeft:15, minHeight:48}]}>{(currency).toUpperCase()}/{defaultCurr}</Text>  

                            <TextInput
                                style={[styles.input, {margin:0}]}
                                onChangeText={text=>{
                                    setGetCurrStatus(()=>"idle");
                                    setExchangeRate(text);
                                }}
                                value={exchangeRate}
                                placeholder="1.00"
                                keyboardType="numeric"            
                            />

                        </View>
                    </View>

                    <View style={[styles.innercol, {paddingLeft:5}]}>
                        <Text style={[styles.text, {marginLeft:5}]}>Exchanged Amt:</Text>
                        <Text style={[styles.inputView, {
                            fontSize:20, 
                            paddingVertical:8, 
                            paddingRight:20, 
                            marginHorizontal:0, 
                            textAlign:'right',
                            textAlignVertical: 'center',
                            opacity: 0.7,
                            color: 'white',
                            minHeight: 50,
                        }]}>{defaultCurr} {convertedAmount}</Text>                    
                    </View>
                </View>

                <View>
                    <CurrencyExchangeRateStatus status={getCurrStatus}></CurrencyExchangeRateStatus>
                </View>



                <Text style={styles.text}>Category:</Text>
                <View>
                    <DropDownPicker
                        style={styles.inputView}
                        open={openDropDown}
                        value={category}
                        items={fixedCat}
                        setOpen={setOpenDropDown}
                        setValue={setCat}
                        setItems={setFixedCat}
                        searchable={true}
                        searchPlaceholder="Search..."
                        searchPlaceholderTextColor="white"
                        searchContainerStyle={{
                            borderBottomWidth: 0,
                        }}
                        searchTextInputStyle={{
                            color: "white",
                            backgroundColor: "#968484",
                            borderWidth: 0,
                            borderRadius: 20,
                        }}
                        listMode="MODAL"
                        modalContentContainerStyle={{
                            backgroundColor: "#F4E0DB",
                        }}
                        listItemLabelStyle={{
                            color: "white",
                        }}
                        listItemContainerStyle={{
                            backgroundColor: "#968484",
                            borderRadius: 20,
                            height: 40,
                            margin: 5,
                        }}
                        CloseIconComponent={() => <MyCloseIcon/>}                       

                        containerStyle={{
                            width: '94%',
                            borderWidth:0,
                        }}
                        zIndex={1000}
                    />
                </View>
                    

                <View style={[styles.rowstretch, {marginTop:15, marginBottom:5}]}>
                    <View style={[styles.innercol, {paddingRight:5}]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setDatePickerVisibility(true)}>
                            <View style={[styles.inputView, {marginHorizontal:0, marginTop:0, paddingVertical:5, paddingRight:15}]}>
                                <TextInput
                                    style={[styles.input, {fontSize:15, marginLeft:0, paddingRight: 0}]}
                                    value={date.toString().slice(0,8)}
                                    editable={false} // optional
                                />
                                <Ionicons 
                                    name="calendar-outline"
                                    size={35}
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

                    <View style={[styles.innercol, {paddingHorizontal: 5}]}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setTimePickerVisibility(true)}>
                            <View style={[styles.inputView, {marginHorizontal:0, marginTop:0, paddingVertical:5, paddingRight:10}]}>
                                <TextInput
                                    style={[styles.input, {fontSize:15, marginLeft:0, paddingRight: 0}]}
                                    value={time.toString()}
                                    editable={false} // optional
                                />
                                <Ionicons 
                                    name="timer-outline"
                                    size={35}
                                    style={{alignSelf:'center'}}
                                />
                            </View>                                
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
                    </View>

                    <View style={[styles.innercol, {paddingLeft:5, flex: 0.5}]}>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={imgModalVisible}
                            presentationStyle="fullScreen"
                            onRequestClose={() => {
                              Alert.alert("Modal has been closed.");
                              setImgModalVisible(!imgModalVisible);
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={[styles.pane, {alignItems:'center', paddingTop:5, paddingBottom:50}]}>
                                    <TouchableOpacity onPress={()=>setImgModalVisible(!imgModalVisible)}>
                                        <Ionicons 
                                            name="chevron-down-outline"
                                            size= {20}
                                            color='white'
                                        />
                                    </TouchableOpacity>

                                    <View style={styles.rowstretch}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalButton}
                                            onPress={pickImage}>
                                                
                                            <Text style={[styles.boldtext, {textAlign:'center', fontSize:18}]}>
                                                Gallery
                                            </Text>
                                            

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalButton}
                                            onPress={snapImage}>

                                            <Text style={[styles.boldtext, {textAlign:'center', fontSize:18}]}>
                                                Camera
                                            </Text>
                                            
                                        </TouchableOpacity>
                                    </View>


                                    <View style={{width: 300, height: 300, backgroundColor:'#C4C4C4', alignSelf:'center', borderRadius:50, margin:30}}>
                                        {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
                                    </View>   


                                    <View style={styles.rowstretch}>       

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalButton}
                                            onPress={() => {
                                                setImgModalVisible(!imgModalVisible);
                                                if(image === null){
                                                    Alert.alert("No image selected.");
                                                }
                                            }}>
                                            <Text style={[styles.boldtext, {textAlign:'center', fontSize:18}]}>
                                                OK
                                            </Text>                                    
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalButton}
                                            onPress={() => {
                                                setImage(null);
                                                setImgModalVisible(!imgModalVisible);
                                                console.log("cancel button clicked", image);                                     
                                            }}>
                                            <Text style={[styles.boldtext, {textAlign:'center', fontSize:18}]}>
                                                Cancel
                                            </Text>                                    
                                        </TouchableOpacity>

                                    </View>

                                </View>
                                
                            </View>
                            
                        </Modal>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setImgModalVisible(!imgModalVisible)}>
                            <View style={[styles.inputView, {justifyContent:'center', alignItems:'center', padding:10, marginHorizontal:0, marginTop:0}]}>
                                <Ionicons 
                                    name="cloud-upload-outline"
                                    size={35}
                                />
                            </View>                                
                        </TouchableOpacity>

                    </View>
                </View>        

                <Text style={styles.text}>Description:</Text>
                <View style={[styles.inputView, {paddingLeft:0}]}>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={[styles.input, {height: 80, width:'100%', textAlign:'left', paddingLeft: 10}]}
                        onChangeText={setDes}
                        value={description}         
                    />
                </View>    

                <View style={[styles.toggleContainer, {marginTop: 5}]}>
                    <Text style={[styles.text, {paddingTop:0, paddingBottom:0}]}>Auto-recurring?</Text>
                    <Text style={styles.toggletext}>{autorecurring? "YES": "NO"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#F4C2C2" }}
                        thumbColor={autorecurring ? "#fc8eac" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchAR}
                        value={autorecurring}
                    />
                </View>

                <View style={styles.toggleContainer}>
                    <Text style={[styles.text, {paddingTop:0, paddingBottom:0,}]}>Income or Expense?</Text>
                    <Text style={styles.toggletext}>{spendEarn ? "INCOME": "EXPENSE"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#F4C2C2" }}
                        thumbColor={spendEarn ? "#fc8eac" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchSE}
                        value={spendEarn}
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

