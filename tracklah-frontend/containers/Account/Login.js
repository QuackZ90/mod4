import {View, Text, Button} from 'react-native';

export default function Login({navigation}){
    return(
        <View style={{justifyContent:"center",flex:1,}}>
            <Text>Login in page</Text>
            <Button title="Login" onPress={()=>navigation.navigate("app")} />
        </View>
    )
    
}