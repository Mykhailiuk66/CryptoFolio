import {
	Button,
	DropdownTrigger,
	DropdownItem,
	DropdownMenu,
} from "@nextui-org/react";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { WatchlistContext } from "../../store/WatchlistContext";
import { useContext } from "react";
import { WatchlistModalState } from "../../types";

type WatchlistOptionsType = {
	setModalState: React.Dispatch<
		React.SetStateAction<WatchlistModalState | undefined>
	>;
	onOpen: () => void;
};

const WatchlistTable = ({ setModalState, onOpen }: WatchlistOptionsType) => {
	const { deleteWatchlist } = useContext(WatchlistContext);

	return (
		<CustomDropdown>
			<DropdownTrigger>
				<Button isIconOnly variant="bordered" className="ml-auto">
					<BsThreeDotsVertical />
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="bordered" aria-label="dropdown">
				<DropdownItem
					key="edit"
					showDivider
					onPress={() => {
						setModalState("EDIT_WATCHLIST");
						onOpen();
					}}
					startContent={<MdOutlineEdit size={20} />}
				>
					Edit
				</DropdownItem>
				<DropdownItem
					key="delete"
					className="text-danger"
					color="danger"
					onPress={deleteWatchlist}
					startContent={
						<MdDeleteOutline size={20} className={"text-danger"} />
					}
				>
					Delete
				</DropdownItem>
			</DropdownMenu>
		</CustomDropdown>
	);
};

export default WatchlistTable;
