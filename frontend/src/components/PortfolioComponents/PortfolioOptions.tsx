import {
	Button,
	DropdownTrigger,
	DropdownItem,
	DropdownMenu,
} from "@nextui-org/react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomDropdown from "../CustomNextUIComponents/CustomDropdown";
import { useContext } from "react";
import { PortfolioContext } from "../../store/PortfolioContext";

const PortfolioOptions = () => {
	const { deletePortfolio, onOpen, setModalState } =
		useContext(PortfolioContext);

	return (
		<CustomDropdown>
			<DropdownTrigger>
				<Button isIconOnly variant="bordered">
					<BsThreeDotsVertical />
				</Button>
			</DropdownTrigger>

			<DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
				<DropdownItem
					key="edit"
					showDivider
					onPress={() => {
						setModalState("EDIT_PORTFOLIO");
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
					onPress={deletePortfolio}
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

export default PortfolioOptions;
