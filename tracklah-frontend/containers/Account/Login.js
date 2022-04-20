import {View, Text, Button, TextInput, Pressable} from 'react-native';

import { useState } from 'react';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

import userAccountAPI from '../../api/userAccount';

export default function Login({navigation}){

    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [loginStatus, setLoginStatus] = useState("data");
    const [password, setPassword] = useState('');

    function handleTextUpdate(value, updateState){

        if (updateState !== setPassword){
            value = value.replace(/\s/,"");
        };

        updateState(()=>value);

    }


    return(
        <View style={{justifyContent:"center",flex:1,}}>
            <Text>Login in page</Text>

            <Text>Username</Text><TextInput name = 'username' id = 'username' value = {username} onChangeText={text=>{
                handleTextUpdate(text, setUsername);
            }}autoCapitalize='none'></TextInput>


            <Text>Password</Text><TextInput name = 'password' id = 'password' value = {password} onChangeText={text=>{
                handleTextUpdate(text, setPassword);
            }} secureTextEntry={true} autoCapitalize='none'></TextInput>
            
            <Pressable onPress={async()=>{

                setLoginStatus(()=>"loading");

                try{

                    let results = await userAccountAPI.post('/public/user/session',{
                        username,
                        password,
                    });

                    console.log(results.data);

                    if (results.status === 201){
                        setUserLoggedIn(()=>{
                            return {
                                username,
                                userId: results.data.userId,
                                jwt: results.data.jwtToken,
                            }
                        })

                        setLoginStatus(()=>"done");

                        console.log(userLoggedIn);
                        navigation.navigate("app");
                    }


                }catch(err){

                    console.log(err);

                    try{
                        if (err.response.status=== 401){
                            setLoginStatus(()=>"invalidUserPassword")
                        } else{
                            setLoginStatus(()=>{return err.response.status + err.response.message})
                        }
                    }catch(error){

                        setLoginStatus(()=>"error");
                    }

                    }
                }} disabled = {(username) && (password) && (loginStatus!=="loading")? false: true}>{loginStatus==="loading"?<Text>Loading...</Text>:<Text>Login</Text>}</Pressable>
            {loginStatus==="invalidUserPassword"? <Text>Invalid Username or Password</Text>:null}
            {loginStatus==="error"? <Text>Error processing. Please try again later.</Text>:null}
        </View>
    )
    
}