import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.listBackground,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        flexDirection: "row",
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
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

export default styles;