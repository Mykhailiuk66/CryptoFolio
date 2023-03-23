import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react";
import MainNavigation from "../Navbar/MainNavigation";
import AuthProvider from "../ContextProviders/AuthProvider";
import DataProvider from "../ContextProviders/DataProvider";
import CoinInfoModal from "../CoinInfoModal/CoinInfoModal";
import CoinModalProvider from "../ContextProviders/CoinModalProvider";


const RootLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (<>
    <NextUIProvider navigate={navigate}>
      <AuthProvider>
        <DataProvider>
          <CoinModalProvider>
            {pathname !== '/login' && <MainNavigation />}
            <main>
              <CoinInfoModal />
              <Outlet />
            </main>
          </CoinModalProvider>
        </DataProvider>
      </AuthProvider>
    </NextUIProvider>
  </>)
}


export default RootLayout