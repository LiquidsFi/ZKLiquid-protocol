import { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAccount, useSwitchChain } from "wagmi";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import { toast } from "react-toastify";

import { SidebarContext } from "../context/SidebarContext";
import WalletsModal from "./WalletsModal";

function SwitchNetworkDropdown({ width, allChains }) {
  const { chains, error, isLoading, pendingChainId, switchChain } =
    useSwitchChain();

  // console.log("configured chains include", chains, chain);

  const {
    isXLM,
    selectedSourceChain,
    setSelectedSourceChain,
    selectedDestinationChain,
    setSelectedDestinationChain,

    selectedChain,
    setSelectedChain,
    handleConnectFreighter,
  } = useContext(SidebarContext);
  const { chain, address, isConnected } = useAccount();

  const [isOpen, setIsOpen] = useState(false);

  async function handleSwitchChain(id) {
    // console.log("this ran");
    if (id === 1200) {
      await handleConnectFreighter();
    } else {
      if (!address) {
        setIsOpen(true);
      }
      const response = await switchChain({ chainId: id });
    }

    const selected = allChains.find((chain) => chain.id === id);
    setSelectedSourceChain(selected);
    localStorage.setItem("selectedChainId", id);
    setSelectedDestinationChain(null);
  }

  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);
  useEffect(() => {
    if (error && error.message) {
      toast.error(error.message);
    }
  }, [error]);

  const chainOptions = allChains?.filter(
    (chain) => chain.id !== selectedSourceChain?.id
  );

  // console.log("chain options", chainOptions);
  return (
    <>
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
                "flex min-w-[200px] lg:w-max-[300px] gap-2 items-center p-1 pr-2.5 rounded-full text-sm font-medium border border-gray-400 transition-colors hover:bg-dark-300",
                width === "full" && "w-full",
                open ? "bg-dark-300" : "bg-dark-400"
              )}
            >
              {selectedSourceChain ? (
                <>
                  <div className="bg-[#101115] p-1 rounded-full">
                    <img
                      className="w-6 h-6"
                      src={`/cryptoIcons/${selectedSourceChain?.id}.svg`}
                      alt=""
                    />
                  </div>
                  <span className="lg:hidden xl:inline">
                    {selectedSourceChain?.name}
                  </span>
                </>
              ) : (
                <>
                  <div className="bg-[#101115] p-1 rounded-full">
                    <svg
                      className="h-6 w-auto text-gray-100"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1290_9617)">
                        <path
                          d="M6 10H10V6C7.79 6 6 7.79 6 10ZM6 26H10V22H6V26ZM14 42H18V38H14V42ZM6 18H10V14H6V18ZM26 6H22V10H26V6ZM38 6V10H42C42 7.79 40.21 6 38 6ZM10 42V38H6C6 40.21 7.79 42 10 42ZM6 34H10V30H6V34ZM18 6H14V10H18V6ZM22 42H26V38H22V42ZM38 26H42V22H38V26ZM38 42C40.21 42 42 40.21 42 38H38V42ZM38 18H42V14H38V18ZM38 34H42V30H38V34ZM30 42H34V38H30V42ZM30 10H34V6H30V10ZM14 34H34V14H14V34ZM18 18H30V30H18V18Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </div>

                  <span>Select Network</span>
                </>
              )}

              <ArrowDown2
                size="16"
                color="#fff"
                className={clsx(
                  "transition-transform will-change-transform ml-auto",
                  !isXLM && open && "rotate-180"
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
              <Menu.Items className="absolute right-0 z-10 w-56 py-1 mt-2 origin-top-right border rounded-md shadow-lg bg-dark-400 border-dark-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {chainOptions?.map((x) => (
                  <Menu.Item key={x?.id}>
                    <button
                      onClick={() => handleSwitchChain(x?.id)}
                      className={clsx(
                        "px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-dark-300"
                      )}
                    >
                      <img
                        className="w-6 h-6"
                        src={`/cryptoIcons/${x?.id}.svg`}
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
      <WalletsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default SwitchNetworkDropdown;
