// src/utils/imageStore.js

const DB_NAME = "miaminou-db";
const DB_VERSION = 1;
const STORE = "images";

function openDb() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(STORE)) {
				db.createObjectStore(STORE); // key = string, value = Blob
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function putImageBlob(id, blob) {
	const db = await openDb();

	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		const store = tx.objectStore(STORE);

		store.put(blob, id);

		tx.oncomplete = () => resolve(true);
		tx.onerror = () => reject(tx.error);
		tx.onabort = () => reject(tx.error);
	});
}

export async function getImageBlob(id) {
	if (!id) return null;

	const db = await openDb();

	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readonly");
		const store = tx.objectStore(STORE);

		const req = store.get(id);

		req.onsuccess = () => resolve(req.result ?? null);
		req.onerror = () => reject(req.error);
	});
}

export async function deleteImageBlob(id) {
	if (!id) return;

	const db = await openDb();

	return new Promise((resolve, reject) => {
		const tx = db.transaction(STORE, "readwrite");
		const store = tx.objectStore(STORE);

		store.delete(id);

		tx.oncomplete = () => resolve(true);
		tx.onerror = () => reject(tx.error);
		tx.onabort = () => reject(tx.error);
	});
}
