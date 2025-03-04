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

function DestinationToken({ width, switchToken }) {
  const { chain } = useAccount();
  const { chains, error, isLoading, pendingChainId, switchChain } =
    useSwitchChain();

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
                "flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm w-[160px]  font-medium border border-gray-400 transition-colors hover:bg-dark-300",
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
            </Menu.Button>
          </>
        )}
      </Menu>
    );
  }
}

export default DestinationToken;
