"use client";

import { create } from "zustand";
import Peer from "peerjs";
import { openDB } from "idb";

// Create a Zustand store for managing connection state
const useConnectionStore = create((set, get) => ({
	// Connection state
	connectionMode: "checking", // 'checking' | 'online' | 'offline-individual' | 'mesh-network'
	peers: [],
	peerConnection: null,
	db: null,
	lastSyncTime: null,
	syncStatus: "idle", // 'idle' | 'syncing' | 'error'

	// Actions for managing connection state
	setConnectionMode: (mode) => set({ connectionMode: mode }),
	setPeers: (peers) => set({ peers }),
	setPeerConnection: (connection) => set({ peerConnection: connection }),
	setDB: (db) => set({ db }),
	setSyncStatus: (status) =>
		set({ syncStatus: status, lastSyncTime: new Date() }),
}));

// Initialize IndexedDB
async function initializeIndexedDB() {
	try {
		const db = await openDB("CommunityShield", 1, {
			upgrade(db) {
				// Create object stores for different data types
				if (!db.objectStoreNames.contains("resources")) {
					db.createObjectStore("resources", {
						keyPath: "id",
						autoIncrement: true,
					});
				}
				if (!db.objectStoreNames.contains("messages")) {
					db.createObjectStore("messages", {
						keyPath: "id",
						autoIncrement: true,
					});
				}
				if (!db.objectStoreNames.contains("skills")) {
					db.createObjectStore("skills", {
						keyPath: "id",
						autoIncrement: true,
					});
				}
			},
		});
		return db;
	} catch (error) {
		console.error("Failed to initialize IndexedDB:", error);
		return null;
	}
}

// Initialize PeerJS connection
async function initializePeerConnection() {
	return new Promise((resolve, reject) => {
		try {
			const peer = new Peer(undefined, {
				host: "/",
				port: "3001",
				path: "/peerjs",
				debug: 2,
			});

			peer.on("open", (id) => {
				console.log("Connected to PeerJS server with ID:", id);
				resolve(peer);
			});

			peer.on("error", (error) => {
				console.error("PeerJS connection error:", error);
				reject(error);
			});

			// Handle disconnection
			peer.on("disconnected", () => {
				console.log("Disconnected from PeerJS server");
				peer.reconnect();
			});
		} catch (error) {
			console.error("Failed to initialize PeerJS:", error);
			reject(error);
		}
	});
}

// Main hook for managing connections
const useConnection = () => {
	const connectionState = useConnectionStore();

	// Initialize all necessary connections and listeners
	const initialize = async () => {
		try {
			// Initialize IndexedDB
			const db = await initializeIndexedDB();
			connectionState.setDB(db);

			// Check online status
			const updateOnlineStatus = () => {
				const isOnline = navigator.onLine;
				const hasPeers = connectionState.peers.length > 0;

				if (isOnline) {
					connectionState.setConnectionMode("online");
				} else if (hasPeers) {
					connectionState.setConnectionMode("mesh-network");
				} else {
					connectionState.setConnectionMode("offline-individual");
				}
			};

			// Set up network status listeners
			window.addEventListener("online", updateOnlineStatus);
			window.addEventListener("offline", updateOnlineStatus);

			// Initialize PeerJS if offline
			if (!navigator.onLine) {
				try {
					const peer = await initializePeerConnection();
					connectionState.setPeerConnection(peer);

					// Handle incoming connections
					peer.on("connection", (conn) => {
						conn.on("open", () => {
							// Add new peer to the list
							const currentPeers = connectionState.peers;
							connectionState.setPeers([...currentPeers, conn]);

							// Handle data exchange
							conn.on("data", async (data) => {
								await handleIncomingData(data, connectionState.db);
							});
						});

						conn.on("close", () => {
							// Remove peer from list
							const currentPeers = connectionState.peers.filter(
								(p) => p.peer !== conn.peer,
							);
							connectionState.setPeers(currentPeers);
							updateOnlineStatus();
						});
					});
				} catch (error) {
					console.error("Failed to initialize peer connection:", error);
				}
			}

			// Initial status check
			updateOnlineStatus();
		} catch (error) {
			console.error("Failed to initialize connection management:", error);
		}
	};

	// Handle incoming data from peers
	const handleIncomingData = async (data, db) => {
		if (!db) return;

		try {
			connectionState.setSyncStatus("syncing");

			// Process different types of data
			switch (data.type) {
				case "resource":
					await db.put("resources", data.payload);
					break;
				case "message":
					await db.put("messages", data.payload);
					break;
				case "skill":
					await db.put("skills", data.payload);
					break;
				default:
					console.warn("Unknown data type received:", data.type);
			}

			connectionState.setSyncStatus("idle");
		} catch (error) {
			console.error("Error processing incoming data:", error);
			connectionState.setSyncStatus("error");
		}
	};

	// Send data to all connected peers
	const broadcastToPeers = (data) => {
		connectionState.peers.forEach((peer) => {
			try {
				peer.send(data);
			} catch (error) {
				console.error("Failed to send data to peer:", error);
			}
		});
	};

	// Connect to a specific peer
	const connectToPeer = async (peerId) => {
		if (!connectionState.peerConnection) return;

		try {
			const conn = connectionState.peerConnection.connect(peerId);

			conn.on("open", () => {
				const currentPeers = connectionState.peers;
				connectionState.setPeers([...currentPeers, conn]);
			});

			return conn;
		} catch (error) {
			console.error("Failed to connect to peer:", error);
			return null;
		}
	};

	// Clean up connections
	const cleanup = () => {
		if (connectionState.peerConnection) {
			connectionState.peerConnection.destroy();
		}
		connectionState.setPeerConnection(null);
		connectionState.setPeers([]);
	};

	return {
		// Connection state
		connectionMode: connectionState.connectionMode,
		peers: connectionState.peers,
		db: connectionState.db,
		syncStatus: connectionState.syncStatus,
		lastSyncTime: connectionState.lastSyncTime,

		// Actions
		initialize,
		cleanup,
		broadcastToPeers,
		connectToPeer,
	};
};

export default useConnection;
