import React from "react";

// import { MediaQueryBreakpointEnum } from "@/constant/constants";
import { MediaQueryBreakpointEnum } from "../../../constant/globalConstants";
// import useMediaQuery from "/hooks/useMediaQuery";
import useMediaQuery from "../../../hooks/useMediaQuery";
import Button from "../../../common/Button";

import WidgetIcon from "@/assets/svg/widget.svg";
import ArrowIcon from "@/assets/svg/arrow.svg";
import XLMIcon from "@/assets/svg/XLM.svg";
import BUSDIcon from "@/assets/svg/BUSD.svg";
import USDTIcon from "@/assets/svg/usdt.svg";
import USDCIcon from "@/assets/svg/USDC.svg";

const BonusRewardTab = () => {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  return (
    <>
      <div className="rounded bg-paper p-4 bg-[#04131F]">
        {/* Large Screens  */}
        {islg ? (
          <div className="flex flex-col justify-center">
            <div className="flex flex-col items-center font-display">
              <WidgetIcon />
              <h4 className="text-[12px] leading-[16px] font-medium text-[#FFF] mt-6">
                Bonus Reward
              </h4>

              <div className="flex font-display items-center gap-6">
                <h2 className="text-[#FFF] leading-[36px] text-[28px] font-bold my-2">
                  $12,875
                </h2>
                <h4 className="flex items-center gap-1 text-[#34D399] leading-[16px] text-[12px] font-medium">
                  <ArrowIcon /> 2%
                </h4>
              </div>

              <h3 className="leading-[16px] text-[12px] font-medium font-display text-[#6D7A86] mb-8">
                78% - 105%
              </h3>
            </div>

            {COINS.map((coin) => (
              <div key={coin.coin}>
                <div className="flex justify-between font-display space-y-3">
                  <div className="flex items-center gap-2">
                    {coin.coinIcon}
                    <h2 className="text-[#FFF] text-[14px] leading-[20px] font-medium">
                      {coin.coin}
                    </h2>
                  </div>

                  <h2 className="text-[#9BA6B7] text-[14px] leading-[20px] font-medium">
                    {coin.price}
                  </h2>
                </div>
              </div>
            ))}

            <Button className="mt-10 w-full">Claim bonus</Button>
          </div>
        ) : (
          <>
            {/* Mobile Screen  */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-col items-center font-display">
                <WidgetIcon />
                <h4 className="text-[12px] leading-[16px] font-medium text-[#FFF] mt-6">
                  Bonus Reward
                </h4>

                <div className="flex font-display items-center gap-6">
                  <h2 className="text-[#FFF] leading-[36px] text-[28px] font-bold my-2">
                    $12,875
                  </h2>
                  <h4 className="flex items-center gap-1 text-[#34D399] leading-[16px] text-[12px] font-medium">
                    <ArrowIcon /> 2%
                  </h4>
                </div>

                <h3 className="leading-[16px] text-[12px] font-medium font-display text-[#6D7A86] mb-8">
                  78% - 105%
                </h3>
              </div>

              {COINS.map((coin) => (
                <div key={coin.coin}>
                  <div className="flex justify-between font-display space-y-3">
                    <div className="flex items-center gap-2">
                      {coin.coinIcon}
                      <h2 className="text-[#FFF] text-[14px] leading-[20px] font-medium">
                        {coin.coin}
                      </h2>
                    </div>

                    <h2 className="text-[#9BA6B7] text-[14px] leading-[20px] font-medium">
                      {coin.price}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {!islg && <Button className="mt-5 mb-10 w-full">Claim bonus</Button>}
    </>
  );
};

export default BonusRewardTab;

const COINS = [
  {
    coinIcon: <XLMIcon className="h-5 w-auto" />,
    coin: "Total in XLM",
    price: "16,011.82",
  },
  {
    coinIcon: <BUSDIcon className="h-5 w-auto" />,
    coin: "BUSD Bonus",
    price: "5,238.47",
  },
  {
    coinIcon: <USDTIcon className="h-5 w-auto" />,
    coin: "USDT Bonus",
    price: "6,532.02",
  },
  {
    coinIcon: <USDCIcon className="h-5 w-auto" />,
    coin: "USDC Bonus",
    price: "4,672.42",
  },
];
