import DataContext from "../../store/DataContext"
import { Coin, DataContextType, Exchange } from "../../types"
import BASE_URL from "../../http";
import { useCallback, useEffect, useState } from "react";


type DataProviderProps = {
  children: React.ReactNode
}

const DataProvider = ({ children }: DataProviderProps) => {
  const [coins, setCoins] = useState<Coin[]>([])
  const [exchanges, setExchanges] = useState<Exchange[]>([])

  const fetchCoins = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/coins/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCoins(data);
      } else {
        throw new Error('Failed to fetch coins');
      }
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  }, []);

  const fetchExchanges = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/exchanges/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExchanges(data);
      } else {
        throw new Error('Failed to fetch exchanges');
      }
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    }
  }, []);

  useEffect(() => {
    fetchCoins();
    fetchExchanges();
  }, [fetchCoins, fetchExchanges]); 

  const contextData: DataContextType = {
    coins: coins,
    exchanges: exchanges,
  }

  return (
    <DataContext.Provider value={contextData}>
      {children}
    </DataContext.Provider>
  )
}



export default DataProvider