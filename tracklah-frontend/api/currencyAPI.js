import axios from 'axios';
import { CURRENCY_URL, CURRENCY_KEY } from "@env";


console.log(CURRENCY_URL);
console.log(CURRENCY_KEY);


const currencyAPI = axios.create(
    {
        baseURL: CURRENCY_URL,
    }
);


export default currencyAPI;