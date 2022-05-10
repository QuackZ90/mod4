import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

export const victoryStyles = {
    barXaxis: {
        axisLabel: { padding: 85},
        grid: { stroke: 'none' },
    },
    barYaxis: {
        axisLabel: { padding: 50 },
        grid: { stroke: 'none' },
    },
    barAxisAnimation: {
        duration: 2000,
        easing: "bounce"
    },
    chartAnimation: {
        duration: 2000,
        onLoad: { duration: 1000 },
        easing: "bounce",
    },
    barChart: {
        background: { fill: "#D3BABA" }
    },
    barDataStyle: {
        data: { 
            fill: ({ datum }) => 
            datum.spend_vs_earn === true ? "#BFD2B5" : "#DDA4A4",
        } 
    },
    pieStyle: {
        data: {
            fillOpacity: 0.9, 
            stroke: "#968484", 
            strokeWidth: 0,
            },
            labels: {
            fontSize: 12, 
            fill: "brown",
            },
    },
}


export const chartStyles = StyleSheet.create({

    chart: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    pielegend: {
        flex: 1,
        backgroundColor: colors.listBackground,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        margin: '5%',
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    view:{
        backgroundColor: colors.drawer,
        width: "90%",
        height: "90%",
        position: "absolute",
        borderRadius: 20,
        elevation: 5,
        backgroundColor: colors.drawer,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        top: "5%",
        left: "5%"
    },
    dropdownpicker: {
        backgroundColor: colors.listBackground,
        borderRadius: 20,
        width: "80%",
        margin: "2%",
        alignSelf: "center",    
    },
    dropdowncontainerstyle: {
        backgroundColor: "#D3BABA",
        borderRadius: 20,
        width: "80%",
        margin: "2%",
        alignSelf: "center",
    },
    tablecontainer: {
        backgroundColor: colors.listBackground,
        justifyContent: "center",
        borderRadius: 20,
        margin: '5%',
        width: width*0.805,
        elevation: 5,
        shadowOffset: {width: 1, height: 1}, 
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    tablecell: {
        width: 0.20*width,
        padding: 8,
        alignContent: 'center',
    },
    row: {
        flexDirection: "row",
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
    },
    exportIcon: {
        alignSelf: 'center', 
        position: 'relative',
    },
    title: {
        textAlign:"center", 
        marginTop: 10,
        fontWeight: "bold",
    },
    tableTitle: {
        fontWeight: "bold",
    }
});

