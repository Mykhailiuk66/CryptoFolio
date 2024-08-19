import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import CoinInfoField from "./InfoField";
import { formatCurrency, formatProfitLoss } from "../../utils";
import { useContext } from "react";
import { DataContext } from "../../store/DataContext";
import { CoinModalContext } from "../../store/CoinModalContext";

const CoinInfoCard = () => {
	const { coins, exchanges } = useContext(DataContext);
	const { coinInfo, historyPrices } = useContext(CoinModalContext);

	const coin = coins.find(
		(c) => c.slug.toLowerCase() === coinInfo.coinSlug.toLowerCase()
	);
	const exchange = exchanges.find((e) => e.slug === coinInfo.exchangeSlug);
	const latestData =
		historyPrices.length > 0 ? historyPrices.slice(-1)[0] : null;

	return (
		<Card className="max-w-[600px] min-h-full border-solid border-1 border-default-200/50 bg-default-100/10">
			<CardHeader className="flex gap-3">
				<div className="flex w-full justify-between items-end">
					<Chip
						className="capitalize bg-primary-background"
						color="success"
						size="lg"
						variant="faded"
					>
						{coin?.short_name}
					</Chip>
					<Chip
						className="capitalize bg-primary-background"
						color="success"
						size="md"
						variant="faded"
					>
						{exchange?.name}
					</Chip>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="flex flex-col gap-1">
					{latestData && (
						<>
							<CoinInfoField
								label="Price:"
								value={"$" + formatCurrency(latestData?.price)}
							/>
							<CoinInfoField
								label="Volume (24h):"
								value={formatCurrency(latestData?.volume)}
							/>
							<CoinInfoField
								label="Previous Price (24h):"
								value={
									"$" +
									formatCurrency(latestData?.prev_price_24h)
								}
							/>
							<CoinInfoField
								label="High Price (24h):"
								value={
									"$" + formatCurrency(latestData?.high_price)
								}
							/>
							<CoinInfoField
								label="Low Price (24h):"
								value={
									"$" + formatCurrency(latestData?.low_price)
								}
							/>
							<CoinInfoField
								label="Turnover (24h):"
								value={
									"$" + formatCurrency(latestData?.turnover)
								}
							/>
							<CoinInfoField
								label="Price Change (24h):"
								value={formatProfitLoss(
									latestData?.price_change
								)}
							/>
							<CoinInfoField
								label="Price Change (%):"
								value={
									formatCurrency(
										latestData?.price_change_perc
									) + "%"
								}
							/>
						</>
					)}
				</div>
			</CardBody>
		</Card>
	);
};

export default CoinInfoCard;
