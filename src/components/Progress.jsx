export default function Progress() {
	return (
		<div className="border rounded mt-6 p-4 border-neutral-900">
			<div className="flex gap-2 items-center mb-4">
				<span>Status:</span>
				<span>Fulfilled</span>
			</div>

			<progress value={100} max={100} className="w-full">
				100%
			</progress>
		</div>
	);
}
