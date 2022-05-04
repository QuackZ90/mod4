import{
    View,
    Text,
    Image,
    Pressable
} from 'react-native';
import styles from '../../styles/onboard-style';

export default function Onboarding3({navigation}){
    return(
        <View style={styles.container}>
            <Image 
                style={styles.image1}
                source={require('../../assets/money-exchange.png')}
            />            
            <Text style={styles.title}>Save Easy</Text>
            <Text style={styles.text}>With a Currency Converter function, save yourself from the hassle of going on a webpage to find
            the latest conversion rates! Come onboard and save easy with us!           
            </Text>
            <Image 
                style={styles.circle}
                source={require('../../assets/Onboard3Circle.png')}
            />            
            <Image 
                style={styles.arrow}
                source={require('../../assets/OnboardArrow.png')}
            />            
            <Pressable   
                style={styles.bottomButton}
                onPress={()=>navigation.navigate('account')}><Text style={styles.buttonText}>Get Started</Text></Pressable>
        </View>
    )
};