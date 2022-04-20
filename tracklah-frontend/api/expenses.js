import axios from 'axios';
import {EXPENSES_API} from "@env";


const expensesAPI = axios.create(
    {
        baseURL: EXPENSES_API
    }
)


export default expensesAPI;