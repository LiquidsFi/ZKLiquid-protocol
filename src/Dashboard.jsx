export default function DashboardStat() {
	return (
		<div>
			<div className="lg:col-span-9">
				<div className="flex items-center justify-between">
					<p className="flex-1 text-base font-bold text-gray-900">
						Latest Transactions
					</p>

					<div className="inline-flex items-center justify-end">
						<label
							htmlFor="sort"
							className="flex-shrink-0 text-sm font-medium text-gray-900"
						>
							{" "}
							Sort by:{" "}
						</label>
						<select
							id="sort"
							name="sort"
							className="block w-full py-2 pl-1 pr-10 text-base bg-transparent border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
						>
							<option>Recent</option>
						</select>
					</div>
				</div>

				<div className="flex flex-col mt-4">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden ring-1 ring-black ring-opacity-5 md:rounded-xl">
								<table className="min-w-full bg-white lg:divide-y lg:divide-gray-200">
									<thead className="hidden lg:table-header-group">
										<tr>
											<th className="py-3.5 px-4 text-left sm:px-6 text-sm whitespace-nowrap font-medium text-gray-500">
												<div className="flex items-center">
													Transaction Details
												</div>
											</th>

											<th className="py-3.5 px-4 text-left sm:px-6 text-sm whitespace-nowrap font-medium text-gray-500">
												<div className="flex items-center">TimeStamp</div>
											</th>

											<th className="py-3.5 px-4 text-left sm:px-6 text-sm whitespace-nowrap font-medium text-gray-500">
												<div className="flex items-center">Status</div>
											</th>
										</tr>
									</thead>

									<tbody className="divide-y divide-gray-200">
										<tr>
											<td className="px-4 py-4 text-sm font-bold text-gray-900 sm:px-6 whitespace-nowrap">
												<div className="inline-flex items-center">
													<img
														className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/3/clarity-landing-logo.png"
														alt=""
													/>
													100 USDT: Ethereum to Avalanche
												</div>
												<div className="space-y-1 lg:hidden pl-11">
													<p className="text-sm font-medium text-gray-500">
														#29345
													</p>
													<p className="text-sm font-medium text-gray-500">
														07 January, 2022
													</p>
												</div>
											</td>

											<td className="hidden px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 lg:table-cell whitespace-nowrap">
												07 January, 2022
											</td>

											<td className="hidden px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 lg:table-cell whitespace-nowrap">
												<div className="inline-flex items-center">
													<svg
														className="mr-1.5 h-2.5 w-2.5 text-green-500"
														fill="currentColor"
														viewBox="0 0 8 8"
													>
														<circle cx="4" cy="4" r="3" />
													</svg>
													Complete
												</div>
											</td>

											<td className="px-4 py-4 text-sm font-medium text-right text-gray-900 sm:px-6 whitespace-nowrap lg:hidden">
												<div className="mt-1 ">
													<div className="inline-flex items-center justify-end mt-1">
														<svg
															className="mr-1.5 h-2.5 w-2.5 text-green-500"
															fill="currentColor"
															viewBox="0 0 8 8"
														>
															<circle cx="4" cy="4" r="3" />
														</svg>
														Complete
													</div>
												</div>
											</td>
										</tr>

										<tr>
											<td className="px-4 py-4 text-sm font-bold text-gray-900 sm:px-6 whitespace-nowrap">
												<div className="inline-flex items-center">
													<img
														className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/3/clarity-ecommerce-logo.png"
														alt=""
													/>
													250 USDT: Ethereum to zkEVM
												</div>
												<div className="space-y-1 lg:hidden pl-11">
													<p className="text-sm font-medium text-gray-500">
														07 January, 2022
													</p>
												</div>
											</td>

											<td className="hidden px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 lg:table-cell whitespace-nowrap">
												06 January, 2022
											</td>

											<td className="hidden px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 lg:table-cell whitespace-nowrap ">
												<div className="inline-flex items-center">
													<svg
														className="mr-1.5 h-2.5 w-2.5 text-yellow-500"
														fill="currentColor"
														viewBox="0 0 8 8"
													>
														<circle cx="4" cy="4" r="3" />
													</svg>
													Pending
												</div>
												<div className="mt-1 lg:hidden">
													<div className="inline-flex items-center justify-end mt-1">
														<svg
															className="mr-1.5 h-2.5 w-2.5 text-yellow-500"
															fill="currentColor"
															viewBox="0 0 8 8"
														>
															<circle cx="4" cy="4" r="3" />
														</svg>
														Pending
													</div>
												</div>
											</td>

											<td className="px-4 py-4 text-sm font-medium text-right text-gray-900 sm:px-6 whitespace-nowrap lg:hidden">
												<div className="mt-1 ">
													<div className="inline-flex items-center justify-end mt-1">
														<svg
															className="mr-1.5 h-2.5 w-2.5 text-yellow-500"
															fill="currentColor"
															viewBox="0 0 8 8"
														>
															<circle cx="4" cy="4" r="3" />
														</svg>
														Pending
													</div>
												</div>
											</td>
										</tr>

										<tr>
											<td className="px-4 py-4 text-sm font-bold text-gray-900 sm:px-6 whitespace-nowrap">
												<div className="inline-flex items-center">
													<img
														className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full"
														src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/3/clarity-landing-logo.png"
														alt=""
													/>
													150 USDT: Ethereum to BNB Chain
												</div>
												<div className="space-y-1 lg:hidden pl-11">
													<p className="text-sm font-medium text-gray-500">
														#29345
													</p>
													<p className="text-sm font-medium text-gray-500">
														07 January, 2022
													</p>
												</div>
											</td>

											<td className="hidden px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 lg:table-cell whitespace-nowrap">
												05 January, 2022
											</td>

											<td className="hidden px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 lg:table-cell whitespace-nowrap">
												<div className="inline-flex items-center">
													<svg
														className="mr-1.5 h-2.5 w-2.5 text-gray-300"
														fill="currentColor"
														viewBox="0 0 8 8"
													>
														<circle cx="4" cy="4" r="3" />
													</svg>
													Canceled
												</div>
											</td>

											<td className="px-4 py-4 text-sm font-medium text-right text-gray-900 sm:px-6 whitespace-nowrap lg:hidden">
												<div className="mt-1 ">
													<div className="inline-flex items-center justify-end mt-1">
														<svg
															className="mr-1.5 h-2.5 w-2.5 text-gray-300"
															fill="currentColor"
															viewBox="0 0 8 8"
														>
															<circle cx="4" cy="4" r="3" />
														</svg>
														Canceled
													</div>
												</div>
											</td>
										</tr>
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
