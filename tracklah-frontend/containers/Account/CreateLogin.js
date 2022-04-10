import {View, Text, Button} from 'react-native';

export default function CreateLogin({navigation}){
    return(
        <View style={{justifyContent:"center",flex:1,}}>
            <Button title='Login' onPress={()=>navigation.navigate("login")} />
            <Button title='Create Account' onPress={()=>navigation.navigate("createAccount")} />
        </View>
    )
    
}