import { Button, RadioGroup } from "@nextui-org/react"
import CustomRadio from "../CustomRadio/CustomRadio"
import { MdAddCircleOutline } from "react-icons/md"
import { useContext } from "react";
import PortfolioContext from "../../store/ProtfolioContext";

type PortfolioSidebarType = {
  onOpen: () => void;
}

const PortfolioSidebar = ({ onOpen }: PortfolioSidebarType) => {
  const {
    portfolios,
    selectedPortfolio,
    setSelectedPortfolio,
  } = useContext(PortfolioContext);

  return (
    <RadioGroup
      label={
        <div className="flex justify-between items-center">
          <p>
            Portfolios
          </p>
          <div>
            <Button
              isIconOnly
              variant="light"
              onPress={onOpen}
            >
              <MdAddCircleOutline size={25} />
            </Button>
          </div>
        </div>
      }
      value={selectedPortfolio}
      onValueChange={setSelectedPortfolio}
    >
      {portfolios.map((p) => {
        return (
          <CustomRadio key={p.id} value={p.id} description={p.notes}>
            {p.name}
          </CustomRadio>
        )
      })}
    </RadioGroup>
  )
}


export default PortfolioSidebar