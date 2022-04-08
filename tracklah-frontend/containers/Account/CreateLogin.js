import {View, Text, Button} from 'react-native';

export default function CreateLogin(navigation){

    <View>
        <Button title='Login' onPress={()=>navigation.navigate("login")} />
        <Button title='Create Account' onPress={()=>navigation.navigate("createAccount")} />
    </View>
    
}