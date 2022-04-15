import{
    View, 
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';


export default function CurrencyConverter(){
    return(
        <SafeAreaView style={{justifyContent:"center",flex:1,}}>
            <TouchableOpacity>
                <Text>This page allows you convert currencies.</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};