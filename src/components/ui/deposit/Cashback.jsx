import React, { useContext, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { ClipLoader } from "react-spinners";
import {
  BASE_FEE,
  anyInvokeMainnet,
  sendTransactionMainnet,
} from "../../../freighter-wallet/soroban";
import { bridgeContracts } from "../../../contracts/contracts-details.json";
import { v4 as uuidv4 } from "uuid";

export default function Cashback() {
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    selectedSourceChain,
    claimableCashback,
    setClaimableCashback,
    userPubKey,
    updateBalances,
    setUpdateBalances,
    selectedNetwork,
  } = useContext(SidebarContext);

  async function handleClaim() {
    setIsProcessing(true);
    try {
      const args = [
        { type: "Address", value: userPubKey },
        {
          type: "Address",
          value: "CAS3J7GYLGXMF6TDJBBYYSE3HQ6BBSMLNUQ34T6TZMYMW2EVH34XOWMA",
        },
      ];

      const resSign = await anyInvokeMainnet(
        userPubKey,
        BASE_FEE,
        selectedNetwork?.networkPassphrase,
        bridgeContracts[1200],
        "claim_cashback",
        args,
        "claim cashback"
      );

      const res = await sendTransactionMainnet(
        resSign?.signedTxXdr,
        selectedNetwork?.networkPassphrase
      );

      //   setMessageId(res?.txHash);
      // console.log("transfer res", res);
    } catch (e) {
      console.log(e);
    } finally {
      setUpdateBalances(uuidv4());
      setIsProcessing(false);
    }
  }

  return (
    <>
      {selectedSourceChain?.id === 1200 && claimableCashback !== "0." && (
        <div
          onClick={handleClaim}
          className="px-4 mx-auto cursor-pointer sm:px-6 lg:px-8 max-w-7xl"
        >
          <div className="bg-green-100 pr-5 rounded-lg">
            <div className="p-2">
              {isProcessing ? (
                <div className="flex items-center justify-between">
                  <ClipLoader
                    size={20}
                    color={"#052e16"}
                    loading={true}
                    className="relative top-[3px]"
                  />
                  <span className="ml-2 text-green-950">
                    Claiming your cashback...
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="ml-3 text-sm font-semibold text-green-950">
                    Claim your {claimableCashback}0 XLM Cashback
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
