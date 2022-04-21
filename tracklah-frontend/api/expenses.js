import axios from 'axios';
import { EXPENSES_API } from "@env";


console.log(EXPENSES_API);
const expensesAPI = axios.create(
    {
        baseURL: EXPENSES_API
    }
)


export default expensesAPI;