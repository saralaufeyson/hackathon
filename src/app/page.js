import { ResourceMap } from "@/components/ResourceMap";
import { EmergencyActions } from "@/components/EmergencyActions";
import {Hero} from "@/components/ui/Hero";


export default function Home() {
	return (
		<div className="space-y-8">
			<section className="bg-white rounded-lg shadow-xl p-6">
				<h1 className="text-4xl font-bold mb-4">
					Community Sheild -Hyper local disaster network
				</h1>
				<p className="text-gray-600 text-lg">
					Access critical resources, connect with skilled volunteers, and stay
					informed during emergencies - even without internet connectivity.All you need is Bluetooth connectivity or a wifi direct
				</p>
			</section>
			<Hero />
			<ResourceMap />
			<EmergencyActions />

		</div>
	);
}
