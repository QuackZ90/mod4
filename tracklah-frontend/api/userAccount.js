import axios from 'axios';
import {USER_ACCOUNT_API} from "@env";

const userAccountAPI = axios.create(
    {
        baseURL: USER_ACCOUNT_API
    }
)


export default userAccountAPI;