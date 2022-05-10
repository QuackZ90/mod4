import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    pane: {
        backgroundColor: "#968484",
        marginBottom: 60,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    mainBg: {
        backgroundColor: "#F4E0DB",
    },
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flexDirection: 'row',
        width: width * 0.8,
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#F4E0DB",
        borderRadius: 20,
        marginVertical: 5,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    title: {
        fontSize: 12,
        paddingHorizontal: 0,
        textTransform: 'uppercase',
        width: 120,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    date: {
        fontSize: 20,
        paddingHorizontal: 10,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    amount: {
        fontSize: 20,
        marginLeft: 70,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    trashcontainer:{
        flexDirection: 'column',
        justifyContent: 'center',

    }
});

export default styles;