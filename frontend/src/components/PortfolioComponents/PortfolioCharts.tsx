import { useContext, useEffect } from "react";
import CustomAreaChart from "../Chart/CustomAreaChart";
import { Card } from "@nextui-org/react";
import CustomPieChart from "../Chart/CustomPieChart";
import { PortfolioContext } from "../../store/PortfolioContext";

const PortfolioCharts = () => {
	const {
		selectedPortfolio,
		portfolios,
		portfolioSnapshots,
		fetchPortfolioSnapshots,
	} = useContext(PortfolioContext);

	useEffect(() => {
		if (selectedPortfolio) {
			fetchPortfolioSnapshots();
		}
	}, [fetchPortfolioSnapshots, selectedPortfolio]);

	const portfolio = portfolios.find((p) => p.id === selectedPortfolio);

	console.log(portfolio?.holdings!.length);
	return (
		<div className="grid grid-cols-5 gap-4">
			<Card className="py-5 mb-1 col-span-5 xl:col-span-3 border-solid border-1 border-default-200/50 bg-default-100/40">
				{portfolioSnapshots.length > 0 && (
					<CustomAreaChart
						data={portfolioSnapshots}
						xDataKey="created"
						yDataKey="value"
					/>
				)}
				{portfolioSnapshots.length === 0 && (
					<div className="min-h-96 flex items-center justify-center">
						<p className="min-w-full text-center">
							No Data Available
						</p>
					</div>
				)}
			</Card>
			<Card className="mb-1 col-span-5 xl:col-span-2 min-h-96 border-solid border-1 border-default-200/50 bg-default-100/40">
				{portfolio?.holdings!.length! > 0 && (
					<CustomPieChart
						data={portfolio?.holdings!}
						middleLabelKey="coin_short_name"
						labelKey="value"
					/>
				)}

				{(portfolio?.holdings!.length === undefined ||
					portfolio?.holdings!.length === 0) && (
					<div className="min-h-96 flex items-center justify-center">
						<p className="min-w-full text-center">
							No Data Available
						</p>
					</div>
				)}
			</Card>
		</div>
	);
};

export default PortfolioCharts;
