import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const currencyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        justifyContent: "center"
    },
    view: {
        backgroundColor: colors.drawer,
        width: "90%",
        height: "90%",
        position: "absolute",
        borderRadius: 20,
        backgroundColor: colors.drawer,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        left: width * 0.05,
        top: height * 0.1
    },
    image: {
        position: "absolute",
        width: width * 0.50,
        height: height * 0.50,
        left: width * 0.2,
        resizeMode: "contain"
    },
    text: {
        color: colors.introText,
        fontSize: 13,
        textAlign: "center",
        top: height * 0.15,
    },
});
 
export default currencyStyles;