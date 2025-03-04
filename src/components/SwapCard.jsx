import { useState, useEffect, useContext, useCallback } from "react";
import { InfoCircle, Repeat, Setting4 } from "iconsax-react";
import { Soroban } from "@stellar/stellar-sdk";

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
  transferPayout,
  transferToEVM,
  xlmToStroop,
  STELLAR_SDK_SERVER_URL,
  anyInvokeMainnet,
  sendTransactionMainnet,
} from "../freighter-wallet/soroban";
import {
  getNetwork,
  setAllowed,
  signTransaction,
  getAddress,
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
  const [isOpen, setIsOpen] = useState(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

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

  const needApproval = parseFloat(curAllowance) < parseFloat(amount);

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

  console.log("total debit amount", totalDebitedAmount);

  // console.log("selected source chain", selectedSourceChain?.id);

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

      console.log("stellar chain balance", amount);

      setBalance(() => amount);
    }
    if (userPubKey && selectedSourceChain?.id === 1200) {
      fetchBalance();
    }
  }, [userPubKey, selectedNetwork, selectedSourceChain]);

  useEffect(() => {
    async function fetchBridgeFeeXLM() {
      console.log("THIS RAN");
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

      setTotalDebitedAmount(
        Number(formatUnits(fees[0], tokenDecimal)) +
          (Number(amount) * Number(fees[1])) / 100000
      );
    }
    if (
      address &&
      selectedSourceChain?.id !== 1200 &&
      amount &&
      selectedDestinationChain?.id
    ) {
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

  async function handleDepositTokenXLM() {
    const amount = Soroban.parseTokenAmount("1000", 7);

    const txBuiderTransfer = await getTxBuilder(
      "GBD7AM5MWWPJTIN2NBJKYLTB342P46QRO3Q7LDJXW3LJSZZSEKALSF76",
      xlmToStroop(100).toString(),
      server,
      selectedNetwork?.networkPassphrase
    );

    const xdr = await depositToken({
      poolContract: "CDKPP6KCCAPGFZNOWSAQQXHKCWXRXI33QGTVZG4MUURVAIPUSQLGZVJ5",
      from: "GBD7AM5MWWPJTIN2NBJKYLTB342P46QRO3Q7LDJXW3LJSZZSEKALSF76",
      token_address: "CCMJ4KRNRUUO3SA36RPVXLSP364CSTTFUHLM5U767UCXTAQIE4SBYAA5",
      amount: amount,
      memo: "deposit",
      txBuilderAdmin: txBuiderTransfer,
      server: server,
    });

    // console.log("deposit transaction", xdr);

    const signature = await signTransaction(xdr, { network: "FUTURENET" });

    const result = await submitTx(
      signature,
      selectedNetwork?.networkPassphrase,
      server
    );

    // console.log("deposit confirmed", result);
  }

  async function handleTransferXLM() {
    const amountSent = Soroban.parseTokenAmount(amount, 7);

    const txBuiderTransfer = await getTxBuilder(
      userPubKey,
      xlmToStroop(100).toString(),
      server,
      selectedNetwork?.networkPassphrase
    );

    const xdr = await transferToEVM({
      poolContract: "CDKPP6KCCAPGFZNOWSAQQXHKCWXRXI33QGTVZG4MUURVAIPUSQLGZVJ5",
      from: userPubKey,
      to: "0x5e393d56389C0A76968A02C8d4cB71D3A048c5c7",
      token_address: "CCMJ4KRNRUUO3SA36RPVXLSP364CSTTFUHLM5U767UCXTAQIE4SBYAA5",
      amount: amountSent,
      memo: "transfer to EVM",
      txBuilderAdmin: txBuiderTransfer,
      server: server,
    });

    // console.log("deposit transaction", xdr);

    const signature = await signTransaction(xdr, { network: "FUTURENET" });

    const result = await submitTx(
      signature,
      selectedNetwork?.networkPassphrase,
      server
    );

    // console.log("deposit confirmed", result);
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

      console.log(args);

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
      console.log("transfer res", res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  }

  // const spender = poolContracts[chain?.id];
  const spender = "0x0310b89bbE853440266BdA3f3878F54497565601";

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

      console.log("balance result", formatUnits(result, tokenDecimal));
      setBalance(() => formatUnits(result, tokenDecimal));
    }
    if (selectedSourceChain && address && selectedSourceChain?.id !== 1200) {
      fetchBalance(address);
    }
  }, [address, chain, selectedSourceChain, isTransfer]);

  // useEffect(() => {
  //   async function awaitTransactionConfirmation(hashIn) {
  //     const confirmHash = await waitForTransactionReceipt(config, {
  //       chainId: chain.id,
  //       hash: trxHash,
  //     });

  //     // console.log("the block hash is", confirmHash);
  //     const msgId =
  //       confirmHash.logs.length > 5
  //         ? confirmHash.logs.at(5).topics.at(1)
  //         : confirmHash.logs.at(-1).topics.at(1);

  //     setIsProcessing(() => false);
  //     if (isTransfer) {
  //       setMessageId(() => msgId);
  //       setAmount(() => 0);
  //       setSelectedId();
  //       setRecipientAddr(() => address);
  //       const trxData = {
  //         // details: `${amount} ${switchToken.name}: ${chain.name} to ${
  //         //   chains.find((chain) => chain.id === selectedId).name // Assuming each chain object has a name property
  //         // }`,
  //         amount: amount,
  //         from: isXLM ? 2024 : chain.id,
  //         to: selectedId,
  //         name: switchToken.name,
  //         id: msgId,
  //         time: new Date().toLocaleDateString(),
  //       };
  //       // setTransferData(() => ({
  //       //   details: `${amount} ${switchToken.name}: ${chain.name} to ${
  //       //     chains.find((chain) => chain.id === selectedId).name // Assuming each chain object has a name property
  //       //   }`,
  //       //   id: confirmHash.logs.at(-1).topics.at(1), // Use the same value as for setting messageId
  //       // }));

  //       saveTransferData(trxData);
  //     }

  //     setIsTransfer(false);
  //   }

  //   if (trxHash !== "") {
  //     awaitTransactionConfirmation(trxHash);
  //   }
  // }, [trxHash]);

  async function handleApprove() {
    setIsProcessing(() => true);
    let ethQuantity = "";
    if (selectedSourceChain?.id?.toString() === "4200") {
      ethQuantity = parseUnits(amount, 6);
    } else if (selectedSourceChain?.id?.toString() === "3200") {
      ethQuantity = parseUnits(amount, 18);
    }
    const res = await writeContract(config, {
      abi: erc20Abi,
      address: tokenAddress.USDC[selectedSourceChain?.id],
      functionName: "approve",
      args: [bridgeContracts[selectedSourceChain?.id], ethQuantity],
    });
    setTrxHash(() => res);
  }

  async function handleTransferTokens() {
    if (selectedSourceChain?.id?.toString() === "1200") {
      await handleTransferFromXLM();
    } else {
      await handleTransferToXLM();
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

      console.log("response", res?.transactionHash);

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

  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
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
                    {Number(totalDebitedAmount)?.toFixed(2)} {"USDC"}
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
                  className="block w-full px-2 h-[45px] text-sm font-normal text-black placeholder-gray-800 bg-gray-300 border  rounded-sm focus:border-black focus:ring-1 focus:ring-black font-pj focus:outline-none"
                  value={recipientAddr}
                />

                <div
                  className="mt-0 absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer "
                  onClick={handlePaste}
                >
                  <svg
                    className="h-6 w-auto "
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40 22V10C40 7.794 38.206 6 36 6H30C30 5.46957 29.7893 4.96086 29.4142 4.58579C29.0391 4.21071 28.5304 4 28 4H16C15.4696 4 14.9609 4.21071 14.5858 4.58579C14.2107 4.96086 14 5.46957 14 6H8C5.794 6 4 7.794 4 10V36C4 38.206 5.794 40 8 40H22C22 42.206 23.794 44 26 44H40C42.206 44 44 42.206 44 40V26C44 23.794 42.206 22 40 22ZM22 26V36H8V10H14V14H30V10H36V22H26C23.794 22 22 23.794 22 26ZM26 40V26H40L40.002 40H26Z"
                      fill="black"
                    />
                  </svg>
                </div>
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
          {(isConnected && !isXLM) || (userPubKey && isXLM) ? (
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
            ) : needApproval && !isXLM ? (
              <Button disabled={!amount || !selectedId} onClick={handleApprove}>
                Approve
              </Button>
            ) : (
              <Button
                disabled={
                  !amount || !selectedDestinationChain || !selectedSourceChain
                }
                // onClick={
                //   isXLM
                //     ? handleTransferXLM
                //     : selectedId === 2024
                //     ? handleTransferToXLM
                //     : handleTransfer
                // }

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
