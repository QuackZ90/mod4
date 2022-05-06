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
        top: "20%",
        left: "2.5%",
        width: "80%",
        justifyContent: "center",
        alignItems: "center"
    },
    containerDisabled: {
        backgroundColor: "#B6A4A4"
    },
    button: {
        padding: 15,
        backgroundColor: colors.listBackground,
        borderRightColor: colors.border,
        borderRightWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    buttonText: {
        fontSize: 10,
        color: colors.homeText,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        padding: 10,
    }
});

export default styles;