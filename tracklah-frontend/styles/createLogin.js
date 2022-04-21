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

    input:{
        backgroundColor: colors.drawer,
        height:34,
        width:'75%',
        margin:5,
        borderRadius:20,
        paddingLeft:15,
        paddingRight: 15,
        color:colors.introText,
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

    }
});


export default createLoginStyles;

