import { createContext } from "react";
import { AuthContextDataType } from "../types";


const AuthContext = createContext<AuthContextDataType>({} as AuthContextDataType)

export default AuthContext
