import { PortfolioType } from "../../types";
import CustomModal from "../CustomNextUIComponents/CustomModal";
import PortfolioHoldingFormModalContent from "./PortfolioHoldingFormModalContent";
import PortfolioFormModalContent from "./PortfolioFormModalContent";
import { useContext } from "react";
import { PortfolioContext } from "../../store/PortfolioContext";

const PortfolioModal = () => {
	const {
		selectedPortfolioHolding,
		addPortfolio,
		modalState,
		isOpen,
		onOpenChange,
		editPortfolio,
		portfolios,
		selectedPortfolio,
	} = useContext(PortfolioContext);

	const portfolio = portfolios.find((p) => p.id === selectedPortfolio);

	return (
		<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
			{(onClose) => (
				<>
					{modalState === "ADD_PORTFOLIO" && (
						<PortfolioFormModalContent
							title="Add Portfolio"
							portfolio={{} as PortfolioType}
							handleSave={addPortfolio}
							onClose={onClose}
						/>
					)}
					{modalState === "EDIT_PORTFOLIO" && (
						<PortfolioFormModalContent
							title="Edit Portfolio"
							portfolio={portfolio}
							handleSave={editPortfolio}
							onClose={onClose}
						/>
					)}
					{modalState === "ADD_COIN" && (
						<PortfolioHoldingFormModalContent
							title="Add new asset"
							onClose={onClose}
						/>
					)}
					{modalState === "EDIT_COIN" && (
						<PortfolioHoldingFormModalContent
							title="Edit asset"
							holdingId={selectedPortfolioHolding}
							value={portfolio?.holdings?.find(
								(h) => h.id === selectedPortfolioHolding
							)}
							onClose={onClose}
						/>
					)}
				</>
			)}
		</CustomModal>
	);
};

export default PortfolioModal;
