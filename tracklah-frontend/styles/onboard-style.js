import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.mainBackground,
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        color: colors.homeText,
    },
    circle: {
        position: "absolute",
        justifyContent: "center",
        width: "30%",
        bottom: 200
    },
    arrow: {
        position: "absolute",
        justifyContent: "center",
        width: "30%",
        bottom: 120
    }
});

export default styles;