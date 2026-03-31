/* app.js — Problem list page logic */

const SOLVED_KEY = 'sqldaily_solved';

function getSolved() {
  try { return JSON.parse(localStorage.getItem(SOLVED_KEY)) || []; }
  catch { return []; }
}

function markSolved(id) {
  const s = getSolved();
  if (!s.includes(id)) { s.push(id); localStorage.setItem(SOLVED_KEY, JSON.stringify(s)); }
}

function getStreak() {
  try { return parseInt(localStorage.getItem('sqldaily_streak') || '0', 10); }
  catch { return 0; }
}

// ---- Daily hero ----
function renderHero() {
  const p = DAILY_PROBLEM;
  const today = new Date();
  document.getElementById('heroDate').textContent = today.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
  document.getElementById('heroTitle').textContent = p.title;
  document.getElementById('heroMeta').innerHTML = `
    <span class="badge badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span>
    <span class="tag">${p.category}</span>
    ${p.companies.map(c => `<span class="company-chip">${c}</span>`).join('')}
  `;
  document.getElementById('heroBtn').onclick = () => {
    window.location.href = `problem.html?id=${p.id}`;
  };
}

// ---- Problem table ----
function renderTable(problems) {
  const solved = getSolved();
  const tbody = document.getElementById('problemList');
  tbody.innerHTML = '';

  problems.forEach(p => {
    const isSolved = solved.includes(p.id);
    const isDaily  = p.id === DAILY_PROBLEM.id;
    const tr = document.createElement('tr');
    if (isSolved) tr.classList.add('solved');
    tr.innerHTML = `
      <td><span class="status-dot ${isSolved ? 'solved-dot' : isDaily ? 'daily-dot' : ''}"></span></td>
      <td class="prob-title-cell">
        ${p.title}
        ${isDaily ? '<span class="daily-label">Today</span>' : ''}
      </td>
      <td><span class="badge badge-${p.difficulty.toLowerCase()}">${p.difficulty}</span></td>
      <td><span class="tag">${p.category}</span></td>
      <td class="accept-pct">${p.acceptance}%</td>
      <td>${p.companies.map(c => `<span class="company-chip">${c}</span>`).join('')}</td>
    `;
    tr.addEventListener('click', () => { window.location.href = `problem.html?id=${p.id}`; });
    tbody.appendChild(tr);
  });
}

// ---- Filters ----
function getFiltered() {
  const q    = document.getElementById('searchInput').value.toLowerCase();
  const diff = document.getElementById('diffFilter').value;
  const cat  = document.getElementById('catFilter').value;

  return PROBLEMS.filter(p => {
    const matchQ    = !q || p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    const matchDiff = !diff || p.difficulty === diff;
    const matchCat  = !cat  || p.category === cat;
    return matchQ && matchDiff && matchCat;
  });
}

['searchInput','diffFilter','catFilter'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => renderTable(getFiltered()));
  document.getElementById(id).addEventListener('change', () => renderTable(getFiltered()));
});

// ---- Streak + progress ----
function renderStats() {
  const solved = getSolved();
  document.getElementById('streakCount').textContent = getStreak();
  document.getElementById('progressText').textContent = `${solved.length} / ${PROBLEMS.length} solved`;
}

// ---- Populate category filter dynamically ----
function populateCategories() {
  const cats = [...new Set(PROBLEMS.map(p => p.category))].sort();
  const sel = document.getElementById('catFilter');
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

// ---- Init ----
populateCategories();
renderHero();
renderTable(PROBLEMS);
renderStats();
