import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const screen = Dimensions.get('window');

const currencyStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.mainBackground,
    },
    view: {
        backgroundColor: colors.drawer,
        width: "90%",
        height: "90%",
        position: "absolute",
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.drawer,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        top: "5%",
        left: "5%"
    },
    image: {
        position: "absolute",
        width: screen.width * 0.50,
        height: screen.width * 0.50,
        left: "22%",
        marginTop: "20%",
        resizeMode: "contain"
    },
    text: {
        color: colors.introText,
        fontSize: 13,
        textAlign: "center",
        top: "15%"
    },
});
 
export default currencyStyles;