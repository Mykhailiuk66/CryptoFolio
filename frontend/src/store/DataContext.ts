import { createContext } from "react";
import { DataContextType } from "../types";

const DataContext = createContext<DataContextType>({} as DataContextType)

export default DataContext

