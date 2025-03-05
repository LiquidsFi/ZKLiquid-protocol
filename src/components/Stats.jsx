import { useState, useEffect } from "react";
import clsx from "clsx";

import Bridges from "@/assets/svg/bridge.svg";
import Numbers from "@/assets/svg/number.svg";
import Users from "@/assets/svg/users.svg";

function Stats() {
  const [totalRes, setTotalRes] = useState(0);

  const [usdtBalance, setUsdtBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const totalBalance = Number(usdtBalance) + Number(usdcBalance);

  return (
    <>
      <div className="flex flex-shrink-0 gap-4 mt-8 overflow-auto scroll-track-hide">
        <div className="inline-flex items-center w-full min-w-[272px] gap-3 bg-[#04131F] rounded-xl p-3">
          {/* <img src={bridges} alt="" /> */}
          <Bridges />
          <div>
            <p className="text-[#6D7A86] text-sm font-medium">
              Bridge TVL (USD)
            </p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-base font-semibold leading-5">
                ${totalBalance || 596}
              </p>
              <p className="text-xs text-[#34D399] font-bold">7d : 0</p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center w-full min-w-[272px] gap-3 bg-[#04131F]  rounded-xl p-3">
          {/* <img src={bridges} alt="" /> */}
          <Bridges />
          <div>
            <p className="text-[#6D7A86] text-sm font-medium">Bridge APR</p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-base font-semibold leading-5">$0</p>
              <p className="text-xs text-[#34D399] font-bold">7d: 0</p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center w-full min-w-[272px] gap-3 bg-[#04131F]  rounded-xl p-3">
          {/* <img src={numbers} alt="" /> */}
          <Numbers />
          <div>
            <p className="text-[#6D7A86] text-sm font-medium">
              Number of Chains Integrated
            </p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-base font-semibold leading-5">{3}</p>
              <p className="text-xs text-[#34D399] font-bold">
                7d: 0
                {/* {statsInfo.dexesNumber7days > 0
                    ? `+${statsInfo.dexesNumber7days}`
                    : `${statsInfo.dexesNumber7days}`} */}
              </p>
            </div>
          </div>
        </div>

        <div className="inline-flex items-center w-full min-w-[272px] gap-3 bg-[#04131F]  rounded-xl p-3">
          {/* <img src={users} alt="" /> */}
          <Users />
          <div>
            <p className="text-[#6D7A86] text-sm font-medium">
              Number of Users
            </p>
            <div className="flex items-end gap-2 mt-1">
              <p className="text-base font-semibold leading-5">
                {totalRes || 9}
              </p>
              <p className="text-xs text-[#34D399] font-bold">
                7d: 0
                {/* {statsInfo.uniqueAddresses7days > 0
                    ? `+${statsInfo.uniqueAddresses7days}`
                    : `${statsInfo.uniqueAddresses7days}`} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
