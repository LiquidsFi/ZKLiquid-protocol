import React, { useContext, useEffect, useState } from "react";
import Modal from "../common/Modal";

import { ArrowRight2 } from "iconsax-react";
import { toast } from "react-toastify";

import { useConnect, useDisconnect, useAccount } from "wagmi";
import { sepolia, avalancheFuji } from "viem/chains";
import ConnectIcon from "../assets/svg/connect.svg";
import freigterIcon from "../assets/svg/freighterIcon.png";

import { isConnected, setAllowed } from "@stellar/freighter-api";
import { SidebarContext } from "../context/SidebarContext";

function WalletsModal({ isOpen, onClose }) {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [freighterInstalled, setFreighterInstalled] = useState(false);

  const { chain } = useAccount();
  const {
    isXLM,
    setFreighterConnecting,
    handleConnectFreighter,
    userKey,
    setUserKey,
    network,
    setNetwork,
  } = useContext(SidebarContext);

  useEffect(() => {
    async function fetchFeighter() {
      const connected = await isConnected();
      setFreighterInstalled(() => connected);
    }
    fetchFeighter();
  }, []);

  useEffect(() => {
    if (error && error.message) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <Modal open={isOpen} onClose={onClose} heading="Connect to a wallet">
      <div className="space-y-3">
        {freighterInstalled ? (
          <button
            onClick={handleConnectFreighter}
            className="flex items-center w-full gap-3 px-3 py-2 text-left text-lg rounded-lg bg-dark-300 hover:bg-opacity-60"
          >
            <img className="w-12 h-12 rounded-full" src={freigterIcon} alt="" />
            Freighter Wallet
            {/* {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"} */}
            <ArrowRight2 size="20" className="ml-auto" />
          </button>
        ) : (
          <button
            onClick={handleConnectFreighter}
            className="flex items-center w-full gap-3 px-3 py-2 text-left text-lg rounded-lg bg-dark-300 hover:bg-opacity-60"
          >
            <img className="w-12 h-12 rounded-full" src={freigterIcon} alt="" />
            Install Freighter Wallet
            {/* {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"} */}
            <ArrowRight2 size="20" className="ml-auto" />
          </button>
        )}
        {connectors.map((connector) => (
          <button
            // disabled={!connector.ready}
            key={connector.id}
            onClick={() =>
              connect({ chainId: avalancheFuji.id || chain.id, connector })
            }
            className="flex items-center w-full gap-3 px-3 py-2 text-left text-lg rounded-lg bg-dark-300 hover:bg-opacity-60"
          >
            {connector.name === "WalletConnect" ? (
              <ConnectIcon className="w-12 h-12" />
            ) : (
              <img className="w-12 h-12" src={connector.icon} alt="" />
            )}
            {connector.name}

            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}

            <ArrowRight2 size="20" className="ml-auto" />
          </button>
        ))}
      </div>
    </Modal>
  );
}

export default WalletsModal;
