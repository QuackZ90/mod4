import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const cardStyles = StyleSheet.create({
    card: {
        flexWrap: "wrap",
        flexDirection: "column",
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.drawer,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    cardContent: {
        fontWeight: "bold",
        marginHorizontal: 18,
        marginVertical: 20
    },
    totalExText: {
        fontSize: 58,
        fontWeight: "bold",
        color: "#E2E2E2",
        marginRight: 10,
        marginBottom: 15,
        left: "15%",
        top: "20%"
    },
    graphsCard:{
        flexDirection: "row",
    },
    exListCard: {
        flex: 1,
        width: 218,
        height: 215,
    }
});

export default cardStyles;