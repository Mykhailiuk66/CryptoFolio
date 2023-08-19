import { Select, SelectItem } from "@nextui-org/react";
import { useContext } from "react";
import { WatchlistContext } from "../../store/WatchlistContext";

const WatchlistSelect = () => {
	const { watchlists, selectedWatchlist, setSelectedWatchlist } =
		useContext(WatchlistContext);

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedWatchlist(e.target.value);
	};

	return (
		<Select
			disallowEmptySelection
			items={watchlists}
			aria-label="select-watchlist"
			variant="bordered"
			className="max-w-xs"
			classNames={{
				popoverContent: [
					"border-solid",
					"border-1",
					"border-default-200/50",
					"bg-primary-background",
				],
			}}
			selectedKeys={[selectedWatchlist] as Iterable<string>}
			onChange={handleSelectionChange}
		>
			{(watchlist) => (
				<SelectItem key={watchlist.id}>{watchlist.name}</SelectItem>
			)}
		</Select>
	);
};

export default WatchlistSelect;
