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
        marginHorizontal: "5%",
        marginVertical: "5%",
        marginTop: "2%",
        marginBottom: "2%",
        marginLeft: "5%",
        marginRight: "5%"
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
        fontSize: 58,
        fontWeight: "bold",
        color: "#E2E2E2",
        marginHorizontal: 10,
        marginVertical: 10,
        left: "15%",
        top: "20%"
    },
    graphsCard:{
        flexWrap: "wrap",
        flexDirection: "row",
    },
    exListCard: {
        flex: 1,
        width: 218,
        height: 215,
    }
});

export default cardStyles;