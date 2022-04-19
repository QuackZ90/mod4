import { StyleSheet } from 'react-native';
import colors from './colors';

const cardStyles = StyleSheet.create({
    totalExCard: {
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.listBackground,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        width: 218,
        height: 86
    },
    totalExText: {
        fontSize: 40,
        fontWeight: "bold",
        position: "absolute"
    },  
    card2: {
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.listBackground,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        width: 218,
        height: 86
    },
    card3: {
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.listBackground,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#fff",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        width: 218,
        height: 86
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 20
    }
});

export default cardStyles;