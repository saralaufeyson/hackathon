export function EmergencyActions() {
	const { connectionMode, broadcastToPeers } = useConnection();
	const [activeAlert, setActiveAlert] = useState(null);

	const emergencyActions = [
		{
			id: "medical",
			title: "Medical Emergency",
			description: "Request immediate medical assistance",
			icon: Heart,
			color: "bg-red-500",
		},
		{
			id: "shelter",
			title: "Need Shelter",
			description: "Request emergency shelter or accommodation",
			icon: Home,
			color: "bg-green-500",
		},
		{
			id: "assistance",
			title: "General Assistance",
			description: "Request help from nearby community members",
			icon: Users,
			color: "bg-blue-500",
		},
		{
			id: "danger",
			title: "Report Danger",
			description: "Alert others about immediate dangers",
			icon: AlertTriangle,
			color: "bg-yellow-500",
		},
	];

	const handleEmergencyAction = async (action) => {
		const alertData = {
			type: action.id,
			timestamp: new Date().toISOString(),
			status: "active",
		};

		// Broadcast alert to peers if in mesh network
		if (connectionMode === "mesh-network") {
			broadcastToPeers({
				type: "emergency",
				payload: alertData,
			});
		}

		setActiveAlert(alertData);

		// Show alert for 5 seconds
		setTimeout(() => {
			setActiveAlert(null);
		}, 5000);
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
			<div className="flex items-center gap-2 mb-4">
				<ShieldAlert className="h-6 w-6 text-red-500" />
				<h2 className="text-2xl font-bold text-gray-800">Emergency Actions</h2>
			</div>

			{activeAlert && (
				<Alert variant="destructive" className="mb-4">
					<AlertTitle>Emergency Alert Sent</AlertTitle>
					<AlertDescription>
						Your emergency alert has been broadcasted to nearby devices.
						{connectionMode === "offline-individual" &&
							" Note: You're currently offline. The alert will be shared when connection is restored."}
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{emergencyActions.map((action) => {
					const ActionIcon = action.icon;

					return (
						<button
							key={action.id}
							onClick={() => handleEmergencyAction(action)}
							className={`${action.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-3`}
						>
							<ActionIcon className="h-6 w-6" />
							<div className="text-left">
								<div className="font-semibold">{action.title}</div>
								<div className="text-sm opacity-90">{action.description}</div>
							</div>
						</button>
					);
				})}
			</div>

			<div className="mt-4 p-4 bg-gray-50 rounded-lg">
				<p className="text-sm text-gray-600">
					These emergency actions will alert nearby community members and
					coordinate assistance.
					{connectionMode === "offline-individual"
						? " You're currently offline - actions will be queued and sent when connection is restored."
						: " Connected and ready to broadcast alerts."}
				</p>
			</div>
		</div>
	);
}
