import { ArrowRight } from "iconsax-react";
import USDT from "../assets/svg/usdt.svg";
import { Link } from "react-router-dom";

const BASE_URLS = {
	1200: "https://stellar.expert/explorer/public/tx",
	56: "https://bscscan.com/tx",
	1: "https://etherscan.io/tx",
};

const handleCCIPOpen = (tx) => {
	window.open(`${BASE_URLS[tx?.from]}/${tx?.id}`, "_blank");
};

export default function TransactionHistory({ transactionData }) {
	return (
		<div>
			<div className="lg:col-span-9 px-3 md:px-0">
				<div className="flex flex-col mt-4">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-xl">
								<table className="min-w-full  lg:divide-y lg:divide-gray-600">
									<thead className="hidden 2xl:table-header-group">
										<tr>
											<th className="py-3.5 px-4 text-left sm:px-6 text-sm whitespace-nowrap font-medium text-gray-200">
												<div className="flex items-center">
													Transaction Details
												</div>
											</th>

											<th className="py-3.5 px-4 text-left sm:px-6 text-sm whitespace-nowrap font-medium text-gray-200">
												<div className="flex items-center">TimeStamp</div>
											</th>

											<th className="py-3.5 px-4 text-left sm:px-6 text-sm whitespace-nowrap font-medium text-gray-200">
												<div className="flex items-center">Status</div>
											</th>
										</tr>
									</thead>

									<tbody className="divide-y divide-gray-600">
										{[...transactionData]
											.reverse()
											.map((transaction, index) => (
												<tr
													key={index}
													className="cursor-pointer hover:bg-[#202026]"
													onClick={() => handleCCIPOpen(transaction)}
												>
													<Link to={`/transfers/${transaction.id}`}>
														<td className="px-4 py-4 text-sm font-bold text-gray-200 sm:px-6 whitespace-nowrap">
															<div className="inline-flex items-center">
																<img
																	className="flex-shrink-0 object-cover w-7 h-7 mr-3 rounded-full"
																	src={`/cryptoIcons/${transaction.name}.svg`}
																	alt=""
																/>
																<div className="flex w-[100px]">{`${transaction.amount} ${transaction.name}: `}</div>

																<img
																	className="ml-2 flex-shrink-0 object-cover w-7 h-7 mr-3 rounded-full"
																	src={`/cryptoIcons/${transaction.from}.svg`}
																	alt=""
																/>
																<ArrowRight size="24" color="#37d67a" />
																<img
																	className="ml-2 flex-shrink-0 object-cover w-7 h-7 mr-3 rounded-full"
																	src={`/cryptoIcons/${transaction.to}.svg`}
																	alt=""
																/>
															</div>
															<div className="space-y-1 2xl:hidden pl-11">
																<p className="text-sm font-medium text-gray-200">
																	{transaction.time}
																</p>
															</div>
														</td>

														<td className="hidden px-4 py-4 text-sm font-medium text-gray-200 sm:px-6 2xl:table-cell whitespace-nowrap">
															{transaction.time}
														</td>

														<td className="hidden px-4 py-4 text-sm font-medium text-gray-200 sm:px-6 2xl:table-cell whitespace-nowrap">
															<div className="inline-flex items-center">
																<svg
																	className="mr-1.5 h-2.5 w-2.5 text-green-500"
																	fill="currentColor"
																	viewBox="0 0 8 8"
																>
																	<circle cx="4" cy="4" r="3" />
																</svg>
																Submitted
															</div>
														</td>

														<td className="px-4 py-4 text-sm font-medium text-right text-gray-200 sm:px-6 whitespace-nowrap 2xl:hidden">
															<div className="mt-1 ">
																<div className="inline-flex items-center justify-end mt-1">
																	<svg
																		className="mr-1.5 h-2.5 w-2.5 text-green-500"
																		fill="currentColor"
																		viewBox="0 0 8 8"
																	>
																		<circle cx="4" cy="4" r="3" />
																	</svg>
																	Submitted
																</div>
															</div>
														</td>
													</Link>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
