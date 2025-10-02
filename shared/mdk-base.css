<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Record 6a — Daily Cleaning & Sanitising</title>
<style>
  :root{
    --ink:#0f172a; --muted:#6b7280; --line:#cfd6dd; --grid:#e5eaf0; --head:#f6f8fb;
    --chip:#eef2f7; --brand:#0d6efd; --warn:#ffc107;
    --fs:13px;
  }
  @page{ size:A4 portrait; margin:12mm }
  html,body{margin:0;background:#e8f0f4;color:var(--ink);font:var(--fs)/1.35 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
  body{
    background-image:url("kitchen.jpg");
    background-size:cover;background-attachment:fixed;background-position:center;
  }
  .wash{position:fixed;inset:0;background:rgba(255,255,255,.88);z-index:-1}
  .wrap{max-width:900px;margin:22px auto;padding:0 14px}
  .card{background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 10px 28px rgba(2,6,23,.10);padding:16px}
  .toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
  .btn{border:0;border-radius:12px;background:var(--chip);padding:9px 14px;font-weight:700;cursor:pointer;color:#0f172a;display:flex;align-items:center;gap:8px;box-shadow:0 2px 6px rgba(2,6,23,.06)}
  .btn:hover{filter:brightness(.97)}
  .btn--back{background:var(--warn)}
  .btn--primary{background:var(--brand);color:#fff}
  h1{margin:8px 0 12px;font-size:20px;text-align:center}
  .meta{display:flex;gap:14px;flex-wrap:wrap;align-items:center;justify-content:center;margin:8px 0 14px}
  label{font-weight:700}
  input[type="date"],input[type="month"],input[type="text"]{
    border:1px solid var(--line);border-radius:10px;padding:8px 10px;min-width:190px;background:#fff
  }
  table{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--line);border-radius:12px;overflow:hidden}
  th,td{border-right:1px solid var(--grid);border-bottom:1px solid var(--grid);padding:8px 10px;background:#fff;vertical-align:middle}
  th:last-child,td:last-child{border-right:0}
  tr:last-child td{border-bottom:0}
  thead th{background:var(--head);text-align:center}
  .task{width:100%}
  .day{width:66px;text-align:center}
  .note{font-size:12px;color:var(--muted);margin-top:8px}
  .rowhead{font-weight:600}
  .flex{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
  .sr-only{position:absolute;left:-9999px}
  @media print{ .toolbar{display:none} body{background:#fff} .wash{display:none} }
</style>
</head>
<body>
<div class="wash"></div>
<div class="wrap card">

  <!-- Toolbar -->
  <div class="toolbar">
    <a href="kitchen.html" class="btn btn--back">← Back</a>
    <button class="btn" onclick="window.print()">🖨️ Print</button>
    <button class="btn" id="btnClear">✖️ Clear</button>
    <button class="btn btn--primary" id="btnSave">💾 Save</button>
    <div class="flex">
      <label for="archiveMonth">Month:</label>
      <input type="month" id="archiveMonth"/>
      <button class="btn" id="btnLoadMonth">📂 Load Month</button>
      <button class="btn" id="btnArchive">📦 Archive Month</button>
    </div>
  </div>

  <h1>Record 6a — Daily Cleaning & Sanitising</h1>

  <!-- Meta -->
  <div class="meta">
    <div>
      <label for="weekStart">Week Commencing:&nbsp;</label>
      <input id="weekStart" type="date"/>
    </div>
    <div>
      <label for="siteName">Site:&nbsp;</label>
      <input id="siteName" type="text" placeholder="e.g. Mother Duck Kitchen"/>
    </div>
  </div>

  <!-- Grid -->
  <table id="grid">
    <thead>
      <tr>
        <th class="task">Area / Equipment</th>
        <th class="day">Mon</th>
        <th class="day">Tue</th>
        <th class="day">Wed</th>
        <th class="day">Thu</th>
        <th class="day">Fri</th>
      </tr>
    </thead>
    <tbody id="rows">
      <!-- Tasks injected -->
    </tbody>
  </table>

  <div class="note">
    <b>Note:</b> Tick the day when a task is completed. Use one row per task per week. Select a “Week Commencing” date above — data auto-loads if it exists. Click <b>Save</b> to write to Firestore. Use <b>Archive Month</b> at month’s end, and <b>Load Month</b> to view a read-only monthly snapshot for printing.
  </div>
</div>

<!-- Firebase SDKs (script-tag version) -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>

<script>
/* ------------------  Firebase CONFIG  ------------------ */
/* Replace the values in firebaseConfig with your console's "Use a <script> tag" config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
/* ------------------------------------------------------- */

/* ---------- Task list (from your Food Safety Program) ---------- */
const TASKS = [
  "AFTER EACH USE",
  "Chopping boards (if knife marks discard & order new ones)",
  "Benches",
  "Serving utensils",
  "Bowls, Cups, Plates etc.",
  "Drinking jugs clean/sanitised & put away",

  "DAILY or more often if required",
  "Cupboards clean & tidy (wipe over outside doors)",
  "Microwave clean inside & outside (nothing stored on top)",
  "Wipe over/clean front of ovens",
  "Wipe over front of dishwasher",
  "Windowsill, skirting, sink splash back",
  "All utensils put away",
  "Door handles & entrance doors",
  "Bin emptied, lid cleaned",
  "Benches disinfected & clear",
  "Floors mopped (PM)",
  "Tea towels & dish cloths washed (end of day)",
  "Oven trays are cleaned after each use",
  "Sanitise all fixtures & fittings appropriately",

  "Please list areas/equipment to be cleaned daily:"
];

/* ---------- Build grid ---------- */
const rowsEl = document.getElementById('rows');
function buildGrid(){
  rowsEl.innerHTML = '';
  TASKS.forEach((t,i)=>{
    const tr = document.createElement('tr');
    const isHeader = (t === 'AFTER EACH USE' || t === 'DAILY or more often if required');
    tr.innerHTML = `
      <td class="task ${isHeader?'rowhead':''}">
        ${isHeader ? t : `<label class="sr-only">Task ${i}</label>${t}`}
      </td>
      ${[0,1,2,3,4].map(d=>`
        <td class="day">${isHeader? '' : `<input type="checkbox" data-row="${i}" data-day="${d}">`}</td>
      `).join('')}
    `;
    rowsEl.appendChild(tr);
  });
}
buildGrid();

/* ---------- Helpers ---------- */
const weekStart = document.getElementById('weekStart');
const siteName  = document.getElementById('siteName');
const archiveMonth = document.getElementById('archiveMonth');

function ymd(date){ // YYYY-MM-DD
  const d = new Date(date);
  const z = n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`;
}
function ym(date){ // YYYY-MM
  const d = new Date(date);
  const z = n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${z(d.getMonth()+1)}`;
}

/* ---------- Firestore paths ---------- */
function weekDocPath(dateStr){
  // Weekly document: cleaning6a/{YYYY-MM-DD}
  return `cleaning6a/${dateStr}`;
}
function archiveDocPath(monthStr){
  // Monthly archive: archives/cleaning6a/{YYYY-MM}
  return `archives/cleaning6a/${monthStr}`;
}

/* ---------- Read & write weekly ---------- */
async function saveWeek(){
  const ws = weekStart.value;
  if(!ws){ alert('Select Week Commencing.'); return; }
  const key = ymd(ws);
  const checks = Array.from(document.querySelectorAll('tbody input[type=checkbox]'))
    .map(cb => cb.checked);

  await db.doc(weekDocPath(key)).set({
    site: siteName.value || 'Mother Duck Kitchen',
    weekStart: key,
    tasks: TASKS,
    checks,                //  (TASKS.length * 5) booleans
    savedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge:true });

  alert('Saved to Firestore.');
}

async function loadWeek(dateStr){
  const snap = await db.doc(weekDocPath(dateStr)).get();
  // Clear all checks first
  document.querySelectorAll('tbody input[type=checkbox]').forEach(cb=> cb.checked=false);

  if(!snap.exists){ return; }
  const d = snap.data();
  if(d.site) siteName.value = d.site;
  if(Array.isArray(d.checks)){
    const boxes = document.querySelectorAll('tbody input[type=checkbox]');
    d.checks.forEach((v,i)=>{ if(boxes[i]) boxes[i].checked = !!v; });
  }
}

/* ---------- Archive month (aggregate all weeks in that month) ---------- */
async function archiveMonthData(){
  const m = archiveMonth.value;
  if(!m){ alert('Choose a Month first.'); return; }

  // Query all week docs with weekStart inside that month
  const first = new Date(m + "-01T00:00:00");
  const next  = new Date(first); next.setMonth(next.getMonth()+1);

  const q = await db.collection('cleaning6a')
    .where('weekStart','>=', ymd(first))
    .where('weekStart','<',  ymd(next))
    .get();

  const weeks = [];
  q.forEach(doc=> weeks.push(doc.data()));

  await db.doc(archiveDocPath(m)).set({
    month: m,
    site: siteName.value || 'Mother Duck Kitchen',
    tasks: TASKS,
    weeks,
    archivedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert(`Archived ${weeks.length} week(s) to ${m}.`);
}

/* ---------- Load archive for printing (read-only overlay) ---------- */
async function loadArchive(){
  const m = archiveMonth.value;
  if(!m){ alert('Choose a Month first.'); return; }
  const doc = await db.doc(archiveDocPath(m)).get();
  if(!doc.exists){ alert('No archive for that month.'); return; }

  const data = doc.data();
  // Render a simple read-only window (printable)
  const w = window.open('', '_blank');
  const css = `
    body{font-family:system-ui,Segoe UI,Arial;margin:20px}
    h2{margin:0 0 10px}
    table{border-collapse:collapse;width:100%}
    th,td{border:1px solid #cfd6dd;padding:6px 8px}
    thead th{background:#f6f8fb}
  `;
  w.document.write(`<html><head><title>6a Archive ${m}</title><style>${css}</style></head><body>`);
  w.document.write(`<h2>Record 6a — Archive ${m}</h2><p><b>Site:</b> ${data.site||''}</p>`);

  data.weeks.sort((a,b)=> a.weekStart.localeCompare(b.weekStart));

  data.weeks.forEach(week=>{
    w.document.write(`<h3>Week Commencing ${week.weekStart}</h3>`);
    w.document.write('<table><thead><tr><th>Task</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th></tr></thead><tbody>');
    (week.tasks||TASKS).forEach((t,idx)=>{
      const c = week.checks || [];
      const row = [
        t,
        c[idx*5+0]?'✓':'',
        c[idx*5+1]?'✓':'',
        c[idx*5+2]?'✓':'',
        c[idx*5+3]?'✓':'',
        c[idx*5+4]?'✓':''
      ];
      w.document.write(`<tr>${row.map((v,i)=> i? `<td style="text-align:center">${v}</td>` : `<td>${v}</td>`).join('')}</tr>`);
    });
    w.document.write('</tbody></table>');
  });

  w.document.write('</body></html>');
  w.document.close();
  w.focus();
}

/* ---------- UI events ---------- */
document.getElementById('btnSave').addEventListener('click', saveWeek);
document.getElementById('btnArchive').addEventListener('click', archiveMonthData);
document.getElementById('btnLoadMonth').addEventListener('click', loadArchive);
document.getElementById('btnClear').addEventListener('click', ()=>{
  document.querySelectorAll('tbody input[type=checkbox]').forEach(cb=> cb.checked=false);
});

weekStart.addEventListener('change', async ()=>{
  const key = ymd(weekStart.value);
  if(!key) return;
  await loadWeek(key);
});

/* ---------- Defaults ---------- */
(function initDefaults(){
  const today = new Date();
  // Set weekStart to the most recent Monday
  const d = new Date(today); const day = d.getDay(); // 0 Sun..6 Sat
  const diff = (day===0?6:day-1); // days since Monday
  d.setDate(d.getDate()-diff);
  weekStart.value = ymd(d);
  archiveMonth.value = ym(today);
  siteName.value = 'Mother Duck Kitchen';
  loadWeek(ymd(d));
})();
</script>
</body>
</html>
