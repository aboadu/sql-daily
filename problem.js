/* problem.js — Problem solve page logic */

const SOLVED_KEY  = 'sqldaily_solved';
const STREAK_KEY  = 'sqldaily_streak';
const STREAK_DATE = 'sqldaily_streak_date';
const SUBS_KEY    = 'sqldaily_subs';
const DRAFT_KEY   = 'sqldaily_draft';

// ---- Helpers ----
function getSolved() {
  try { return JSON.parse(localStorage.getItem(SOLVED_KEY)) || []; } catch { return []; }
}
function markSolved(id) {
  const s = getSolved();
  if (!s.includes(id)) { s.push(id); localStorage.setItem(SOLVED_KEY, JSON.stringify(s)); }
}
function getSubs(id) {
  try { return JSON.parse(localStorage.getItem(SUBS_KEY + '_' + id)) || []; } catch { return []; }
}
function addSub(id, pass, code) {
  const subs = getSubs(id);
  subs.unshift({ pass, time: new Date().toISOString(), code });
  localStorage.setItem(SUBS_KEY + '_' + id, JSON.stringify(subs.slice(0, 30)));
}
function updateStreak() {
  const today = new Date().toDateString();
  const last  = localStorage.getItem(STREAK_DATE);
  let streak  = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  streak = (last === yesterday) ? streak + 1 : 1;
  localStorage.setItem(STREAK_KEY, streak);
  localStorage.setItem(STREAK_DATE, today);
}
function getStreak() {
  try { return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10); } catch { return 0; }
}
function showToast(id, duration = 2800) {
  const el = document.getElementById(id);
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, duration);
}
function saveDraft(id, code) {
  localStorage.setItem(DRAFT_KEY + '_' + id, code);
}
function loadDraft(id) {
  return localStorage.getItem(DRAFT_KEY + '_' + id) || '';
}

// ---- Get problem from URL ----
const params  = new URLSearchParams(window.location.search);
const probId  = parseInt(params.get('id') || '1', 10);
const problem = PROBLEMS.find(p => p.id === probId) || PROBLEMS[0];
const alreadySolved = getSolved().includes(problem.id);

// ---- Render header ----
document.title = `SQLDaily — ${problem.title}`;
document.getElementById('probNum').textContent    = `#${problem.id}`;
document.getElementById('probTitle').textContent  = problem.title;
document.getElementById('probDesc').innerHTML     = problem.description;
document.getElementById('hintText').textContent   = problem.hint;
document.getElementById('streakCount').textContent = getStreak();

document.getElementById('probBadges').innerHTML = `
  <span class="badge badge-${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
  <span class="tag">${problem.category}</span>
  ${problem.tags.map(t => `<span class="tag">${t}</span>`).join('')}
  ${problem.companies.map(c => `<span class="company-chip">${c}</span>`).join('')}
`;

// ---- CodeMirror editor ----
let editor;
const textarea = document.getElementById('sqlEditor');

// Start with blank canvas, or restore their draft if they have one
const draft = loadDraft(problem.id);
textarea.value = draft || '';

if (window.CodeMirror) {
  editor = CodeMirror.fromTextArea(textarea, {
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    indentWithTabs: false,
    tabSize: 2,
    extraKeys: { 'Ctrl-Enter': runQuery, 'Cmd-Enter': runQuery },
    lineWrapping: true,
    placeholder: 'Write your SQL query here...',
  });
  editor.setSize('100%', '100%');

  // Auto-save draft as user types
  editor.on('change', () => {
    saveDraft(problem.id, editor.getValue());
  });
}

function getCode() {
  return editor ? editor.getValue() : textarea.value;
}
function setCode(val) {
  if (editor) editor.setValue(val);
  else textarea.value = val;
}

// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.getElementById('tab-description').style.display = (tab === 'description') ? 'block' : 'none';
    document.getElementById('tab-submissions').style.display = (tab === 'submissions')  ? 'block' : 'none';
    if (tab === 'submissions') renderSubs();
  });
});

document.querySelectorAll('.out-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.out-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---- Render submissions ----
function renderSubs() {
  const subs = getSubs(problem.id);
  const list = document.getElementById('subList');
  const empty = document.getElementById('subEmpty');
  if (!subs.length) { empty.style.display = 'block'; list.innerHTML = ''; return; }
  empty.style.display = 'none';
  list.innerHTML = subs.map((s, i) => `
    <div class="sub-item">
      <div>
        <span class="${s.pass ? 'sub-status-pass' : 'sub-status-fail'}">${s.pass ? '✓ Accepted' : '✗ Wrong Answer'}</span>
        <span class="sub-attempt">Attempt #${subs.length - i}</span>
      </div>
      <span class="sub-time">${new Date(s.time).toLocaleString()}</span>
    </div>
  `).join('');
}

// ---- Check if query is correct ----
// Multi-layered comparison for better accuracy without a real DB
function checkCorrectness(code) {
  const normalize = s => s.toLowerCase()
    .replace(/--.*$/gm, '')       // remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
    .replace(/\s+/g, ' ')
    .replace(/;$/, '')
    .trim();

  const user = normalize(code);
  const sol  = normalize(problem.solution);

  // Exact match (ignoring whitespace/comments/semicolons)
  if (user === sol) return true;

  // Extract key SQL components from the solution
  const extractClauses = (q) => {
    const parts = {};
    // Extract SELECT columns
    const selMatch = q.match(/select\s+(.*?)\s+from/s);
    if (selMatch) parts.select = selMatch[1].trim();
    // Extract table names
    const fromMatch = q.match(/from\s+(\w+)/);
    if (fromMatch) parts.mainTable = fromMatch[1];
    // Extract JOINs
    parts.joins = (q.match(/join\s+\w+/g) || []);
    // Extract WHERE conditions
    const whereMatch = q.match(/where\s+(.*?)(?:\s+group\s+by|\s+order\s+by|\s+having|\s+limit|$)/s);
    if (whereMatch) parts.where = whereMatch[1].trim();
    // Extract GROUP BY
    const groupMatch = q.match(/group\s+by\s+(.*?)(?:\s+having|\s+order\s+by|\s+limit|$)/s);
    if (groupMatch) parts.groupBy = groupMatch[1].trim();
    // Extract HAVING
    const havingMatch = q.match(/having\s+(.*?)(?:\s+order\s+by|\s+limit|$)/s);
    if (havingMatch) parts.having = havingMatch[1].trim();
    // Check for key functions/keywords
    parts.keywords = [];
    const kwList = ['count', 'sum', 'avg', 'max', 'min', 'rank()', 'dense_rank()', 'row_number()',
                    'ntile', 'lead', 'lag', 'first_value', 'last_value', 'coalesce', 'case',
                    'partition by', 'over', 'with', 'union', 'union all', 'except', 'intersect',
                    'exists', 'not exists', 'not in', 'in', 'between', 'like', 'ilike',
                    'left join', 'right join', 'cross join', 'full join', 'inner join',
                    'distinct', 'having', 'group by', 'order by', 'limit', 'offset',
                    'date_trunc', 'extract', 'interval', 'percentile_cont', 'string_agg',
                    'array_agg', 'filter', 'recursive', 'lateral', 'generate_series',
                    'is null', 'is not null', 'desc', 'asc'];
    kwList.forEach(kw => { if (sol.includes(kw)) parts.keywords.push(kw); });
    return parts;
  };

  const solParts  = extractClauses(sol);
  const userParts = extractClauses(user);

  let score = 0;
  let total = 0;

  // Check main table
  if (solParts.mainTable) {
    total += 2;
    if (userParts.mainTable === solParts.mainTable) score += 2;
  }

  // Check JOIN tables present
  if (solParts.joins.length > 0) {
    total += 2;
    const matchedJoins = solParts.joins.filter(j => user.includes(j));
    score += (matchedJoins.length / solParts.joins.length) * 2;
  }

  // Check GROUP BY present and similar
  if (solParts.groupBy) {
    total += 2;
    if (userParts.groupBy) {
      // Check if grouping columns overlap
      const solCols  = solParts.groupBy.split(',').map(s => s.trim());
      const userCols = userParts.groupBy.split(',').map(s => s.trim());
      const matched = solCols.filter(c => userCols.some(uc => uc.includes(c) || c.includes(uc)));
      score += (matched.length / solCols.length) * 2;
    }
  }

  // Check HAVING
  if (solParts.having) {
    total += 1.5;
    if (userParts.having) score += 1.5;
  }

  // Check WHERE clause exists
  if (solParts.where) {
    total += 2;
    if (userParts.where) {
      // Simple overlap check
      const solTokens = solParts.where.split(/\s+/);
      const matchTokens = solTokens.filter(t => userParts.where.includes(t));
      score += (matchTokens.length / solTokens.length) * 2;
    }
  }

  // Check important keywords/functions
  if (solParts.keywords.length > 0) {
    total += 3;
    const matchedKw = solParts.keywords.filter(kw => user.includes(kw));
    score += (matchedKw.length / solParts.keywords.length) * 3;
  }

  // Check SELECT columns roughly match
  if (solParts.select) {
    total += 2;
    if (userParts.select) {
      const solAliases = (sol.match(/\bas\s+\w+/g) || []).map(a => a.replace('as ', ''));
      const userAliases = (user.match(/\bas\s+\w+/g) || []).map(a => a.replace('as ', ''));
      const matchAliases = solAliases.filter(a => userAliases.includes(a));
      if (solAliases.length > 0) {
        score += (matchAliases.length / solAliases.length) * 2;
      } else {
        score += 1; // partial credit if no aliases to compare
      }
    }
  }

  // Must hit at least 80% to pass
  return total > 0 && (score / total) >= 0.80;
}

// ---- Analyze SQL for syntax feedback ----
function analyzeSQL(code) {
  const lower = code.toLowerCase().replace(/\s+/g, ' ').trim();
  const issues = [];
  const info = [];

  // Check for SELECT
  if (!lower.includes('select')) {
    issues.push('Missing <code>SELECT</code> clause.');
  } else {
    const selectMatch = code.match(/select\s+(.*?)\s+from/is);
    if (selectMatch) {
      const cols = selectMatch[1].split(',').map(c => c.trim());
      info.push(`Selecting <strong>${cols.length}</strong> column${cols.length !== 1 ? 's' : ''}`);
    }
  }

  // Check for FROM
  if (!lower.includes('from')) {
    issues.push('Missing <code>FROM</code> clause.');
  } else {
    const tables = [];
    const fromMatch = lower.match(/from\s+(\w+)/);
    if (fromMatch) tables.push(fromMatch[1]);
    const joinMatches = lower.match(/join\s+(\w+)/g);
    if (joinMatches) joinMatches.forEach(j => tables.push(j.replace(/join\s+/, '')));
    if (tables.length) info.push(`Tables: <strong>${tables.join(', ')}</strong>`);
  }

  // Detect clauses used
  const clauses = [];
  if (lower.includes('where'))      clauses.push('WHERE');
  if (lower.includes('group by'))   clauses.push('GROUP BY');
  if (lower.includes('having'))     clauses.push('HAVING');
  if (lower.includes('order by'))   clauses.push('ORDER BY');
  if (lower.includes('limit'))      clauses.push('LIMIT');
  if (/\bjoin\b/.test(lower))       clauses.push('JOIN');
  if (lower.includes('with'))       clauses.push('CTE');
  if (lower.includes('over'))       clauses.push('Window Function');
  if (lower.includes('union'))      clauses.push('UNION');
  if (lower.includes('exists'))     clauses.push('EXISTS');
  if (clauses.length) info.push(`Clauses: <strong>${clauses.join(', ')}</strong>`);

  // Detect aggregate functions
  const aggs = [];
  if (lower.includes('count('))  aggs.push('COUNT');
  if (lower.includes('sum('))    aggs.push('SUM');
  if (lower.includes('avg('))    aggs.push('AVG');
  if (/\bmax\(/.test(lower))     aggs.push('MAX');
  if (/\bmin\(/.test(lower))     aggs.push('MIN');
  if (aggs.length) info.push(`Aggregations: <strong>${aggs.join(', ')}</strong>`);

  // Common syntax issues
  if (lower.includes('select') && lower.includes('from') && lower.includes('group by')) {
    // Check if non-aggregated columns might be missing from GROUP BY (basic heuristic)
    if (!lower.includes('count') && !lower.includes('sum') && !lower.includes('avg') &&
        !lower.includes('max') && !lower.includes('min')) {
      issues.push('You have <code>GROUP BY</code> but no aggregate function — did you mean to use one?');
    }
  }

  // Unclosed parentheses
  const opens  = (code.match(/\(/g) || []).length;
  const closes = (code.match(/\)/g) || []).length;
  if (opens > closes) issues.push(`Unclosed parenthesis — ${opens - closes} more <code>(</code> than <code>)</code>`);
  if (closes > opens) issues.push(`Extra closing parenthesis — ${closes - opens} more <code>)</code> than <code>(</code>`);

  return { issues, info };
}

// ---- Run (shows formatted query + analysis, no grading) ----
function runQuery() {
  const code = getCode().trim();
  if (!code) {
    document.getElementById('outputBody').innerHTML = `
      <div class="output-error">Write a query first!</div>
    `;
    return;
  }

  const body = document.getElementById('outputBody');
  body.innerHTML = '<div class="output-placeholder"><span>Running...</span></div>';

  setTimeout(() => {
    const { issues, info } = analyzeSQL(code);

    const issueHtml = issues.length
      ? `<div class="run-issues">
           <div class="run-section-label" style="color: var(--yellow);">⚠ Potential Issues</div>
           ${issues.map(i => `<div class="run-issue-item">${i}</div>`).join('')}
         </div>`
      : '';

    const infoHtml = info.length
      ? `<div class="run-info">
           <div class="run-section-label" style="color: var(--accent-2);">Query Analysis</div>
           ${info.map(i => `<div class="run-info-item">${i}</div>`).join('')}
         </div>`
      : '';

    body.innerHTML = `
      <div class="run-output-wrap">
        <div class="run-query-block">
          <div class="run-section-label" style="color: var(--green);">Your Query</div>
          <pre class="run-query-pre">${escapeHtml(code)}</pre>
        </div>
        ${infoHtml}
        ${issueHtml}
        <div style="color: var(--text-muted); font-family: var(--font); font-size: 0.82rem; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border);">
          When you're ready, click <strong>Submit</strong> to check your answer.
        </div>
      </div>
    `;
  }, 300);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---- Generate alternative solutions based on the problem's solution ----
function getAlternatives(prob) {
  const sol = prob.solution.toLowerCase();
  const alts = [];

  // The original solution is always "Approach 1"
  alts.push({
    label: 'Your Accepted Solution',
    description: 'The query you submitted that passed.',
    code: null // will be filled with user's code
  });

  alts.push({
    label: 'Reference Solution',
    description: 'A clean, standard approach to this problem.',
    code: prob.solution
  });

  // Generate alternatives based on patterns in the solution
  // LEFT JOIN → NOT EXISTS alternative
  if (sol.includes('left join') && sol.includes('is null')) {
    const alt = prob.solution
      .replace(/SELECT\s+(.*?)\s+FROM\s+(\w+)\s+\w+\s*\n?\s*LEFT\s+JOIN\s+(\w+)\s+\w+\s+ON\s+(.*?)\s*\n?\s*WHERE\s+\w+\.\w+\s+IS\s+NULL/is,
        (match, cols, t1, t2, onClause) => {
          const alias1 = t1.charAt(0).toLowerCase();
          const alias2 = t2.charAt(0).toLowerCase();
          const onParts = onClause.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
          if (onParts) {
            return `SELECT ${cols}\nFROM ${t1} ${alias1}\nWHERE NOT EXISTS (\n  SELECT 1 FROM ${t2} ${alias2}\n  WHERE ${alias2}.${onParts[4]} = ${alias1}.${onParts[2]}\n)`;
          }
          return match;
        });
    if (alt !== prob.solution) {
      alts.push({
        label: 'NOT EXISTS Approach',
        description: 'Uses a correlated subquery with NOT EXISTS instead of LEFT JOIN + IS NULL. Often more readable and can be faster on large tables since the optimizer can short-circuit.',
        code: alt
      });
    } else {
      alts.push({
        label: 'NOT EXISTS Approach',
        description: 'Instead of LEFT JOIN + IS NULL, you can use NOT EXISTS with a correlated subquery. The optimizer can short-circuit as soon as it finds a match, which can be faster on large datasets.',
        code: `-- Alternative: Replace the LEFT JOIN + IS NULL pattern with:\n-- WHERE NOT EXISTS (\n--   SELECT 1 FROM other_table\n--   WHERE other_table.key = main_table.key\n-- )\n-- This often performs the same or better than LEFT JOIN + IS NULL.`
      });
    }
  }

  // NOT IN → LEFT JOIN alternative
  if (sol.includes('not in') && sol.includes('select')) {
    alts.push({
      label: 'LEFT JOIN Approach',
      description: 'Replace NOT IN with a LEFT JOIN + IS NULL. This avoids issues when the subquery returns NULL values (NOT IN with NULLs can give unexpected results) and is often more performant.',
      code: `-- Alternative: Replace NOT IN with LEFT JOIN\n-- Instead of: WHERE col NOT IN (SELECT col FROM ...)\n-- Use:\n-- LEFT JOIN other_table ON main.col = other.col\n-- WHERE other.col IS NULL\n-- This is NULL-safe and often faster on large datasets.`
    });
  }

  // Subquery → CTE alternative
  if (sol.includes('select') && (sol.match(/select/g) || []).length >= 2 && !sol.includes('with')) {
    alts.push({
      label: 'CTE (WITH) Approach',
      description: 'Refactor nested subqueries into a Common Table Expression (WITH clause). CTEs improve readability by naming intermediate results and make complex queries easier to debug step by step.',
      code: `-- Alternative: Use a CTE for clarity\n-- WITH intermediate AS (\n--   SELECT ... (your subquery here)\n-- )\n-- SELECT ...\n-- FROM main_table\n-- JOIN intermediate ON ...\n-- CTEs make nested logic easier to read and maintain.`
    });
  }

  // CTE → Subquery alternative
  if (sol.includes('with') && !sol.includes('recursive')) {
    alts.push({
      label: 'Inline Subquery Approach',
      description: 'The CTE can be rewritten as an inline subquery in the FROM clause. While less readable, some query planners may optimize inline subqueries differently than CTEs.',
      code: `-- Alternative: Replace the CTE with an inline subquery\n-- Instead of: WITH cte AS (SELECT ...) SELECT ... FROM cte\n-- Use: SELECT ... FROM (SELECT ...) AS sub\n-- Some databases materialize CTEs, so inline subqueries\n-- can sometimes give the optimizer more flexibility.`
    });
  }

  // Window function alternatives
  if (sol.includes('rank()') || sol.includes('dense_rank()')) {
    alts.push({
      label: 'Correlated Subquery Approach',
      description: 'Instead of RANK/DENSE_RANK window functions, you can use a correlated subquery to count how many rows rank higher. This is the pre-window-function way and works in older SQL dialects.',
      code: `-- Alternative: Replace window function ranking with a correlated subquery\n-- Instead of: RANK() OVER (PARTITION BY ... ORDER BY col DESC)\n-- Use:\n-- SELECT *, (\n--   SELECT COUNT(DISTINCT t2.col) + 1\n--   FROM table t2\n--   WHERE t2.partition_col = t1.partition_col\n--     AND t2.col > t1.col\n-- ) AS rank\n-- FROM table t1`
    });
  }

  if (sol.includes('row_number()')) {
    alts.push({
      label: 'DISTINCT ON Approach (PostgreSQL)',
      description: 'PostgreSQL\'s DISTINCT ON returns the first row for each group based on ORDER BY. It\'s more concise than ROW_NUMBER() + filter for "first row per group" patterns.',
      code: `-- Alternative: Use DISTINCT ON (PostgreSQL-specific)\n-- Instead of: ROW_NUMBER() OVER (PARTITION BY col ORDER BY ...) = 1\n-- Use:\n-- SELECT DISTINCT ON (partition_col) *\n-- FROM table\n-- ORDER BY partition_col, sort_col ASC\n-- More concise but PostgreSQL-only.`
    });
  }

  // GROUP BY + HAVING → Window function alternative
  if (sol.includes('group by') && sol.includes('having')) {
    alts.push({
      label: 'Window Function Approach',
      description: 'Instead of GROUP BY + HAVING, you can use a window function to compute the aggregate alongside each row, then filter in an outer query. Useful when you need both detail and aggregate data.',
      code: `-- Alternative: Use a window function + subquery\n-- Instead of: GROUP BY col HAVING COUNT(*) > N\n-- Use:\n-- SELECT * FROM (\n--   SELECT *, COUNT(*) OVER (PARTITION BY col) AS cnt\n--   FROM table\n-- ) sub\n-- WHERE cnt > N\n-- This preserves individual row data while filtering by group.`
    });
  }

  // EXISTS → JOIN alternative
  if (sol.includes('exists') && !sol.includes('not exists')) {
    alts.push({
      label: 'INNER JOIN Approach',
      description: 'Replace EXISTS with an INNER JOIN + DISTINCT. Both return matching rows, but JOIN can be simpler to read for straightforward lookups.',
      code: `-- Alternative: Replace EXISTS with INNER JOIN\n-- Instead of: WHERE EXISTS (SELECT 1 FROM t2 WHERE t2.id = t1.id)\n-- Use:\n-- SELECT DISTINCT t1.*\n-- FROM t1\n-- INNER JOIN t2 ON t1.id = t2.id\n-- Use DISTINCT to avoid duplicates from the join.`
    });
  }

  // CASE WHEN count pivot → FILTER alternative
  if (sol.includes('case when') && (sol.includes('count') || sol.includes('sum'))) {
    alts.push({
      label: 'FILTER Clause Approach (PostgreSQL)',
      description: 'PostgreSQL supports the FILTER clause on aggregates, which is cleaner than CASE WHEN inside COUNT/SUM for conditional aggregation.',
      code: `-- Alternative: Use FILTER instead of CASE WHEN\n-- Instead of: COUNT(CASE WHEN status = 'x' THEN 1 END)\n-- Use: COUNT(*) FILTER (WHERE status = 'x')\n-- Cleaner syntax, same result. PostgreSQL 9.4+.`
    });
  }

  // UNION → UNION ALL reminder
  if (sol.includes('union') && !sol.includes('union all')) {
    alts.push({
      label: 'UNION ALL (Performance)',
      description: 'If you know there are no duplicates between the result sets, use UNION ALL instead of UNION. UNION ALL skips the deduplication step and is significantly faster on large datasets.',
      code: `-- Optimization tip:\n-- UNION removes duplicates (like DISTINCT), which requires sorting.\n-- If your result sets are guaranteed to have no overlapping rows,\n-- use UNION ALL to skip the deduplication and improve performance.`
    });
  }

  // Self-join → Window function alternative
  if (sol.includes('join') && (sol.match(/(\w+)\s+\w+\s*\n?\s*join\s+\1/i) || sol.includes('self'))) {
    alts.push({
      label: 'LAG/LEAD Window Approach',
      description: 'Self-joins for comparing adjacent rows can often be replaced with LAG() or LEAD() window functions, which are more efficient and readable.',
      code: `-- Alternative: Replace self-join with LAG/LEAD\n-- Instead of joining a table to itself to compare rows:\n-- Use:\n-- SELECT *, LAG(col) OVER (ORDER BY date_col) AS prev_value\n-- FROM table\n-- This avoids the cost of a join and is easier to read.`
    });
  }

  // LIKE → Pattern alternatives
  if (sol.includes('like') || sol.includes('ilike')) {
    alts.push({
      label: 'Regex Approach',
      description: 'PostgreSQL supports regex matching with ~ (case-sensitive) and ~* (case-insensitive). More powerful than LIKE for complex patterns.',
      code: `-- Alternative: Use regex instead of LIKE/ILIKE\n-- Instead of: WHERE col ILIKE '%pattern%'\n-- Use: WHERE col ~* 'pattern'\n-- Regex supports more complex matching:\n-- WHERE col ~* '^(new|old)' -- starts with 'new' or 'old'\n-- WHERE col ~ '\\d{3}'      -- contains 3 consecutive digits`
    });
  }

  // Always add a performance tip
  alts.push({
    label: 'Performance Tips',
    description: 'General optimization advice for this type of query.',
    code: getPerformanceTip(prob)
  });

  return alts;
}

function getPerformanceTip(prob) {
  const tips = [];
  const sol = prob.solution.toLowerCase();

  if (sol.includes('join'))
    tips.push('-- Ensure JOIN columns are indexed for fast lookups.');
  if (sol.includes('where'))
    tips.push('-- Add indexes on columns used in WHERE filters.');
  if (sol.includes('order by'))
    tips.push('-- ORDER BY on large result sets is expensive; index the sort column if used frequently.');
  if (sol.includes('like') && sol.includes('%'))
    tips.push('-- Leading wildcards (LIKE \'%x\') prevent index usage. Consider full-text search for large tables.');
  if (sol.includes('distinct'))
    tips.push('-- DISTINCT requires sorting/hashing. If possible, fix the source of duplicates instead.');
  if (sol.includes('group by'))
    tips.push('-- Index the GROUP BY columns to speed up aggregation.');
  if (sol.includes('count(*)'))
    tips.push('-- COUNT(*) counts all rows; COUNT(column) skips NULLs. Choose intentionally.');
  if (sol.includes('over'))
    tips.push('-- Window functions scan the partition for each row. Keep partitions small when possible.');
  if (sol.includes('with'))
    tips.push('-- Some DBs materialize CTEs (run them once). In PostgreSQL 12+, add NOT MATERIALIZED if you want the optimizer to inline it.');
  if (sol.includes('subquery') || (sol.match(/select/g) || []).length >= 2)
    tips.push('-- Correlated subqueries run once per outer row. Consider rewriting as a JOIN if the dataset is large.');

  if (tips.length === 0) {
    tips.push('-- Use EXPLAIN ANALYZE to see the actual query plan and identify bottlenecks.');
    tips.push('-- Index columns used in WHERE, JOIN, and ORDER BY clauses.');
  }

  tips.push('-- Always test with EXPLAIN ANALYZE on representative data sizes.');
  return tips.join('\n');
}

// ---- Submit ----
let attemptCount = getSubs(problem.id).length;

function submitQuery() {
  const code = getCode().trim();
  if (!code) {
    document.getElementById('outputBody').innerHTML = `
      <div class="output-error">Write a query first before submitting!</div>
    `;
    return;
  }

  const body = document.getElementById('outputBody');
  body.innerHTML = '<div class="output-placeholder"><span>Checking your answer...</span></div>';

  setTimeout(() => {
    const pass = checkCorrectness(code);
    attemptCount++;
    addSub(problem.id, pass, code);

    if (pass) {
      markSolved(problem.id);
      updateStreak();
      document.getElementById('streakCount').textContent = getStreak();
      showToast('successToast');

      // Disable submit button, show success
      document.getElementById('submitBtn').textContent = '✓ Solved';
      document.getElementById('submitBtn').disabled = true;
      document.getElementById('submitBtn').style.opacity = '0.6';

      // Generate alternative solutions
      const alts = getAlternatives(problem);
      // Fill in the user's code for the first approach
      alts[0].code = code;

      const altsHtml = alts.map((alt, i) => `
        <div class="alt-solution">
          <div class="alt-header" onclick="this.parentElement.classList.toggle('alt-open')">
            <span class="alt-toggle">▶</span>
            <span class="alt-label">${alt.label}</span>
          </div>
          <div class="alt-body">
            <p class="alt-desc">${alt.description}</p>
            <pre class="alt-code">${escapeHtml(alt.code)}</pre>
          </div>
        </div>
      `).join('');

      body.innerHTML = `
        <div class="success-wrap">
          <div class="output-success" style="font-size: 1rem; padding: 12px 0;">
            ✅ Accepted on attempt #${attemptCount}! Great work!
          </div>

          <div class="alt-solutions-section">
            <div class="alt-section-title">Alternative Approaches & Optimizations</div>
            <p class="alt-section-desc">There's usually more than one way to solve a SQL problem. Compare different approaches to deepen your understanding.</p>
            ${altsHtml}
          </div>

          <div style="margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--border);">
            <a href="problem.html?id=${problem.id < PROBLEMS.length ? problem.id + 1 : 1}"
               style="display: inline-block; background: var(--accent); color: #000; padding: 8px 18px; border-radius: 6px; font-weight: 700; font-size: 0.85rem;">
              Next Problem →
            </a>
          </div>
        </div>
      `;
    } else {
      showToast('errorToast');

      // Progressive feedback with inline hints
      let feedback = '';
      let hintHtml = '';

      if (attemptCount === 1) {
        feedback = 'Take another look at the problem description and try again.';
      } else if (attemptCount === 2) {
        feedback = 'Check your SQL clauses — are you using the right keywords and table names?';
      } else if (attemptCount === 3) {
        feedback = "Here's a hint to help you out:";
        hintHtml = `
          <div class="inline-hint">
            <div class="inline-hint-label">💡 Hint</div>
            <p>${problem.hint}</p>
          </div>`;
        // Also reveal it in the description panel
        document.getElementById('hintBox').style.display = 'block';
      } else if (attemptCount >= 4 && attemptCount < 6) {
        feedback = 'Re-read the hint below and focus on the key SQL concepts it mentions.';
        hintHtml = `
          <div class="inline-hint">
            <div class="inline-hint-label">💡 Hint</div>
            <p>${problem.hint}</p>
          </div>`;
      } else {
        // After 6+ attempts, give a stronger nudge with tags
        feedback = 'You\'ve been at this a while — consider which of these concepts apply:';
        hintHtml = `
          <div class="inline-hint">
            <div class="inline-hint-label">💡 Hint</div>
            <p>${problem.hint}</p>
          </div>
          <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px;">
            ${problem.tags.map(t => `<span class="tag" style="font-size: 0.78rem;">${t}</span>`).join('')}
          </div>
          <div style="margin-top: 10px; color: var(--text-muted); font-size: 0.8rem;">
            You can view the full solution with the 👁 Solution button above.
          </div>`;
      }

      body.innerHTML = `
        <div class="output-error" style="font-size: 0.95rem; padding: 8px 0;">
          ✗ Wrong Answer — Attempt #${attemptCount}
        </div>
        <div style="color: var(--text-muted); font-family: var(--font); font-size: 0.85rem; margin-top: 8px; line-height: 1.6;">
          ${feedback}
        </div>
        ${hintHtml}
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <button onclick="document.getElementById('outputBody').innerHTML='<div class=\\'output-placeholder\\'><span>Ready for your next attempt</span></div>'"
                  style="background: var(--bg-3); border: 1px solid var(--border); border-radius: 6px; color: var(--text); padding: 6px 14px; cursor: pointer; font-size: 0.82rem;">
            Try Again
          </button>
        </div>
      `;
    }
  }, 600);
}

// ---- Button bindings ----
document.getElementById('runBtn').addEventListener('click', runQuery);
document.getElementById('submitBtn').addEventListener('click', submitQuery);

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Clear your code and start fresh?')) {
    setCode('');
    saveDraft(problem.id, '');
    document.getElementById('outputBody').innerHTML = `
      <div class="output-placeholder"><span>Write your query and submit to check</span></div>
    `;
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  navigator.clipboard.writeText(getCode()).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✓ Copied';
    setTimeout(() => { btn.textContent = '⎘ Copy'; }, 1500);
  });
});

document.getElementById('hintBtn').addEventListener('click', () => {
  const box = document.getElementById('hintBox');
  box.style.display = box.style.display === 'none' ? 'block' : 'none';
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-tab="description"]').classList.add('active');
  document.getElementById('tab-description').style.display = 'block';
  document.getElementById('tab-submissions').style.display = 'none';
  if (box.style.display === 'block') {
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

document.getElementById('solutionBtn').addEventListener('click', () => {
  document.getElementById('solutionCode').textContent = problem.solution;
  document.getElementById('solutionModal').style.display = 'flex';
});
document.getElementById('modalClose').addEventListener('click', () => {
  document.getElementById('solutionModal').style.display = 'none';
});
document.getElementById('solutionModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('solutionModal')) {
    document.getElementById('solutionModal').style.display = 'none';
  }
});

// ---- Keyboard shortcuts ----
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('solutionModal').style.display = 'none';
});

// ---- If already solved, show that state ----
if (alreadySolved) {
  document.getElementById('submitBtn').textContent = '✓ Solved — Resubmit';
}
