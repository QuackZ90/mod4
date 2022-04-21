import { StyleSheet } from 'react-native';
import colors from './colors';

const btnStyles = StyleSheet.create({
    button: {
        color: colors.homeText,
        flexWrap: "wrap",
        flexDirection: "row",
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.drawer,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: "5%",
        marginVertical: "5%",
        marginTop: "2%",
        marginBottom: "2%",
        marginLeft: "5%",
        marginRight: "5%",
        width: 145,
        height: 145,
    },
});

export default btnStyles;

