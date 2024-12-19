// import { ResourceMap } from "@/components/ResourceMap";
// import { EmergencyActions } from "@/components/EmergencyActions";

import HotspotPage from "@/components/HotspotPage";
import MapPage from "@/components/MapPage";
import SkillsMap from "@/components/ui/SkillsMap";

export default function Home() {

	return (
		<div className="space-y-8s">
			<section className="bg-white rounded-lg shadow-xl p-6">
				<SkillsMap />
				<HotspotPage />
				<MapPage />
			</section>
			{/* <ResourceMap /> */}
			{/* <EmergencyActions /> */}
		</div>
	);
}
