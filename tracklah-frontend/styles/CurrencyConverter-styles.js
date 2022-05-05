import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const screen = Dimensions.get('window');

const currencyStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainBackground,
        flex: 1,
        justifyContent: "center",
    },
    image: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: screen.width * 0.50,
        height: screen.width * 0.50,
        left: "25%",
        bottom: "10%",
        resizeMode: 'contain',
    },
    icon: {
        position: "absolute",
        width: screen.width * 0.75,
        height: screen.width * 0.75,
        left: "20%",
        top: "20%",

    }
});
 
export default currencyStyles;