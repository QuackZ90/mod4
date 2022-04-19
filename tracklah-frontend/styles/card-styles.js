import { StyleSheet } from 'react-native';
import colors from './colors';

const cardStyles = StyleSheet.create({
    card: {
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.listBackground,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20
    },
    totalExCard: {
        width: 218,
        height: 86
    },
    totalExText: {
        fontSize: 40,
        fontWeight: "bold",
        position: "absolute"
    },  
    graphCard: {
        width: 103,
        height: 99
    },
    pieCard: {
        width: 218,
        height: 86
    },
});

export default cardStyles;