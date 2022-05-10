import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    pane: {
        backgroundColor: "#968484",
        marginBottom: 30,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 0,
        borderRadius: 20,
        zIndex: 0,
        minHeight: height * 0.8,
    },
    rowstretch: {
        flexDirection: 'row',
        marginHorizontal: 12,
    },
    innercol: {
        flex: 1,
        flexDirection: 'column',
    },
    inputView:{
        backgroundColor: "#D3BABA",
        flexDirection: 'row',
        borderRadius: 20,
        paddingLeft: 10,
        marginHorizontal: 12,
        marginTop: 2,
    },
    input: {
        height: 50,
        paddingVertical: 0,
        paddingRight: 25,
        borderRadius: 20,
        backgroundColor: 'transparent',
        fontSize: 20,
        width: '67%',
        textAlign: 'right',
        color: 'black',
    },
    text: {
        marginLeft: 20,
        color: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
    },
    boldtext: {
        fontWeight: "700",
        margin: 12,
        color: "black",
        fontSize: 20,
        paddingVertical: 0,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 0,
        marginVertical: 0,
        height: 30,
    },
    toggletext: {
        fontWeight: "700",
        fontSize: 15,
        color: "#D3BABA",
        alignItems: 'center',
        marginHorizontal: 20,
    },
    button: {
        alignItems: "center",
        borderRadius: 25,
        width: 50,
        height: 50,
        padding: 5,
        alignSelf: 'center',
        marginTop: 0,
        zIndex: 10,
        top: 25,
    },
    modalButton:{
        backgroundColor: "#D3BABA",
        margin: 10,
        borderRadius: 20,
        flex:1,
    },
    modalContainer: {
        flexDirection: 'column',
        backgroundColor: '#F4E0DB',
        minHeight: height,
        paddingTop: 20,
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