import UsdtLogo from "../../assets/svg/usdt.svg";
import BnbLogo from "../../assets/svg/btc.svg";
import Progress from "../../components/Progress";
import BreadCrumb from "../../components/BreadCrumb";
import { useParams } from "react-router";

export default function TransactionDetails() {
	const { transferId } = useParams();

	return (
		<>
			<BreadCrumb id={transferId} />

			<Progress />

			<div className="mt-6 flex flex-col gap-4 sm:flex-row">
				<div className="border p-4 rounded border-neutral-900 flex-1">
					<div className="mb-2 flex items-center justify-between">
						<span>From</span>
						<span className="text-neutral-300">16.979584 USDT</span>
					</div>
					<div className="bg-[#04131F] rounded p-2 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<UsdtLogo className="w-10 h-10" />
							{/* <img src={usdtLogo} alt="" className="w-10 h-10" /> */}
							<span>USDT</span>
						</div>
						<span>7.054632</span>
					</div>
				</div>
				<div className="border p-4 rounded border-neutral-900 flex-1">
					<div className="mb-2 flex items-center justify-between">
						<span>To</span>
						<span className="text-neutral-300">16.979584 BCH</span>
					</div>
					<div className="bg-[#04131F] rounded p-2 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<BnbLogo className="w-10 h-10" />
							{/* <img src={bnbLogo} alt="" className="w-10 h-10" /> */}
							<span>BCH</span>
						</div>
						<span>4,000.13</span>
					</div>
				</div>
			</div>

			<div className="border rounded mt-6 p-4 border-neutral-900 flex flex-col sm:flex-row justify-between sm:items-center">
				<div className="flex gap-2 items-center">
					<span className="text-neutral-300">Price:</span>
					<span className="shrink-0">0.0018 BCH</span>
					<span className="text-[#33ED8D]">Market</span>
				</div>
				<hr className="sm:hidden border border-neutral-900 my-4" />
				<div className="flex gap-2 items-center">
					<span className="text-neutral-300 shrink-0">Order ID:</span>
					<span>{transferId}</span>
				</div>
			</div>

			<div className="mt-6 flex flex-col gap-4 sm:flex-row text-sm">
				<div className="border rounded border-neutral-900 flex-1">
					<div className="border-b p-4 border-neutral-900 flex items-center gap-2">
						<UsdtLogo className="w-10 h-10" />
						{/* <img src={usdtLogo} alt="" className="w-10 h-10" /> */}
						<div className="flex flex-col">
							<span className="text-neutral-300">From:</span>
							<span>USDT</span>
						</div>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Actual order asset</span>
						<div className="flex items-center gap-1">
							<UsdtLogo className="w-5 h-5" />
							{/* <img src={usdtLogo} alt="" className="w-5 h-5" /> */}
							<span>USDT Coin</span>
						</div>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Amount</span>
						<span>4,003.1 USDT</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Decimals</span>
						<span>18</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Maker</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Solver</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Creation tx</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Creation time</span>
						<span>04 Mar, 2025 • 12:35:19 PM</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">
							Order authority in source chain
						</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Order creator nonce</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Unlock Claim Tx</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Solver unlock beneficiary</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Unlock Claim Time</span>
						<span>04 Mar, 2025 • 2:17:46 PM</span>
					</div>
				</div>
				<div className="border rounded border-neutral-900 flex-1">
					<div className="border-b p-4 border-neutral-900 flex items-center gap-2">
						<BnbLogo className="w-10 h-10" />
						{/* <img src={bnbLogo} alt="" className="w-10 h-10" /> */}
						<div className="flex flex-col">
							<span className="text-neutral-300">To:</span>
							<span>BCH</span>
						</div>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Asset</span>
						<div className="flex items-center gap-1">
							<BnbLogo className="w-5 h-5" />
							{/* <img src={bnbLogo} alt="" className="w-5 h-5" /> */}
							<span>BCH Coin</span>
						</div>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Amount</span>
						<span>4,003.1 USDT</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Decimals</span>
						<span>18</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Solver</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Fulfill tx</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Fulfillment time</span>
						<span>04 Mar, 2025 • 12:35:23 PM</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">
							Order authority in source chain
						</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Receiver address</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Unlock message</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Unlock time</span>
						<span>04 Mar, 2025 • 12:35:23 PM</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">
							Unlock authority in destination chain
						</span>
						<span>0x4264d7fcdcad03b578</span>
					</div>
					<div className="border-b p-4 border-neutral-900 flex flex-col gap-1 sm:flex-row justify-between sm:items-center">
						<span className="text-neutral-300">Status for Solver</span>
						<span>Order fulfilled and unlocked</span>
					</div>
				</div>
			</div>
		</>
	);
}
