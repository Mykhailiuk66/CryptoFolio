import { createContext } from "react";
import { WatchlistContextType } from "../types";

const WatchlistContext = createContext<WatchlistContextType>({} as WatchlistContextType)

export default WatchlistContext

