import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from "react-router-dom";

import Dashboard from "./pages/defi/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

import ErrorPage from "./layouts/Error.jsx";
import Home from "./pages/Home.jsx";
import Lend from "./pages/defi/Lend";
import MyLoans from "./pages/defi/MyLoans";
import Gamefi from "./pages/gamefi/Gamefi";
import NFT from "./pages/nft/NFT";

import Trade from "./pages/swap/Trade";
import Bridge from "./pages/swap/Bridge";
// import Liquidity from "./pages/liquidity/Liquidity";
import Liquidity from "./pages/add-liquidity/Liquidity";
import BonusRewardTab from "./components/ui/deposit/BonusRewardTab";
import DepositsTab from "./components/ui/deposit/DepositsTab";
import { SidebarContextProvider } from "./context/SidebarContext";
import TransactionDetails from "./pages/transfer/TransferDetails.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{" "}
			<Route exact path="/" element={<Home />} errorElement={<ErrorPage />} />
			<Route path="/" element={<DashboardLayout />}>
				<Route index element={<Navigate to="/bridge" />} />
				<Route path="/bridge" element={<Trade />} />
				<Route path="/transfers">
					<Route path=":transferId" element={<TransactionDetails />} />
				</Route>
				<Route path="/liquidity">
					<Route index element={<Liquidity />} />
				</Route>
				<Route path="/loans">
					<Route
						index
						element={
							<div className="absolute top-0 left-0 w-full h-screen opacity-40 bg-black z-10 text-white text-6xl flex  items-center justify-center">
								{" "}
								Coming soon...
							</div>
						}
					/>
				</Route>
				<Route path="/rewards">
					<Route index element={<div>Rewards page</div>} />
				</Route>

				<Route path="/faucet" element={<Bridge />} />
			</Route>
		</>
	)
);

function App() {
	return (
		<SidebarContextProvider>
			<RouterProvider router={router} />
		</SidebarContextProvider>
	);
}

export default App;
