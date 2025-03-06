import React, { useState } from "react";

export default function TransferStatus() {
  const [progress, setProgress] = useState(50);
  return (
    <div className="flex flex-col flex-1">
      <main>
        <div className="py-6">
          <div className="px-4 mx-auto sm:px-6 md:px-8">
            <div className="max-w-md">
              <h1 className="text-2xl font-bold text-white">Transfer Status</h1>
              <p className="mt-2 text-sm font-medium leading-6 text-gray-300">
                The transaction status for the following transfer is as follows:
              </p>
            </div>
          </div>

          <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
            <div className="w-full bg-gray-500 rounded-lg overflow-hidden">
              <div
                className="h-4 bg-gradient-to-r from-[#38c0a7] to-[#4186d5] transition-all duration-300 rounded-lg"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="mt-8 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-bold text-gray-200">
                  Overal Status:{" "}
                  <span className="text-[#38c0a7] text-xl">Fulfilled</span>
                </p>
              </div>
            </div>

            <hr className="mt-6 border-gray-400" />

            {/* <div className="mt-4 sm:flex sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-gray-400">
                Your next payment is{" "}
                <span className="font-bold">$59.00 USD</span>, to be charged on{" "}
                <span className="font-bold">April 08, 2022</span>
              </p>

              <p className="mt-2 text-sm font-medium text-gray-300 sm:mt-0">
                Your payment will be automatically renewed each month
              </p>
            </div> */}

            <div className="mt-8 bg-[#04131F]   rounded-xl">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-24 gap-y-8">
                  <div className="lg:col-span-2">
                    <p className="text-base font-bold text-gray-200">
                      Tranfer Details
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-300">
                      Your transfer details is as follows:
                    </p>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="space-y-5">
                      <div className="relative overflow-hidden  border border-gray-400/50 rounded-xl">
                        <div className="absolute top-4 right-4">
                          <svg
                            className="w-6 h-6 text-indigo-600 opacity-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>

                        <div className="relative px-4 py-5">
                          <div className="flex items-start">
                            <img
                              className="flex-shrink-0 w-auto h-6 rounded-md"
                              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/select-box/3/visa-logo.png"
                              alt=""
                            />

                            <div className="ml-4">
                              <p className="text-sm font-bold text-gray-400">
                                Visa ending 5442
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-300">
                                Expiry 08/2023
                              </p>

                              <div className="flex items-center mt-4 space-x-6">
                                <a
                                  href="#"
                                  title=""
                                  className="text-sm font-semibold text-gray-600 transition-all duration-200 rounded-md hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                >
                                  {" "}
                                  Set as Primary{" "}
                                </a>

                                <a
                                  href="#"
                                  title=""
                                  className="text-sm font-semibold text-indigo-600 transition-all duration-200 rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                  {" "}
                                  Edit{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative overflow-hidden border border-[#38c0a7]/50 rounded-xl ">
                        <div className="absolute top-4 right-4">
                          <svg
                            className="w-6 h-6 text-[#38c0a7]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>

                        <div className="relative px-4 py-5">
                          <div className="flex items-start">
                            <img
                              className="flex-shrink-0 w-auto h-6 rounded-md"
                              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/select-box/3/visa-logo.png"
                              alt=""
                            />

                            <div className="ml-4">
                              <p className="text-sm font-bold text-gray-200">
                                Visa ending 4331
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-300">
                                Expiry 09/2024
                              </p>

                              <div className="flex items-center mt-4 space-x-6">
                                <a
                                  href="#"
                                  title=""
                                  className="text-sm font-semibold text-gray-200 transition-all duration-200 rounded-md cursor-not-allowed pointer-events-none hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                >
                                  Primary Card
                                </a>

                                <a
                                  href="#"
                                  title=""
                                  className="text-sm font-semibold text-indigo-600 transition-all duration-200 rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                >
                                  {" "}
                                  Edit{" "}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center text-sm font-medium leading-5 text-gray-600 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:text-gray-400"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add New Payment Method
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                <p className="flex-1 font-bold text-white  text-xl">
                  Transfer Progress History
                </p>
              </div>

              <div className="mt-6 ring-1 ring-gray-400 bg-[#191A1F] rounded-2xl">
                <table className="min-w-full lg:divide-y lg:divide-gray-400">
                  <thead className="hidden lg:table-header-group">
                    <tr>
                      <td
                        width="50%"
                        className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-normal"
                      >
                        Invoice
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-normal">
                        Date
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-normal">
                        Amount
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-200 whitespace-normal">
                        Status
                      </td>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td
                        width="50%"
                        className="px-6 py-4 text-sm font-bold text-gray-400 whitespace-nowrap"
                      >
                        Standard Plan - Feb 2022
                        <div className="mt-1 lg:hidden">
                          <p className="font-medium text-gray-300">
                            07 February, 2022
                          </p>
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        07 February, 2022
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-right text-gray-400 lg:text-left whitespace-nowrap">
                        $59.00
                        <div className="flex items-center justify-end mt-1 font-medium lg:hidden">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Complete
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Complete
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        width="50%"
                        className="px-6 py-4 text-sm font-bold text-gray-400 whitespace-nowrap"
                      >
                        Standard Plan - Jan 2022
                        <div className="mt-1 lg:hidden">
                          <p className="font-medium text-gray-300">
                            09 January, 2022
                          </p>
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        09 January, 2022
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-right text-gray-400 lg:text-left whitespace-nowrap">
                        $59.00
                        <div className="flex items-center justify-end mt-1 font-medium lg:hidden">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Canceled
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Canceled
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        width="50%"
                        className="px-6 py-4 text-sm font-bold text-gray-400 whitespace-nowrap"
                      >
                        Basic Plan - Dec 2021
                        <div className="mt-1 lg:hidden">
                          <p className="font-medium text-gray-300">
                            15 December, 2021
                          </p>
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        15 December, 2021
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-right text-gray-400 lg:text-left whitespace-nowrap">
                        $29.00
                        <div className="flex items-center justify-end mt-1 font-medium lg:hidden">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Complete
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Complete
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        width="50%"
                        className="px-6 py-4 text-sm font-bold text-gray-400 whitespace-nowrap"
                      >
                        Basic Plan - Nov 2021
                        <div className="mt-1 lg:hidden">
                          <p className="font-medium text-gray-300">
                            14 November, 2021
                          </p>
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        14 November, 2021
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-right text-gray-400 lg:text-left whitespace-nowrap">
                        $29.00
                        <div className="flex items-center justify-end mt-1 font-medium lg:hidden">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Pending
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Pending
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        width="50%"
                        className="px-6 py-4 text-sm font-bold text-gray-400 whitespace-nowrap"
                      >
                        Basic Plan - Oct 2021
                        <div className="mt-1 lg:hidden">
                          <p className="font-medium text-gray-300">
                            15 October, 2021
                          </p>
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        15 October, 2021
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-right text-gray-400 lg:text-left whitespace-nowrap">
                        $29.00
                        <div className="flex items-center justify-end mt-1 font-medium lg:hidden">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Complete
                        </div>
                      </td>

                      <td className="hidden px-6 py-4 text-sm font-medium text-gray-400 lg:table-cell whitespace-nowrap">
                        <div className="inline-flex items-center">
                          <svg
                            className="mr-1.5 h-2.5 w-2.5 text-green-500"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3"></circle>
                          </svg>
                          Complete
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
