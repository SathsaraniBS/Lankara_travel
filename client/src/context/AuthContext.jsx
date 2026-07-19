import React, { createContext, useState, useContext } from 'react';

const authContext = createContext();
function ContextProvider({children}) {
    const [user, setUser] = useState(null);
    const login = (user) => {
        setUser(user);
    };

  return (
    <authContext.Provider value={{ user,login}}>
        {children}
      
    </authContext.Provider>
  )
}

export const useAuth = () =>  useContext(authContext);

export default ContextProvider
