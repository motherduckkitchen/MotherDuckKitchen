<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>

<script>
// requires window.firebaseConfig (from firebase-config.js)
if (!firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
const _db = firebase.firestore();

/**
 * Save a JSON payload for a logical page.
 * @param {string} path like "cleaning6a/2025-03-03"
 * @param {object} payload any JSON you want to persist
 */
async function mdkSave(path, payload){
  await _db.doc(path).set({ ...payload, _updated: firebase.firestore.FieldValue.serverTimestamp() }, { merge:true });
}

/** Load a document; returns null if missing */
async function mdkLoad(path){
  const snap = await _db.doc(path).get();
  return snap.exists ? snap.data() : null;
}

/** Query docs by field filters; simple helper */
async function mdkQuery(coll, field, op, value){
  const q = await _db.collection(coll).where(field, op, value).get();
  const out = []; q.forEach(d=> out.push({ id:d.id, ...d.data() })); return out;
}

window.MDK = { db:_db, save:mdkSave, load:mdkLoad, query:mdkQuery };
</script>
