import{View, Text, Button} from 'react-native';


export default function Home({navigation}){
    return(
        <View style={{justifyContent:"center",flex:1,}}>
            <Text>This is the home page after login</Text>
            <Button title="View Charts" onPress={()=>navigation.navigate("View Charts")} />
        </View>
    )
}