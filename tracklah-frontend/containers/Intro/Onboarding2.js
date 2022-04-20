import{
    View,
    Text,
    Image
} from 'react-native';
import styles from '../../styles/onboard-style';

export default function Onboarding2(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Spend With Ease</Text>
            <Image 
                style={styles.circle}
                source={require('../../assets/Onboard2Circle.png')}
            />            
            <Image 
                style={styles.arrow}
                source={require('../../assets/OnboardArrow.png')}
            />            
        </View>
    )
};