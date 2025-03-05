export default function Progress() {
	return (
		<div className="border rounded mt-6 p-4 border-neutral-800">
			<div className="flex gap-2 items-center mb-4">
				<span>Status:</span>
				<span>Fulfilled</span>
			</div>

			<progress
				value={100}
				max={100}
				className="w-full h-2 [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-green-400"
			>
				100%
			</progress>
		</div>
	);
}
