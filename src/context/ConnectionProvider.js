"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { initializeDB } from "@/lib/indexedDB";
import { setupPeerConnection } from "@/lib/webRTC";
import { registerServiceWorker } from "@/lib/serviceWorker";

const ConnectionContext = createContext();

export function ConnectionProvider({ children }) {
	const [connectionMode, setConnectionMode] = useState("online");
	const [peers, setPeers] = useState([]);
	const [db, setDB] = useState(null);
	const [peerConnection, setPeerConnection] = useState(null);

	useEffect(() => {
		const setup = async () => {
			// Initialize IndexedDB
			const database = await initializeDB();
			setDB(database);

			// Register Service Worker
			await registerServiceWorker();

			// Setup WebRTC/PeerJS connection
			const peer = await setupPeerConnection();
			setPeerConnection(peer);

			// Monitor connection status
			const updateConnectionStatus = () => {
				if (navigator.onLine) {
					setConnectionMode("online");
				} else if (peers.length > 0) {
					setConnectionMode("mesh-network");
				} else {
					setConnectionMode("offline-individual");
				}
			};

			window.addEventListener("online", updateConnectionStatus);
			window.addEventListener("offline", updateConnectionStatus);

			return () => {
				window.removeEventListener("online", updateConnectionStatus);
				window.removeEventListener("offline", updateConnectionStatus);
			};
		};

		setup();
	}, []);

	return (
		<ConnectionContext.Provider
			value={{
				connectionMode,
				peers,
				setPeers,
				db,
				peerConnection,
			}}
		>
			{children}
		</ConnectionContext.Provider>
	);
}

export const useConnection = () => {
	const context = useContext(ConnectionContext);
	if (!context) {
		throw new Error("useConnection must be used within ConnectionProvider");
	}
	return context;
};
