import axios from 'axios';
import { CURRENCY_URL, CURRENCY_KEY } from "@env";


const currencyAPI = axios.create(
    {
        baseURL: CURRENCY_URL,
    }
);


export default currencyAPI;