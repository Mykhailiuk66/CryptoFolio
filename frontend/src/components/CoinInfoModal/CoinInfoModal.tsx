import {
	Card,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Spinner,
} from "@nextui-org/react";
import { useContext, useEffect } from "react";

import CustomAreaChart from "../Chart/CustomAreaChart";
import { CoinModalContext } from "../../store/CoinModalContext";
import CoinInfoCard from "./CoinInfoCard";

const CoinInfoModal = () => {
	const {
		isOpen,
		coinInfo,
		isLoading,
		onClose,
		historyPrices,
		fetchHistoryPrices,
	} = useContext(CoinModalContext);

	useEffect(() => {
		if (coinInfo.coinSlug && coinInfo.exchangeSlug) {
			fetchHistoryPrices(coinInfo.exchangeSlug!, coinInfo.coinSlug!);
		}
	}, [coinInfo.coinSlug, coinInfo.exchangeSlug, fetchHistoryPrices]);

	return (
		<Modal
			scrollBehavior="inside"
			size="5xl"
			backdrop="blur"
			placement="center"
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-[1300px] bg-primary-background"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Info
						</ModalHeader>
						<ModalBody>
							{isLoading === true && (
								<div className="min-h-96 flex items-center justify-center">
									<Spinner
										color="success"
										className="min-w-full"
									/>
								</div>
							)}
							{isLoading === false &&
								historyPrices.length > 0 && (
									<div className="grid grid-cols-12 gap-4 mb-5">
										<div className="col-span-12 md:col-span-8">
											<Card className="py-10 mb-5 col-span-5 xl:col-span-3 min-h-full border-solid border-1 border-default-200/50 bg-default-100/10">
												<CustomAreaChart
													data={historyPrices}
													xDataKey="date"
													yDataKey="price"
													showGrid
												/>
											</Card>
										</div>
										<div className="col-span-12 md:col-span-4">
											<CoinInfoCard />
										</div>
									</div>
								)}
							{isLoading === false &&
								historyPrices.length === 0 && (
									<div className="min-h-96 flex items-center justify-center">
										<p className="min-w-full text-center">
											This coin is not available on the
											selected exchange.
										</p>
									</div>
								)}
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CoinInfoModal;
