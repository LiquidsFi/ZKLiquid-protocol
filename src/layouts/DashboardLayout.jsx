import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useMatch } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Header from "../components/Header";
import sidebarLinks from "../constant/sidebarLinks.jsx";
import { SidebarContext } from "../context/SidebarContext";
import { WagmiContext } from "../context/WagmiContext";

function DashboardLayout() {
  const location = useLocation();
  const { isConnected, address } = useContext(WagmiContext);

  const {
    selectedSourceChain,
    setSelectedSourceChain,
    selectedDestinationChain,
    setSelectedDestinationChain,
    isXLM,
    userPubKey,
    setUserPubKey,
    selectedNetwork,
    allChains,
    setSelectedNetwork,
    freighterConnecting,
  } = useContext(SidebarContext);

  useEffect(() => {
    if (!address && userPubKey) {
      const selectedChain = allChains?.find((chain) => chain?.id === 1200);
      setSelectedSourceChain(selectedChain);
    } else if (address && !userPubKey) {
      // console.log("this should run");
      const selectedChain = allChains?.find((chain) => chain?.id === 3200);
      setSelectedSourceChain(selectedChain);
    }
  }, [address, userPubKey]);

  return (
    <div className="flex bg-black min-h-app ">
      <Sidebar currentPageLinks={sidebarLinks} />
      <Header />

      <div className="px-4 py-6 xl:px-8 mt-16  md:pl-24 xl:pl-72 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
