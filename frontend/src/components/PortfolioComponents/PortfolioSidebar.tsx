import { Button, RadioGroup } from "@nextui-org/react";
import PortfolioRadio from "./PortfolioRadio";
import { MdAddCircleOutline } from "react-icons/md";
import { useContext } from "react";
import { PortfolioContext } from "../../store/PortfolioContext";

const PortfolioSidebar = () => {
	const {
		portfolios,
		selectedPortfolio,
		setSelectedPortfolio,
		setModalState,
		onOpen,
	} = useContext(PortfolioContext);

	return (
		<RadioGroup
			label={
				<div className="flex justify-between items-center">
					<p>Portfolios</p>
					<div>
						<Button
							isIconOnly
							variant="light"
							onPress={() => {
								setModalState("ADD_PORTFOLIO");
								onOpen();
							}}
						>
							<MdAddCircleOutline size={25} />
						</Button>
					</div>
				</div>
			}
			value={selectedPortfolio}
			onValueChange={setSelectedPortfolio}
		>
			{portfolios.map((p) => {
				return (
					<PortfolioRadio
						key={p.id}
						value={p.id}
						description={p.notes}
						className="border-solid border-1 border-default-200/50 bg-default-100/40 hover:bg-default-100/70"
					>
						{p.name}
					</PortfolioRadio>
				);
			})}
		</RadioGroup>
	);
};

export default PortfolioSidebar;
