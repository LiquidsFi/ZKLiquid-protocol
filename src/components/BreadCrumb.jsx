import { Link } from "react-router-dom";

export default function BreadCrumb({ id }) {
	return (
		<div className="flex gap-2 text-sm">
			<Link to="/bridge" className="text-[#6D7A86] hover:text-white">
				Go Back
			</Link>
			<span>/</span>
			<span className="text-[#6D7A86] hover:text-white">Transfers</span>
			<span>/</span>
			<span>{id}</span>
		</div>
	);
}
