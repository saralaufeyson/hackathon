import { ResourceMap } from "@/components/ResourceMap";
import { EmergencyActions } from "@/components/EmergencyActions";

export default function Home() {
	return (
		<div className="space-y-8">
			<section className="bg-white rounded-lg shadow-xl p-6">
				<h1 className="text-4xl font-bold mb-4">
					Community Emergency Response
				</h1>
				<p className="text-gray-600 text-lg">
					Access critical resources, connect with skilled volunteers, and stay
					informed during emergencies - even without internet connectivity.
				</p>
			</section>
			<ResourceMap />
			<EmergencyActions />
		</div>
	);
}
