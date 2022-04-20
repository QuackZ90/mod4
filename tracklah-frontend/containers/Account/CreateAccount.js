import { ScrollView,View, Text, Button, TextInput, Pressable} from 'react-native';
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
    const [existingUser, setExisitingUser] = useState(false)
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState('');
    const [validRepeatPassword, setValidRepeatPassword] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [creationStatus, setCreationStatus] = useState("data");

    useEffect(async ()=>{

        let timeoutHandler;

        console.log(username+' in useEffect');

        if(username && validUsername){
            console.log(userAccountAPI);
            timeoutHandler =  setTimeout(async ()=>{
                console.log(userAccountAPI);

                try{
                    let results = await userAccountAPI.get('/public/user/?check='+username);

                    console.log(results);

                    if (results.status===200){
                        setExisitingUser(results.data.message);
                        clearInterval(timeoutHandler);
                    }
                }catch(err){
                    console.log(err);
                }

            }, 1000)
        }

        return(()=>{clearInterval(timeoutHandler)});

    }, [username])


    console.log(userLoggedIn, setUserLoggedIn);

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

            <Text>Name</Text><TextInput style={createLoginStyles.input} name = 'name' id = 'name' value = {name} onChangeText={text=>{handleTextUpdate(text, setName)}} autoCapitalize='words'></TextInput>
            
            <Text>Username</Text><TextInput style={createLoginStyles.input} name = 'username' id = 'username' value = {username} onChangeText={text=>{
                handleTextUpdate(text, setUsername);
                validateUsername(text);
            }}autoCapitalize='none'></TextInput>
            {!validUsername && <Text>Username must be at least 3 characters long, and contains only alphanumeric, ".", "-" and/or "_"</Text>}
            {existingUser && <Text>Username taken. Please try another username.</Text>}

            <Text>Email</Text><TextInput style={createLoginStyles.input} name = 'email' id = 'email' value = {email} onChangeText={text=>{
                handleTextUpdate(text, setEmail);
                validateEmail(text);
            }} keyboardType='email-address'></TextInput>
            {!validEmail && <Text>Please enter a valid email.</Text>}

            <Text>Password</Text><TextInput style={createLoginStyles.input} name = 'password' id = 'password' value = {password} onChangeText={text=>{
                handleTextUpdate(text, setPassword);
                validatePassword(text);
            }} secureTextEntry={true} autoCapitalize='none'></TextInput>
            {!validPassword && <><Text>Password must be at least 6 characters long.</Text><Text>Password must have at least 1 captial letter.</Text><Text>Password must have at least 1 small letter.</Text><Text>Password must have at least 1 number.</Text></>}


            <Text>Repeat Password</Text><TextInput style={createLoginStyles.input} name = 'repeatPassword' id = 'repeatPassword' value = {repeatPassword} onChangeText={text=>{
                handleTextUpdate(text, setRepeatPassword);
                validateRepeatPassword(text);
            }} secureTextEntry={true} autoCapitalize='none'></TextInput>
            {!validRepeatPassword && <Text>Password does not match. Please ensure that password matches desired password.</Text>}








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
                }} disabled = {(username && validUsername) && (email && validEmail) && (password && validPassword) && (repeatPassword && validRepeatPassword) && name? false: true}>{creationStatus==="loading"?<Text style={createLoginStyles.buttonText}>Loading...</Text>:<Text style={createLoginStyles.buttonText}>Create Account</Text>}</Pressable>
                {creationStatus==="error"? <Text>Error processing. Please try again.</Text>:null}
        </View>
    )

}

