import Dexie from 'dexie';

export const db = new Dexie('TravelSnapDB');

db.version(1).stores({
  entries: '++id, title, description, date, latitude, longitude, placeName, photo, createdAt, updatedAt',
});

export async function createEntry(entry) {
  const now = new Date().toISOString();
  return await db.entries.add({
    ...entry,
    createdAt: now,
    updatedAt: now,
  });
}

export async function getAllEntries() {
  return await db.entries.orderBy('createdAt').reverse().toArray();
}

export async function getEntryById(id) {
  return await db.entries.get(Number(id));
}

export async function updateEntry(id, updates) {
  return await db.entries.update(Number(id), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteEntry(id) {
  return await db.entries.delete(Number(id));
}
