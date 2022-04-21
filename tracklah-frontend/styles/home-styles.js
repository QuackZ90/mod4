import { StyleSheet } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
    },
    addIcon: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 160,
        top: 170,
        color: "#D3BABA"
    }
});

export default styles;
