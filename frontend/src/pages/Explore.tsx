import Container from "../components/Container/Container";
import { useContext, useEffect, useState } from "react";

import { CoinData } from "../types";
import { DataContext } from "../store/DataContext";
import ExploreCard from "../components/Explore/ExploreCard";
import ExploreCardSkeleton from "../components/Explore/ExploreCardSkeleton";

const Explore = () => {
	const [trendingCoins, setTrendingCoins] = useState<CoinData[]>([]);
	const { coins, exchanges } = useContext(DataContext);

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
					[...Array(12)].map((e, i) => (
						<ExploreCardSkeleton key={i} />
					))}

				{trendingCoins.length !== 0 &&
					trendingCoins.map((item) => {
						const coin = coins.find(
							(c) => c.short_name === item.coin_short_name
						);
						const exchange = exchanges.find(
							(e) => e.name === item.exchange_name
						);

						return (
							<ExploreCard
								key={item.id}
								item={item}
								exchange={exchange!}
								coin={coin!}
							/>
						);
					})}
			</div>
		</Container>
	);
};

export default Explore;
