import { 
    TextInput,
    View,
} from "react-native";
import styles from '../styles/ConversionInput-styles';
import DropDownPicker from 'react-native-dropdown-picker';
import cc from 'currency-codes';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { colors } from "../styles";

export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

export const ConversionInput = ({
    text, 
    onButtonPress, 
    currency, 
    setCurrency, 
    amount, 
    setAmount, 
    onChangeText,
    ...props
}) => {

    const [fixedCurr, setFixedCurr] = useState(
        cc.codes().map(curr=>{
            return{label:curr,value:curr}
        })
    );
    
    const [ openCurrDropDown, setOpenCurrDropDown ] = useState(false);
    
    const containerStyles = [styles.container]
    if (props.editable === false) {
        containerStyles.push(styles.containerDisabled)
    };
    console.log(amount);

    return (
        <View style={containerStyles}>
            <DropDownPicker 
                style={{
                    borderRadius: 20,
                    backgroundColor: 'transparent', 
                    paddingVertical:0,
                    borderWidth:1,
                    maxWidth: width * 0.3            
                }}
                searchable={true}
                searchPlaceholder="Search..."
                searchPlaceholderTextColor="white"
                searchTextInputStyle={{
                    color: "white",
                    backgroundColor: "#968484",
                    borderWidth: 0,
                    borderRadius: 20,
                }}
                listMode="MODAL"
                modalContentContainerStyle={{
                    backgroundColor: colors.mainBackground,
                }}
                containerStyle={{
                    width: '94%',
                    borderWidth:0,
                }}
                listItemContainerStyle={{
                    backgroundColor: colors.drawer,
                    borderRadius: 20,
                    height: 40,
                    margin: 5,
                }}
                open={openCurrDropDown}
                value={currency}
                items={fixedCurr}
                setOpen={setOpenCurrDropDown}
                setValue={setCurrency}
                setItems={setFixedCurr}
                placeholder={currency}
            >
            </DropDownPicker>
            <TextInput 
                // style={[styles.input, {borderRadius:20, borderWidth:1, borderColor:'red', width: width}]}
                value = {amount.toString()}
                onChangeText = {text => {setAmount(text)}}
                {...props}
            />
        </View>
    );
};