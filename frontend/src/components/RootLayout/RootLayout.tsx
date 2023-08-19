import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import MainNavigation from "../Navbar/MainNavigation";
import { AuthProvider } from "../../store/AuthContext";
import { DataProvider } from "../../store/DataContext";
import { CoinModalProvider } from "../../store/CoinModalContext";
import CoinInfoModal from "../CoinInfoModal/CoinInfoModal";

const RootLayout = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<NextUIProvider navigate={navigate}>
			<AuthProvider>
				<DataProvider>
					<CoinModalProvider>
						{pathname !== "/login" && <MainNavigation />}
						<main>
							<CoinInfoModal />
							<Outlet />
						</main>
					</CoinModalProvider>
				</DataProvider>
			</AuthProvider>
		</NextUIProvider>
	);
};

export default RootLayout;
