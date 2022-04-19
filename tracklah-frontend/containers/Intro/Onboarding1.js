import{
    View,
    Text,
    Image
} from 'react-native';
import styles from '../../styles/onboard-style';


export default function Onboarding1(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Empower your finance</Text>
            <Image 
                style={styles.circle}
                source={require('../../assets/Onboard1Circle.png')}
            />            
            <Image 
                style={styles.arrow}
                source={require('../../assets/OnboardArrow.png')}
            />
        </View>
    )
};