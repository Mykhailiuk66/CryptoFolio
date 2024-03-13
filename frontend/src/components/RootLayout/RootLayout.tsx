import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react";
import MainNavigation from "../Navbar/MainNavigation";
import { AuthProvider } from "../AuthProvider/AuthProvider";

const RootLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (<>
    <NextUIProvider navigate={navigate}>
      <AuthProvider>
        {pathname !== '/login' && <MainNavigation />}
        <main>
          <Outlet />
        </main>
      </AuthProvider>
    </NextUIProvider>
  </>)
}


export default RootLayout