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
  { name: 'Lisa Park', initials: 'LP', title: 'Senior Agent', color: '#0078d4', cases: 8, escalations: 2, followups: 5, online: true },
  { name: 'Mike Davis', initials: 'MD', title: 'Agent', color: '#107c10', cases: 7, escalations: 2, followups: 4, online: true },
  { name: 'Agent Smith', initials: 'AS', title: 'Agent', color: '#8b2fc9', cases: 12, escalations: 4, followups: 9, online: true },
  { name: 'Jordan Price', initials: 'JP', title: 'Junior Agent', color: '#ff8c00', cases: 5, escalations: 1, followups: 3, online: false },
  { name: 'Samantha Cruz', initials: 'SC', title: 'Agent', color: '#d13438', cases: 6, escalations: 0, followups: 4, online: true },
  { name: 'Bryan Lee', initials: 'BL', title: 'Agent', color: '#038387', cases: 4, escalations: 1, followups: 2, online: false },
  { name: 'Angela Moore', initials: 'AM', title: 'Senior Agent', color: '#464eb8', cases: 9, escalations: 1, followups: 6, online: true },
  { name: 'Tyler Grant', initials: 'TG', title: 'Junior Agent', color: '#107c10', cases: 3, escalations: 0, followups: 2, online: true },
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

  const emailEl = document.getElementById('loginEmail');
  const titleEl = document.getElementById('loginTitle');
  const subtitleEl = document.getElementById('loginSubtitle');

  if (role === 'admin') {
    if (emailEl) emailEl.value = 'admin.johnson@testcompany.com';
    if (titleEl) titleEl.textContent = 'Administrator Login';
    if (subtitleEl) subtitleEl.textContent = 'Signing in as Supervisor / Admin';
  } else {
    if (emailEl) emailEl.value = 'agent.smith@testcompany.com';
    if (titleEl) titleEl.textContent = 'Welcome Back';
    if (subtitleEl) subtitleEl.textContent = 'Sign in to your workspace';
  }
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
  if (selectedRole === 'admin') buildUnassignedCases();

  // Init credits & AM approvals for all roles
  initCreditsAndAm();

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

  // Rebuild admin page if needed
  if (pageId === 'admin') {
    buildAgentList();
    buildUnassignedCases();
  }

  // Rebuild credits page
  if (pageId === 'credits') {
    showingAllCredits = (currentUser.role === 'admin');
    const title = document.getElementById('creditTableTitle');
    if (title) title.textContent = currentUser.role === 'admin' ? 'All Team Credit Requests' : 'My Credit Requests';
    const btn = document.getElementById('creditViewToggleBtn');
    if (btn) btn.textContent = currentUser.role === 'admin' ? '👤 My Requests Only' : '👥 View Team Requests';
    buildCreditTable(getVisibleCredits());
    buildCreditStats(getVisibleCredits());
  }

  // Rebuild AM approvals page
  if (pageId === 'amapprovals') {
    showingAllAm = (currentUser.role === 'admin');
    const title = document.getElementById('amTableTitle');
    if (title) title.textContent = currentUser.role === 'admin' ? 'All Team AM Approval Requests' : 'My AM Approval Requests';
    const btn = document.getElementById('amViewToggleBtn');
    if (btn) btn.textContent = currentUser.role === 'admin' ? '👤 My Requests Only' : '👥 View Team Requests';
    buildAmTable(getVisibleAm());
    buildAmStats(getVisibleAm());
  }
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
    <div class="user-row">
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
      </div>
      <div style="margin-left:8px;display:flex;gap:6px;">
        <button class="btn btn-sm btn-accent" onclick="event.stopPropagation(); openAssignCase('${a.name}')">📋 Assign Case</button>
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
});// ─── CREDITS & AM APPROVALS ──────────────────────────────────────────────────

let creditRequests = [
  { id: 'CRE-10081', customer: 'Maria Gonzalez', caseRef: 'CA-0000423891', amount: 45.00, type: 'Billing Error', reason: 'Duplicate charge applied on June billing cycle. Customer disputed and verified.', submittedBy: 'Agent Smith', date: 'Today 9:15 AM', status: 'pending', sfStatus: '—' },
  { id: 'CRE-10080', customer: 'James Thornton', caseRef: 'CA-0000423742', amount: 25.00, type: 'Service Outage', reason: 'Service was down for 3 days. Customer requested compensation.', submittedBy: 'Agent Smith', date: 'Yesterday', status: 'sf-pending', sfStatus: 'Pending Sync' },
  { id: 'CRE-10079', customer: 'Patricia Lam', caseRef: 'ESC-000009791', amount: 75.00, type: 'Retention Offer', reason: 'Customer threatening to cancel. Offered credit to retain.', submittedBy: 'Lisa Park', date: 'Jun 20, 2025', status: 'approved', sfStatus: 'Applied' },
  { id: 'CRE-10078', customer: 'Derek Osei', caseRef: 'ESC-000009745', amount: 120.00, type: 'Goodwill Credit', reason: 'Multiple tech failures. Executive complaint. Credit approved as goodwill.', submittedBy: 'Mike Davis', date: 'Jun 19, 2025', status: 'approved', sfStatus: 'Applied' },
  { id: 'CRE-10077', customer: 'Helen Vargas', caseRef: 'CA-0000422801', amount: 30.00, type: 'Billing Error', reason: 'Customer charged incorrect rate for 2 months.', submittedBy: 'Agent Smith', date: 'Jun 18, 2025', status: 'denied', sfStatus: '—' },
  { id: 'CRE-10076', customer: 'Sandra Okafor', caseRef: 'CA-0000423301', amount: 20.00, type: 'Equipment Issue', reason: 'Equipment delayed. Customer inconvenienced.', submittedBy: 'Angela Moore', date: 'Jun 17, 2025', status: 'pending', sfStatus: '—' },
];

let amApprovals = [
  { id: 'AM-00054', customer: 'Maria Gonzalez', caseRef: 'CA-0000423891', type: 'Early Termination Waiver', details: 'Customer wants to cancel. Requesting ETF waiver to retain. Contract value: $2,528.40 remaining.', submittedBy: 'Agent Smith', date: 'Today 10:05 AM', priority: 'high', status: 'pending', sfStatus: '—' },
  { id: 'AM-00053', customer: 'Patricia Lam', caseRef: 'ESC-000009791', type: 'Retention Exception', details: 'Customer requesting rate reduction for 6 months. Needs AM override on pricing.', submittedBy: 'Lisa Park', date: 'Today 8:30 AM', priority: 'high', status: 'pending', sfStatus: '—' },
  { id: 'AM-00052', customer: 'James Thornton', caseRef: 'CA-0000423742', type: 'Contract Exception', details: 'Customer requesting contract extension at current rate. Needs AM sign-off.', submittedBy: 'Agent Smith', date: 'Yesterday', priority: 'medium', status: 'pending', sfStatus: '—' },
  { id: 'AM-00051', customer: 'Derek Osei', caseRef: 'ESC-000009745', type: 'Discount Override', details: '15% loyalty discount requested. Outside standard agent authority.', submittedBy: 'Mike Davis', date: 'Jun 20, 2025', priority: 'medium', status: 'sf-pending', sfStatus: 'Pending Sync' },
  { id: 'AM-00050', customer: 'Robert Kim', caseRef: 'S-184', type: 'Service Plan Change', details: 'Customer requested upgrade to Enterprise plan at residential rate.', submittedBy: 'Agent Smith', date: 'Jun 19, 2025', priority: 'low', status: 'approved', sfStatus: 'Applied' },
  { id: 'AM-00049', customer: 'Helen Vargas', caseRef: 'CA-0000422801', type: 'Refund Request', details: 'Partial refund for unused months. Customer claims billing started before install.', submittedBy: 'Agent Smith', date: 'Jun 18, 2025', priority: 'medium', status: 'denied', sfStatus: '—' },
];

let showingAllCredits = false;
let showingAllAm = false;
let currentReviewCreditId = null;
let currentReviewAmId = null;

// ── Credit Requests ────────────────────────────────────────────────────────────

function getVisibleCredits() {
  if (showingAllCredits || currentUser.role === 'admin') return creditRequests;
  return creditRequests.filter(c => c.submittedBy === currentUser.name);
}

function toggleCreditView() {
  showingAllCredits = !showingAllCredits;
  const btn = document.getElementById('creditViewToggleBtn');
  const title = document.getElementById('creditTableTitle');
  if (showingAllCredits) {
    btn.textContent = '👤 My Requests Only';
    title.textContent = 'All Team Credit Requests';
  } else {
    btn.textContent = '👥 View Team Requests';
    title.textContent = 'My Credit Requests';
  }
  buildCreditTable(getVisibleCredits());
  buildCreditStats(getVisibleCredits());
}

function filterCredits(status) {
  const base = getVisibleCredits();
  const filtered = status === 'all' ? base : base.filter(c => c.status === status);
  buildCreditTable(filtered);
}

function buildCreditTable(list) {
  const tbody = document.getElementById('creditTableBody');
  if (!tbody) return;
  const isAdmin = currentUser.role === 'admin';
  tbody.innerHTML = list.map(c => `
    <tr>
      <td><span style="font-family:monospace;font-size:12px;font-weight:700;color:var(--primary);">${c.id}</span></td>
      <td><strong>${c.customer}</strong></td>
      <td><span class="case-badge ${c.caseRef.startsWith('ESC') ? 'esc' : 'ca'}" style="font-size:11px;">${c.caseRef}</span></td>
      <td><span style="font-size:15px;font-weight:800;color:#107c10;">$${c.amount.toFixed(2)}</span></td>
      <td><span style="font-size:12px;background:#f3f4f6;padding:2px 8px;border-radius:4px;">${c.type}</span></td>
      <td style="font-size:12px;">${c.submittedBy}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${c.date}</td>
      <td><span class="credit-status-badge ${c.status}">${creditStatusLabel(c.status)}</span></td>
      <td><span style="font-size:11px;color:${c.sfStatus==='Applied'?'var(--success)':'var(--text-secondary)'};">${c.sfStatus}</span></td>
      <td>
        ${isAdmin && c.status === 'pending'
          ? `<button class="btn btn-sm btn-accent" onclick="openReviewCredit('${c.id}')">Review</button>`
          : c.status === 'pending'
            ? `<span style="font-size:11px;color:var(--warning);">⏳ Awaiting review</span>`
            : `<button class="btn btn-sm btn-ghost" onclick="openReviewCredit('${c.id}')">View</button>`
        }
      </td>
    </tr>
  `).join('');
}

function buildCreditStats(list) {
  const pending  = list.filter(c => c.status === 'pending').length;
  const approved = list.filter(c => c.status === 'approved' || c.status === 'sf-pending').length;
  const denied   = list.filter(c => c.status === 'denied').length;
  const total    = list.filter(c => c.status === 'approved').reduce((s, c) => s + c.amount, 0);
  const pEl = document.getElementById('creditStatPending');  if (pEl) pEl.textContent = pending;
  const aEl = document.getElementById('creditStatApproved'); if (aEl) aEl.textContent = approved;
  const dEl = document.getElementById('creditStatDenied');   if (dEl) dEl.textContent = denied;
  const tEl = document.getElementById('creditStatTotal');    if (tEl) tEl.textContent = '$' + total.toFixed(2);
}

function creditStatusLabel(status) {
  return { pending: '⏳ Pending', approved: '✅ Approved', denied: '❌ Denied', 'sf-pending': '☁️ SF Pending' }[status] || status;
}

function openReviewCredit(id) {
  const c = creditRequests.find(x => x.id === id);
  if (!c) return;
  currentReviewCreditId = id;
  document.getElementById('reviewCreditBody').innerHTML = `
    <div class="credit-review-grid">
      <div class="credit-review-field">
        <div class="credit-review-label">Request ID</div>
        <div class="credit-review-value">${c.id}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Credit Amount</div>
        <div class="credit-amount-display">$${c.amount.toFixed(2)}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Customer</div>
        <div class="credit-review-value">${c.customer}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Case / Reference</div>
        <div class="credit-review-value">${c.caseRef}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Credit Type</div>
        <div class="credit-review-value">${c.type}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Submitted By</div>
        <div class="credit-review-value">${c.submittedBy} · ${c.date}</div>
      </div>
    </div>
    <div style="background:var(--bg-main);border-radius:8px;padding:12px;margin-bottom:8px;">
      <div class="credit-review-label" style="margin-bottom:6px;">Reason / Justification</div>
      <div style="font-size:13px;line-height:1.6;">${c.reason}</div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:12px;">Current Status:</span>
      <span class="credit-status-badge ${c.status}">${creditStatusLabel(c.status)}</span>
      ${c.sfStatus !== '—' ? `<span style="font-size:12px;color:var(--accent);">· SF: ${c.sfStatus}</span>` : ''}
    </div>
  `;
  document.getElementById('reviewCreditNotes').value = '';
  openModal('reviewCredit');
}

function resolveCredit(newStatus) {
  const c = creditRequests.find(x => x.id === currentReviewCreditId);
  if (!c) return;
  c.status = newStatus;
  c.sfStatus = newStatus === 'sf-pending' ? 'Pending Sync' : newStatus === 'approved' ? 'Applied' : '—';
  closeModal('reviewCredit');
  const labels = { approved: '✅ Credit approved!', denied: '❌ Credit request denied.', 'sf-pending': '☁️ Approved — pending Salesforce sync.' };
  showToast(labels[newStatus] + ' Agent notified via Teams.', newStatus === 'denied' ? 'danger' : 'success');
  buildCreditTable(getVisibleCredits());
  buildCreditStats(getVisibleCredits());
  buildDashCreditList();
  buildAdminDashCreditList();
  updateCreditNavBadge();
}

function submitCreditRequest() {
  const customer = document.getElementById('creditCustomer').value;
  const amount   = parseFloat(document.getElementById('creditAmount').value);
  const caseRef  = document.getElementById('creditCaseRef').value;
  const type     = document.getElementById('creditType').value;
  const reason   = document.getElementById('creditReason').value;
  if (!customer || !amount || !reason) { showToast('Please fill in all required fields.', 'danger'); return; }
  const newId = 'CRE-1' + String(82 + creditRequests.length).padStart(4, '0');
  creditRequests.unshift({
    id: newId, customer, caseRef: caseRef || '—', amount, type, reason,
    submittedBy: currentUser.name,
    date: 'Just now', status: 'pending', sfStatus: '—'
  });
  closeModal('newCredit');
  showToast('💲 Credit request ' + newId + ' submitted! Supervisor notified via Teams.', 'success');
  buildCreditTable(getVisibleCredits());
  buildCreditStats(getVisibleCredits());
  buildDashCreditList();
  buildAdminDashCreditList();
  updateCreditNavBadge();
  document.getElementById('creditCustomer').value = '';
  document.getElementById('creditAmount').value = '';
  document.getElementById('creditCaseRef').value = '';
  document.getElementById('creditReason').value = '';
}

function updateCreditNavBadge() {
  const pending = creditRequests.filter(c => c.status === 'pending').length;
  const el = document.getElementById('creditNavBadge');
  if (el) { el.textContent = pending; el.style.display = pending > 0 ? 'inline-flex' : 'none'; }
}

// ── AM Approvals ───────────────────────────────────────────────────────────────

function getVisibleAm() {
  if (showingAllAm || currentUser.role === 'admin') return amApprovals;
  return amApprovals.filter(a => a.submittedBy === currentUser.name);
}

function toggleAmView() {
  showingAllAm = !showingAllAm;
  const btn = document.getElementById('amViewToggleBtn');
  const title = document.getElementById('amTableTitle');
  if (showingAllAm) {
    btn.textContent = '👤 My Requests Only';
    title.textContent = 'All Team AM Approval Requests';
  } else {
    btn.textContent = '👥 View Team Requests';
    title.textContent = 'My AM Approval Requests';
  }
  buildAmTable(getVisibleAm());
  buildAmStats(getVisibleAm());
}

function filterAmApprovals(status) {
  const base = getVisibleAm();
  const filtered = status === 'all' ? base : base.filter(a => a.status === status);
  buildAmTable(filtered);
}

function buildAmTable(list) {
  const tbody = document.getElementById('amTableBody');
  if (!tbody) return;
  const isAdmin = currentUser.role === 'admin';
  tbody.innerHTML = list.map(a => `
    <tr>
      <td><span style="font-family:monospace;font-size:12px;font-weight:700;color:#8b2fc9;">${a.id}</span></td>
      <td><strong>${a.customer}</strong></td>
      <td><span class="case-badge ${a.caseRef.startsWith('ESC') ? 'esc' : a.caseRef.startsWith('S-') ? 'srv' : 'ca'}" style="font-size:11px;">${a.caseRef}</span></td>
      <td><span style="font-size:12px;background:#f3e5f5;color:#8b2fc9;padding:2px 8px;border-radius:4px;font-weight:600;">${a.type}</span></td>
      <td style="font-size:12px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.details}</td>
      <td style="font-size:12px;">${a.submittedBy}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${a.date}</td>
      <td><span class="credit-status-badge ${a.status}">${creditStatusLabel(a.status)}</span></td>
      <td><span style="font-size:11px;color:${a.sfStatus==='Applied'?'var(--success)':'var(--text-secondary)'};">${a.sfStatus}</span></td>
      <td>
        ${isAdmin && a.status === 'pending'
          ? `<button class="btn btn-sm btn-accent" style="background:linear-gradient(135deg,#8b2fc9,#b060ff);" onclick="openReviewAm('${a.id}')">Review</button>`
          : a.status === 'pending'
            ? `<span style="font-size:11px;color:var(--warning);">⏳ Awaiting AM</span>`
            : `<button class="btn btn-sm btn-ghost" onclick="openReviewAm('${a.id}')">View</button>`
        }
      </td>
    </tr>
  `).join('');
}

function buildAmStats(list) {
  const pending   = list.filter(a => a.status === 'pending').length;
  const approved  = list.filter(a => a.status === 'approved').length;
  const denied    = list.filter(a => a.status === 'denied').length;
  const sfPending = list.filter(a => a.status === 'sf-pending').length;
  const pEl = document.getElementById('amStatPending');   if (pEl) pEl.textContent = pending;
  const aEl = document.getElementById('amStatApproved');  if (aEl) aEl.textContent = approved;
  const dEl = document.getElementById('amStatDenied');    if (dEl) dEl.textContent = denied;
  const sEl = document.getElementById('amStatSfPending'); if (sEl) sEl.textContent = sfPending;
}

function openReviewAm(id) {
  const a = amApprovals.find(x => x.id === id);
  if (!a) return;
  currentReviewAmId = id;
  document.getElementById('reviewAmBody').innerHTML = `
    <div class="credit-review-grid">
      <div class="credit-review-field">
        <div class="credit-review-label">Request ID</div>
        <div class="credit-review-value">${a.id}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Priority</div>
        <div class="credit-review-value"><span class="priority-badge ${a.priority}">${capitalize(a.priority)}</span></div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Customer</div>
        <div class="credit-review-value">${a.customer}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Case / Reference</div>
        <div class="credit-review-value">${a.caseRef}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Approval Type</div>
        <div class="credit-review-value" style="color:#8b2fc9;">${a.type}</div>
      </div>
      <div class="credit-review-field">
        <div class="credit-review-label">Submitted By</div>
        <div class="credit-review-value">${a.submittedBy} · ${a.date}</div>
      </div>
    </div>
    <div style="background:var(--bg-main);border-radius:8px;padding:12px;margin-bottom:8px;">
      <div class="credit-review-label" style="margin-bottom:6px;">Details / Justification</div>
      <div style="font-size:13px;line-height:1.6;">${a.details}</div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:12px;">Current Status:</span>
      <span class="credit-status-badge ${a.status}">${creditStatusLabel(a.status)}</span>
      ${a.sfStatus !== '—' ? `<span style="font-size:12px;color:var(--accent);">· SF: ${a.sfStatus}</span>` : ''}
    </div>
  `;
  document.getElementById('reviewAmNotes').value = '';
  openModal('reviewAm');
}

function resolveAm(newStatus) {
  const a = amApprovals.find(x => x.id === currentReviewAmId);
  if (!a) return;
  a.status = newStatus;
  a.sfStatus = newStatus === 'sf-pending' ? 'Pending Sync' : newStatus === 'approved' ? 'Applied' : '—';
  closeModal('reviewAm');
  const labels = { approved: '✅ AM Approval granted!', denied: '❌ AM Approval denied.', 'sf-pending': '☁️ Approved — pending Salesforce sync.' };
  showToast(labels[newStatus] + ' Agent notified via Teams.', newStatus === 'denied' ? 'danger' : 'success');
  buildAmTable(getVisibleAm());
  buildAmStats(getVisibleAm());
  buildDashAmList();
  buildAdminDashAmList();
  updateAmNavBadge();
}

function submitAmApproval() {
  const customer = document.getElementById('amCustomer').value;
  const type     = document.getElementById('amApprovalType').value;
  const caseRef  = document.getElementById('amCaseRef').value;
  const priority = document.getElementById('amPriority').value;
  const details  = document.getElementById('amDetails').value;
  if (!customer || !details) { showToast('Please fill in all required fields.', 'danger'); return; }
  const newId = 'AM-000' + (55 + amApprovals.length);
  amApprovals.unshift({
    id: newId, customer, caseRef: caseRef || '—', type, details,
    submittedBy: currentUser.name,
    date: 'Just now', priority, status: 'pending', sfStatus: '—'
  });
  closeModal('newAmApproval');
  showToast('✍️ AM Approval ' + newId + ' submitted! Associate Manager notified via Teams.', 'success');
  buildAmTable(getVisibleAm());
  buildAmStats(getVisibleAm());
  buildDashAmList();
  buildAdminDashAmList();
  updateAmNavBadge();
  document.getElementById('amCustomer').value = '';
  document.getElementById('amCaseRef').value = '';
  document.getElementById('amDetails').value = '';
}

function updateAmNavBadge() {
  const pending = amApprovals.filter(a => a.status === 'pending').length;
  const el = document.getElementById('amNavBadge');
  if (el) { el.textContent = pending; el.style.display = pending > 0 ? 'inline-flex' : 'none'; }
}

// ── Dashboard Quick Lists ──────────────────────────────────────────────────────

function buildDashCreditList() {
  const el = document.getElementById('dashCreditList');
  if (!el) return;
  const mine = creditRequests.filter(c => c.submittedBy === currentUser.name).slice(0, 4);
  if (mine.length === 0) {
    el.innerHTML = '<div style="text-align:center;color:var(--text-secondary);font-size:13px;padding:12px;">No credit requests yet</div>';
    return;
  }
  el.innerHTML = mine.map(c => `
    <div class="dash-request-item">
      <div class="dash-request-dot" style="background:${c.status==='pending'?'#ff8c00':c.status==='approved'||c.status==='sf-pending'?'#107c10':'#d13438'};"></div>
      <div class="dash-request-info">
        <div class="dash-request-name">${c.customer}</div>
        <div class="dash-request-sub">${c.id} · ${c.type} · <span class="credit-status-badge ${c.status}" style="font-size:10px;padding:1px 6px;">${creditStatusLabel(c.status)}</span></div>
      </div>
      <div class="dash-request-amount">$${c.amount.toFixed(2)}</div>
    </div>
  `).join('');
}

function buildDashAmList() {
  const el = document.getElementById('dashAmList');
  if (!el) return;
  const mine = amApprovals.filter(a => a.submittedBy === currentUser.name).slice(0, 4);
  if (mine.length === 0) {
    el.innerHTML = '<div style="text-align:center;color:var(--text-secondary);font-size:13px;padding:12px;">No AM approvals yet</div>';
    return;
  }
  el.innerHTML = mine.map(a => `
    <div class="dash-request-item">
      <div class="dash-request-dot" style="background:${a.status==='pending'?'#8b2fc9':a.status==='approved'||a.status==='sf-pending'?'#107c10':'#d13438'};"></div>
      <div class="dash-request-info">
        <div class="dash-request-name">${a.customer}</div>
        <div class="dash-request-sub">${a.id} · ${a.type} · <span class="credit-status-badge ${a.status}" style="font-size:10px;padding:1px 6px;">${creditStatusLabel(a.status)}</span></div>
      </div>
      <span class="priority-badge ${a.priority}" style="font-size:10px;flex-shrink:0;">${capitalize(a.priority)}</span>
    </div>
  `).join('');
}

function buildAdminDashCreditList() {
  const el = document.getElementById('adminDashCreditList');
  if (!el) return;
  const pending = creditRequests.filter(c => c.status === 'pending').slice(0, 5);
  const countEl = document.getElementById('adminCreditCount');
  if (countEl) countEl.textContent = pending.length + ' pending';
  if (pending.length === 0) {
    el.innerHTML = '<div style="text-align:center;color:var(--success);font-size:13px;padding:12px;">✅ All caught up!</div>';
    return;
  }
  el.innerHTML = pending.map(c => `
    <div class="dash-request-item">
      <div class="dash-request-dot" style="background:#ff8c00;"></div>
      <div class="dash-request-info">
        <div class="dash-request-name">${c.customer} <span style="color:var(--text-secondary);font-weight:400;">— ${c.submittedBy}</span></div>
        <div class="dash-request-sub">${c.id} · ${c.type}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <div class="dash-request-amount">$${c.amount.toFixed(2)}</div>
        <button class="btn btn-sm btn-accent" style="font-size:10px;padding:3px 8px;" onclick="openReviewCredit('${c.id}')">Review</button>
      </div>
    </div>
  `).join('');
}

function buildAdminDashAmList() {
  const el = document.getElementById('adminDashAmList');
  if (!el) return;
  const pending = amApprovals.filter(a => a.status === 'pending').slice(0, 5);
  const countEl = document.getElementById('adminAmCount');
  if (countEl) countEl.textContent = pending.length + ' pending';
  if (pending.length === 0) {
    el.innerHTML = '<div style="text-align:center;color:var(--success);font-size:13px;padding:12px;">✅ All caught up!</div>';
    return;
  }
  el.innerHTML = pending.map(a => `
    <div class="dash-request-item">
      <div class="dash-request-dot" style="background:#8b2fc9;"></div>
      <div class="dash-request-info">
        <div class="dash-request-name">${a.customer} <span style="color:var(--text-secondary);font-weight:400;">— ${a.submittedBy}</span></div>
        <div class="dash-request-sub">${a.id} · ${a.type}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="priority-badge ${a.priority}" style="font-size:10px;">${capitalize(a.priority)}</span>
        <button class="btn btn-sm btn-accent" style="font-size:10px;padding:3px 8px;background:linear-gradient(135deg,#8b2fc9,#b060ff);" onclick="openReviewAm('${a.id}')">Review</button>
      </div>
    </div>
  `).join('');
}

function initCreditsAndAm() {
  buildDashCreditList();
  buildDashAmList();
  updateCreditNavBadge();
  updateAmNavBadge();
  if (currentUser.role === 'admin') {
    buildAdminDashCreditList();
    buildAdminDashAmList();
    const adminRow = document.getElementById('adminCreditAmRow');
    if (adminRow) adminRow.style.display = 'grid';
  }
}
// ─── CODE YELLOW MONTH FILTER ────────────────────────────────────────────────

function filterCodeYellowMonth(period) {
  const labels = {
    'current': 'This Month',
    'last': 'Last Month',
    '2months': '2 Months Ago',
    'all': 'All Time'
  };
  const counts = { 'current': 5, 'last': 7, '2months': 4, 'all': 8 };
  const el = document.getElementById('cyStatFiltered');
  if (el) el.textContent = counts[period] || 5;
  showToast('Code Yellow filter: ' + (labels[period] || period), 'success');
}

// ─── CASE ASSIGNMENT (ADMIN) ──────────────────────────────────────────────────

// Unassigned cases pool - cases not yet assigned to a specific agent
let unassignedCases = [
  { id: 'CA-0000424201', customer: 'Kevin Brooks', sfId: 'SF-001244201', subject: 'Billing discrepancy – overcharge on last invoice', status: 'open', priority: 'high', updated: 'Today 8:45 AM' },
  { id: 'CA-0000424187', customer: 'Denise Fuller', sfId: 'SF-001244187', subject: 'Service outage – no connectivity since yesterday', status: 'open', priority: 'high', updated: 'Today 7:30 AM' },
  { id: 'CA-0000424155', customer: 'Marcus Webb', sfId: 'SF-001244155', subject: 'Equipment upgrade request – new router needed', status: 'pending', priority: 'medium', updated: 'Yesterday 5:10 PM' },
  { id: 'CA-0000424130', customer: 'Tina Morales', sfId: 'SF-001244130', subject: 'Contract renewal question – pricing concern', status: 'open', priority: 'medium', updated: 'Yesterday 3:22 PM' },
  { id: 'CA-0000424102', customer: 'Leon Patterson', sfId: 'SF-001244102', subject: 'Loyalty discount not applied – needs review', status: 'pending', priority: 'low', updated: 'Jun 21, 2025' },
];

function buildUnassignedCases() {
  const tbody = document.getElementById('unassignedCasesBody');
  const countEl = document.getElementById('unassignedCount');
  if (!tbody) return;

  if (countEl) countEl.textContent = unassignedCases.length + ' unassigned';

  if (unassignedCases.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--success);font-weight:600;">✅ All cases have been assigned!</td></tr>`;
    return;
  }

  tbody.innerHTML = unassignedCases.map(c => `
    <tr>
      <td><span class="case-badge ca">${c.id}</span></td>
      <td><strong>${c.customer}</strong><div style="font-size:11px;color:var(--text-secondary);">${c.sfId}</div></td>
      <td style="font-size:13px;max-width:220px;">${c.subject}</td>
      <td><span class="priority-badge ${c.priority}">${capitalize(c.priority)}</span></td>
      <td><span class="status-badge ${c.status}">${capitalize(c.status)}</span></td>
      <td>
        <button class="btn btn-sm btn-accent" onclick="openAssignCase('', '${c.id}')">📋 Assign</button>
      </td>
    </tr>
  `).join('');
}

function openAssignCase(agentName, caseId) {
  // Populate the case select dropdown
  const caseSelect = document.getElementById('assignCaseSelect');
  if (caseSelect) {
    caseSelect.innerHTML = '<option value="">— Choose a case —</option>' +
      unassignedCases.map(c => `<option value="${c.id}">${c.id} – ${c.customer} (${capitalize(c.priority)} priority)</option>`).join('');
    if (caseId) caseSelect.value = caseId;
    caseSelect.onchange = function() { previewAssignCase(this.value); };
    if (caseId) previewAssignCase(caseId);
  }

  // Populate the agent select dropdown
  const agentSelect = document.getElementById('assignAgentSelect');
  if (agentSelect) {
    agentSelect.innerHTML = '<option value="">— Choose an agent —</option>' +
      agents.map(a => {
        const workload = a.cases + a.escalations;
        const statusDot = a.online ? '🟢' : '⚫';
        return `<option value="${a.name}" ${a.name === agentName ? 'selected' : ''}>${statusDot} ${a.name} (${a.title}) – ${a.cases} cases, ${a.escalations} ESC</option>`;
      }).join('');
  }

  const notes = document.getElementById('assignNotes');
  if (notes) notes.value = '';

  openModal('assignCase');
}

function previewAssignCase(caseId) {
  const preview = document.getElementById('assignCasePreview');
  const previewBody = document.getElementById('assignCasePreviewBody');
  if (!preview || !previewBody) return;

  if (!caseId) {
    preview.style.display = 'none';
    return;
  }

  const c = unassignedCases.find(x => x.id === caseId);
  if (!c) { preview.style.display = 'none'; return; }

  previewBody.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div><div style="font-size:11px;color:var(--text-secondary);">Case #</div><div style="font-weight:600;">${c.id}</div></div>
      <div><div style="font-size:11px;color:var(--text-secondary);">Customer</div><div style="font-weight:600;">${c.customer}</div></div>
      <div><div style="font-size:11px;color:var(--text-secondary);">Priority</div><span class="priority-badge ${c.priority}">${capitalize(c.priority)}</span></div>
      <div><div style="font-size:11px;color:var(--text-secondary);">Status</div><span class="status-badge ${c.status}">${capitalize(c.status)}</span></div>
    </div>
    <div style="margin-top:8px;font-size:13px;color:var(--text-secondary);">${c.subject}</div>
  `;
  preview.style.display = 'block';
}

function submitCaseAssignment() {
  const caseId    = document.getElementById('assignCaseSelect')?.value;
  const agentName = document.getElementById('assignAgentSelect')?.value;
  const notes     = document.getElementById('assignNotes')?.value;

  if (!caseId) { showToast('Please select a case to assign.', 'danger'); return; }
  if (!agentName) { showToast('Please select an agent.', 'danger'); return; }

  const c = unassignedCases.find(x => x.id === caseId);
  if (!c) return;

  // Add to allCases with assigned agent
  allCases.unshift({
    id: c.id,
    customer: c.customer,
    sfId: c.sfId,
    subject: c.subject,
    status: c.status,
    priority: c.priority,
    agent: agentName,
    updated: 'Just now'
  });

  // Update agent case count
  const agent = agents.find(a => a.name === agentName);
  if (agent) agent.cases += 1;

  // Remove from unassigned queue
  unassignedCases = unassignedCases.filter(x => x.id !== caseId);

  closeModal('assignCase');
  showToast(`✅ ${caseId} assigned to ${agentName}! They've been notified via Teams.`, 'success');

  // Rebuild all affected views
  buildUnassignedCases();
  buildAgentList();
  buildCasesTable(allCases);

  // Update nav badge
  const unassignedBadgeVal = unassignedCases.length;
}
