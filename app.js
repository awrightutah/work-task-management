// ============================================================
//  TEST COMPANY – Customer Loyalty SUPLINE
//  App Logic & Interactivity
// ============================================================

// ─── STATE ───────────────────────────────────────────────────
let currentUser = {
  name: 'Agent Smith',
  initials: 'AS',
  role: 'user',
  email: 'agent.smith@testcompany.com'
};

let selectedRole = 'user';
let currentMonth = 5; // June = 5 (0-indexed)
let currentYear = 2025;

// ─── SAMPLE DATA ─────────────────────────────────────────────
const allCases = [
  { id: 'CA-0000423891', customer: 'Maria Gonzalez', sfId: 'SF-001243891', subject: 'Billing dispute – recurring charge error', status: 'open', priority: 'high', agent: 'Agent Smith', updated: 'Today 10:22 AM' },
  { id: 'CA-0000423742', customer: 'James Thornton', sfId: 'SF-001243742', subject: 'Service interruption – no resolution after 3 contacts', status: 'pending', priority: 'medium', agent: 'Agent Smith', updated: 'Today 9:05 AM' },
  { id: 'CA-0000423601', customer: 'Patricia Lam', sfId: 'SF-001243601', subject: 'Cancellation request – retention attempt needed', status: 'escalated', priority: 'high', agent: 'Lisa Park', updated: 'Yesterday 4:30 PM' },
  { id: 'CA-0000423455', customer: 'Robert Kim', sfId: 'SF-001243455', subject: 'Installation scheduling issue – confirmed resolved', status: 'resolved', priority: 'low', agent: 'Mike Davis', updated: 'Yesterday 2:10 PM' },
  { id: 'CA-0000423301', customer: 'Sandra Okafor', sfId: 'SF-001243301', subject: 'Equipment repair – delay in parts delivery', status: 'open', priority: 'medium', agent: 'Agent Smith', updated: 'Jun 20, 2025' },
  { id: 'CA-0000422998', customer: 'Derek Osei', sfId: 'SF-001242998', subject: 'Multiple tech failures – executive complaint logged', status: 'escalated', priority: 'high', agent: 'Mike Davis', updated: 'Jun 19, 2025' },
  { id: 'CA-0000422801', customer: 'Helen Vargas', sfId: 'SF-001242801', subject: 'Refund request – denied, legal action threatened', status: 'escalated', priority: 'high', agent: 'Agent Smith', updated: 'Jun 18, 2025' },
  { id: 'CA-0000422650', customer: 'Thomas Nguyen', sfId: 'SF-001242650', subject: 'Plan upgrade request – billing discrepancy', status: 'resolved', priority: 'low', agent: 'Jordan Price', updated: 'Jun 17, 2025' },
  { id: 'CA-0000422490', customer: 'Aisha Patel', sfId: 'SF-001242490', subject: 'New service setup – awaiting confirmation', status: 'pending', priority: 'medium', agent: 'Lisa Park', updated: 'Jun 16, 2025' },
  { id: 'CA-0000422310', customer: 'Carlos Rivera', sfId: 'SF-001242310', subject: 'Loyalty reward redemption issue', status: 'resolved', priority: 'low', agent: 'Agent Smith', updated: 'Jun 14, 2025' },
];

const agents = [
  { name: 'Lisa Park', initials: 'LP', title: 'Senior Agent', color: '#0078d4', cases: 8, escalations: 2, followups: 5, sla: '97%', online: true },
  { name: 'Mike Davis', initials: 'MD', title: 'Agent', color: '#107c10', cases: 7, escalations: 2, followups: 4, sla: '94%', online: true },
  { name: 'Agent Smith', initials: 'AS', title: 'Agent', color: '#8b2fc9', cases: 12, escalations: 4, followups: 9, sla: '89%', online: true },
  { name: 'Jordan Price', initials: 'JP', title: 'Junior Agent', color: '#ff8c00', cases: 5, escalations: 1, followups: 3, sla: '85%', online: false },
  { name: 'Samantha Cruz', initials: 'SC', title: 'Agent', color: '#d13438', cases: 6, escalations: 0, followups: 4, sla: '92%', online: true },
  { name: 'Bryan Lee', initials: 'BL', title: 'Agent', color: '#038387', cases: 4, escalations: 1, followups: 2, sla: '91%', online: false },
  { name: 'Angela Moore', initials: 'AM', title: 'Senior Agent', color: '#464eb8', cases: 9, escalations: 1, followups: 6, sla: '96%', online: true },
  { name: 'Tyler Grant', initials: 'TG', title: 'Junior Agent', color: '#107c10', cases: 3, escalations: 0, followups: 2, sla: '88%', online: true },
];

const calendarEvents = {
  '2025-6-22': [
    { label: 'ESC Review: ESC-000009832', type: 'escalation' },
    { label: 'Follow-Up: Maria G.', type: 'follow-up' },
  ],
  '2025-6-23': [
    { label: 'Team Sync Meeting', type: 'meeting' },
    { label: 'Follow-Up: James T.', type: 'follow-up' },
  ],
  '2025-6-24': [
    { label: 'S-201 Service Appt.', type: 'follow-up' },
    { label: 'SLA Deadline: ESC-000009791', type: 'deadline' },
  ],
  '2025-6-25': [
    { label: 'Derek Osei Exec Review', type: 'escalation' },
    { label: 'S-191 Diagnostic', type: 'follow-up' },
  ],
  '2025-6-26': [
    { label: 'Training: Retention Tactics', type: 'meeting' },
  ],
  '2025-6-27': [
    { label: 'Follow-Up: Sandra O.', type: 'follow-up' },
    { label: 'S-187 Parts Delivery', type: 'follow-up' },
  ],
  '2025-6-30': [
    { label: 'Month-End Report Due', type: 'deadline' },
    { label: 'Q3 Planning Meeting', type: 'meeting' },
  ],
  '2025-7-1': [
    { label: 'Q3 Kickoff', type: 'meeting' },
  ],
  '2025-7-3': [
    { label: 'Follow-Up: Helen V.', type: 'follow-up' },
  ],
};

// ─── LOGIN ────────────────────────────────────────────────────
function selectRole(role) {
  selectedRole = role;
  document.getElementById('roleUser').classList.toggle('active', role === 'user');
  document.getElementById('roleAdmin').classList.toggle('active', role === 'admin');
}

function doLogin() {
  const email = document.getElementById('loginEmail').value;
  const name = selectedRole === 'admin' ? 'Admin Johnson' : 'Agent Smith';
  const initials = selectedRole === 'admin' ? 'AJ' : 'AS';

  currentUser = { name, initials, role: selectedRole, email };

  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('appScreen').style.display = 'block';

  // Set user info in topbar
  document.getElementById('topbarName').textContent = name;
  document.getElementById('topbarRole').textContent = selectedRole === 'admin' ? 'Administrator' : 'Agent';
  document.getElementById('userAvatarTop').textContent = initials;
  document.getElementById('dashGreeting').textContent = `Good morning, ${name} 👋`;
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileAvatar').textContent = initials;
  document.getElementById('profileNameInput').value = name;
  document.getElementById('profileRole').textContent =
    (selectedRole === 'admin' ? 'Administrator' : 'Agent') + ' · Customer Loyalty SUPLINE';

  // Show/hide admin nav
  const adminItems = ['nav-admin', 'nav-allcalendars', 'nav-reports'];
  adminItems.forEach(id => {
    document.getElementById(id).style.display = selectedRole === 'admin' ? 'flex' : 'none';
  });
  document.getElementById('adminSectionTitle').style.display = selectedRole === 'admin' ? 'block' : 'none';

  // Build dynamic content
  buildCasesTable(allCases);
  buildAgentList();
  buildAllCalendars();
  buildCalendar();

  showToast(`Welcome back, ${name}! 🎉`, 'success');
}

function doLogout() {
  document.getElementById('appScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  showToast('You have been signed out.', 'warning');
}

// ─── NAVIGATION ───────────────────────────────────────────────
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  const nav = document.getElementById('nav-' + pageId);
  if (nav) nav.classList.add('active');

  // Rebuild calendar if needed
  if (pageId === 'calendar') buildCalendar();
}

// ─── CASES TABLE ──────────────────────────────────────────────
function buildCasesTable(cases) {
  const tbody = document.getElementById('casesTableBody');
  document.getElementById('caseCount').textContent = `Showing ${cases.length} cases`;

  tbody.innerHTML = cases.map(c => `
    <tr onclick="openCaseDetail('${c.id}')" style="cursor:pointer;">
      <td><span class="case-badge ca">${c.id}</span></td>
      <td>
        <div style="font-weight:600;">${c.customer}</div>
        <div style="font-size:11px;color:var(--text-secondary);">${c.sfId}</div>
      </td>
      <td style="max-width:220px;font-size:13px;">${c.subject}</td>
      <td><span class="status-badge ${c.status}">${capitalize(c.status)}</span></td>
      <td><span class="priority-badge ${c.priority}">${capitalize(c.priority)}</span></td>
      <td>${c.agent}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${c.updated}</td>
      <td>
        <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openModal('newFollowup')">📞 Follow-Up</button>
      </td>
    </tr>
  `).join('');
}

function filterCases(status) {
  const filtered = status === 'all' ? allCases : allCases.filter(c => c.status === status);
  buildCasesTable(filtered);
}

// ─── CASE DETAIL MODAL ────────────────────────────────────────
function openCaseDetail(caseId) {
  const c = allCases.find(x => x.id === caseId) || {
    id: caseId, customer: 'Customer', subject: 'Case details', status: 'open',
    priority: 'medium', agent: 'Agent Smith', updated: 'Today', sfId: 'SF-0012XXXXX'
  };

  document.getElementById('caseDetailTitle').innerHTML =
    `<span class="case-badge ca">${c.id}</span> &nbsp; Case Details`;

  document.getElementById('caseDetailBody').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Customer</div>
        <div style="font-size:15px;font-weight:600;">${c.customer}</div>
        <div style="font-size:12px;color:var(--accent);">${c.sfId}</div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Status</div>
        <span class="status-badge ${c.status}">${capitalize(c.status)}</span>
        &nbsp; <span class="priority-badge ${c.priority}">${capitalize(c.priority)}</span>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Assigned Agent</div>
        <div style="font-size:14px;font-weight:600;">${c.agent}</div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Last Updated</div>
        <div style="font-size:14px;">${c.updated}</div>
      </div>
    </div>
    <div style="margin-bottom:16px;">
      <div style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Subject</div>
      <div style="font-size:14px;padding:10px;background:var(--bg-main);border-radius:6px;">${c.subject}</div>
    </div>
    <div class="form-field">
      <label>Update Status</label>
      <select>
        <option ${c.status==='open'?'selected':''}>Open</option>
        <option ${c.status==='pending'?'selected':''}>Pending</option>
        <option ${c.status==='escalated'?'selected':''}>Escalated</option>
        <option ${c.status==='resolved'?'selected':''}>Resolved</option>
      </select>
    </div>
    <div class="form-field">
      <label>Add Note</label>
      <textarea placeholder="Add a case note or update..."></textarea>
    </div>
    <div style="display:flex;align-items:center;gap:8px;padding:10px;background:#f0f0ff;border-radius:8px;font-size:13px;">
      <span>🟪</span> <span>Create Teams reminder for this case</span>
      <input type="checkbox" style="margin-left:auto;" />
    </div>
  `;

  openModal('caseDetail');
}

// ─── AGENT LIST (ADMIN) ───────────────────────────────────────
function buildAgentList() {
  const container = document.getElementById('agentList');
  container.innerHTML = agents.map(a => `
    <div class="user-row" onclick="showToast('Opening ${a.name}\\'s calendar...','success')">
      <div class="avatar-wrap">
        <div class="user-row-avatar" style="background:${a.color};">${a.initials}</div>
        ${a.online ? `<div class="online-dot"></div>` : ''}
      </div>
      <div>
        <div class="user-row-name">${a.name}</div>
        <div class="user-row-title">${a.title} ${a.online ? '· <span style="color:var(--success);font-size:11px;">Online</span>' : '· <span style="color:var(--text-secondary);font-size:11px;">Away</span>'}</div>
      </div>
      <div style="flex:1;padding:0 16px;">
        <div style="font-size:11px;color:var(--text-secondary);margin-bottom:4px;">Workload</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (a.cases/15)*100)}%;"></div></div>
      </div>
      <div class="user-row-stats">
        <div class="user-row-stat">
          <div class="user-row-stat-val">${a.cases}</div>
          <div class="user-row-stat-label">Cases</div>
        </div>
        <div class="user-row-stat">
          <div class="user-row-stat-val" style="color:var(--danger);">${a.escalations}</div>
          <div class="user-row-stat-label">ESC</div>
        </div>
        <div class="user-row-stat">
          <div class="user-row-stat-val" style="color:var(--warning);">${a.followups}</div>
          <div class="user-row-stat-label">Follow-Ups</div>
        </div>
        <div class="user-row-stat">
          <div class="user-row-stat-val" style="color:${parseFloat(a.sla)>=90?'var(--success)':'var(--warning)'};">${a.sla}</div>
          <div class="user-row-stat-label">SLA</div>
        </div>
      </div>
      <div style="margin-left:8px;">
        <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); showPage('allcalendars')">📅 Calendar</button>
      </div>
    </div>
  `).join('');
}

// ─── ALL CALENDARS (ADMIN) ────────────────────────────────────
const agentCalEvents = {
  'Lisa Park': { '2025-6-22': ['ESC Review 2PM'], '2025-6-23': ['Client call 10AM'], '2025-6-25': ['Team standup 9AM'], '2025-6-27': ['Follow-up: Patricia Lam'] },
  'Mike Davis': { '2025-6-22': ['CA-0000422998 review'], '2025-6-24': ['S-191 Diagnostic'], '2025-6-26': ['Training session'] },
  'Agent Smith': { '2025-6-22': ['ESC-000009832 2PM', 'Follow-Up: Maria G. 3:30PM'], '2025-6-24': ['S-201 Service'], '2025-6-25': ['Derek Osei Review'] },
  'Jordan Price': { '2025-6-23': ['New case review'], '2025-6-26': ['Coaching session'], '2025-6-30': ['Month-end wrap'] },
};

function buildAllCalendars() {
  const container = document.getElementById('allCalendarsContainer');
  const agentKeys = Object.keys(agentCalEvents);

  container.innerHTML = agentKeys.map(agentName => {
    const ag = agents.find(a => a.name === agentName) || { initials: agentName.split(' ').map(n=>n[0]).join(''), color: '#0078d4' };
    const events = agentCalEvents[agentName];
    const eventCount = Object.values(events).reduce((sum, e) => sum + e.length, 0);

    const eventItems = Object.entries(events).map(([date, evts]) => {
      const d = new Date(date.replace(/-(\d+)-(\d+)$/, '-$1-$2'));
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return evts.map(ev => `
        <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);">
          <span style="font-size:11px;font-weight:700;color:var(--text-secondary);min-width:50px;">${label}</span>
          <span style="font-size:12px;flex:1;">${ev}</span>
          <span style="font-size:10px;background:#e3f2fd;color:#0078d4;padding:2px 6px;border-radius:3px;">Teams</span>
        </div>
      `).join('');
    }).join('');

    return `
      <div class="card">
        <div class="card-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:50%;background:${ag.color};display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:13px;">${ag.initials}</div>
            <div>
              <div class="card-title">${agentName}</div>
              <div style="font-size:11px;color:var(--text-secondary);">${eventCount} upcoming events</div>
            </div>
          </div>
          <span class="teams-connected" style="font-size:11px;">🟪 Synced</span>
        </div>
        <div class="card-body" style="padding-top:8px;">
          ${eventItems || '<div style="color:var(--text-secondary);font-size:13px;text-align:center;padding:16px;">No upcoming events</div>'}
        </div>
      </div>
    `;
  }).join('');
}

// ─── CALENDAR ─────────────────────────────────────────────────
function buildCalendar() {
  const grid = document.getElementById('calGrid');
  const title = document.getElementById('calMonthTitle');

  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
  title.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrev = new Date(currentYear, currentMonth, 0).getDate();

  let html = days.map(d => `<div class="cal-header">${d}</div>`).join('');

  let dayCount = 1;
  let nextCount = 1;
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    let dayNum, isOther = false, isToday = false;

    if (i < firstDay) {
      dayNum = daysInPrev - firstDay + i + 1;
      isOther = true;
    } else if (dayCount > daysInMonth) {
      dayNum = nextCount++;
      isOther = true;
    } else {
      dayNum = dayCount;
      isToday = (dayNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear());
      dayCount++;
    }

    const dateKey = `${currentYear}-${currentMonth + 1}-${isOther ? (i < firstDay ? dayNum : dayNum) : dayNum}`;
    const events = calendarEvents[dateKey] || [];
    const eventHtml = events.slice(0, 3).map(ev =>
      `<div class="cal-event ${ev.type}">${ev.label}</div>`
    ).join('');

    const moreHtml = events.length > 3 ? `<div style="font-size:10px;color:var(--text-secondary);">+${events.length - 3} more</div>` : '';

    html += `
      <div class="cal-day ${isOther ? 'other-month' : ''} ${isToday ? 'today' : ''}"
           onclick="calDayClick(${dayNum}, ${isOther})">
        <div class="cal-day-num">${isToday ? `<span>${dayNum}</span>` : dayNum}</div>
        ${eventHtml}${moreHtml}
      </div>
    `;
  }

  grid.innerHTML = html;
}

function changeMonth(dir) {
  currentMonth += dir;
  if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  buildCalendar();
}

function calDayClick(day, isOther) {
  if (!isOther) {
    showToast(`Opening schedule for ${getMonthName(currentMonth)} ${day}...`, 'success');
  }
}

function getMonthName(m) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m];
}

// ─── MODALS ───────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById('modal-' + id);
  if (el) el.classList.add('open');
}

function closeModal(id) {
  const el = document.getElementById('modal-' + id);
  if (el) el.classList.remove('open');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ─── FORM SUBMISSIONS ─────────────────────────────────────────
function submitNewCase() {
  closeModal('newCase');
  showToast('✅ Case CA-0000424001 created & Teams reminder set!', 'success');
}

function submitFollowup() {
  closeModal('newFollowup');
  showToast('✅ Follow-up scheduled & added to Teams Calendar!', 'success');
}

function submitEscalation() {
  closeModal('newEscalation');
  showToast('⚠️ Escalation ESC-000009851 created successfully!', 'success');
}

function submitService() {
  closeModal('newService');
  showToast('🔧 Service Order S-202 created successfully!', 'success');
}

function submitReminder() {
  closeModal('newReminder');
  showToast('🟪 Reminder added to Microsoft Teams Calendar!', 'success');
}

// ─── TOAST NOTIFICATIONS ──────────────────────────────────────
function showToast(message, type = 'default') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', warning: '⚠️', danger: '❌', default: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 280);
  }, 3500);
}

// ─── GLOBAL SEARCH ────────────────────────────────────────────
const searchItems = [
  { label: 'CA-0000423891', sub: 'Maria Gonzalez – Billing dispute', type: 'ca', page: 'cases' },
  { label: 'CA-0000423742', sub: 'James Thornton – Service interruption', type: 'ca', page: 'cases' },
  { label: 'CA-0000423601', sub: 'Patricia Lam – Cancellation request', type: 'ca', page: 'cases' },
  { label: 'ESC-000009832', sub: 'Maria Gonzalez – Billing overdue', type: 'esc', page: 'escalations' },
  { label: 'ESC-000009791', sub: 'Patricia Lam – Retention failure', type: 'esc', page: 'escalations' },
  { label: 'ESC-000009745', sub: 'Derek Osei – Exec complaint', type: 'esc', page: 'escalations' },
  { label: 'S-201', sub: 'Maria Gonzalez – Equipment Replacement', type: 'srv', page: 'services' },
  { label: 'S-198', sub: 'Robert Kim – Installation', type: 'srv', page: 'services' },
  { label: 'S-184', sub: 'Robert Kim – Installation (Completed)', type: 'srv', page: 'services' },
  { label: 'Maria Gonzalez', sub: 'SF-001243891 – Platinum Customer', type: 'ca', page: 'customers' },
  { label: 'James Thornton', sub: 'SF-001243742 – Gold Customer', type: 'ca', page: 'customers' },
  { label: 'Patricia Lam', sub: 'SF-001243601 – Platinum Customer', type: 'esc', page: 'customers' },
  { label: 'Robert Kim', sub: 'SF-001243455 – Silver Customer', type: 'srv', page: 'customers' },
];

function handleSearch(query) {
  const dropdown = document.getElementById('searchDropdown');
  if (!query.trim()) {
    dropdown.classList.remove('open');
    return;
  }

  const q = query.toLowerCase();
  const results = searchItems.filter(item =>
    item.label.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-result-item" style="color:var(--text-secondary);">No results found</div>`;
  } else {
    dropdown.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="searchNavigate('${r.page}', '${r.label}')">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="case-badge ${r.type}" style="font-size:11px;padding:2px 6px;">${r.label}</span>
          <span style="font-size:12px;color:var(--text-secondary);">${r.sub}</span>
        </div>
      </div>
    `).join('');
  }

  dropdown.classList.add('open');
}

function searchNavigate(page, label) {
  document.getElementById('globalSearch').value = label;
  document.getElementById('searchDropdown').classList.remove('open');
  showPage(page);
  showToast(`Navigated to: ${label}`, 'success');
}

function closeSearchDelay() {
  setTimeout(() => {
    document.getElementById('searchDropdown').classList.remove('open');
  }, 200);
}

// ─── UTILITY ──────────────────────────────────────────────────
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    document.getElementById('searchDropdown').classList.remove('open');
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('globalSearch').focus();
  }
});

// ─── INIT ─────────────────────────────────────────────────────
window.addEventListener('load', function() {
  // Pre-fill greeting based on time
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  // Will be set on login
});