import Peer from "peerjs";

export async function setupPeerConnection() {
	const peer = new Peer(undefined, {
		host: "/",
		port: "3001",
		path: "/peerjs",
	});

	return new Promise((resolve, reject) => {
		peer.on("open", (id) => {
			console.log("My peer ID is: " + id);
			resolve(peer);
		});

		peer.on("error", (error) => {
			console.error("PeerJS connection error:", error);
			reject(error);
		});

		// Handle incoming connections
		peer.on("connection", (conn) => {
			conn.on("data", (data) => {
				// Handle incoming data
				console.log("Received data:", data);
			});
		});
	});
}
