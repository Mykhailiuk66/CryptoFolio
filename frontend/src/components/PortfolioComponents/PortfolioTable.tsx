import { useCallback, useContext, useMemo, useState } from "react";
import { ColumnType, ExtendedPortfolioHolding } from "../../types";
import CustomTable from "../TableComponents/CustomTable";
import PortfolioTopContent from "./PortfolioTopContent";
import { PortfolioContext } from "../../store/PortfolioContext";
import { SortDescriptor } from "@nextui-org/react";
import PortfolioCell from "./PortfolioCell";

const columns: ColumnType[] = [
	{ name: "Id", id: "id", visible: false },
	{ name: "Portfolio", id: "portfolio", visible: false },
	{ name: "Coin", id: "coin_short_name" },
	{ name: "Exchange", id: "exchange_name" },
	{ name: "Quantity", id: "quantity" },
	{ name: "Purchase Price", id: "purchase_price" },
	{ name: "Purchase Date", id: "purchase_date" },
	{ name: "Sale Price", id: "sale_price" },
	{ name: "Sale Date", id: "sale_date" },
	{ name: "Profit/Loss", id: "price" },
	{ name: "Actions", id: "actions" },
];

const PortoflioTable = () => {
	const [filterValue, setFilterValue] = useState("");
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: "id",
		direction: "ascending",
	});
	const { portfolios, selectedPortfolio, visibleColumns } =
		useContext(PortfolioContext);

	const portfolio = portfolios.find((p) => p.id === selectedPortfolio);

	const headerColumns = useMemo(() => {
		if (visibleColumns === "all")
			return columns.filter((column) => column?.visible !== false);

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.id.toString())
		);
	}, [visibleColumns]);

	const filteredItems = useMemo(() => {
		let filteredData = portfolio ? [...portfolio?.holdings!] : [];

		if (filterValue) {
			filteredData = filteredData.filter((item) =>
				item.coin_short_name
					.toLowerCase()
					.includes(filterValue.toLowerCase())
			);
		}

		return filteredData;
	}, [filterValue, portfolio]);

	const sortedItems = useMemo(() => {
		return [...filteredItems].sort((a, b) => {
			let first: number = a[
				sortDescriptor.column as keyof ExtendedPortfolioHolding
			] as number;
			let second: number = b[
				sortDescriptor.column as keyof ExtendedPortfolioHolding
			] as number;
			if (sortDescriptor.column === "price") {
				first = a["price"]! - a["purchase_price"];
				second = b["price"]! - b["purchase_price"];
			}

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
			<PortfolioTopContent
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
			CellComponent={PortfolioCell}
		/>
	);
};

export default PortoflioTable;
