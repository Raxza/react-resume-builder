import { DBResponse } from '../../types/DBResponse';

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('myDB');

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Resume)) {
        console.log('Creating resume store');
        db.createObjectStore(Stores.Resume, { keyPath: 'id', autoIncrement: true });
      }
      // no need to resolve here
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(storeName: string, data: T): Promise<DBResponse<T>> => {
  return new Promise((resolve) => {
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const addRequest = store.add(data);

      addRequest.onsuccess = () => {
        resolve({ status: 'success', data });
      };

      addRequest.onerror = () => {
        const error = addRequest.error?.message || 'Unknown error';
        resolve({ status: 'error', data: error });
      };
    };

    request.onerror = () => {
      const error = request.error?.message || 'Unknown error';
      resolve({ status: 'error', data: error });
    };
  });
};

export const getAllData = <T>(storeName: string): Promise<DBResponse<T[]>> => {
  return new Promise((resolve) => {
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve({ status: 'success', data: getAllRequest.result });
      };

      getAllRequest.onerror = () => {
        resolve({ status: 'error', data: [] });
      };
    };
  });
};

export const getDataById = <T>(storeName: string, id: number): Promise<DBResponse<T>> => {
  return new Promise((resolve) => {
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        resolve({ status: 'success', data: getRequest.result });
      };

      getRequest.onerror = () => {
        resolve({ status: 'error', data: 'unknown error' });
      };
    };
  });
};

export const updateData = <T>(storeName: string, data: T): Promise<DBResponse<T>> => {
  return new Promise((resolve) => {
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const putRequest = store.put(data);

      putRequest.onsuccess = () => {
        resolve({ status: 'success', data });
      };

      putRequest.onerror = () => {
        const error = putRequest.error?.message || 'Unknown error';
        resolve({ status: 'error', data: error });
      };
    };

    request.onerror = () => {
      const error = request.error?.message || 'Unknown error';
      resolve({ status: 'error', data: error });
    };
  });
};

export const deleteData = (storeName: string, id: number): Promise<DBResponse<null>> => {
  return new Promise((resolve) => {
    request = indexedDB.open('myDB', version);

    request.onsuccess = () => {
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const deleteRequest = store.delete(id);

      deleteRequest.onsuccess = () => {
        resolve({ status: 'success', data: null });
      };

      deleteRequest.onerror = () => {
        resolve({ status: 'error', data: null });
      };
    };

    request.onerror = () => {
      resolve({ status: 'error', data: null });
    };
  });
};

export enum Stores { 
  Resume = 'Resume',
  Users = 'Users',
  ResumeOtherType = 'ResumeOtherType',
  DegreeType = 'DegreeType'
}