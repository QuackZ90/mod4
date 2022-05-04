import{
    View,
    Text,
    Image
} from 'react-native';
import styles from '../../styles/onboard-style';


export default function Onboarding1(){
    return(
        <View style={styles.container}>
            <Image 
                style={styles.image1}
                source={require('../../assets/growth.png')}
            />            
            <Text style={styles.title}>Empower Your Finance</Text>
            <Text style={styles.text}> Ever wondered where your money went, or struggling to remember what you spent it on? 
            Welcome to Tracklah, where we ease your worries and empower your finance.           
            </Text>
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