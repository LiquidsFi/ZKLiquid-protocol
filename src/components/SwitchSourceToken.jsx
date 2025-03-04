import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAccount, useSwitchChain } from "wagmi";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import { toast } from "react-toastify";
import { config } from "../Wagmi";
import { avalancheFuji, sepolia } from "viem/chains";
import { tokensSelector } from "../contracts/destination-selector";

function SwitchSourceToken({ width, switchToken, setSwitchToken }) {
  const { chain } = useAccount();
  const { chains, error, isLoading, pendingChainId, switchChain } =
    useSwitchChain();

  async function handleSwitchToken(index) {
    setSwitchToken(() => tokensSelector[index]);
  }

  useEffect(() => {
    if (error && error.message) {
      toast.error(error.message);
    }
  }, [error]);

  if (chain) {
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
                "flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm w-[160px] font-medium border border-gray-400 transition-colors hover:bg-dark-300",
                width === "full" && "w-full",
                open ? "bg-dark-300" : "bg-dark-400"
              )}
            >
              <>
                <div className="bg-[#101115] p-1 rounded-full">
                  <img
                    className="w-6 h-6"
                    src={`/cryptoIcons/${switchToken.name}.svg`}
                    alt=""
                  />
                </div>
                <span className="lg:hidden xl:inline">{switchToken.name}</span>
              </>

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
              <Menu.Items className="absolute right-0 z-10 w-[160px] py-1 mt-2 origin-top-right border rounded-md shadow-lg bg-dark-400 border-dark-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {tokensSelector.map((x, index) => (
                  <Menu.Item key={x.name}>
                    <button
                      onClick={() => handleSwitchToken(index)}
                      // onClick={() => switchChain({ chainId: x.id })}
                      className={clsx(
                        "px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-dark-300",
                        !switchChain || (x.id === chain?.id && "!hidden")
                      )}
                    >
                      <img
                        className="w-6 h-6"
                        src={`/cryptoIcons/${x.name}.svg`}
                        alt=""
                      />
                      {x.name}
                      {isLoading && pendingChainId === x.id && " (switching)"}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    );
  }
}

export default SwitchSourceToken;
