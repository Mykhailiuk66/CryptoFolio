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
        {portfolioSnapshots.length > 0 &&
          <CustomAreaChart
            data={portfolioSnapshots}
            xDataKey='created'
            yDataKey='value'
          />}
        {portfolioSnapshots.length === 0 &&
          (<div className="min-h-96 flex items-center justify-center">
            <p className="min-w-full text-center">
              No Data Available
            </p>
          </div>)
        }
      </Card>
      <Card className="mb-5 col-span-5 xl:col-span-2">
        {portfolio?.holdings!.length! > 0 &&

          <CustomPieChart
            data={portfolio?.holdings!}
            middleLabelKey="coin_short_name"
            labelKey="value"
          />}

        {portfolio?.holdings!.length === 0 &&
          (<div className="min-h-96 flex items-center justify-center">
            <p className="min-w-full text-center">
              No Data Available
            </p>
          </div>)
        }
      </Card>
    </div>

  )
}


export default PortfolioCharts