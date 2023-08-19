import {
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from "@nextui-org/react";
import { Selection } from "@react-types/shared";
import { IoChevronDownSharp } from "react-icons/io5";
import { ColumnType } from "../../types";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";

type ColumnsDropdownProps = {
	columns: ColumnType[];
	visibleColumns: Selection;
	setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
};

const ColumnsDropdown = ({
	columns,
	visibleColumns,
	setVisibleColumns,
}: ColumnsDropdownProps) => {

	return (
		<CustomDropdown>
			<DropdownTrigger className="hidden sm:flex">
				<Button variant="bordered" endContent={<IoChevronDownSharp />}>
					Columns
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				disallowEmptySelection
				aria-label="Table Columns"
				closeOnSelect={false}
				selectedKeys={visibleColumns}
				selectionMode="multiple"
				onSelectionChange={setVisibleColumns}
			>
				{columns
					.filter((column) => column?.visible !== false)
					.map((column) => {
						return (
							<DropdownItem
								key={column.id}
								className="capitalize"
							>
								{column.name}
							</DropdownItem>
						);
					})}
			</DropdownMenu>
		</CustomDropdown>
	);
};

export default ColumnsDropdown;
