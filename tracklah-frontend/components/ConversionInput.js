import { 
    TouchableOpacity,
    TextInput,
    View,
    StyleSheet 
} from "react-native";
import colors from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        flexDirecton: "row"
    },
    button: {
        padding: 15,
        borderRightColor: colors.border,
        borderRightWidth: 1,
    },
    buttonText: {
        fontSize: 10,
        color: colors.beige,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        padding: 10,
    }
});

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