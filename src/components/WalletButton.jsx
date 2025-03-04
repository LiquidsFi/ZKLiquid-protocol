import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import CoinSVG from "@/assets/svg/coins.svg";

import { toast } from "react-toastify";

import { ArrowDown2, Copy, LogoutCurve } from "iconsax-react";
import WalletsModal from "./WalletsModal";
import { WagmiContext } from "../context/WagmiContext";
import { SidebarContext } from "../context/SidebarContext";

function WalletButton({ width }) {
  const { disconnect, address, isConnected } = useContext(WagmiContext);
  const {
    isOpen,
    setIsOpen,
    isXLM,
    userPubKey,
    setUserPubKey,
    selectedSourceChain,
    setSelectedSouceChain,
    selectedNetwork,
    setSelectedNetwork,
  } = useContext(SidebarContext);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Copied to clipboard.");
  };

  if (address || userPubKey) {
    return (
      <Menu
        as="div"
        className={clsx(
          "relative inline-block text-left",
          width === "full" && "w-full"
        )}
      >
        {({ open }) => (
          <>
            <Menu.Button
              className={clsx(
                "flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm font-medium border border-gray-400 transition-colors hover:bg-dark-300",
                width === "full" && "w-full",
                open ? "bg-dark-300" : "bg-dark-400"
              )}
            >
              {/* <img src={CoinSVG} className="flex-shrink-0 w-8 h-8" alt="" /> */}
              <CoinSVG />
              {selectedSourceChain?.id === 1200 && (
                <div>
                  {userPubKey?.slice(0, 5)}...{userPubKey?.slice(-4)}
                </div>
              )}
              {selectedSourceChain?.id !== 1200 && (
                <div>
                  {address?.slice(0, 5)}...{address?.slice(-4)}
                </div>
              )}
              <ArrowDown2
                size="16"
                color="#fff"
                className={clsx(
                  "transition-transform will-change-transform ml-auto",
                  open && "rotate-180"
                )}
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-dark-400 border border-dark-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                <Menu.Item>
                  <button
                    className="px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-dark-300"
                    onClick={() => disconnect()}
                  >
                    <LogoutCurve size="16" color="#fff" />
                    Disconnect
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-dark-300"
                    onClick={copyAddress}
                  >
                    <Copy size="16" color="#fff" />
                    Copy Address
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }

  return (
    <>
      <button
        className={clsx(
          "flex gap-2 items-center text-black font-bold bg-teal-400 py-2.5 px-4 rounded-xl text-sm  text-center justify-center",
          width === "full" && "w-full"
        )}
        onClick={() => setIsOpen(true)}
      >
        Connect Wallet
      </button>
      <WalletsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default WalletButton;
