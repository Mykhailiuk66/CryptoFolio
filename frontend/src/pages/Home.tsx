import Container from "../components/Container/Container";
import CoinModalContext from "../store/CoinModalContext";
import { useContext } from "react";
import { Button } from "@nextui-org/react";

const Home = () => {
  const { openCoinInfoModal } = useContext(CoinModalContext)

  return (
    <Container>
      <Button onPress={() => openCoinInfoModal("binance", "btc")}></Button>
    </Container>)
}

export default Home