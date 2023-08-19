import {
	Card,
	CardBody,
	CardFooter,
	Chip,
	Divider,
	Skeleton,
} from "@nextui-org/react";
import Container from "../components/Container/Container";
import { useContext, useEffect, useState } from "react";
import { CoinData } from "../types";
import InfoField from "../components/CoinInfoModal/InfoField";
import { formatCurrency, formatProfitLoss } from "../utils";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CoinModalContext } from "../store/CoinModalContext";
import { DataContext } from "../store/DataContext";

const Explore = () => {
	const [trendingCoins, setTrendingCoins] = useState<CoinData[]>([]);
	const { coins, exchanges } = useContext(DataContext);
	const { openCoinInfoModal } = useContext(CoinModalContext);

	useEffect(() => {
		const fetchTrending = async () => {
			try {
				const response = await fetch(`/api/trending/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error("Failed to fetch trending");
				}
				const data = await response.json();
				setTrendingCoins(data);
			} catch (error) {
				console.error("Error fetching trending:", error);
			}
		};
		fetchTrending();
	}, []);

	return (
		<Container>
			<h1 className="text-4xl font-bold mb-4">Trending</h1>
			<div className="gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{trendingCoins.length === 0 &&
					[...Array(12)].map((e, i) => {
						return (
							<Card className="px-5 pb-1 pt-6 bg-default-100/40">
								<Skeleton className="rounded-lg">
									<div className="h-44 rounded-lg bg-default-300"></div>
								</Skeleton>
								<Skeleton className="my-3 rounded-lg">
									<div className="h-10 rounded-lg bg-default-200"></div>
								</Skeleton>
							</Card>
						);
					})}

				{trendingCoins.length !== 0 &&
					trendingCoins.map((item) => {
						let coin = coins.find(
							(c) => c.short_name === item.coin_short_name
						);
						let exchange = exchanges.find(
							(e) => e.name === item.exchange_name
						);

						return (
							<Card
								onPress={() =>
									openCoinInfoModal(
										exchange!.slug,
										coin!.slug
									)
								}
								shadow="sm"
								key={item.id}
								isPressable
								className="px-5 pb-1 pt-6 border-solid border-1 border-default-200/50 bg-default-100/40 hover:bg-default-100/70"
							>
								<CardBody className="overflow-visible p-0">
									<div className="flex flex-col gap-2">
										<InfoField
											label="Price:"
											value={
												"$" +
												formatCurrency(item?.price)
											}
											className="text-base"
										/>
										<InfoField
											label="Volume (24h):"
											value={formatCurrency(item?.volume)}
											className="text-base"
										/>
										<InfoField
											label="Turnover (24h):"
											value={
												"$" +
												formatCurrency(item?.turnover)
											}
											className="text-base"
										/>
										<InfoField
											label="Price Change (24h):"
											value={
												<Chip
													className="capitalize"
													color={
														(item?.price_change as number) >=
														0
															? "success"
															: "danger"
													}
													size="md"
													variant="flat"
												>
													<p className="flex items-center">
														{(item?.price_change as number) >=
														0
															? "+"
															: ""}
														{formatProfitLoss(
															item?.price_change
														)}
													</p>
												</Chip>
											}
											className="text-base"
										/>
										<InfoField
											label="Price Change (%):"
											value={
												<Chip
													className="capitalize"
													color={
														(item?.price_change_perc as number) >=
														0
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
														{formatCurrency(
															item?.price_change_perc
														)}
														%
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
					})}
			</div>
		</Container>
	);
};

export default Explore;
