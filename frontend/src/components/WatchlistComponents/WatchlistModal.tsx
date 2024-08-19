import CustomModal from "../CustomNextUIComponents/CustomModal";
import WatchlistFormModalContent from "./WatchlistFormModalContent";
import WatchlistCoinFormModalContent from "./WatchlistCoinFormModalContent";
import { useContext } from "react";
import { WatchlistContext } from "../../store/WatchlistContext";
import { WatchlistModalState } from "../../types";

type WatchlistModalProps = {
	isOpen: boolean;
	onOpenChange: () => void;
	modalState?: WatchlistModalState;
};

const WatchlistModal = ({
	isOpen,
	onOpenChange,
	modalState,
}: WatchlistModalProps) => {
	const {
		watchlists,
		selectedWatchlist,
		addWatchlistCoin,
		addWatchlist,
		editWatchlist,
	} = useContext(WatchlistContext);

	const watchlist = watchlists.find((w) => w.id === selectedWatchlist);

	return (
		<CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
			{(onClose) => (
				<>
					{modalState === "ADD_COIN" && (
						<WatchlistCoinFormModalContent
							title="Add Coin"
							handleSave={addWatchlistCoin}
							onClose={onClose}
						/>
					)}

					{modalState !== "ADD_COIN" && (
						<WatchlistFormModalContent
							title={
								modalState === "ADD_WATCHLIST"
									? "Add Watchlist"
									: "Edit Watchlist"
							}
							value={
								modalState === "EDIT_WATCHLIST"
									? watchlist?.name
									: ""
							}
							handleSave={
								modalState === "ADD_WATCHLIST"
									? addWatchlist
									: editWatchlist
							}
							onClose={onClose}
						/>
					)}
				</>
			)}
		</CustomModal>
	);
};

export default WatchlistModal;
