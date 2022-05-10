import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ShowOneItem( {route, navigation} ){

    const {userLoggedIn} = useContext(UserContext);
    const defaultCurr = userLoggedIn.defaultCurrency;

    console.log('data in ShowOneItem', route.params);

    return(
        <ScrollView contentContainerStyle={{justifyContent:"center",flex:1, paddingTop:0, backgroundColor: "#F4E0DB"}}>

            <View style={styles.pane}>
                <View style={[styles.rowstretch, styles.inputView]}>
                    <Text style={[styles.text, {flex:1}]}>{(route.params.description).toUpperCase()}</Text>
                    <Text style={[styles.text, {flex:1, fontSize: 18, fontWeight: 'bold', marginRight: 30, textAlign:'right'}]}>{defaultCurr}${route.params.amount.$numberDecimal}</Text>
                </View>

                <View style={styles.rowstretch}>
                    <View style={[styles.innercol, styles.inputView, {flexDirection: 'column', marginHorizontal:0, marginRight:5, paddingLeft: 0, alignItems:'center'}]}>
                        <Text style={[styles.text, {marginLeft:0}]}>Exchange Rate</Text>
                    </View>
                    <View style={[styles.innercol, styles.inputView, {flexDirection: 'column', marginHorizontal:0, marginLeft:5, paddingLeft: 0, alignItems:'center'}]}>
                        <Text style={[styles.text, {marginLeft:0}]}>Txn amount in Foreign Currency</Text>
                    </View>
                </View>

                <View style={[styles.inputView, {justifyContent: 'space-between'}]}>
                    <Text style={styles.text}>CATEGORY:</Text>
                    <Text style={[styles.text, {marginRight: 30, fontWeight: 'bold'}]}>{(route.params.category).toUpperCase()}</Text>
                </View>

                <View style={styles.rowstretch}>
                    <View style={[styles.innercol, styles.inputView, {flexDirection: 'column', marginHorizontal:0, marginRight:5, paddingLeft: 0, alignItems:'center'}]}>
                        <Text style={[styles.text, {marginLeft:0, fontWeight: 'bold'}]}>{route.params.date}</Text>
                    </View>
                    <View style={[styles.innercol, styles.inputView, {flexDirection: 'column', marginHorizontal:0, marginLeft:5, paddingLeft: 0, alignItems:'center'}]}>
                        <Text style={[styles.text, {marginLeft:0, fontWeight: 'bold'}]}>{route.params.time ? route.params.time: "--:-- am"}</Text>
                    </View>
                </View>

                <View style={[styles.inputView, {justifyContent: 'space-between'}]}>
                    <Text style={styles.text}>INCOME OR EXPENSE?</Text>
                    <Text style={[styles.text, {marginRight: 30, fontWeight: 'bold'}]}>{route.params.spend_vs_earn ? "INCOME" : "EXPENSE"}</Text>
                </View>

                <View style={[styles.inputView, {justifyContent: 'space-between'}]}>
                    <Text style={styles.text}>RECURRING?</Text>
                    <Text style={[styles.text, {marginRight: 30, fontWeight: 'bold'}]}>{route.params.auto_recurring ? "YES" : "NO"}</Text>
                </View>
                
                <View style={styles.imageBox}>
                    {route.params.receipt_image ? <Image source={{ uri: route.params.receipt_image }} style={{ width: 250, height: 250, borderRadius:50, }}/> : <Text>no image uploaded</Text>}
                </View>        

                <TouchableOpacity 
                    style={[styles.inputView,{backgroundColor:"#F4E0DB", alignItems:'center', justifyContent:'center', paddingVertical:10}]}
                    onPress={()=> navigation.navigate("List Current Month Items")}
                >
                    <Ionicons 
                        name="caret-back-outline"
                        size= {30}
                        color='black'
                    />
                    <Text style={[styles.text, {fontSize:20, fontWeight: 'bold', marginRight: 40}]}>BACK</Text>
                    
                </TouchableOpacity>
            </View>

        </ScrollView>
        


    )
}

const styles = StyleSheet.create({
    pane: {
        backgroundColor: "#968484",
        marginBottom: 30,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        zIndex:0,
        minHeight: 0.9*windowHeight,
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
        marginVertical: 5,
    },
    imageBox:{
        width: 250,
        height: 250, 
        backgroundColor:'#C4C4C4', 
        alignSelf:'center', 
        borderRadius:50, 
        margin:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
        color: 'black',
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 15,
    },


});
