import { useConnection } from "@/hooks/useConnection";

export function ConnectionStatus() {
	const { connectionMode, peers } = useConnection();

	// Determine status styling based on connection mode
	const getStatusConfig = () => {
		switch (connectionMode) {
			case "online":
				return {
					icon: <Wifi className="h-5 w-5 text-green-500" />,
					bgColor: "bg-green-100",
					textColor: "text-green-800",
					label: "Online",
				};
			case "mesh-network":
				return {
					icon: <Users className="h-5 w-5 text-blue-500" />,
					bgColor: "bg-blue-100",
					textColor: "text-blue-800",
					label: `Mesh Network (${peers.length} peers)`,
				};
			case "offline-individual":
				return {
					icon: <WifiOff className="h-5 w-5 text-yellow-500" />,
					bgColor: "bg-yellow-100",
					textColor: "text-yellow-800",
					label: "Offline Mode",
				};
			default:
				return {
					icon: <WifiOff className="h-5 w-5 text-gray-500" />,
					bgColor: "bg-gray-100",
					textColor: "text-gray-800",
					label: "Checking Connection...",
				};
		}
	};

	const status = getStatusConfig();

	return (
		<div className="border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-3">
					<div
						className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bgColor}`}
					>
						{status.icon}
						<span className={`text-sm font-medium ${status.textColor}`}>
							{status.label}
						</span>
					</div>

					{/* Additional connection details for mesh network */}
					{connectionMode === "mesh-network" && (
						<div className="text-sm text-gray-600">
							{peers.length} {peers.length === 1 ? "peer" : "peers"} connected
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
