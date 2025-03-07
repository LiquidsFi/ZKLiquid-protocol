import { useState, useEffect, useContext, useCallback } from "react";
import { InfoCircle, Repeat, Setting4, TickCircle } from "iconsax-react";
import { Soroban, Horizon } from "@stellar/stellar-sdk";
import { v4 as uuidv4 } from "uuid";

import { ClipLoader } from "react-spinners";

import { erc20Abi, formatUnits, parseEther, parseUnits } from "viem";
import { useAccount, useSwitchChain } from "wagmi";

import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";

import Button from "./Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { parseEther } from "viem";
import { useDebounce, useMediaQuery } from "usehooks-ts";

import WalletsModal from "./WalletsModal";

import poolContract from "../contracts/pool.json";
import {
  abi,
  bridgeContracts,
  oracleContracts,
  tokenAddress,
  chainIds,
  native,
} from "../contracts/contracts-details.json";
import { config } from "../Wagmi";
import SwitchNetworkDropdown from "../components/SwitchNetworkDropdown";
import DestinationChainDropdown from "./DestinationChainDropdown";
import {
  tokensSelector,
  destinationSelectors,
} from "../contracts/destination-selector";
import SwitchSourceToken from "./SwitchSourceToken";
import DestinationToken from "./DestinationToken";

import {
  BASE_FEE,
  depositToken,
  getTxBuilder,
  server,
  submitTx,
  xlmToStroop,
  STELLAR_SDK_SERVER_URL,
  anyInvokeMainnet,
  sendTransactionMainnet,
  HORIZON_URL,
  getTrustline,
  changeTrustline,
} from "../freighter-wallet/soroban";
import {
  getNetwork,
  setAllowed,
  signTransaction,
  getAddress,
  addToken,
} from "@stellar/freighter-api";
import { SidebarContext } from "../context/SidebarContext";
import axios from "axios";

function SwapCard({
  setMessageId,
  messageId,
  setUserKeyXLM,
  setNetworkXLM,
  userKeyXLM,
}) {
  const [recheckTrustline, setRecheckTrustline] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [allowance, setAllowance] = useState(0);
  // const [needApproval, setNeedApproval] = useState(false);

  const [hasTrust, setHasTrust] = useState(false);

  const { chain, address, isConnected } = useAccount();

  const [amount, setAmount] = useState(null);
  const [recipientAddr, setRecipientAddr] = useState("");
  const [curAllowance, setCurAllowance] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [trxHash, setTrxHash] = useState("");
  const [isTransfer, setIsTransfer] = useState(false);

  const poolAbi = poolContract.abi;
  const poolContracts = poolContract.contracts;
  const [selectedId, setSelectedId] = useState();

  const [totalDebitedAmount, setTotalDebitedAmount] = useState(null);
  const [bridgeFee, setBridgeFee] = useState(null);

  const [switchToken, setSwitchToken] = useState(tokensSelector[0]);

  const STORAGE_KEY = address;
  const MAX_ITEMS = 5;

  const isMobile = useMediaQuery("(max-width: 375px)");

  const needApproval = allowance < Number(totalDebitedAmount);

  // console.log("need approval", needApproval);

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
    claimableCashback,
    setClaimableCashback,
    updateBalances,
    setUpdateBalances,
  } = useContext(SidebarContext);

  useEffect(() => {
    async function fetchCashback() {
      const body = {
        pubKey: userPubKey,
        fee: BASE_FEE,
        networkPassphrase: selectedNetwork?.networkPassphrase,
        contractId: bridgeContracts[1200],
        operation: "get_claimable_cashback",
        args: [
          { type: "Address", value: userPubKey },
          {
            type: "Address",
            value: "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA",
          },
        ],
      };

      const response = await axios.post(
        `${STELLAR_SDK_SERVER_URL}/simulateTransaction`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const receivedCashback = JSON.parse(response?.data?.data, (key, value) =>
        /^\d+$/.test(value) ? BigInt(value) : value
      );

      const cashback = Soroban.formatTokenAmount(
        receivedCashback?.claimable_amount?.toString(),
        7
      );

      setClaimableCashback(cashback);

      // setBalance(() => amount);
    }
    if (userPubKey && selectedSourceChain?.id === 1200) {
      fetchCashback();
    }
  }, [userPubKey, selectedSourceChain, updateBalances]);

  useEffect(() => {
    setHasTrust(false);
    async function fetchHasTrust() {
      const accountHasTrust = await getTrustline(
        recipientAddr,
        tokenAddress.USDC[1200]
      );
      // console.log("account has trust", accountHasTrust);

      setHasTrust(accountHasTrust);
    }
    if (selectedDestinationChain?.id === 1200 && recipientAddr) fetchHasTrust();
  }, [recipientAddr, selectedDestinationChain, recheckTrustline]);

  useEffect(() => {
    async function fetchAccount() {
      const network = await getNetwork();
      const account = (await getAddress()).address;
      setUserPubKey(account);
      setSelectedNetwork(network);
    }
    fetchAccount();
  }, []);

  useEffect(() => {
    async function fetchConnection() {
      const isAllowed = await setAllowed();
      const publicKey = await getAddress();
      const nt = await getNetwork();
      setUserPubKey(() => publicKey.address);
      setSelectedNetwork(() => nt);
    }
    fetchConnection();
  }, [freighterConnecting, selectedId, userPubKey]);
  // console.log("the user public key is", selectedSourceChain?.id);

  useEffect(() => {
    async function fetchBalance() {
      const body = {
        pubKey: userPubKey,
        fee: BASE_FEE,
        networkPassphrase: selectedNetwork?.networkPassphrase,
        contractId: tokenAddress.USDC[1200],
        operation: "balance",
        args: [{ type: "Address", value: userPubKey }],
      };

      const response = await axios.post(
        `${STELLAR_SDK_SERVER_URL}/simulateTransaction`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const amount = Soroban.formatTokenAmount(response?.data?.data, 7);

      // console.log("stellar chain balance", amount);

      setBalance(() => amount);
    }
    if (userPubKey && selectedSourceChain?.id === 1200) {
      fetchBalance();
    }
  }, [userPubKey, selectedNetwork, selectedSourceChain, updateBalances]);

  useEffect(() => {
    async function fetchBridgeFeeXLM() {
      // console.log("THIS RAN");
      const body = {
        pubKey: userPubKey,
        fee: BASE_FEE,
        networkPassphrase: selectedNetwork?.networkPassphrase,
        contractId: bridgeContracts[1200],
        operation: "get_bridge_fee",
        args: [],
      };

      const response = await axios.post(
        `${STELLAR_SDK_SERVER_URL}/simulateTransaction`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fee = Soroban.formatTokenAmount(response?.data?.data, 7);

      const receivedFee = JSON.parse(fee, (key, value) =>
        /^\d+$/.test(value) ? BigInt(value) : value
      );

      const actualFee = formatUnits(receivedFee?.rate, 7);

      setBridgeFee(actualFee);

      // console.log("actual fee", actualFee);

      // setBalance(() => amount);
    }
    if (
      userPubKey &&
      selectedSourceChain?.id === 1200 &&
      amount &&
      selectedDestinationChain?.id
    ) {
      fetchBridgeFeeXLM();
    }

    async function fetchTotalDebitAmountXLM() {
      const body = {
        pubKey: userPubKey,
        fee: BASE_FEE,
        networkPassphrase: selectedNetwork?.networkPassphrase,
        contractId: bridgeContracts[1200],
        operation: "get_total_debit_at_transfer",
        args: [
          { type: "Address", value: tokenAddress.USDC[1200] },
          { type: "i128", value: amount },
        ],
      };

      const response = await axios.post(
        `${STELLAR_SDK_SERVER_URL}/simulateTransaction`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const debitAmount = Soroban.formatTokenAmount(response?.data?.data, 7);
      if (!amount) {
        setTotalDebitedAmount(null);
      } else {
        setTotalDebitedAmount(debitAmount);
      }
    }

    if (userPubKey && selectedSourceChain?.id === 1200 && amount) {
      fetchTotalDebitAmountXLM();
    }
  }, [
    amount,
    userPubKey,
    selectedNetwork,
    selectedSourceChain,
    selectedDestinationChain,
  ]);
  useEffect(() => {
    async function fetchBridgeFeeEVM() {
      const bridgeFee = await readContract(config, {
        abi: abi,
        address: bridgeContracts[selectedSourceChain?.id],
        functionName: "bridgeFee",
      });

      setBridgeFee(formatUnits(bridgeFee, 18));
      // console.log("bridge fee", formatUnits(bridgeFee, 18));
    }
    if (
      address &&
      selectedSourceChain?.id !== 1200 &&
      amount &&
      selectedDestinationChain?.id
    ) {
      fetchBridgeFeeEVM();
    }

    async function fetchTotalAmountEVM() {
      const fees = await readContract(config, {
        abi: abi,
        address: bridgeContracts[selectedSourceChain?.id],
        functionName: "liquidityFeeRate",
        args: [tokenAddress.USDC[selectedSourceChain?.id]],
      });

      const tokenDecimal = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress.USDC[selectedSourceChain?.id],
        functionName: "decimals",
      });

      // console.log(
      //   "the total debited",
      //   Number(formatUnits(fees[0], tokenDecimal)) +
      //     Number(amount) +
      //     (Number(amount) * Number(fees[1])) / 100000
      // );

      setTotalDebitedAmount(
        Number(formatUnits(fees[0], tokenDecimal)) +
          Number(amount) +
          (Number(amount) * Number(fees[1])) / 100000
      );
    }
    if (address && selectedSourceChain?.id !== 1200 && amount) {
      fetchTotalAmountEVM();
    }
  }, [
    amount,
    address,
    selectedNetwork,
    selectedSourceChain,
    selectedDestinationChain,
  ]);

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text.length > 0) {
        setRecipientAddr(() => text);
      }
    } catch (err) {
      console.error("Failed to reac contents");
    }
  }

  const formatBalance = (number, decimal) => {
    if (number == undefined) {
      return;
    }

    const decimals = number.toString().split(".")[1];
    if (decimals && decimals.length >= decimal) {
      return Number(number).toFixed(decimal);
    } else {
      return number.toString();
    }
  };

  async function handleChangeTrustline() {
    setIsProcessing(true);
    try {
      await addToken({
        contractId: tokenAddress.USDC[1200],
        networkPassphrase: selectedNetwork?.networkPassphrase,
      });
      // console.log("this ran chang trust");
      // if (selectedDestinationChain?.id === 1200) {
      //   tx = await changeTrustline(
      //     recipientAddr,
      //     BASE_FEE,
      //     selectedNetwork?.networkPassphrase,
      //     tokenAddress.USDC[1200]
      //   );
      //   console.log("change trustline signature", tx);
      // }
    } catch (e) {
      console.log(e);
    } finally {
      setRecheckTrustline(uuidv4());
      setIsProcessing(false);
    }
  }

  async function handleTransferFromXLM() {
    setIsProcessing(true);
    try {
      const args = [
        { type: "Address", value: userPubKey },
        { type: "u32", value: chainIds[selectedDestinationChain?.id] },
        { type: "string", value: recipientAddr },
        { type: "Address", value: tokenAddress.USDC[1200] },
        { type: "i128", value: amount },
      ];

      // console.log(args);

      const resSign = await anyInvokeMainnet(
        userPubKey,
        BASE_FEE,
        selectedNetwork?.networkPassphrase,
        oracleContracts[1200],
        "initiate_outgoing_transfer",
        args,
        "transfer to evm"
      );

      const res = await sendTransactionMainnet(
        resSign?.signedTxXdr,
        selectedNetwork?.networkPassphrase
      );
      const trxData = {
        amount: amount,
        from: selectedSourceChain?.id,
        to: selectedDestinationChain?.id,
        name: "USDC",
        id: res?.txHash,
        time: new Date().toLocaleDateString(),
      };

      saveTransferData(trxData);

      setMessageId(res?.txHash);
      // console.log("transfer res", res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    async function fetchAllowance(addr) {
      const tokenDecimal = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress.USDC[selectedSourceChain?.id],
        functionName: "decimals",
      });

      const result = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress.USDC[selectedSourceChain?.id],
        functionName: "allowance",
        args: [addr, bridgeContracts[selectedSourceChain?.id]],
        account: addr,
      });

      setAllowance(formatUnits(result, tokenDecimal));

      // console.log("allowance", formatUnits(result, tokenDecimal));
      // setBalance(() => formatUnits(result, tokenDecimal));
    }
    if (selectedSourceChain && address && selectedSourceChain?.id !== 1200) {
      fetchAllowance(address);
    }
  }, [address, chain, selectedSourceChain, isTransfer, updateBalances]);

  useEffect(() => {
    async function fetchBalance(addr) {
      const tokenDecimal = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress.USDC[selectedSourceChain?.id],
        functionName: "decimals",
      });

      const result = await readContract(config, {
        abi: erc20Abi,
        address: tokenAddress.USDC[selectedSourceChain?.id],
        functionName: "balanceOf",
        args: [addr],
        account: addr,
      });

      // console.log("balance result", formatUnits(result, tokenDecimal));
      setBalance(() => formatUnits(result, tokenDecimal));
    }
    if (selectedSourceChain && address && selectedSourceChain?.id !== 1200) {
      fetchBalance(address);
    }
  }, [address, chain, selectedSourceChain, isTransfer, updateBalances]);

  // console.log("the amount", amount, typeof amount);
  // console.log("the amount", totalDebitedAmount, typeof totalDebitedAmount);

  async function handleApprove() {
    setIsProcessing(() => true);
    try {
      let ethQuantity = "";
      if (selectedSourceChain?.id?.toString() === "1") {
        ethQuantity = parseUnits(totalDebitedAmount?.toString(), 6);
      } else if (selectedSourceChain?.id?.toString() === "56") {
        ethQuantity = parseUnits(totalDebitedAmount?.toString(), 18);
      }

      const res = await writeContract(config, {
        abi: erc20Abi,
        address: tokenAddress.USDC[selectedSourceChain?.id],
        functionName: "approve",
        args: [bridgeContracts[selectedSourceChain?.id], ethQuantity],
      });
      // setTrxHash(() => res);
    } catch (e) {
      console.log(e);
    } finally {
      setUpdateBalances(uuidv4());
      setIsProcessing(false);
    }
  }

  async function handleTransferTokens() {
    try {
      if (selectedSourceChain?.id?.toString() === "1200") {
        await handleTransferFromXLM();
      } else {
        await handleTransferToXLM();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRecipientAddr("");
      setSelectedDestinationChain(null);
      setUpdateBalances(uuidv4());
    }
  }

  async function awaitTransactionConfirmation(hashIn) {
    const confirmHash = await waitForTransactionReceipt(config, {
      hash: hashIn,
    });

    return confirmHash;
  }

  async function handleTransferToXLM() {
    setIsProcessing(() => true);

    try {
      const bridgeFee = await readContract(config, {
        abi: abi,
        address: bridgeContracts[selectedSourceChain?.id],
        functionName: "bridgeFee",
      });

      let ethQuantity = "";
      if (chainIds[selectedSourceChain.id].toString() === "4200") {
        ethQuantity = parseUnits(amount.toString(), 6);
      } else if (chainIds[selectedSourceChain.id].toString() === "3200") {
        ethQuantity = parseUnits(amount, 18);
      }

      console.log("the amount is", ethQuantity);

      const tx = await writeContract(config, {
        abi: abi,
        address: bridgeContracts[selectedSourceChain?.id],
        functionName: "outgoingTransfer",
        args: [
          chainIds[selectedDestinationChain?.id],
          recipientAddr,
          tokenAddress.USDC[selectedSourceChain?.id],
          ethQuantity,
          false,
        ],
        value: bridgeFee,
      });

      const res = await awaitTransactionConfirmation(tx);
      setTrxHash(() => res);

      // console.log("response", res?.transactionHash);

      const trxData = {
        amount: amount,
        from: selectedSourceChain?.id,
        to: selectedDestinationChain?.id,
        name: "USDC",
        id: res?.transactionHash,
        time: new Date().toLocaleDateString(),
      };

      saveTransferData(trxData);

      setMessageId(res?.transactionHash);
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }
  const receiverContract = poolContracts[selectedId];

  function saveTransferData(newData) {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if (data.length >= MAX_ITEMS) {
      data.shift();
    }

    data.push(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function handleMax() {
    setAmount(() => balance);
  }

  return (
    <>
      <div className="p-4  bg-[#04131F]  md:p-6 rounded-xl ">
        <div className="grid grid-cols-3">
          <div aria-hidden="true">&nbsp;</div>
          <h3 className="text-xl font-bold text-center text-2">Swap/Bridge</h3>
          <div className="text-right">
            <button onClick={() => setIsSettingsModalOpen(true)}>
              <Setting4 />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between mt-4 ">
          <div className="flex flex-col w-full items-start space-y-3 ">
            <p className="text-sm font-medium text-dark-100">From</p>

            {(isConnected || userPubKey) && (
              <div className="flex items-end justify-between  w-full ">
                <SwitchNetworkDropdown
                  isMobile={isMobile}
                  allChains={allChains}
                />

                <SwitchSourceToken
                  switchToken={switchToken}
                  setSwitchToken={setSwitchToken}
                />
              </div>
            )}
            <div className="flex justify-between items-center w-full ">
              {" "}
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="w-2/3 text-xl font-bold  text-white bg-transparent border-0 outline-none md:text-3xl placeholder:text-dark-200"
                placeholder="0.00"
                // value={!!amount && formatBalance(amount, 8)}
              />
              {totalDebitedAmount && (
                <div className="text-green-500 flex gap-2 rounded-lg px-2">
                  <span>
                    {Number(totalDebitedAmount)?.toFixed(4)} {"USDC"}
                  </span>
                  <InfoCircle className="w-5 h-auto text-gray-400" />
                </div>
              )}
              {/* {true && (
                <div className=" text-green-500 flex gap-2 rounded-lg px-2">
                  5.05 USDC
                  <InfoCircle className="w-5 h-auto text-gray-400" />
                </div>
              )} */}
            </div>

            <div className="flex justify-between items-center w-full">
              {" "}
              <button
                className="text-sm font-semibold text-white uppercase"
                onClick={handleMax}
              >
                Max
              </button>
              <div className="flex-shrink-0 space-y-2 text-right ">
                {
                  <p className="text-xs font-medium md:text-sm text-gray-200">
                    Balance: {Number(balance)?.toFixed(2)} {switchToken.name}
                  </p>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="my-3   relative text-center after:content-[''] after:absolute after:left-0 after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-px after:bg-dark-300 af">
          <button
            className="relative z-10 p-1 rounded-lg bg-dark-300 hover:bg-dark-300/50"
            // onClick={switchTokensHandler}
          >
            <Repeat className="rotate-90" />
          </button>
        </div>

        <div className="flex   items-end justify-between mt-4">
          <div className="flex w-full  flex-col items-start space-y-3">
            <p className="text-sm font-medium text-dark-100">To</p>
            {(isConnected || userPubKey) && (
              <div className="flex w-full  items-end justify-between ">
                <DestinationChainDropdown
                  allChains={allChains}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  isMobile={isMobile}
                />

                <DestinationToken switchToken={switchToken} />
              </div>
            )}
            <div
              disabled={true}
              type="number"
              className="w-full text-xl font-bold text-white bg-transparent border-0 outline-none md:text-3xl placeholder:text-dark-200"
              placeholder="0.00"
              // disabled={true}
              // value={amount}
              // onChange={(e) => getEstimatedSwapData(e.target.value)}
            >
              {amount ? amount : "0.00"}
            </div>
          </div>
        </div>
        {selectedDestinationChain && amount > 0 && (
          <div className=" w-full mt-5">
            <div className="relative   ">
              <div className="absolute -inset-x-2 -inset-y-5"></div>

              <div className="relative w-full">
                <input
                  onChange={(e) => setRecipientAddr(() => e.target.value)}
                  type="text"
                  name=""
                  id=""
                  placeholder="Paste recipient here"
                  className={`block w-full text-black px-2 h-[45px] text-[12.5px] font-normal  placeholder-gray-800 bg-gray-300 border  rounded-sm  ${
                    !hasTrust &&
                    selectedDestinationChain?.id === 1200 &&
                    "text-red-600"
                  }`}
                  value={recipientAddr}
                />

                {selectedDestinationChain?.id === 1200 &&
                  (hasTrust ? (
                    <div className="mt-0 absolute inset-y-0 right-0 flex items-center pr-2 ">
                      <TickCircle
                        variant="Bold"
                        className="text-green-700 h-6 w-6"
                      />
                    </div>
                  ) : (
                    <div
                      className="mt-0 absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer "
                      onClick={handlePaste}
                    >
                      <InfoCircle
                        variant="Bold"
                        className="text-red-600 h-6 w-6"
                      />
                    </div>
                  ))}
              </div>

              <div className="flex relative mt-4 font-semibold justify-between items-center w-full ">
                {" "}
                {true && (
                  <div className=" text-gray-300 flex gap-2 rounded-lg px-2">
                    <div className=""> Bridge Fee:</div>{" "}
                    <InfoCircle className="w-5 h-auto text-gray-300" />
                  </div>
                )}
                {bridgeFee ? (
                  <div className="text-green-500">
                    {Number(bridgeFee)?.toFixed(4)}{" "}
                    {native[selectedSourceChain?.id]}
                  </div>
                ) : (
                  <ClipLoader
                    size={20}
                    color={"#9ca3af "}
                    loading={true}
                    className="relative top-[3px] text-gray-400 "
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          {!hasTrust && selectedDestinationChain?.id === 1200 ? (
            <Button
              disabled={
                !amount || !selectedDestinationChain || !selectedSourceChain
              }
              onClick={handleChangeTrustline}
            >
              Connect and Change Trustline
            </Button>
          ) : isConnected || userPubKey ? (
            isProcessing ? (
              <Button>
                <>
                  <ClipLoader
                    size={20}
                    color={"#ffffff"}
                    loading={true}
                    className="relative top-[3px]"
                  />
                  <span className="ml-2">Processing...</span>
                </>
              </Button>
            ) : needApproval && selectedSourceChain?.id !== 1200 ? (
              <Button disabled={!amount} onClick={handleApprove}>
                Approve
              </Button>
            ) : (
              <Button
                disabled={
                  !amount || !selectedDestinationChain || !selectedSourceChain
                }
                onClick={handleTransferTokens}
              >
                Transfer Now
              </Button>
            )
          ) : (
            <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>
          )}
        </div>

        {/* <div className="mt-6">
          {isConnected ? (
            isSwapAvailable ? (
              <Button>
                {isActionLoading ? (
                  <>
                    <ClipLoader
                      size={20}
                      color={"#ffffff"}
                      loading={true}
                      className="relative top-[3px]"
                    />
                    <span className="ml-2">Processing...</span>
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
            ) : (
              <Button disabled={true}>{errorMessage}</Button>
            )
          ) : (
            <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>
          )}
          <button onClick={handleTransfer}>Buy now</button>
        </div> */}
      </div>

      {/* <button onClick={handleTransferPayout}> transfer Test</button> */}

      <WalletsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setUserKeyXLM={setUserKeyXLM}
        setNetworkXLM={setNetworkXLM}
        userKeyXLM={userKeyXLM}
      />
    </>
  );
}

export default SwapCard;
