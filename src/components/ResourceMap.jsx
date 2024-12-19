import React, { useState, useEffect } from "react";
import { useConnection } from "@/hooks/useConnection";
import {
	MapPin,
	Plus,
	AlertTriangle,
	Package,
	Heart,
	Home,
	Droplets,
	Users,
	ShieldAlert,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// ResourceMap Component
export function ResourceMap() {
	const { connectionMode, db, broadcastToPeers } = useConnection();
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showAddResource, setShowAddResource] = useState(false);
	const [newResource, setNewResource] = useState({
		type: "supplies",
		details: "",
		quantity: "",
		location: "",
	});

	// Fetch resources from IndexedDB or server based on connection mode
	useEffect(() => {
		const fetchResources = async () => {
			try {
				if (connectionMode === "online") {
					// In a real app, you'd fetch from your API here
					const response = await fetch("/api/resources");
					const data = await response.json();
					setResources(data);
				} else if (db) {
					// Fetch from IndexedDB when offline
					const storedResources = await db.getAll("resources");
					setResources(storedResources);
				}
			} catch (error) {
				console.error("Error fetching resources:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchResources();
	}, [connectionMode, db]);

	// Add new resource handler
	const handleAddResource = async (e) => {
		e.preventDefault();

		const resourceData = {
			...newResource,
			timestamp: new Date().toISOString(),
			status: "available",
		};

		try {
			// Save to IndexedDB
			if (db) {
				await db.add("resources", resourceData);
			}

			// Broadcast to peers if in mesh network
			if (connectionMode === "mesh-network") {
				broadcastToPeers({
					type: "resource",
					payload: resourceData,
				});
			}

			// Update local state
			setResources([...resources, resourceData]);
			setShowAddResource(false);
			setNewResource({
				type: "supplies",
				details: "",
				quantity: "",
				location: "",
			});
		} catch (error) {
			console.error("Error adding resource:", error);
		}
	};

	const resourceTypes = {
		supplies: { icon: Package, color: "text-blue-500" },
		medical: { icon: Heart, color: "text-red-500" },
		shelter: { icon: Home, color: "text-green-500" },
		water: { icon: Droplets, color: "text-cyan-500" },
	};

	return (
		<div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold text-gray-800">
					Available Resources
				</h2>
				<button
					onClick={() => setShowAddResource(true)}
					className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
				>
					<Plus className="h-5 w-5" />
					Add Resource
				</button>
			</div>

			{showAddResource && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg p-6 w-full max-w-md">
						<h3 className="text-xl font-bold mb-4">Add New Resource</h3>
						<form onSubmit={handleAddResource} className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Type
								</label>
								<select
									value={newResource.type}
									onChange={(e) =>
										setNewResource({ ...newResource, type: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
								>
									<option value="supplies">Supplies</option>
									<option value="medical">Medical</option>
									<option value="shelter">Shelter</option>
									<option value="water">Water</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Details
								</label>
								<input
									type="text"
									value={newResource.details}
									onChange={(e) =>
										setNewResource({ ...newResource, details: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Quantity
								</label>
								<input
									type="text"
									value={newResource.quantity}
									onChange={(e) =>
										setNewResource({ ...newResource, quantity: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Location
								</label>
								<input
									type="text"
									value={newResource.location}
									onChange={(e) =>
										setNewResource({ ...newResource, location: e.target.value })
									}
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									required
								/>
							</div>

							<div className="flex justify-end gap-2">
								<button
									type="button"
									onClick={() => setShowAddResource(false)}
									className="px-4 py-2 text-gray-600 hover:text-gray-800"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
								>
									Add Resource
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{loading ? (
				<div className="text-center py-4">Loading resources...</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{resources.map((resource, index) => {
						const ResourceIcon = resourceTypes[resource.type]?.icon || Package;
						const iconColor =
							resourceTypes[resource.type]?.color || "text-gray-500";

						return (
							<div
								key={index}
								className="border rounded-lg p-4 hover:shadow-md transition-shadow"
							>
								<div className="flex items-start gap-3">
									<ResourceIcon className={`h-6 w-6 ${iconColor}`} />
									<div className="flex-1">
										<h3 className="font-semibold text-gray-800">
											{resource.details}
										</h3>
										<p className="text-sm text-gray-600">
											Quantity: {resource.quantity}
										</p>
										<div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
											<MapPin className="h-4 w-4" />
											{resource.location}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
