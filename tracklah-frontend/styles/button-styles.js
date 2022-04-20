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
        marginHorizontal: 4,
        marginVertical: 6,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        width: 145,
        height: 145
    },
});

export default btnStyles;

