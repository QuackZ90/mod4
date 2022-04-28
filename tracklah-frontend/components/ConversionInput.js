import { 
    TouchableOpacity,
    TextInput,
    View,
    Text
} from "react-native";
import styles from '../styles/ConversionInput-styles';

export const ConversionInput = ({text, value, onButtonPress}) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput style={styles.input}/>
        </View>
    );
};