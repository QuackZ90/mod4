import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.mainBackground,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.homeText,
        padding: '5%',
        margin: '5%',
        top: '5%',
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    text: {
        fontSize: 18,
        color: colors.homeText,
        top: '5%',
    },
    circle: {
        position: 'absolute',
        justifyContent: 'center',
        width: '30%',
        bottom: '22%'
    },
    arrow: {
        position: 'absolute',
        justifyContent: 'center',
        width: '30%',
        bottom: '15%'
    },
    bottomButton:{
        flex: 1,
        backgroundColor: colors.drawer,
        height: 51,
        width: '75%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '7%',
    },
    buttonText: {
        color: colors.introText,
    },
    image1: {
        position: 'absolute',
        resizeMode: 'contain',
        width: '60%',
        top: '-2%',
    }
});

export default styles;