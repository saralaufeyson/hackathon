"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { Card } from "../components/ui/card";

// Rest of the code stays exactly the same, starting from disasterData array...
const disasterData = [
	{
		id: 1,
		title: "Earthquake",
		description:
			"Seismic activity causing ground shaking and potential structural damage",
		color: "bg-red-500",
		guidelines: [
			"Drop to the ground and take cover under a sturdy desk or table",
			"Stay away from windows, bookcases, and other heavy objects",
			"If indoors, stay inside. If outdoors, stay in open areas",
			"After shaking stops, exit building if safe and move to open space",
			"Be prepared for aftershocks",
			"Keep emergency kit ready with water, food, and first aid supplies",
			"Monitor local news and follow emergency instructions",
		],
	},
	{
		id: 2,
		title: "Flood",
		description: "Overflow of water that submerges land that is usually dry",
		color: "bg-blue-500",
		guidelines: [
			"Move to higher ground immediately",
			"Don't walk or drive through flood waters",
			"Follow evacuation orders promptly",
			"Turn off utilities at main switches if instructed",
			"Disconnect electrical appliances",
			"Prepare emergency supplies including drinking water",
			"Monitor weather updates and emergency broadcasts",
		],
	},
	{
		id: 3,
		title: "Hurricane",
		description: "Tropical cyclone with strong winds and heavy rainfall",
		color: "bg-purple-500",
		guidelines: [
			"Board up windows and secure outdoor objects",
			"Prepare an emergency kit with supplies for at least 3 days",
			"Follow evacuation orders immediately",
			"Stay indoors during the hurricane",
			"Keep away from windows and glass doors",
			"Fill vehicles with fuel and get cash before the storm",
			"Keep important documents in a waterproof container",
		],
	},
	{
		id: 4,
		title: "Avalanche",
		description: "A mass of snow, ice, and debris moving down a slope",
		color: "bg-sky-700",
		guidelines: [
			"Watch for signs of unstable snow conditions",
			"Carry avalanche safety equipment (beacon, probe, shovel)",
			"Avoid traveling alone in avalanche terrain",
			"If caught, try to 'swim' to stay on top of the snow",
			"Create an air pocket in front of your face if buried",
			"Stay calm to conserve oxygen if trapped",
			"Make noise to help rescuers locate you",
		],
	},
	{
		id: 5,
		title: "Wildfire",
		description: "Uncontrolled fire that burns in wildland vegetation",
		color: "bg-orange-500",
		guidelines: [
			"Evacuate immediately when ordered",
			"Close all windows and doors to prevent sparks",
			"Remove flammable materials from around the house",
			"Keep emergency supplies ready",
			"Wear protective clothing and face masks",
			"Stay tuned to emergency alerts and warnings",
			"Have an evacuation plan and follow it quickly",
		],
	},
];

const DisasterCard = ({ disaster, onClick }) => (
	<Card
		className={`w-64 h-64 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${disaster.color} flex items-center justify-center`}
		onClick={() => onClick(disaster)}
	>
		<h3 className="text-2xl font-bold text-white text-center px-4">
			{disaster.title}
		</h3>
	</Card>
);

const DisasterDetail = ({ disaster, onClose }) => (
	<div className="fixed inset-0 bg-white z-50 overflow-auto">
		<div className="max-w-4xl mx-auto p-8">
			<button
				onClick={onClose}
				className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
			>
				<X className="w-6 h-6" />
			</button>

			<div className="mt-8">
				<div className={`${disaster.color} w-full p-8 rounded-lg mb-6`}>
					<h2 className="text-4xl font-bold text-white">{disaster.title}</h2>
				</div>

				<div className="space-y-6">
					<div>
						<h3 className="text-2xl font-semibold mb-4">What is it?</h3>
						<p className="text-gray-700 text-lg">{disaster.description}</p>
					</div>

					<div className="bg-gray-50 p-6 rounded-lg">
						<h3 className="text-2xl font-semibold mb-4">Safety Guidelines</h3>
						<ul className="space-y-3">
							{disaster.guidelines.map((guideline, index) => (
								<li key={index} className="flex items-start">
									<span
										className={`${disaster.color} text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3`}
									>
										{index + 1}
									</span>
									<span className="text-gray-700">{guideline}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const Hero = () => {
	const [selectedDisaster, setSelectedDisaster] = useState(null);

	const handleCardClick = (disaster) => {
		setSelectedDisaster(disaster);
	};

	const handleClose = () => {
		setSelectedDisaster(null);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold text-center mb-12">
					Natural Disasters Information
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
					{disasterData.map((disaster) => (
						<DisasterCard
							key={disaster.id}
							disaster={disaster}
							onClick={handleCardClick}
						/>
					))}
				</div>

				{selectedDisaster && (
					<DisasterDetail disaster={selectedDisaster} onClose={handleClose} />
				)}
			</div>
		</div>
	);
};

export default Hero;
