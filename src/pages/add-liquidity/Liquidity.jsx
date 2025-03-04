import { useState } from "react";
import clsx from "clsx";

import useMediaQuery from "@/hooks/useMediaQuery";
import { MediaQueryBreakpointEnum } from "../../constant/globalConstants";
// import StableCoinsTab from "@/components/ui/lend/StableCoinsTab";
import DepositsTab from "../../components/ui/deposit/DepositsTab";
// import BonusRewardTab from "@/components/ui/lend/BonusRewardTab";
import BonusRewardTab from "../../components/ui/deposit/BonusRewardTab";
import Stats from "../../components/Stats";
// import Stats from "@/components/ui/lend/Stats";

function Liquidity(props) {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);

  const [tab, setTab] = useState(0);

  const stableCoinsTab = <DepositsTab />;

  const bonusRewardTab = <BonusRewardTab />;

  return (
    <div className="">
      <h3 className="text-[#FFFFFF] heading-primary">
        Add Liquidity (<span className="text-red-300">Testnet</span>)
      </h3>

      <Stats />
      <div className="flex-wrap items-center gap-4 p-4 mt-5 mb-6 md:flex md:flex-nowrap bg-[#04131F] rounded-2xl lg:pl-6">
        <svg
          className="flex-shrink-0"
          width="100"
          height="100"
          viewBox="0 0 305 305"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M153 303C235.843 303 303 235.843 303 153C303 70.1573 235.843 3 153 3C70.1573 3 3 70.1573 3 153C3 235.843 70.1573 303 153 303ZM225.603 230.77C231.62 224.753 235 216.593 235 208.084C235 199.574 231.62 191.414 225.603 185.397C219.586 179.38 211.426 176 202.916 176C194.842 176.002 187.072 179.084 181.191 184.617L133.158 160.692C134.501 155.709 134.501 150.459 133.158 145.475L181.191 121.55C187.072 127.083 194.842 130.165 202.916 130.167C209.262 130.167 215.465 128.285 220.741 124.76C226.017 121.235 230.129 116.224 232.558 110.361C234.986 104.499 235.622 98.0479 234.383 91.8244C233.145 85.6009 230.089 79.8839 225.603 75.3973C221.116 70.9099 215.399 67.8542 209.176 66.6164C202.952 65.3785 196.501 66.0142 190.639 68.4424C184.776 70.8706 179.765 74.9829 176.24 80.2589C172.715 85.5348 170.833 91.7383 170.833 98.0836C170.84 100.652 171.18 103.21 171.841 105.692L123.808 129.617C117.927 124.084 110.157 121.002 102.083 121C93.5744 121 85.4135 124.38 79.3965 130.397C73.3802 136.414 70 144.574 70 153.084C70 161.593 73.3802 169.753 79.3965 175.77C85.4135 181.787 93.5744 185.167 102.083 185.167C110.157 185.165 117.927 182.083 123.808 176.55L171.841 200.475C171.18 202.958 170.84 205.514 170.833 208.084C170.833 216.593 174.213 224.753 180.23 230.77C186.246 236.786 194.407 240.167 202.916 240.167C211.426 240.167 219.586 236.786 225.603 230.77Z"
            fill="url(#paint0_linear_805_7803)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_805_7803"
              x1="153"
              y1="3"
              x2="153"
              y2="303"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2DD4BF" />
              <stop offset="1" stopColor="#7217F6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        <div>
          <h3 className="text-[28px] font-bold mt-4 md:mt-0">
            EVMs/nonEVMs Bridge
          </h3>
          <p className="mt-2 text-dark-100">
            Fast and secure stablecoin bridge, connecting liquidity on siloed
            blockchains, both EVM and non-EVM. Bridge liquidity pools are going
            live soon; provide liquidity and earn great yields.
            <a
              className="bg-clip-text bg-gradient-to-r ml-2 text-transparent from-[#4DFFDF] to-[#4DA1FF]"
              href="https://docs.ZKLiquid.io"
              target="_blank"
              rel="noreferrer"
            >
              Learn more about ZKLiquid liquidity protocol
            </a>
          </p>
        </div>
        <div className="flex-shrink-0 h-full p-4 mt-4 bg-gradient_custom rounded-xl md:mt-0">
          <p className="text-sm font-bold">Add Bridge Liquidity</p>
          <p className="mt-5 text-sm font-bold">
            Up to{" "}
            <span className="text-[#33ED8D] text-[34px] font-bold">26 .0%</span>
          </p>
        </div>
      </div>

      {islg ? (
        <>
          <div className={clsx("flex gap-4 pb-4")}>
            <div className="flex-1">{stableCoinsTab}</div>
            <div className="flex-none w-[272px]">{bonusRewardTab}</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4 mb-4">
            {[{ label: "Stable Coins" }, { label: "Bonus Reward" }].map(
              ({ label }, index) => {
                return (
                  <button
                    key={index}
                    className={clsx(
                      "text-primary-contrastText p-2 h-[44px] rounded-lg flex-1 font-bold text-sm",
                      tab === index ? "bg-primary" : "bg-paper"
                    )}
                    onClick={() => setTab(index)}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </div>
          {[<>{stableCoinsTab}</>, <>{bonusRewardTab}</>][tab]}
        </>
      )}
    </div>
  );
}

export default Liquidity;
