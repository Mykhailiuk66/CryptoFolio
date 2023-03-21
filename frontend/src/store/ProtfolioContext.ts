import { createContext } from "react";
import { PortfolioContextType } from "../types";

const PortfolioContext = createContext<PortfolioContextType>({} as PortfolioContextType)

export default PortfolioContext

