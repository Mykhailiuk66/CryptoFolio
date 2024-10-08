import { createContext } from "react";
import { Key, useCallback, useContext, useEffect, useState } from "react";
import { Selection } from "@nextui-org/react";
import {
	CoinData,
	DefaultProviderProps,
	Watchlist,
	WatchlistContextType,
} from "../types";
import { AuthContext } from "../store/AuthContext";

export const WatchlistContext = createContext<WatchlistContextType>(
	{} as WatchlistContextType
);

export const WatchlistProvider = ({ children }: DefaultProviderProps) => {
	const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
	const [selectedWatchlist, setSelectedWatchlist] = useState<string>();
	const [visibleColumns, setVisibleColumns] = useState<Selection>("all");
	const [watchlistCoinsData, setWatchlistCoinsData] = useState<CoinData[]>(
		[]
	);
	const { authTokens } = useContext(AuthContext);

	const fetchWatchlists = useCallback(async () => {
		try {
			const response = await fetch(`/api/watchlists/`, {
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
			coins!.map((item) => params.append("cs", item.coin_slug));
			coins!.map((item) => params.append("es", item.exchange_slug));

			const response = await fetch(`/api/coin-exchange-info/?${params}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authTokens?.access,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setWatchlistCoinsData(data);
			} else {
				throw new Error("Failed to fetch watchlists");
			}
		} catch (error) {
			console.error("Error fetching watchlists:", error);
		}
	}, [authTokens?.access, selectedWatchlist, watchlists]);

	const removeWatchlistCoin = async (watchlistcoinId: string) => {
		try {
			const response = await fetch(
				`/api/watchlist-coin/${watchlistcoinId}/`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + authTokens?.access,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to delete watchlist coin");
			}
		} catch (error) {
			console.error("Error deleting watchlist coin:", error);
		}
	};

	const addWatchlistCoin = async (coinId: Key, exchangeId: Key) => {
		try {
			const response = await fetch(`/api/watchlist-coin/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authTokens?.access,
				},
				body: JSON.stringify({
					coin: coinId,
					exchange: exchangeId,
					watchlist: selectedWatchlist,
				}),
			});

			if (response.ok) {
				fetchWatchlists();
			} else {
				throw new Error("Failed to add watchlist coin");
			}
		} catch (error) {
			console.error("Error adding watchlist coin:", error);
		}
	};

	const addWatchlist = async (name: string) => {
		try {
			if (name.length === 0) return;
			const response = await fetch(`/api/watchlists/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authTokens?.access,
				},
				body: JSON.stringify({ name }),
			});

			if (response.ok) {
				const data = await response.json();
				setWatchlists([...watchlists, data]);
			} else {
				throw new Error("Failed to add watchlist");
			}
		} catch (error) {
			console.error("Error adding watchlist:", error);
		}
	};

	const editWatchlist = async (name: string) => {
		try {
			if (name.length === 0) return;
			const response = await fetch(
				`/api/watchlists/${selectedWatchlist}/`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + authTokens?.access,
					},
					body: JSON.stringify({ name: name }),
				}
			);

			if (response.ok) {
				const data = await response.json();
				setWatchlists((prevState) => {
					return prevState.map((w) =>
						w.id === selectedWatchlist ? data : w
					);
				});
			} else {
				throw new Error("Failed to update watchlist");
			}
		} catch (error) {
			console.error("Error updating watchlist:", error);
		}
	};

	const deleteWatchlist = async () => {
		try {
			const response = await fetch(
				`/api/watchlists/${selectedWatchlist}/`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + authTokens?.access,
					},
				}
			);

			if (response.ok) {
				setWatchlists((prevState) =>
					prevState.filter((w) => w.id !== selectedWatchlist)
				);
				setSelectedWatchlist(undefined);
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
	}, [selectedWatchlist, watchlists, watchlists.length]);

	const contextData: WatchlistContextType = {
		watchlists,
		selectedWatchlist,
		watchlistCoinsData,
		visibleColumns,
		addWatchlistCoin,
		setVisibleColumns,
		setSelectedWatchlist,
		setWatchlistCoinsData,
		fetchWatchlists,
		fetchWatchlistCoinsData,
		removeWatchlistCoin,
		addWatchlist,
		editWatchlist,
		deleteWatchlist,
	};

	return (
		<WatchlistContext.Provider value={contextData}>
			{children}
		</WatchlistContext.Provider>
	);
};
