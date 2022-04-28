import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.listBackground,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        flexDirection: "row"
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