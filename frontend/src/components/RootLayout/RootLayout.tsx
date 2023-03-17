import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react";
import MainNavigation from "../Navbar/MainNavigation";
import AuthProvider from "../ContextProviders/AuthProvider";
import DataProvider from "../ContextProviders/DataProvider";


const RootLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (<>
    <NextUIProvider navigate={navigate}>
      <AuthProvider>
        <DataProvider>
          {pathname !== '/login' && <MainNavigation />}
          <main>
            <Outlet />
          </main>
        </DataProvider>
      </AuthProvider>
    </NextUIProvider>
  </>)
}


export default RootLayout