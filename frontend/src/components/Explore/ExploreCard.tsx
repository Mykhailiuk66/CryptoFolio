import { Card, CardBody, CardFooter, Chip, Divider } from "@nextui-org/react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useContext } from "react";

import CoinInfoField from "../CoinInfoModal/InfoField";
import { formatCurrency, formatProfitLoss } from "../../utils";
import { CoinModalContext } from "../../store/CoinModalContext";
import { Coin, CoinData, Exchange } from "../../types";

type ExploreCardProps = {
	item: CoinData;
	exchange: Exchange;
	coin: Coin;
};

const ExploreCard = ({ item, exchange, coin }: ExploreCardProps) => {
	const { openCoinInfoModal } = useContext(CoinModalContext);

	return (
		<Card
			onPress={() => openCoinInfoModal(exchange.slug, coin.slug)}
			shadow="sm"
			key={item.id}
			isPressable
			className="px-5 pb-1 pt-6 border-solid border-1 border-default-200/50 bg-default-100/40 hover:bg-default-100/70"
		>
			<CardBody className="overflow-visible p-0">
				<div className="flex flex-col gap-2">
					<CoinInfoField
						label="Price:"
						value={"$" + formatCurrency(item?.price)}
						className="text-base"
					/>
					<CoinInfoField
						label="Volume (24h):"
						value={formatCurrency(item?.volume)}
						className="text-base"
					/>
					<CoinInfoField
						label="Turnover (24h):"
						value={"$" + formatCurrency(item?.turnover)}
						className="text-base"
					/>
					<CoinInfoField
						label="Price Change (24h):"
						value={
							<Chip
								className="capitalize"
								color={
									(item?.price_change as number) >= 0
										? "success"
										: "danger"
								}
								size="md"
								variant="flat"
							>
								<p className="flex items-center">
									{(item?.price_change as number) >= 0
										? "+"
										: ""}
									{formatProfitLoss(item?.price_change)}
								</p>
							</Chip>
						}
						className="text-base"
					/>
					<CoinInfoField
						label="Price Change (%):"
						value={
							<Chip
								className="capitalize"
								color={
									(item?.price_change_perc as number) >= 0
										? "success"
										: "danger"
								}
								size="sm"
								variant="flat"
							>
								<p className="flex items-center">
									{(item?.price_change_perc as number) >=
									0 ? (
										<IoMdArrowDropup />
									) : (
										<IoMdArrowDropdown />
									)}
									{formatCurrency(item?.price_change_perc)}%
								</p>
							</Chip>
						}
						className="text-base"
					/>
				</div>
				<Divider className="mt-3" />
			</CardBody>
			<CardFooter className="text-small justify-between">
				<Chip
					className="capitalize bg-primary-background"
					color="success"
					size="md"
					variant="faded"
				>
					{item.coin_short_name}
				</Chip>
				<span className="text-default-500">
					<Chip
						className="capitalize"
						color="success"
						size="sm"
						variant="flat"
					>
						{item.exchange_name}
					</Chip>
				</span>
			</CardFooter>
		</Card>
	);
};

export default ExploreCard;
