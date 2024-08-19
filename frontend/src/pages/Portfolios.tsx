import { Divider } from "@nextui-org/react";

import Container from "../components/Container/Container";
import PortfolioCharts from "../components/PortfolioComponents/PortfolioCharts";
import PortfolioSidebar from "../components/PortfolioComponents/PortfolioSidebar";
import PortfolioModal from "../components/PortfolioComponents/PortfolioModal";
import PortoflioTable from "../components/PortfolioComponents/PortfolioTable";

const Portfolios = () => {
	return (
		<Container>
			<PortfolioModal />
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-12 xl:col-span-2 lg:col-span-3">
					<PortfolioSidebar />
				</div>
				<div className="col-span-12 xl:col-span-10 lg:col-span-9">
					<PortfolioCharts />
					<Divider className="my-4" />
					<PortoflioTable />
				</div>
			</div>
		</Container>
	);
};

export default Portfolios;
