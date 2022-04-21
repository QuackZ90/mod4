import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
    },
    addIcon: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        color: "#D3BABA"
    },
    graphIcon: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 25,
        left: 18
    },
    pieIcon: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 20,
        left: 20
    },
    welcomeText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#786767",
        padding: 10,

    }
});

export default styles;
