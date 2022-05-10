import { View, Text, TextInput, Pressable, Alert} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import {UserContext} from '../../contexts/UserContext';
import createLoginStyles from '../../styles/createLogin';
import SelectDropdown from 'react-native-select-dropdown';
import cc from 'currency-codes';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../styles/colors';

import userAccountAPI from '../../api/userAccount';
import expensesAPI from '../../api/expenses';

let currencyList = cc.codes().map(item=>{
    return {
        label: item,
        value: item,
    }
})

export default function CreateAccount({navigation}){


    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(true);
    const [existingUser, setExistingUser] = useState(false);
    const [checkExistingUser, setCheckExistingUser] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [validRepeatPassword, setValidRepeatPassword] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [existingEmail, setExistingEmail] = useState(false);
    const [checkExistingEmail, setCheckExistingEmail] = useState(false);
    const [creationStatus, setCreationStatus] = useState("data");


    const [defaultCurrency, setDefaultCurrency] = useState(null);

    useFocusEffect(useCallback(()=>{
        setUsername('');
        setValidUsername(true);
        setExistingUser(false);
        setCheckExistingUser(false);
        setPassword('');
        setValidPassword(true);
        setRepeatPassword('');
        setValidRepeatPassword(true);
        setName('');
        setEmail('');
        setValidEmail(true);
        setExistingEmail(false);
        setCheckExistingEmail(false);
        setCreationStatus('data');
    },[]))

    useEffect(()=>{

        let timeoutHandler1;
        let controllerUserNameCheck = new AbortController()

        console.log(username+' in useEffect');

        if(username && validUsername){

            setCheckExistingUser(()=>true);

            timeoutHandler1 =  setInterval(async ()=>{

                try{
                    let results = await userAccountAPI.get('/public/user/?checkusername='+username, {signal: controllerUserNameCheck.signal});

                    console.log("API called to check username:", username, "availability");

                    // console.log(results);

                    if (results.status===200){
                        setExistingUser(results.data.message);
                        setCheckExistingUser(()=>false);
                        clearInterval(timeoutHandler1);
                    }
                }catch(err){
                    console.log(err);
                }

            }, 1500)
        }

        return(()=>{
            clearInterval(timeoutHandler1);
            controllerUserNameCheck.abort();
            setCheckExistingUser(()=>false);
        });
        ;

    }, [username]);

    useEffect(()=>{

        let timeoutHandler2;
        let controllerEmailCheck = new AbortController()

        console.log(email+' in useEffect');

        if(email && validEmail){

            setCheckExistingEmail(()=>true);

            timeoutHandler2 =  setInterval(async ()=>{

                try{
                    let results = await userAccountAPI.get('/public/user/?checkemail='+email, {signal:controllerEmailCheck.signal});

                    //console.log(results);
                    console.log("API called to check email:", email, "availability");

                    if (results.status===200){
                        setExistingEmail(results.data.message);
                        setCheckExistingEmail(()=>false);
                        clearInterval(timeoutHandler2);
                    }
                }catch(err){
                    console.log(err);
                }

            }, 1500)
        }

        return(()=>{
            clearInterval(timeoutHandler2);
            controllerEmailCheck.abort();
            setCheckExistingEmail(()=>false);

        });

    }, [email]);


    //console.log(userLoggedIn, setUserLoggedIn);

    function handleTextUpdate(value, updateState){

        if (updateState !== setName && updateState !== setPassword){
            value = value.replace(/\s/,"");
        };

        updateState(()=>value);

    };

    function validateUsername(value){
        let invalidUsername = /[^a-z0-9\.\-_']+/i
        if(value && (value.length < 3 || invalidUsername.test(value))){
            setValidUsername(()=>false);
        }else{
            setValidUsername(()=>true);
        }


    };

    function validatePassword(value){
        let containsCapital = /^\S*[A-Z]+\S*$/.test(value);
        let containsSmallLetter = /^\S*[a-z]+\S*$/.test(value);
        let containsNumber = /^\S*[0-9]+\S*$/.test(value);
        if(value&&(value.length < 6 || !containsCapital || !containsSmallLetter || !containsNumber)){
            setValidPassword(()=>false);
        }else{
            setValidPassword(()=>true);
        }
    };

    function validateRepeatPassword(value){
        if (value && (value!==password)){
            setValidRepeatPassword(()=>false);
        }else{
            setValidRepeatPassword(()=>true);
        }
    };

    function validateEmail(value){
        let isEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
        if (value && !isEmail.test(value)){
            setValidEmail(()=>false);
        }else{
            setValidEmail(()=>true);
        }
    };

    async function handleSubmit(){
        try{

            let results = await userAccountAPI.post('/public/user',{
                username,
                email,
                password,
                repeatPassword,
                name,
                defaultCurrency
            });

            console.log(results.data);

            if (results.status === 200){
                setUserLoggedIn(()=>{
                    return {
                        username:results.data.userCreation.data.username,
                        name: results.data.userLogin.name,
                        defaultCurrency:results.data.userLogin.defaultCurrency,
                        userId: results.data.userLogin.userId,
                        jwt: results.data.userLogin.jwtToken,
                    }
                })

                setCreationStatus(()=>"done");

                console.log(userLoggedIn);
                navigation.navigate("app");
            }


        }catch(err){

            console.log(err);

            try{

                if (err.response.data.userLogin.status ===201){
                    setUserLoggedIn(()=>{
                        return {
                            username:err.response.data.userCreation.data.username,
                            name: err.response.data.userLoggedIn.name,
                            defaultCurrency:err.response.data.userLoggedIn.defaultCurrency,
                            userId: err.response.data.userLogin.userId,
                            jwt: err.reponse.data.userLogin.jwtToken,
                        }
                    })

                    expensesAPI.post("/protected/user", {userId:err.response.data.userLogin.userId},
                    {headers:{'authorization':err.response.data.userLogin.jwtToken,}}).then(response=>(console.log(response))).catch(err=>{console.log(err)});

                    setCreationStatus(()=>"done");

                    console.log(userLoggedIn);
                    navigation.navigate("app");

                }
                else{
                    console.log(err);
                    setCreationStatus(()=>"error");
                }
            }catch(error){
                setCreationStatus(()=>"error");
            }
        }
    };


    function UsernameWarnings(){
        return(
            <>
                {!validUsername && <Text style={createLoginStyles.invalidInput}>Username must be at least 3 characters long, and contains only alphanumeric, ".", "-" and/or "_"</Text>}
                {(username && existingUser && !checkExistingUser)?<Text style={createLoginStyles.invalidInput}>Username taken. Please try another username.</Text>:null}
                {(username && !existingUser && !checkExistingUser &&validUsername)? <Text style={createLoginStyles.validInput}>Username available</Text>:null}
                {checkExistingUser && <Text>Checking if username is available...</Text>}
            </>
        )
    }

    function EmailWarnings(){
        return(
            <>
                {!validEmail && <Text style={createLoginStyles.invalidInput}>Please enter a valid email.</Text>}
                {(email && existingEmail && !checkExistingEmail)?<Text style={createLoginStyles.invalidInput}>This email is linked to an existing account. Please proceed to login.</Text>:null}
                {(email && !existingEmail && !checkExistingEmail && validEmail)? <Text Text style={createLoginStyles.validInput}>Email can be used.</Text>:null}
                {checkExistingEmail && <Text>Checking if email is registered...</Text>}
            </>
        )
    };

    function PasswordWarnings(){

        return(
            <>
                {!validPassword && 
                    <>
                        <Text style={createLoginStyles.invalidInput}>Password must be at least 6 characters long.</Text>
                        <Text style={createLoginStyles.invalidInput}>Password must have at least 1 captial letter.</Text>
                        <Text style={createLoginStyles.invalidInput}>Password must have at least 1 small letter.</Text>
                        <Text style={createLoginStyles.invalidInput}>Password must have at least 1 number.</Text>
                    </>
                }
            </>
        )
    };




    return(
        <View style={createLoginStyles.container}>

            <TextInput placeholder='Name' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]}  name = 'name' id = 'name' value = {name} onChangeText={text=>{handleTextUpdate(text, setName)}} autoCapitalize='words'></TextInput>
            
            <TextInput placeholder='Username' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'username' id = 'username' value = {username} onChangeText={text=>{
                handleTextUpdate(text, setUsername);
                validateUsername(text);
            }}autoCapitalize='none'></TextInput>
            <UsernameWarnings />

            <TextInput placeholder='Email' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'email' id = 'email' value = {email} onChangeText={text=>{
                handleTextUpdate(text, setEmail);
                validateEmail(text);
            }} keyboardType='email-address' autoCapitalize='none'></TextInput>
            <EmailWarnings />


            <TextInput placeholder='Password' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'password' id = 'password' value = {password} onChangeText={text=>{
                handleTextUpdate(text, setPassword);
                validatePassword(text);
            }} secureTextEntry={true} autoCapitalize='none' onBlur={()=>{
                if (repeatPassword){
                    validateRepeatPassword(repeatPassword)
                }
            }}></TextInput>
            <PasswordWarnings />



            <TextInput placeholder='Repeat Password' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'repeatPassword' id = 'repeatPassword' value = {repeatPassword} onChangeText={text=>{
                handleTextUpdate(text, setRepeatPassword);
                validateRepeatPassword(text);
            }} secureTextEntry={true} autoCapitalize='none'></TextInput>
            {!validRepeatPassword && <Text style={createLoginStyles.invalidInput}>Password does not match. Please ensure that password matches desired password.</Text>}


            <SelectDropdown
                data={cc.codes()}
                onSelect={async (selectedItem, index)=>{
                    
                    setDefaultCurrency(()=>selectedItem);
                }}

                defaultButtonText= "Select default currency"
                buttonTextAfterSelection = {(selectedItem,index)=>{
                    return selectedItem
                }}
                
                buttonStyle={createLoginStyles.inputBox}
                
                buttonTextStyle={
                   { color: defaultCurrency?"#FFFFFF":'#FFFFFF99',
                    textAlign: "left",
                    fontWeight:"normal",
                    marginHorizontal:0,
                    fontSize:12,
                    }
                }
                dropdownStyle={{
                    backgroundColor:colors.drawer,
                    borderRadius:20,
                }}

                rowTextStyle={{
                    color: colors.introText,
                    fontSize:12,
                }}
                rowStyle={{
                    height:35,
                }}
                />




            <Pressable style={createLoginStyles.bottomButton} onPress={()=>{

                setCreationStatus(()=>"loading");
                Alert.alert("Confirm submission",
                            `These fields cannot be edited once submitted. Please confirm.\n\nUsername: ${username}\nDefault Currency: ${defaultCurrency}`,
                            [{text:"Cancel", onPress:()=>{console.log("Cancelled pressed"); setCreationStatus(()=>"data")},style:"cancel"},
                            {text:"OK", onPress:()=>{console.log("OK pressed"); handleSubmit();}}]);

                }} disabled = {(username && validUsername && !existingUser && !checkExistingUser) && (email && validEmail && !existingEmail && !checkExistingEmail) && (password && validPassword) && (repeatPassword && validRepeatPassword) && name && defaultCurrency? false: true}>{creationStatus==="loading"?<Text style={createLoginStyles.buttonText}>Loading...</Text>:<Text style={createLoginStyles.buttonText}>Create Account</Text>}</Pressable>
                {creationStatus==="error"? <Text>Error processing. Please try again.</Text>:null}
        </View>
    )

}

