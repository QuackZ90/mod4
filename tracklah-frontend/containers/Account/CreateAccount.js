import { View, Text, TextInput, Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import createLoginStyles from '../../styles/createLogin';

import userAccountAPI from '../../api/userAccount';
import expensesAPI from '../../api/expenses';

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

    useEffect(()=>{

        let timeoutHandler1;

        console.log(username+' in useEffect');

        if(username && validUsername){

            setCheckExistingUser(()=>true);

            timeoutHandler1 =  setInterval(async ()=>{

                try{
                    let results = await userAccountAPI.get('/public/user/?checkusername='+username);

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
            setCheckExistingUser(()=>false);
        });
        ;

    }, [username]);

    useEffect(()=>{

        let timeoutHandler2;

        console.log(email+' in useEffect');

        if(email && validEmail){

            setCheckExistingEmail(()=>true);

            timeoutHandler2 =  setInterval(async ()=>{

                try{
                    let results = await userAccountAPI.get('/public/user/?checkemail='+email);

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

        return(()=>{clearInterval(timeoutHandler2)});

    }, [email])


    //console.log(userLoggedIn, setUserLoggedIn);

    function handleTextUpdate(value, updateState){

        if (updateState !== setName && updateState !== setPassword){
            value = value.replace(/\s/,"");
        };

        updateState(()=>value);

    }

    function validateUsername(value){
        let invalidUsername = /[^a-z0-9\.\-_']+/i
        if(value && (value.length < 3 || invalidUsername.test(value))){
            setValidUsername(()=>false);
        }else{
            setValidUsername(()=>true);
        }


    }

    function validatePassword(value){
        let containsCapital = /^\S*[A-Z]+\S*$/.test(value);
        let containsSmallLetter = /^\S*[a-z]+\S*$/.test(value);
        let containsNumber = /^\S*[0-9]+\S*$/.test(value);
        if(value&&(value.length < 6 || !containsCapital || !containsSmallLetter || !containsNumber)){
            setValidPassword(()=>false);
        }else{
            setValidPassword(()=>true);
        }
    }

    function validateRepeatPassword(value){
        if (value && (value!==password)){
            setValidRepeatPassword(()=>false);
        }else{
            setValidRepeatPassword(()=>true);
        }
    }

    function validateEmail(value){
        let isEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
        if (value && !isEmail.test(value)){
            setValidEmail(()=>false);
        }else{
            setValidEmail(()=>true);
        }
    }


    return(
        <View style={createLoginStyles.container}>

            <TextInput placeholder='Name' placeholderTextColor="#FFFFFF99" style={createLoginStyles.input}  name = 'name' id = 'name' value = {name} onChangeText={text=>{handleTextUpdate(text, setName)}} autoCapitalize='words'></TextInput>
            
            <TextInput placeholder='Username' placeholderTextColor="#FFFFFF99" style={createLoginStyles.input} name = 'username' id = 'username' value = {username} onChangeText={text=>{
                handleTextUpdate(text, setUsername);
                validateUsername(text);
            }}autoCapitalize='none'></TextInput>
            {!validUsername && <Text style={createLoginStyles.invalidInput}>Username must be at least 3 characters long, and contains only alphanumeric, ".", "-" and/or "_"</Text>}
            {(username && existingUser && !checkExistingUser)?<Text style={createLoginStyles.invalidInput}>Username taken. Please try another username.</Text>:null}
            {(username && !existingUser && !checkExistingUser &&validUsername)? <Text style={createLoginStyles.validInput}>Username available</Text>:null}
            {checkExistingUser && <Text>Checking if username is available...</Text>}

            <TextInput placeholder='Email' placeholderTextColor="#FFFFFF99" style={createLoginStyles.input} name = 'email' id = 'email' value = {email} onChangeText={text=>{
                handleTextUpdate(text, setEmail);
                validateEmail(text);
            }} keyboardType='email-address'></TextInput>
            {!validEmail && <Text style={createLoginStyles.invalidInput}>Please enter a valid email.</Text>}
            {(email && existingEmail && !checkExistingEmail)?<Text style={createLoginStyles.invalidInput}>This email is linked to an existing account. Please proceed to login.</Text>:null}
            {(email && !existingEmail && !checkExistingEmail && validEmail)? <Text Text style={createLoginStyles.validInput}>Email can be used.</Text>:null}
            {checkExistingEmail && <Text>Checking if email is registered...</Text>}

            <TextInput placeholder='Password' placeholderTextColor="#FFFFFF99" style={createLoginStyles.input} name = 'password' id = 'password' value = {password} onChangeText={text=>{
                handleTextUpdate(text, setPassword);
                validatePassword(text);
            }} secureTextEntry={true} autoCapitalize='none' onBlur={()=>{
                if (repeatPassword){
                    validateRepeatPassword(repeatPassword)
                }
            }}></TextInput>
            {!validPassword && 
                <>
                    <Text style={createLoginStyles.invalidInput}>Password must be at least 6 characters long.</Text>
                    <Text style={createLoginStyles.invalidInput}>Password must have at least 1 captial letter.</Text>
                    <Text style={createLoginStyles.invalidInput}>Password must have at least 1 small letter.</Text>
                    <Text style={createLoginStyles.invalidInput}>Password must have at least 1 number.</Text>
                </>
            }


            <TextInput placeholder='Repeat Password' placeholderTextColor="#FFFFFF99" style={createLoginStyles.input} name = 'repeatPassword' id = 'repeatPassword' value = {repeatPassword} onChangeText={text=>{
                handleTextUpdate(text, setRepeatPassword);
                validateRepeatPassword(text);
            }} secureTextEntry={true} autoCapitalize='none'></TextInput>
            {!validRepeatPassword && <Text style={createLoginStyles.invalidInput}>Password does not match. Please ensure that password matches desired password.</Text>}








            <Pressable style={createLoginStyles.bottomButton} onPress={async()=>{

                setCreationStatus(()=>"loading");

                    try{

                        let results = await userAccountAPI.post('/public/user',{
                            username,
                            email,
                            password,
                            repeatPassword,
                            name
                        });

                        console.log(results.data);

                        if (results.status === 200){
                            setUserLoggedIn(()=>{
                                return {
                                    username:results.data.userCreation.data.username,
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
                                        userId: err.response.data.userLogin.userId,
                                        jwt: err.response.data.userLogin.jwtToken, 
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
                }} disabled = {(username && validUsername && !existingUser && !checkExistingUser) && (email && validEmail && !existingUser && !checkExistingEmail) && (password && validPassword) && (repeatPassword && validRepeatPassword) && name? false: true}>{creationStatus==="loading"?<Text style={createLoginStyles.buttonText}>Loading...</Text>:<Text style={createLoginStyles.buttonText}>Create Account</Text>}</Pressable>
                {creationStatus==="error"? <Text>Error processing. Please try again.</Text>:null}
        </View>
    )

}

