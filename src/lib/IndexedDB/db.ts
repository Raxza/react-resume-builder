import { DBResponse } from '../../types/DBResponse';

let db: IDBDatabase;
let version = 1;
let dbReady: Promise<boolean>;

export const initDB = (): Promise<boolean> => {
  if (dbReady) return dbReady;

  dbReady = new Promise((resolve) => {
    const request = indexedDB.open('myDB', version);

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains(Stores.Resume)) {
        console.log('Creating resume store');
        const resumeStore = db.createObjectStore(Stores.Resume, { keyPath: 'id', autoIncrement: true });
        resumeStore.createIndex('currentVersion', 'currentVersion', { unique: false });
      }

      if (!db.objectStoreNames.contains(Stores.ResumeVersion)) {
        console.log('Creating resume versions store');
        const versionStore = db.createObjectStore(Stores.ResumeVersion, { keyPath: 'id', autoIncrement: true });
        versionStore.createIndex('resumeId', 'resumeId', { unique: false });
        versionStore.createIndex('version', 'version', { unique: false });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log('Database initialized', version);
      resolve(true);
    };

    request.onerror = () => {
      console.error('Failed to open database');
      resolve(false);
    };
  });

  return dbReady;
};

const getDB = async (): Promise<IDBDatabase> => {
  await initDB();
  return db;
};

export const addData = async <T>(storeName: string, data: T): Promise<DBResponse<T>> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve({ status: 'success', data });
      request.onerror = () => {
        const error = request.error?.message || 'Unknown error';
        resolve({ status: 'error', data: error });
      };
    });
  } catch (_error) {
    console.log(`addData failed ${_error}`)
    return { status: 'error', data: 'Failed to connect to database' };
  }
};

export const getAllData = async <T>(storeName: string): Promise<DBResponse<T[]>> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve({ status: 'success', data: request.result });
      request.onerror = () => resolve({ status: 'error', data: [] });
    });
  } catch (_error) {
    console.log(`getAllData failed ${_error}`);
    return { status: 'error', data: [] };
  }
};

export const getDataById = async <T>(storeName: string, id: number): Promise<DBResponse<T>> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve({ status: 'success', data: request.result });
      request.onerror = () => resolve({ status: 'error', data: 'unknown error' });
    });
  } catch (_error) {
    console.log(`getDataById failed ${_error}`);
    return { status: 'error', data: 'Failed to connect to database' };
  }
};

export const updateData = async <T>(storeName: string, data: T): Promise<DBResponse<T>> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve({ status: 'success', data });
      request.onerror = () => {
        const error = request.error?.message || 'Unknown error';
        resolve({ status: 'error', data: error });
      };
    });
  } catch (_error) {
    console.log(`updateData failed ${_error}`);
    return { status: 'error', data: 'Failed to connect to database' };
  }
};

export const deleteData = async (storeName: string, id: number): Promise<DBResponse<null>> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve({ status: 'success', data: null });
      request.onerror = () => resolve({ status: 'error', data: null });
    });
  } catch (_error) {
    console.log(`deleteData failed ${_error}`);
    return { status: 'error', data: null };
  }
};

export const getVersionsByResumeId = async <T>(resumeId: number): Promise<DBResponse<T[]>> => {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(Stores.ResumeVersion, 'readonly');
      const store = tx.objectStore(Stores.ResumeVersion);
      const index = store.index('resumeId');
      const request = index.getAll(resumeId);

      request.onsuccess = () => resolve({ status: 'success', data: request.result });
      request.onerror = () => resolve({ status: 'error', data: [] });
    });
  } catch (_error) {
    console.log(`getVersionsByResumeId failed ${_error}`);
    return { status: 'error', data: [] };
  }
};

export enum Stores { 
  Resume = 'Resume',
  Users = 'Users',
  ResumeOtherType = 'ResumeOtherType',
  DegreeType = 'DegreeType',
  ResumeVersion = 'ResumeVersion'
}