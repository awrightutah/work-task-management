// ─── CREDITS & AM APPROVALS ──────────────────────────────────────────────────

let creditRequests = [
  { id: 'CR-00081', customer: 'Maria Gonzalez', caseRef: 'CA-0000423891', amount: 45.00, type: 'Billing Error', reason: 'Duplicate charge applied on June billing cycle. Customer disputed and verified.', submittedBy: 'Agent Smith', date: 'Today 9:15 AM', status: 'pending', sfStatus: '—' },
  { id: 'CR-00080', customer: 'James Thornton', caseRef: 'CA-0000423742', amount: 25.00, type: 'Service Outage', reason: 'Service was down for 3 days. Customer requested compensation.', submittedBy: 'Agent Smith', date: 'Yesterday', status: 'sf-pending', sfStatus: 'Pending Sync' },
  { id: 'CR-00079', customer: 'Patricia Lam', caseRef: 'ESC-000009791', amount: 75.00, type: 'Retention Offer', reason: 'Customer threatening to cancel. Offered credit to retain.', submittedBy: 'Lisa Park', date: 'Jun 20, 2025', status: 'approved', sfStatus: 'Applied' },
  { id: 'CR-00078', customer: 'Derek Osei', caseRef: 'ESC-000009745', amount: 120.00, type: 'Goodwill Credit', reason: 'Multiple tech failures. Executive complaint. Credit approved as goodwill.', submittedBy: 'Mike Davis', date: 'Jun 19, 2025', status: 'approved', sfStatus: 'Applied' },
  { id: 'CR-00077', customer: 'Helen Vargas', caseRef: 'CA-0000422801', amount: 30.00, type: 'Billing Error', reason: 'Customer charged incorrect rate for 2 months.', submittedBy: 'Agent Smith', date: 'Jun 18, 2025', status: 'denied', sfStatus: '—' },
  { id: 'CR-00076', customer: 'Sandra Okafor', caseRef: 'CA-0000423301', amount: 20.00, type: 'Equipment Issue', reason: 'Equipment delayed. Customer inconvenienced.', submittedBy: 'Angela Moore', date: 'Jun 17, 2025', status: 'pending', sfStatus: '—' },
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
  const newId = 'CR-000' + (82 + creditRequests.length);
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