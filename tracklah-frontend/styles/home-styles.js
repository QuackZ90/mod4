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
        color: "#D3BABA"
    },
    graphIcon: {
        width:"80%",
        height:"80%",
        borderColor:"red",
        borderWidth:1,
    },
    pieIcon: {
        width:"80%",
        height:"80%",
    },
    welcomeText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#786767",
    },
    chart: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        justifyContent: "center",
        alignItems: "center"
    },

    row:{
        width:"90%",
        maxWidth:400,
        marginVertical: "2.5%"
    }
});

export default styles;
