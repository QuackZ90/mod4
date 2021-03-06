import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
    },
    addIcon: {
        justifyContent: "center",
        alignItems: "center",
        color: "#D3BABA",
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    graphIcon: {
        width: "80%",
        height: "80%",
        borderColor: "red",
        borderWidth: 1,
    },
    pieIcon: {
        width: "80%",
        height: "80%",
    },
    welcomeText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#786767",
        marginTop: height * 0.01
    },
    row:{
        width: "90%",
        marginVertical: "2.5%",
    },
    item: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F4E0DB",
        borderRadius: 20,
        marginVertical: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        left: width * 0.05
    }
});

export default styles;
