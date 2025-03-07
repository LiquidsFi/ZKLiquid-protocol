import { createContext, useEffect, useState } from "react";
import { ConnectWallet } from "../freighter-wallet/soroban";

import { useAccount, useSwitchChain } from "wagmi";

const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isXLM, setIsXLM] = useState(false);
  const [userPubKey, setUserPubKey] = useState("");

  const [userKey, setUserKey] = useState("");
  const [network, setNetwork] = useState("");
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedSourceChain, setSelectedSourceChain] = useState(null);
  const [selectedDestinationChain, setSelectedDestinationChain] =
    useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [claimableCashback, setClaimableCashback] = useState("0.");
  const [freighterConnecting, setFreighterConnecting] = useState(false);
  const [updateBalances, setUpdateBalances] = useState(0);
  // const [messageId, setMessageId] = useState("");
  const { chains } = useSwitchChain();

  const stellarChain = { id: 1200, name: "Stellar Mainnet" };

  const allChains = [stellarChain, ...chains];

  useEffect(() => {
    const storedChainId = localStorage.getItem("selectedChainId");

    if (storedChainId) {
      const selectedChain = allChains?.find(
        (chain) => chain?.id === Number(storedChainId)
      );

      setSelectedSourceChain(selectedChain);
    }
  }, []);

  async function handleConnectFreighter() {
    setFreighterConnecting(true);
    const res = await ConnectWallet(setUserKey, setNetwork);
    setFreighterConnecting(false);
  }

  return (
    <SidebarContext.Provider
      value={{
        selectedSourceChain,
        setSelectedSourceChain,
        selectedDestinationChain,
        setSelectedDestinationChain,
        selectedChain,
        allChains,
        setSelectedChain,
        handleConnectFreighter,
        userKey,
        setUserKey,
        network,
        setNetwork,
        isOpen,
        setIsOpen,
        isXLM,
        setIsXLM,
        userPubKey,
        setUserPubKey,
        selectedNetwork,
        setSelectedNetwork,
        freighterConnecting,
        setFreighterConnecting,
        claimableCashback,
        setClaimableCashback,
        updateBalances,
        setUpdateBalances,
        // messageId,
        // setMessageId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarContextProvider };
