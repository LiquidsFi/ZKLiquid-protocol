import React, { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

const SelectAssetDropdown = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const selectedOption =
    options.find((option) => option.value === value) || options[0];

  return (
    <>
      <label className="block font-display text-[15.5px] leading-[20px] font-medium text-[#6D7A86]">
        {label}
      </label>
      <div ref={divEl} className="w-full mt-2 relative">
        <div
          className="flex justify-between items-center cursor-pointer bg-[#212228] text-[#6D7A86] font-display font-medium text-[19px] leading-[27px] px-4 h-[48px] rounded-[10.96px] shadow-sm border border-[#1A1C22] focus:outline-none w-full"
          onClick={handleClick}
        >
          <div className="flex items-center gap-2 font-display text-[15.5px] leading-[20px] font-medium text-[#6D7A86]">
            {selectedOption.icon}
            {selectedOption.label}
          </div>
          <GoChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          className={`absolute top-full z-50 p-3 shadow bg-[#212228] text-[#6D7A86] border border-[#1A1C22] rounded-[10.96px] w-full transition-[opacity,transform] duration-300 ease-in-out transform ${
            isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`}
          style={{ transformOrigin: "top" }}
        >
          {options.map((option) => (
            <div
              className="hover:bg-dark-400 rounded cursor-pointer p-1 flex items-center gap-2 font-display"
              onClick={() => handleOptionClick(option)}
              key={option.value}
            >
              {option.icon}
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectAssetDropdown;
