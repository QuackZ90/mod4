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
    },

    bottomButton:{
        flex: 1,
        backgroundColor: colors.drawer,
        height: 51,
        width: '75%',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        bottom:120,

    },

    buttonText:{
        color: colors.introText,
    },
});

export default styles;