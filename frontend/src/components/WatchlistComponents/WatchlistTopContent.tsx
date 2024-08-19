import { useContext, useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { MdAddCircleOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

import ColumnsDropdown from "../TableComponents/ColumnsDropdown";
import { ColumnType, WatchlistModalState } from "../../types";
import { WatchlistContext } from "../../store/WatchlistContext";
import WatchlistOptions from "./WatchlistOptions";
import WatchlistSelect from "./WatchlistSelect";
import WatchlistModal from "./WatchlistModal";
import TableSearch from "../TableComponents/TableSearch";

type WatchlistTopContentType = {
	onSearchChange: (value?: string) => void;
	filterValue: string;
	columns: ColumnType[];
};

const WatchlistTopContent = ({
	onSearchChange,
	filterValue,
	columns,
}: WatchlistTopContentType) => {
	const [modalState, setModalState] = useState<WatchlistModalState>();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const {
		watchlists,
		selectedWatchlist,
		visibleColumns,
		fetchWatchlists,
		setVisibleColumns,
	} = useContext(WatchlistContext);

	useEffect(() => {
		if (watchlists.length === 0) {
			fetchWatchlists();
		}
	}, [watchlists.length, fetchWatchlists]);

	return (
		<>
			<WatchlistModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				modalState={modalState}
			/>
			<div className="flex justify-between flex-wrap md:flex-nowrap gap-3 items-end">
				<div className="flex w-full md:max-w-xs justify-between items-center gap-2">
					<WatchlistSelect />

					<Button
						isIconOnly
						variant="bordered"
						onPress={() => {
							setModalState("ADD_WATCHLIST");
							onOpen();
						}}
					>
						<MdAddCircleOutline size={25} />
					</Button>
				</div>

				<TableSearch
					filterValue={filterValue}
					onSearchChange={onSearchChange}
				/>

				<div className="flex w-full md:max-w-fit md:justify-end gap-3">
					{selectedWatchlist && (
						<Button
							color="primary"
							variant="bordered"
							endContent={<FaPlus />}
							onPress={() => {
								setModalState("ADD_COIN");
								onOpen();
							}}
						>
							Add coin
						</Button>
					)}

					<ColumnsDropdown
						columns={columns}
						visibleColumns={visibleColumns}
						setVisibleColumns={setVisibleColumns}
					/>

					{selectedWatchlist && (
						<WatchlistOptions
							setModalState={setModalState}
							onOpen={onOpen}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default WatchlistTopContent;
