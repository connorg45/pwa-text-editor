import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (id, content) => {
    const jateDb = await openDB("jate", 1);
    const txt = jateDb.transaction("jate", "readwrite");
    const store = txt.objectStore("jate");
    const request = store.put({ id: id, content: content });
    const result = await request;
  };
  
  export const getDb = async () => {
    const indexedDb = await openDB("jate", 1);
    const txt = indexedDb.transaction("jate", "readonly");
    const store = txt.objectStore("jate");
    const request = store.get(1);
    const result = await request;
    return result?.value;
  };

initdb();
