import {View, Text, Pressable, StatusBar} from 'react-native';
import createLoginStyles from '../../styles/createLogin';


export default function CreateLogin({navigation}){
    return(
        <View style={[createLoginStyles.container,{justifyContent:'center'}]}>
            <Pressable style={createLoginStyles.contentButton} onPress={()=>navigation.navigate("createAccount")}><Text style={createLoginStyles.buttonText}>Sign Up</Text></Pressable>
            <Pressable style={createLoginStyles.contentButton} onPress={()=>navigation.navigate("login")}><Text style={createLoginStyles.buttonText}>Login</Text></Pressable>
        </View>
    )
    
}