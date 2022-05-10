import { StyleSheet, Dimensions } from "react-native";
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const createLoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },

    contentButton:{
        flex: 1,
        backgroundColor: colors.drawer,
        maxHeight: 51,
        width: 124,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 15,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    buttonText:{
        color: colors.introText,
    },

    inputBox:{
        backgroundColor: colors.drawer,
        height: 35,
        width: '75%',
        margin: 5,
        borderRadius: 20,
        paddingHorizontal: 15,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    inputText:{
        color:colors.introText,
        fontSize:12,
    },

    bottomButton:{
        flex: 1,
        backgroundColor: colors.drawer,
        height: 50,
        width: '75%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: height * 0.05,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },

    validInput:{
        color: '#33AB5F',
    },

    invalidInput:{
        color: '#DE3700'
    }
});


export default createLoginStyles;

