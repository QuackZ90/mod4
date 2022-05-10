import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

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
        top: height * 0.1,
        left: width * 0.05,
        width: width * 0.8,
        justifyContent: "flex-start",
        alignItems: "center",
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
        borderBottomLeftRadius: 20,
    },
    buttonText: {
        fontSize: 10,
        color: colors.homeText,
        fontWeight: "bold"
    },
    input: {
        flex: 1,
        padding: 10,
        width: width * 2,
        // right: width * 0.3,      
    }
});

export default styles;