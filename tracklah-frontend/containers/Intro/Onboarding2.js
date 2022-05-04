import{
    View,
    Text,
    Image
} from 'react-native';
import styles from '../../styles/onboard-style';

export default function Onboarding2(){
    return(
        <View style={styles.container}>
            <Image 
                style={styles.image1}
                source={require('../../assets/investigation.png')}
            />            
            <Text style={styles.title}>Spend With Ease</Text>
            <Text style={styles.text}>Tracking your expenses is a breeze with Tracklah. Get a detailed overview of your monthly expenses and income
            with our Pie Chart and Bar Graph function.           
            </Text>
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