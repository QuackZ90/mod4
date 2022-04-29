import { StyleSheet } from 'react-native';
import colors from './colors';

const btnStyles = StyleSheet.create({
    button: {
        color: colors.homeText,
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.drawer,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        flexBasis:"47.5%",
        aspectRatio: 1,
        alignItems:"center",
        justifyContent:"center"
    },
});

export default btnStyles;

