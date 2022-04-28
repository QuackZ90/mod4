import { createContext } from "react";

const defaultUserLoggedIn = {
    username: null,
    userId: null,
    jwt: null,
    name: null,
    defaultCurrency:null,
};

const defaultUserContext = {
    userLoggedIn: defaultUserLoggedIn,
    setUserLoggedIn:(userData)=>{}
}



const UserContext = createContext(defaultUserContext);

export {UserContext,defaultUserLoggedIn};
