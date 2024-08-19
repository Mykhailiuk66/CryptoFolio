import { useCallback, useContext, useMemo, useState } from "react";
import { CoinData, ColumnType } from "../../types";
import CustomTable from "../TableComponents/CustomTable";
import { SortDescriptor } from "@nextui-org/react";
import WatchlistTopContent from "./WatchlistTopContent";
import { WatchlistContext } from "../../store/WatchlistContext";
import WatchlistCell from "./WatchlistCell";

const columns: ColumnType[] = [
	{ name: "Id", id: "id", visible: false },
	{ name: "Coin", id: "coin_short_name" },
	{ name: "Exchange", id: "exchange_name" },
	{ name: "Date", id: "date", visible: false },
	{ name: "Price", id: "price" },
	{ name: "Volume", id: "volume" },
	{ name: "Previous Price (24h)", id: "prev_price_24h" },
	{ name: "High Price", id: "high_price" },
	{ name: "Low Price", id: "low_price" },
	{ name: "Turnover", id: "turnover" },
	{ name: "Price Change", id: "price_change_perc" },
	{ name: "Actions", id: "actions" },
];

const WatchlistTable = () => {
	const [filterValue, setFilterValue] = useState("");
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "id",
		direction: "ascending",
	});
	const { watchlistCoinsData, visibleColumns } = useContext(WatchlistContext);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all")
			return columns.filter((column) => column?.visible !== false);

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.id.toString())
		);
	}, [visibleColumns]);

	const filteredItems = useMemo(() => {
		let filteredData = [...watchlistCoinsData];

		if (filterValue) {
			filteredData = filteredData.filter((item) =>
				item.coin_short_name
					.toLowerCase()
					.includes(filterValue.toLowerCase())
			);
		}

		return filteredData;
	}, [filterValue, watchlistCoinsData]);

	const sortedItems = useMemo(() => {
		return [...filteredItems].sort((a, b) => {
			const first = a[sortDescriptor.column as keyof CoinData] as number;
			const second = b[sortDescriptor.column as keyof CoinData] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, filteredItems]);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
		} else {
			setFilterValue("");
		}
	}, []);

	const topContent = useMemo(() => {
		return (
			<WatchlistTopContent
				onSearchChange={onSearchChange}
				filterValue={filterValue}
				columns={columns}
			/>
		);
	}, [filterValue, onSearchChange]);

	return (
		<CustomTable
			sortDescriptor={sortDescriptor}
			setSortDescriptor={setSortDescriptor}
			topContent={topContent}
			headerColumns={headerColumns}
			sortedItems={sortedItems}
			CellComponent={WatchlistCell}
		/>
	);
};

export default WatchlistTable;
