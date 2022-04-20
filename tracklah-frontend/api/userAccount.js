import axios from 'axios';
import {USER_ACCOUNT_API} from "@env";

console.log("USER_ACCOUNT_API in userAccount.js", USER_ACCOUNT_API);

const userAccountAPI = axios.create(
    {
        baseURL: USER_ACCOUNT_API
    }
)


export default userAccountAPI;