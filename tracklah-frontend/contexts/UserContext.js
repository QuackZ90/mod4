import { createContext } from "react"

const defaultUserContext = {
    userLoggedIn:{
        username: null,
        userId: null,
        jwt: null,
    },
    setUserLoggedIn:(userData)=>{}
}

const UserContext = createContext(defaultUserContext);

export default UserContext;
