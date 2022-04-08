import {View, Text, Button} from 'react-native';

export default function Login(navigation){
    <View>
        <Text>Login in page</Text>
        <Button title="Login" onPress={()=>navigation.navigate("app")} />
    </View>
    
}