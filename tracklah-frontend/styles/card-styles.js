import { StyleSheet } from 'react-native';
import colors from './colors';

const cardStyles = StyleSheet.create({
    card: {
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
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    cardContent: {
        fontWeight: "bold",
        marginHorizontal: 18,
        marginVertical: 20
    },
    totalExCard: {
        width: 218,
        height: 86,
    },
    totalExText: {
        fontSize: 40,
        color: colors.introText,
        marginHorizontal: 18,
        marginVertical: 20
    },
    graphsCard:{
        flexWrap: "wrap",
        flexDirection: "row",
    },
    exListCard: {
        flex: 1,
        width: 218,
        height: 215
    }
});

export default cardStyles;