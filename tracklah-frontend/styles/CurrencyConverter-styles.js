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
        bottom: "10%"
    },
    icon: {
        position: "absolute",
        width: screen.width * 0.75,
        height: screen.width * 0.75,
        left: "50%",
        top: "100%"
    }
});
 
export default currencyStyles;