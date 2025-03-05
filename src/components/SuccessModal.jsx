import { CloseCircle } from "iconsax-react";
import React, { useRef, useEffect } from "react";

const SuccessModal = ({ onClose, hashUrl }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const BASE_CCIP_URL = "https://ccip.chain.link/msg";
  const handleCCIPOpen = () => {
    // window.open(`${BASE_CCIP_URL}/${hashUrl}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className=" w-full max-w-sm bg-white shadow-lg rounded-xl"
      >
        <button
          onClick={() => onClose()}
          className="w-full justify-end items-end flex p-1"
        >
          {" "}
          <CloseCircle size="32" color="#555555" />
        </button>
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <svg
              className="w-16 h-16 mx-auto text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="mt-5 text-xl font-bold text-gray-900">
              Transaction Submitted successfully
            </p>
            <p className="mt-3 text-sm font-medium text-gray-500">
              You can track the transfer status on LiquidsFi explorer
            </p>
            <div className="mt-8">
              <button
                onClick={handleCCIPOpen}
                type="button"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-indigo-600 transition-all duration-200 bg-indigo-100 border border-transparent rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-600"
              >
                Go to LiquidsFi explorer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
