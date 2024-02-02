import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrencyUser: () => null,
    
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrencyUser] = useState(null);
    const value = {currentUser, setCurrencyUser};
  
    useEffect(() => {
       const unsubcribe = onAuthStateChangedListener((user) => {
       if(user){
        createUserDocumentFromAuth(user);
       }
        setCurrencyUser(user);
       })
       return unsubcribe
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

