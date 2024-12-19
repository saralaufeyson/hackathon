import Dexie from "dexie";

export async function initializeDB() {
	const db = new Dexie("CommunityShield");

	db.version(1).stores({
		resources: "++id, type, location, quantity, lastUpdated",
		skills: "++id, userId, skillType, experience, availability",
		knowledge: "++id, title, content, category, lastUpdated",
		messages: "++id, content, sender, timestamp, type",
	});

	await db.open();
	return db;
}
