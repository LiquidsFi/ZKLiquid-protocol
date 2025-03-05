import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import ReactPaginate from "react-paginate";

import { WagmiContext } from "../context/WagmiContext";
import { NETWORK_COINS, chainAlliases } from "@/constant/globalConstants";
import SearchBar from "@/components/SearchBar";

import { useAccount } from "wagmi";

import download from "@/assets/svg/download.svg";
import "./css/pagination.css";
import TransactionHistory from "./TransactionHistory";
function TopTokensList({ onTokenSelect, transactionData }) {
	const { address, isConnected } = useContext(WagmiContext);

	const shortenAddress = (address) => {
		return address.slice(0, 8) + "...";
	};

	return (
		<div className=" ">
			<div className="flex items-end justify-between ">
				<div className="flex justify-start gap-2 p-1 font-bold text-lg  ">
					Latest Transfers
				</div>
				{/* {isTokenList && <SearchBar onChangeKeyword={onChangeKeyword} />} */}
			</div>

			<div className="py-1 font-Roboto max-h-[754px] bg-[#191A1F] rounded-xl pb-10">
				{isConnected ? (
					<div className=" pt-[15px] text-[18px]">
						<TransactionHistory transactionData={transactionData} />
					</div>
				) : (
					<div className="text-center pt-[52px] text-[18px] px-2">
						Please connect your wallet to see your trade history.
					</div>
				)}
			</div>
		</div>
	);
}

export default TopTokensList;
