import{
    View,
    Text,
    Button,
    Image
} from 'react-native';
import styles from '../../styles/onboard-style';

export default function Onboarding3({navigation}){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Save Easy</Text>
            <Image 
                style={styles.circle}
                source={require('../../assets/Onboard3Circle.png')}
            />            
            <Image 
                style={styles.arrow}
                source={require('../../assets/OnboardArrow.png')}
            />            
            <Button   
                title='Get Started' 
                style={styles.button}
                onPress={()=>navigation.navigate('account')} />
        </View>
    )
};