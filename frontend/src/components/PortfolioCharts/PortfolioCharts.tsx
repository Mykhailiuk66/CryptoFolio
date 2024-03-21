import { useContext, useEffect } from "react"
import CustomAreaChart from "../Chart/CustomAreaChart"
import PortfolioContext from "../../store/ProtfolioContext";
import { Card } from "@nextui-org/react";
import CustomPieChart from "../Chart/CustomPieChart";

const PortfolioCharts = () => {
  const {
    selectedPortfolio,
    portfolios,
    portfolioSnapshots,
    fetchPortfolioSnapshots,
  } = useContext(PortfolioContext);


  useEffect(() => {
    if (selectedPortfolio) {
      fetchPortfolioSnapshots()
    }
  }, [fetchPortfolioSnapshots, selectedPortfolio])


  const portfolio = portfolios.find((p) => p.id === selectedPortfolio)

  return (
    <div className="grid grid-cols-5 gap-4" >
      <Card className="py-5 mb-5 col-span-5 xl:col-span-3">
        <CustomAreaChart
          data={portfolioSnapshots}
          xDataKey='created'
          yDataKey='value'
        />
      </Card>
      <Card className="mb-5 col-span-5 xl:col-span-2">
        <CustomPieChart
          data={portfolio?.holdings!}
          middleLabelKey="coin_short_name"
          labelKey="value"
        />
      </Card>
    </div>

  )
}


export default PortfolioCharts