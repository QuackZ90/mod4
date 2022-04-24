import React, {useState, createContext, useContext} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import expensesAPI from '../api/expenses';
import UserContext from './UserContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = props => {

    const {userLoggedIn} = useContext(UserContext);
    const [itemData, setItemData] = useState([]);

    //Get Current Month Items
    const getItems =  async () => {
    await expensesAPI.get('protected/currentmonthitems', {
        headers: {
            Authorization : userLoggedIn.jwt
        }
    })
        .then((response) => {
        setItemData(response.data.data);
        // console.log("ExpenseContext",response.data.data)
        })
        .catch((err)=> {
        console.log(err)
        })
    }

    useFocusEffect( 
        React.useCallback(
        () => {
        console.log('Expense Context useFocusEffect')
        getItems();
    }, [])
    );



    return (
        <ExpenseContext.Provider value={{itemData, setItemData}}>
            {props.children}
        </ExpenseContext.Provider>
    );
};