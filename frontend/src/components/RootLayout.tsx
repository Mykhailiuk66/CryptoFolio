import { Outlet, useNavigate } from "react-router-dom"
import { NextUIProvider } from "@nextui-org/react";
import MainNavigation from "./Navbar/MainNavigation";

const RootLayout: React.FC = () => {
  const navigate = useNavigate();

  return (<>
    <NextUIProvider navigate={navigate}>
      <MainNavigation></MainNavigation>
      <main>
        <Outlet />
      </main>
    </NextUIProvider>
  </>)
}


export default RootLayout