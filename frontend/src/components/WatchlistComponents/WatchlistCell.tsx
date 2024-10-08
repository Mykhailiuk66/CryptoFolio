import {
	Button,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Chip,
} from "@nextui-org/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { formatCurrency } from "../../utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CoinData } from "../../types";
import { Key, useContext } from "react";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";
import { CoinModalContext } from "../../store/CoinModalContext";
import { WatchlistContext } from "../../store/WatchlistContext";
import { DataContext } from "../../store/DataContext";

type WatchlistCellProps = {
	item: CoinData;
	columnKey: Key;
};

const WatchlistCell = ({ item, columnKey }: WatchlistCellProps) => {
	const {
		removeWatchlistCoin,
		selectedWatchlist,
		watchlists,
		setWatchlistCoinsData,
	} = useContext(WatchlistContext);
	const { coins, exchanges } = useContext(DataContext);
	const { openCoinInfoModal } = useContext(CoinModalContext);

	const cellValue = item[columnKey as keyof CoinData];
	const coin = coins.find((c) => c.short_name === item.coin_short_name);
	const exchange = exchanges.find((e) => e.name === item.exchange_name);

	const handleRemove = () => {
		const watchlistCoins = watchlists.find(
			(w) => w.id === selectedWatchlist
		)?.coins;
		const watchCoin = watchlistCoins?.find(
			(wc) =>
				wc.coin_slug === coin?.slug &&
				wc.exchange_slug === exchange?.slug
		);

		removeWatchlistCoin(watchCoin?.id!);
		setWatchlistCoinsData((prevState) =>
			prevState.filter((wc) => wc.id !== item.id)
		);
	};

	switch (columnKey) {
		case "coin_short_name":
			return (
				<p
					className="font-bold cursor-pointer"
					onClick={() =>
						openCoinInfoModal(exchange!.slug, coin!.slug)
					}
				>
					{cellValue}
				</p>
			);
		case "volume":
			return (
				<div className="flex flex-col">
					<p className="text-bold text-small capitalize">
						{formatCurrency(cellValue as number)}
					</p>
				</div>
			);
		case "exchange_name":
			return (
				<Chip
					className="capitalize"
					color="success"
					size="sm"
					variant="flat"
				>
					{cellValue}
				</Chip>
			);
		case "price_change_perc":
			return (
				<Chip
					className="capitalize"
					color={(cellValue as number) >= 0 ? "success" : "danger"}
					size="sm"
					variant="flat"
				>
					<p className="flex items-center">
						{(cellValue as number) >= 0 ? (
							<IoMdArrowDropup />
						) : (
							<IoMdArrowDropdown />
						)}{" "}
						{cellValue}%
					</p>
				</Chip>
			);
		case "price":
			return (
				<Chip
					className="bg-primary-background"
					variant="faded"
					color="success"
				>
					${formatCurrency(cellValue as number)}
				</Chip>
			);
		case "turnover":
		case "low_price":
		case "high_price":
		case "prev_price_24h":
			return (
				<div className="flex flex-col">
					<p className="text-bold text-small capitalize">
						${formatCurrency(cellValue as number)}
					</p>
				</div>
			);
		case "actions":
			return (
				<div className="relative flex justify-end items-center gap-2">
					<CustomDropdown>
						<DropdownTrigger aria-label="dropdown-trigger">
							<Button isIconOnly size="sm" variant="light">
								<BsThreeDotsVertical />
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							variant="flat"
							aria-label="Dropdown menu with shortcut"
						>
							<DropdownItem
								key="remove"
								className="text-danger"
								color="danger"
								onClick={handleRemove}
							>
								Remove
							</DropdownItem>
						</DropdownMenu>
					</CustomDropdown>
				</div>
			);
		default:
			return <p>{cellValue}</p>;
	}
};

export default WatchlistCell;
