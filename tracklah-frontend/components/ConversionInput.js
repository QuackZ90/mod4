import { 
    TouchableOpacity,
    TextInput,
    View,
    Text
} from "react-native";
import styles from '../styles/ConversionInput-styles';

export const ConversionInput = ({text, onButtonPress, ...props}) => {
    
    const containerStyles = [styles.container]
    if (props.editable === false) {
        containerStyles.push(styles.containerDisabled)
    };

    return (
        <View style={containerStyles}>
            <TouchableOpacity 
                onPress={onButtonPress} 
                style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
            <TextInput 
                style={styles.input} 
                {...props}
            />
        </View>
    );
};