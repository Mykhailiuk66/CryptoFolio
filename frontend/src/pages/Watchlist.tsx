import { useContext, useEffect } from "react";
import { WatchlistContext } from "../store/WatchlistContext";
import WatchlistTable from "../components/WatchlistComponents/WatchlistTable";
import Container from "../components/Container/Container";

const Watchlist = () => {
	const { watchlists, selectedWatchlist, fetchWatchlistCoinsData } =
		useContext(WatchlistContext);

	useEffect(() => {
		if (watchlists.length > 0 && selectedWatchlist) {
			fetchWatchlistCoinsData();
		}
	}, [
		watchlists.length,
		selectedWatchlist,
		fetchWatchlistCoinsData,
		watchlists,
	]);

	return (
		<Container>
			<WatchlistTable />
		</Container>
	);
};

export default Watchlist;
