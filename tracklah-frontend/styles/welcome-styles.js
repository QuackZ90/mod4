import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "stretch",
        width: "350%",
    },
    circle: {
        position: "absolute",
        justifyContent: "center",
        width: "30%",
        bottom: 200
    },
    arrow: {
        position: "absolute",
        justifyContent: "center",
        width: "30%",
        bottom: 120
    }
});

export default styles;
