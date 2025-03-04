import React, { useState } from "react";

// import { MediaQueryBreakpointEnum } from "@/constant/constants";
import { MediaQueryBreakpointEnum } from "../../../constant/globalConstants";
import useMediaQuery from "@/hooks/useMediaQuery";
import Button from "../../../common/Button";
import Icon from "@/assets/svg/Frame.svg";
import BUSDIcon from "@/assets/svg/BUSD.svg";
import USDTIcon from "@/assets/svg/usdt.svg";
import USDCIcon from "@/assets/svg/USDC.svg";

import DepositWithdrawModal from "./DepositWithdrawModal";

const DepositsTab = () => {
  const [isOpenDeposit, setIsOpenDeposit] = useState(false);

  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  return (
    <>
      <div className="rounded bg-paper p-4 md:h-full bg-[#04131F]">
        <div className="flex justify-between items-center border-b border-[#212228] text-[#F2F4F5] pb-4">
          {islg ? (
            <>
              <h3 className="text-[14px] leading-[20px] font-bold text-white font-display">
                Stable coins
              </h3>

              <div className="flex items-center gap-8 text-[14px] leading-[20px] font-display font-medium text-[#9BA6B7]">
                <h3>Total earning</h3>
                <h3>Total borrowed</h3>
                <h3>Asset BP</h3>
                <Icon />
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <h3 className="text-[14px] leading-[20px] font-bold text-white font-display">
                Stable coins
              </h3>

              <div className="flex items-center justify-between gap-6 mt-5 text-[14px] leading-[20px] font-display font-medium text-[#9BA6B7]">
                <h3>Total earning</h3>
                <h3>Total borrowed</h3>
                <h3>Asset BP</h3>
              </div>
            </div>
          )}
        </div>

        {islg ? (
          <>
            {/* Large Screens  */}
            <div className="flex flex-col h-full">
              <table className="min-w-full mt-4">
                <thead className="border-b border-[#212228] uppercase">
                  <tr className="text-[12px] text-[#494C5D] leading-[16px] font-bold font-display">
                    <th scope="col" className="text-left pb-4">
                      asset
                    </th>
                    <th scope="col" className="text-right pb-4">
                      APY
                    </th>
                    <th scope="col" className="text-right pb-4">
                      USD value
                    </th>
                    <th scope="col" className="text-right pb-4">
                      In Wallet
                    </th>
                    <th scope="col" className="text-right pb-4">
                      Interest
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[#FFFFFF] py-4 whitespace-nowrap">
                  {tableData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#212228] font-display text-[14px] font-medium leading-[20px]"
                    >
                      <td className="py-5 flex items-center gap-2">
                        {row.icon} {row.asset}
                      </td>
                      <td className="text-right">
                        <p>{row.apy}</p>
                      </td>
                      <td className="text-right">
                        <p>{row.usdValue}</p>
                      </td>
                      <td className="text-right">{row.inWallet}</td>
                      <td className="text-right text-[#34D399]">
                        {row.interest}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end gap-3 mt-auto mb-9">
                <Button className="bg-[#292B33]">Compound</Button>
                <Button className="bg-[#292B33]">Claim</Button>

                <Button onClick={() => setIsOpenDeposit(true)}>Deposit</Button>
                <DepositWithdrawModal
                  isOpenDeposit={isOpenDeposit}
                  onClose={() => setIsOpenDeposit(false)}
                />

                <Button>Withdraw</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Mobile Screen  */}
            <div className="">
              {tableData.map((row, index) => (
                <>
                  <div key={index} className="border-b border-[#212228] pb-2">
                    <div className="flex flex-col gap-3">
                      <h3 className="flex items-center mt-2 gap-2 text-white font-display text-[14px] font-bold leading-[20px]">
                        {row.icon}
                        {row.asset}
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center font-display text-[14px] leading-[20px] font-medium">
                          <h3 className="text-[#6D7A86]">APY</h3>
                          <h3 className="text-[#FFF]">{row.apy}</h3>
                        </div>
                        <div className="flex justify-between items-center font-display text-[14px] leading-[20px] font-medium">
                          <h3 className="text-[#6D7A86]">USD value</h3>
                          <h3 className="text-[#FFF]">{row.usdValue}</h3>
                        </div>
                        <div className="flex justify-between items-center font-display text-[14px] leading-[20px] font-medium">
                          <h3 className="text-[#6D7A86]">In Wallet</h3>{" "}
                          <h3 className="text-[#FFF]">{row.inWallet}</h3>
                        </div>
                        <div className="flex justify-between items-center font-display text-[14px] leading-[20px] font-medium">
                          <h3 className="text-[#6D7A86]">Interest</h3>
                          <h3 className="text-[#34D399]">{row.interest}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </>
        )}
      </div>
      {!islg && (
        <div className="pt-5 pb-12">
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsOpenDeposit(true)} className="w-full">
              Deposit
            </Button>
            <DepositWithdrawModal
              isOpenDeposit={isOpenDeposit}
              onClose={() => setIsOpenDeposit(false)}
            />

            <Button className="w-full">Withdraw</Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <Button className="bg-[#292B33] w-full">Compound</Button>
            <Button className="bg-[#292B33] w-full">Claim</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositsTab;

const tableData = [
  {
    icon: <BUSDIcon className="h-5 w-auto" />,
    asset: "BUSD",
    apy: "71.1%",
    usdValue: "10,000.00",
    inWallet: "5,000.00",
    interest: "12.55",
  },
  {
    icon: <USDTIcon className="h-5 w-auto" />,
    asset: "USDT",
    apy: "71.1%",
    usdValue: "10,000.00",
    inWallet: "5,000.00",
    interest: "12.55",
  },
  {
    icon: <USDCIcon className="h-5 w-auto" />,
    asset: "USDC",
    apy: "71.1%",
    usdValue: "10,000.00",
    inWallet: "5,000.00",
    interest: "12.55",
  },
];
