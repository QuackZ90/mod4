import{
    View,
    Text,
    Button,
    Image
} from 'react-native';
import styles from '../../styles/onboard-style';

export default function Onboarding2({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Spend with ease</Text>
            <Image 
                style={styles.circle}
                source={require('../../assets/Onboard2Circle.png')}
            />            
            <Image 
                style={styles.arrow}
                source={require('../../assets/OnboardArrow.png')}
            />            
            <Button title='Get Started' onPress={()=>navigation.navigate('account')} />
        </View>
    )
};