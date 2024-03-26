import { Card, CardBody, CardHeader, Chip, Divider, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from "@nextui-org/react"
import { useContext, useEffect, useState } from "react";

import CustomAreaChart from "../Chart/CustomAreaChart";
import BASE_URL from "../../http";
import { CoinData } from "../../types";
import AuthContext from "../../store/AuthContext";
import DataContext from "../../store/DataContext";
import InfoField from "./InfoField";
import { formatCurrency, formatProfitLoss } from "../../utils";
import CoinModalContext from "../../store/CoinModalContext";


const CoinInfoModal = () => {
  const [historyPrices, setHistoryPrices] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>()
  const { authTokens } = useContext(AuthContext);
  const { coins, exchanges } = useContext(DataContext);
  const { isOpen, coinInfo, onClose } = useContext(CoinModalContext)

  const coin = coins.find((c) => c.slug.toLowerCase() === coinInfo.coinSlug.toLowerCase())
  const exchange = exchanges.find((e) => e.slug === coinInfo.exchangeSlug)
  const latestData = historyPrices.length > 0 ? historyPrices.slice(-1)[0] : null;

  useEffect(() => {
    const fetchHistoryPrices = async (exchangeSlug: string, coinSlug: string) => {
      try {
        const response = await fetch(`${BASE_URL}/api/history-prices/${exchangeSlug}/${coinSlug}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens?.access,
            },
          });
        if (!response.ok) {
          throw new Error("Failed to fetch history prices");
        }
        const data = await response.json();
        setHistoryPrices(data);
        setIsLoading(false)

      } catch (error) {
        console.error("Error fetching history prices:", error);
      }
    };

    if (coinInfo.coinSlug && coinInfo.exchangeSlug) {
      setHistoryPrices([]);
      setIsLoading(true)
      fetchHistoryPrices(coinInfo.exchangeSlug!, coinInfo.coinSlug!);
    }
  }, [coinInfo.coinSlug, coinInfo.exchangeSlug]);


  return (
    <Modal
      size="5xl"
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[1300px]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Info</ModalHeader>
            <ModalBody>

              {isLoading === true && (
                <div className="min-h-96 flex items-center justify-center">
                  <Spinner color="success" className="min-w-full" />
                </div>
              )}
              {isLoading === false && historyPrices.length > 0 && (
                <div className="grid grid-cols-12 gap-4 mb-5">
                  <div className="col-span-12 md:col-span-8">
                    <Card className="py-10 mb-5 col-span-5 xl:col-span-3 min-h-full">
                      <CustomAreaChart
                        data={historyPrices}
                        xDataKey='date'
                        yDataKey='price'
                        showGrid
                      />
                    </Card>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <Card className="max-w-[600px] min-h-full">
                      <CardHeader className="flex gap-3">
                        <div className="flex w-full justify-between items-end">
                          <Chip className="capitalize" color="success" size="lg" variant="faded">
                            {coin?.short_name}
                          </Chip>
                          <Chip className="capitalize" color="success" size="sm" variant="flat">
                            {exchange?.name}
                          </Chip>
                        </div>
                      </CardHeader>
                      <Divider />
                      <CardBody>
                        <div className="flex flex-col gap-1">
                          {latestData && (
                            <>
                              <InfoField label="Price:" value={"$" + formatCurrency(latestData?.price)} />
                              <InfoField label="Volume (24h):" value={formatCurrency(latestData?.volume)} />
                              <InfoField label="Previous Price (24h):" value={"$" + formatCurrency(latestData?.prev_price_24h)} />
                              <InfoField label="High Price (24h):" value={"$" + formatCurrency(latestData?.high_price)} />
                              <InfoField label="Low Price (24h):" value={"$" + formatCurrency(latestData?.low_price)} />
                              <InfoField label="Turnover (24h):" value={"$" + formatCurrency(latestData?.turnover)} />
                              <InfoField label="Price Change (24h):" value={formatProfitLoss(latestData?.price_change)} />
                              <InfoField label="Price Change (%):" value={formatCurrency(latestData?.price_change_perc) + "%"} />
                            </>
                          )}
                        </div>
                      </CardBody>
                      <Divider />
                    </Card>
                  </div>
                </div>
              )}
              {isLoading === false && historyPrices.length === 0 && (
                <div className="min-h-96 flex items-center justify-center">
                  <p className="min-w-full text-center">
                    This coin is not available on the selected exchange.
                  </p>
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}


export default CoinInfoModal