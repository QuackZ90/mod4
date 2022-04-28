import { View, Text, TextInput, Pressable, Alert} from 'react-native';
import { useState, useEffect, useCallback,useRef } from 'react';
import { useContext } from 'react';
import {UserContext, defaultUserLoggedIn} from '../../contexts/UserContext';
import createLoginStyles from '../../styles/createLogin';
import cc from 'currency-codes';
import colors from"../../styles/colors";
import {MaterialCommunityIcons as MaterialIcons} from '@expo/vector-icons';

import userAccountAPI from '../../api/userAccount';
import expensesAPI from '../../api/expenses';
import { useFocusEffect } from '@react-navigation/native';


let LabelForEditableFields = ({labelName, editState, setEditState, ...otherProps})=>{
    console.log(editState);
    return(
        <View style={{width:"75%", flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{alignSelf:"flex-start", marginLeft:15}}>{labelName}:</Text>
            <MaterialIcons name="lead-pencil" size={20} color = {editState?"green":"black"} onPress={()=>{
                setEditState((prevState)=>!prevState);
                }}/>
        </View>
    )
}

let LabelForNonEditableFields =  ({labelName, ...otherProps})=>{
    return(
        <View style={{width:"75%", flexDirection:"row", justifyContent:"space-between"}}>
            <Text style={{alignSelf:"flex-start", marginLeft:15}}>{labelName}:</Text>
        </View>
    )
}

export default function AmendUserData({navigation}){


    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [validRepeatPassword, setValidRepeatPassword] = useState(true);
    const [editPassword, setEditPassword] = useState(false);

    

    const [name, setName] = useState('');
    const [editName, setEditName] = useState(false);
    const initialName = useRef('');

    console.log('Edit Name:', editName);

    const [email, setEmail] = useState('');
    const [editEmail, setEditEmail] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [existingEmail, setExistingEmail] = useState(false);
    const [checkExistingEmail, setCheckExistingEmail] = useState(false);
    const initialEmail = useRef('');

    const [creationStatus, setCreationStatus] = useState("data");
    
    const [defaultCurrency, setDefaultCurrency] = useState(userLoggedIn.defaultCurrency);

    useFocusEffect(
        useCallback(()=>{

            setEditEmail(false);
            setEditName(false);
            setEditPassword(false);

            console.log('fetching user data');

            let timeoutHandler = setInterval(async()=>{

                try{
                    let results = await userAccountAPI.get('/protected/user/'+userLoggedIn.username,{
                        headers:{
                            authorization:userLoggedIn.jwt
                        }
                    })

                    console.log(results);

                    setName(()=>results.data.userData.name);
                    initialName.current = results.data.userData.name;
                    setEmail(()=>results.data.userData.email);
                    initialEmail.current = results.data.userData.email;
                    setDefaultCurrency(()=>results.data.userData.defaultCurrency);


                    clearInterval(timeoutHandler);

                }catch(err){
                    console.log(err);
                }
            }, 1000)
        },[])
    );




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

    useEffect(()=>{
        if(!editName){
            setName(()=>initialName.current)
        }

        if(!editEmail){
            setEmail(()=>initialEmail.current)
        }
        if(!editPassword){
            setPassword(()=>'');
            setRepeatPassword(()=>'');
        }
    },[editName,editEmail,initialName,initialEmail,editPassword])


    //console.log(userLoggedIn, setUserLoggedIn);

    function handleTextUpdate(value, updateState){

        if (updateState !== setName && updateState !== setPassword){
            value = value.replace(/\s/,"");
        };

        updateState(()=>value);

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

        let amendedFields ={username:userLoggedIn.username};

        if (editName){
            amendedFields.name=name;
            console.log('Updating Name to', name);
        }

        if (editEmail){
            amendedFields.email=email;
            console.log('Updating Email to', email);
        }

        if (editPassword){
            amendedFields.password=password;
            amendedFields.repeatPassword=repeatPassword;
            console.log('Updating Password');
        }
        try{

            console.log(amendedFields);

            let results = await userAccountAPI.patch('/protected/user/'+userLoggedIn.username,
                amendedFields,
                {headers:{authorization:userLoggedIn.jwt}});

            console.log(results.data);

            if (results.status === 200){
                setUserLoggedIn((prevUserData)=>{
                    let newUserData = {...prevUserData};

                    newUserData.username = results.data.username;
                    newUserData.name = results.data.name;

                
                    return newUserData;
                })



                setCreationStatus(()=>"done");

                console.log(userLoggedIn);
                navigation.navigate("Overview");
            }


        }catch(err){

            console.log(err.response);
            setCreationStatus(()=>"error");

        }
    
    }

    function NameWarning(){
        if(editName){
            return(
                <>
                {!name && <Text style={createLoginStyles.invalidInput}>Name must have a value.</Text>}
                </>
            )
        }else{
            return null
        }
    }

    function EmailWarnings(){

        if (editEmail){
            return(
                <>
                    {!email && <Text style={createLoginStyles.invalidInput}>Email must have a value.</Text>}
                    {!validEmail && <Text style={createLoginStyles.invalidInput}>Please enter a valid email.</Text>}
                    {(email && existingEmail && !checkExistingEmail)?<Text style={createLoginStyles.invalidInput}>This email is linked to an existing account.</Text>:null}
                    {(email && !existingEmail && !checkExistingEmail && validEmail)? <Text Text style={createLoginStyles.validInput}>Email can be used.</Text>:null}
                    {checkExistingEmail && <Text>Checking if email is registered...</Text>}
                </>
            )
        }else{
            return null;
        }
    }

    function PasswordWarning(){
        if (editPassword){
            return(
                !validPassword && 
                <>
                    <Text style={createLoginStyles.invalidInput}>Password must be at least 6 characters long.</Text>
                    <Text style={createLoginStyles.invalidInput}>Password must have at least 1 captial letter.</Text>
                    <Text style={createLoginStyles.invalidInput}>Password must have at least 1 small letter.</Text>
                    <Text style={createLoginStyles.invalidInput}>Password must have at least 1 number.</Text>
                </>
            )
        }else{
            return null;
        }
}




    return(
        <View style={createLoginStyles.container}>

            <LabelForNonEditableFields labelName="Username" />
            <View style={[createLoginStyles.inputBox, createLoginStyles.inputText,{justifyContent:"center"}]}><Text style={{color:"#FFFFFF99"}}>{userLoggedIn.username}</Text></View>

            <LabelForNonEditableFields labelName="Default Currency" />
            <View style={[createLoginStyles.inputBox, createLoginStyles.inputText,{justifyContent:"center"}]}><Text style={{color:"#FFFFFF99"}}>{userLoggedIn.defaultCurrency}</Text></View>


            <LabelForEditableFields labelName="Name" editState={editName} setEditState={setEditName} />
            <TextInput placeholder='Name' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]}  name = 'name' id = 'name' value = {name} onChangeText={text=>{handleTextUpdate(text, setName)}} autoCapitalize='words' editable={editName}></TextInput>
            <NameWarning />
            

            <LabelForEditableFields labelName="Email" editState={editEmail} setEditState={setEditEmail} />
            <TextInput placeholder='Email' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'email' id = 'email' value = {email} onChangeText={text=>{
                handleTextUpdate(text, setEmail);
                validateEmail(text);
            }} keyboardType='email-address' autoCapitalize='none' editable={editEmail?true:false}></TextInput>
            <EmailWarnings />
            

            <LabelForEditableFields labelName="Password" editState={editPassword} setEditState={setEditPassword} />
            <TextInput placeholder='Password' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'password' id = 'password' value = {password} onChangeText={text=>{
                handleTextUpdate(text, setPassword);
                validatePassword(text);
            }} secureTextEntry={true} autoCapitalize='none' onBlur={()=>{
                if (repeatPassword){
                    validateRepeatPassword(repeatPassword)
                }
            }} editable={editPassword?true:false}></TextInput>
            <PasswordWarning/>
 


            <TextInput placeholder='Repeat Password' placeholderTextColor="#FFFFFF99" style={[createLoginStyles.inputBox, createLoginStyles.inputText]} name = 'repeatPassword' id = 'repeatPassword' value = {repeatPassword} onChangeText={text=>{
                handleTextUpdate(text, setRepeatPassword);
                validateRepeatPassword(text);
            }} secureTextEntry={true} autoCapitalize='none' editable={editPassword?true:false}></TextInput>
            {!validRepeatPassword && <Text style={createLoginStyles.invalidInput}>Password does not match. Please ensure that password matches desired password.</Text>}






            <Pressable style={[createLoginStyles.bottomButton,{bottom:145}]} onPress={()=>{

                setCreationStatus(()=>"loading");
                Alert.alert("Confirm submission",
                            `The following fields will be updated:\n\n${editName?`Name: ${name}\n\n`:''}${editEmail?`Email: ${email}\n\n`:''}${editPassword?`Password\n`:''}`,

                            [{text:"Cancel", onPress:()=>{console.log("Cancelled pressed"); setCreationStatus(()=>"data")},style:"cancel"},
                            {text:"OK", onPress:()=>{console.log("OK pressed"); handleSubmit();}}]);

                }} disabled = {((editEmail||editName||editPassword) &&
                                (userLoggedIn.username && ((email && validEmail && !existingEmail && !checkExistingEmail)||!editEmail) && ((password && validPassword && repeatPassword && validRepeatPassword)||(!editPassword)) && name))? false: true}>{creationStatus==="loading"?<Text style={createLoginStyles.buttonText}>Loading...</Text>:<Text style={createLoginStyles.buttonText}>Update profile</Text>}</Pressable>
            {creationStatus==="error"? <Text>Unable to connect to Database at the moment. Please try again later.</Text>:null}




            <Pressable style={createLoginStyles.bottomButton} onPress={()=>{

                    setUserLoggedIn(()=>defaultUserLoggedIn);
                    navigation.navigate("account");

                }}><Text style={createLoginStyles.buttonText}>Logout</Text></Pressable>
        </View>
    )

}
