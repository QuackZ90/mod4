import{View, Text, Button} from 'react-native';


export default function Onboarding2({navigation}){
    return(
        <View style={{justifyContent:"center",flex:1,}}>
            <Text>This is onboarding page 2</Text>
            <Button title='Get Started' onPress={()=>navigation.navigate('account')} />
        </View>
    )
}