import { createContext } from "react";
import { CoinModalContextType } from "../types";

const CoinModalContext = createContext<CoinModalContextType>(
	{} as CoinModalContextType
);

export default CoinModalContext;
