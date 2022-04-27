import { StyleSheet } from "react-native";
import colors from './colors';

const createLoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingTop: 50,
    },

    contentButton:{
        flex: 1,
        backgroundColor: colors.drawer,
        maxHeight:51,
        width:124,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        margin: 15
    },

    buttonText:{
        color: colors.introText,
    },

    inputBox:{
        backgroundColor: colors.drawer,
        height:34,
        width:'75%',
        margin:5,
        borderRadius:20,
        paddingHorizontal:15,
    },

    inputText:{
        color:colors.introText,
        fontSize:12,
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
        bottom:43,
    },

    validInput:{
        color:'#33AB5F',
    },

    invalidInput:{
        color:'#DE3700'
    }
});


export default createLoginStyles;

