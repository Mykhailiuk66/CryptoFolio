import { Input } from "@nextui-org/react";

type TableSearchProps = {
	filterValue: string;
	onSearchChange: (value?: string) => void;
};

const TableSearch = ({ filterValue, onSearchChange }: TableSearchProps) => {
	return (
		<Input
			isClearable
			classNames={{
				base: "max-w-full sm:max-w-[17rem] h-10 hidden md:block",
				mainWrapper: "h-full",
				input: "text-small",
				inputWrapper: "h-full font-normal text-default-500",
			}}
			className="w-full sm:max-w-[25%]"
			variant="bordered"
			placeholder="Search by name..."
			value={filterValue}
			onClear={onSearchChange}
			onValueChange={onSearchChange}
		/>
	);
};

export default TableSearch;
