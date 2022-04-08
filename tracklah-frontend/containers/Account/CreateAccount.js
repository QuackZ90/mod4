import {View, Text, Button} from 'react-native';

export default function CreateAccount({navigation}){
    return(
        <View style={{justifyContent:"center",flex:1,}}>
            <Text>Create Account Page</Text>
            <Button title="Create Account" onPress={()=>navigation.navigate("app")} />
        </View>
    )

}

