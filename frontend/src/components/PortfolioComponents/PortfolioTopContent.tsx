import { useContext } from "react";
import { Button } from "@nextui-org/react";
import ColumnsDropdown from "../TableComponents/ColumnsDropdown";
import { ColumnType } from "../../types";
import { FaPlus } from "react-icons/fa6";
import { PortfolioContext } from "../../store/PortfolioContext";
import PortfolioOptions from "./PortfolioOptions";
import TableSearch from "../TableComponents/TableSearch";

type PortfolioTopContentType = {
	onSearchChange: (value?: string) => void;
	filterValue: string;
	columns: ColumnType[];
};

const PortfolioTopContent = ({
	onSearchChange,
	filterValue,
	columns,
}: PortfolioTopContentType) => {
	const {
		selectedPortfolio,
		visibleColumns,
		onOpen,
		setModalState,
		setVisibleColumns,
	} = useContext(PortfolioContext);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-3 items-end">
				<TableSearch
					onSearchChange={onSearchChange}
					filterValue={filterValue}
				/>

				<div className="flex gap-3">
					{selectedPortfolio && (
						<Button
							color="primary"
							variant="bordered"
							endContent={<FaPlus />}
							onPress={() => {
								setModalState("ADD_COIN");
								onOpen();
							}}
						>
							Add asset
						</Button>
					)}

					<ColumnsDropdown
						columns={columns}
						visibleColumns={visibleColumns}
						setVisibleColumns={setVisibleColumns}
					/>
					{selectedPortfolio && <PortfolioOptions />}
				</div>
			</div>
		</div>
	);
};

export default PortfolioTopContent;
