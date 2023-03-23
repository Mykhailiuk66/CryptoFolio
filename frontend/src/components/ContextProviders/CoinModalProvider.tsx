import { useCallback, useState } from "react"
import CoinModalContext from "../../store/CoinModalContext"
import { CoinInfoModalParams, CoinModalContextType } from "../../types"
import { useDisclosure } from "@nextui-org/react"


type CoinModalProviderProps = {
  children: React.ReactNode
}

const CoinModalProvider = ({ children }: CoinModalProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [coinInfo, setCoinInfo] = useState<CoinInfoModalParams>({ exchangeSlug: '', coinSlug: '' });

  const openCoinInfoModal = useCallback((exchangeSlug: string, coinSlug: string) => {
    setCoinInfo({ exchangeSlug, coinSlug });
    onOpen();
  }, [onOpen]);

  const contextData: CoinModalContextType = {
    isOpen,
    coinInfo,
    onClose,
    openCoinInfoModal,
  }

  return (
    <CoinModalContext.Provider value={contextData}>
      {children}
    </CoinModalContext.Provider>
  )
}


export default CoinModalProvider