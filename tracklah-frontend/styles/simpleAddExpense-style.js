import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    pane: {
        backgroundColor: "#968484",
        marginBottom: 50,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 20,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    rowstretch: {
        flexDirection: 'row',
        marginHorizontal: 12,

    },
    innercol: {
        flex:1,
        flexDirection: 'column',
    },
    inputView:{
        backgroundColor: "#D3BABA",
        flexDirection: 'row',
        borderRadius: 20,
        paddingLeft: 10,
        marginHorizontal: 12,
        marginTop: 5,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    input: {
        height: 50,
        paddingVertical: 10,
        paddingRight: 25,
        borderRadius: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        width: '75%',
        textAlign: 'right',
        color: 'black',
    },
    text: {
        marginLeft: 20,
        color: 'white',
        paddingTop: 12,
        paddingBottom: 5,
        textAlign: 'left',
    },
    boldtext: {
        fontWeight: "700",
        margin: 12,
        color: "black",
        fontSize: 20,
    },
    button: {
        alignItems: "center",
        borderRadius: 25,
        width: 50,
        height: 50,
        padding: 5,
        alignSelf: 'center',
        marginTop: 20,
        zIndex: 10,
        top: 25,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    modalCloseIconStyle: {
        backgroundColor:  "#968484",
        borderRadius: 20,
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;