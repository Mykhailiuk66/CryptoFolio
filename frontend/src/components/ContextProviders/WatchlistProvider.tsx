import { useCallback, useContext, useEffect, useState } from "react";
import { Selection } from "@nextui-org/react";

import WatchlistContext from "../../store/WatchlistContext";
import { CoinData, Watchlist, WatchlistContextType } from "../../types";
import BASE_URL from "../../http";
import AuthContext from "../../store/AuthContext";

type WatchlistContextProps = {
  children: React.ReactNode;
};

const WatchlistProvider = ({ children }: WatchlistContextProps) => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string>();
  const [visibleColumns, setVisibleColumns] = useState<Selection>("all");
  const [watchlistCoinsData, setwatchlistCoinsData] = useState<CoinData[]>([]);
  const { authTokens } = useContext(AuthContext);


  const fetchWatchlists = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/watchlists/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setWatchlists(data);
      } else {
        throw new Error("Failed to fetch watchlists");
      }
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    }
  }, [authTokens?.access]);

  const fetchWatchlistCoinsData = useCallback(async () => {
    try {
      const coins = watchlists.find(
        (w) => w.id === selectedWatchlist
      )?.coins;

      const params = new URLSearchParams();
      coins!.map((item) =>
        params.append("coin_slug", item.coin_slug)
      );
      coins!.map((item) =>
        params.append("exchange_slug", item.exchange_slug)
      );

      const response = await fetch(
        `${BASE_URL}/api/coin-exchange-info/?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens?.access,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setwatchlistCoinsData(data);
      } else {
        throw new Error("Failed to fetch watchlists");
      }
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    }
  }, [authTokens?.access, selectedWatchlist, watchlists]);


  const removeWatchlistCoin = async (watchlistcoinId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/watchlist-coin/${watchlistcoinId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });

      if (response.ok) {
        console.log("Watchlist coin deleted successfully");
      } else {
        throw new Error("Failed to delete watchlist coin");
      }
    } catch (error) {
      console.error("Error deleting watchlist coin:", error);
    }
  };


  const addWatchlist = async (name: string) => {
    try {
      if (name.length === 0) return
      const response = await fetch(`${BASE_URL}/api/watchlists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
        body: JSON.stringify({ name }),
      });
  
      if (response.ok) {
        const newWatchlist: Watchlist = await response.json();
        console.log("Watchlist added successfully:", newWatchlist);
      } else {
        throw new Error("Failed to add watchlist");
      }
    } catch (error) {
      console.error("Error adding watchlist:", error);
    }
  };
  
  const editWatchlist = async (name: string) => {
    try {
      if (name.length === 0) return
      const response = await fetch(`${BASE_URL}/api/watchlists/${selectedWatchlist}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
        body: JSON.stringify({ name: name }),
      });
  
      if (response.ok) {
        console.log("Watchlist updated successfully");
      } else {
        throw new Error("Failed to update watchlist");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  const deleteWatchlist = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/watchlists/${selectedWatchlist}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens?.access,
        },
      });
  
      if (response.ok) {
        console.log("Watchlist deleted successfully");
      } else {
        throw new Error("Failed to delete watchlist");
      }
    } catch (error) {
      console.error("Error deleting watchlist:", error);
    }
  };
  


  useEffect(() => {
    if (watchlists.length > 0 && selectedWatchlist === undefined) {
      setSelectedWatchlist(watchlists[0].id.toString());
    }
  }, [watchlists.length]);

  const contextData: WatchlistContextType = {
    watchlists: watchlists,
    selectedWatchlist: selectedWatchlist,
    watchlistCoinsData: watchlistCoinsData,
    visibleColumns: visibleColumns,
    setVisibleColumns: setVisibleColumns,
    setWatchlists: setWatchlists,
    setSelectedWatchlist: setSelectedWatchlist,
    setwatchlistCoinsData: setwatchlistCoinsData,
    fetchWatchlists: fetchWatchlists,
    fetchWatchlistCoinsData: fetchWatchlistCoinsData,
    removeWatchlistCoin: removeWatchlistCoin,
    addWatchlist: addWatchlist,
    editWatchlist: editWatchlist,
    deleteWatchlist: deleteWatchlist,
  };

  return (
    <WatchlistContext.Provider value={contextData}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;
