import { createContext } from "react";

interface IUserContext {
    login: (email: string, password: string) => void;
  }
  export const UserContext = createContext<IUserContext | null>(null)

const UserProvider = ({ children }) => {
    async function login(email: string, password: string) {
        if (email === email && password === password) {
            return true;
        }
        return false
    }

    return (
        <UserContext.Provider value={{login}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider