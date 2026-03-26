// ============================================================
//  CARD DETAIL OVERLAY FUNCTIONALITY
//  Click on any stat card to see details
// ============================================================

// Card Detail Data
const cardDetailData = {
  // Dashboard stats
  'openCases': {
    title: '📋 Open Cases',
    items: [
      { id: 'CA-0000423891', customer: 'Maria Gonzalez', subject: 'Billing dispute – recurring charge error', status: 'open', priority: 'high' },
      { id: 'CA-0000423742', customer: 'James Thornton', subject: 'Service interruption – no resolution after 3 contacts', status: 'pending', priority: 'medium' },
      { id: 'CA-0000423301', customer: 'Sandra Okafor', subject: 'Equipment repair – delay in parts delivery', status: 'open', priority: 'medium' },
    ]
  },
  'escalations': {
    title: '⚠️ Escalations',
    items: [
      { id: 'ESC-000009832', customer: 'Maria Gonzalez', subject: 'Billing dispute unresolved >14 days', status: 'overdue', priority: 'critical' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', subject: 'Service cancellation – retention failure', status: 'escalated', priority: 'high' },
      { id: 'ESC-000009745', customer: 'Derek Osei', subject: 'Multiple failed resolutions – exec complaint', status: 'escalated', priority: 'high' },
      { id: 'ESC-000009720', customer: 'Helen Vargas', subject: 'Refund request denied – legal threat', status: 'pending', priority: 'high' },
    ]
  },
  'followupsDue': {
    title: '📞 Follow-Ups Due',
    items: [
      { id: 'FU-001', customer: 'Maria Gonzalez', subject: 'Billing dispute – offer retention package', status: 'overdue', time: 'Overdue (was 10:00 AM)' },
      { id: 'FU-002', customer: 'James Thornton', subject: 'Send resolution summary', status: 'pending', time: 'Today 3:30 PM' },
      { id: 'FU-003', customer: 'Patricia Lam', subject: 'Retention review – escalation decision', status: 'scheduled', time: 'Today 4:00 PM' },
      { id: 'FU-004', customer: 'Robert Kim', subject: 'Confirm installation satisfaction', status: 'open', time: 'Today 5:00 PM' },
    ]
  },
  'serviceOrders': {
    title: '🔧 Service Orders',
    items: [
      { id: 'S-201', customer: 'Maria Gonzalez', subject: 'Equipment Replacement', status: 'scheduled', date: 'Jun 24, 2025' },
      { id: 'S-198', customer: 'Robert Kim', subject: 'Installation', status: 'in-progress', date: 'Jun 22, 2025' },
      { id: 'S-195', customer: 'Sandra Okafor', subject: 'Repair', status: 'delayed', date: 'Jun 20, 2025' },
      { id: 'S-191', customer: 'Derek Osei', subject: 'Diagnostic', status: 'scheduled', date: 'Jun 25, 2025' },
      { id: 'S-187', customer: 'Helen Vargas', subject: 'Network Setup', status: 'awaiting-parts', date: 'Jun 27, 2025' },
    ]
  },
  'codeRed': {
    title: '🔴 Code Red – Critical Cases',
    items: [
      { id: 'ESC-000009832', customer: 'Maria Gonzalez', subject: 'Billing dispute – unresolved, exec escalation', status: 'critical', priority: 'critical' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', subject: 'Cancellation – retention needed', status: 'critical', priority: 'critical' },
      { id: 'CA-0000422998', customer: 'Derek Osei', subject: 'Exec complaint – multiple failures', status: 'critical', priority: 'critical' },
      { id: 'ESC-000009720', customer: 'Helen Vargas', subject: 'Legal threat – refund denied', status: 'critical', priority: 'critical' },
    ]
  },
  'codeYellow': {
    title: '🟡 Code Yellow – Cancellations',
    items: [
      { id: 'CA-0000423601', customer: 'Patricia Lam', subject: 'Cancellation request submitted', status: 'warning', reason: 'Service issues' },
      { id: 'CA-0000422801', customer: 'Helen Vargas', subject: 'Cancellation pending – refund dispute', status: 'warning', reason: 'Billing dispute' },
      { id: 'CA-0000422650', customer: 'Thomas Nguyen', subject: 'Considering cancellation', status: 'at-risk', reason: 'Price increase' },
      { id: 'CA-0000422490', customer: 'Aisha Patel', subject: 'Cancellation threat during call', status: 'at-risk', reason: 'Poor service experience' },
      { id: 'CA-0000422310', customer: 'Carlos Rivera', subject: 'Loyalty reward issue – may cancel', status: 'warning', reason: 'Reward not received' },
    ]
  },
  // Follow-ups page stats
  'overdue': {
    title: '⏰ Overdue Follow-Ups',
    items: [
      { id: 'FU-001', customer: 'Maria Gonzalez', subject: 'Billing dispute – retention package', status: 'overdue', time: '2 days overdue' },
      { id: 'FU-005', customer: 'Thomas Nguyen', subject: 'Plan upgrade discussion', status: 'overdue', time: '1 day overdue' },
      { id: 'FU-008', customer: 'Aisha Patel', subject: 'Service setup confirmation', status: 'overdue', time: '4 hours overdue' },
    ]
  },
  'dueToday': {
    title: '📅 Due Today',
    items: [
      { id: 'FU-002', customer: 'James Thornton', subject: 'Resolution summary', status: 'pending', time: '3:30 PM' },
      { id: 'FU-003', customer: 'Patricia Lam', subject: 'Retention review', status: 'scheduled', time: '4:00 PM' },
      { id: 'FU-004', customer: 'Robert Kim', subject: 'Installation follow-up', status: 'open', time: '5:00 PM' },
      { id: 'FU-009', customer: 'Carlos Rivera', subject: 'Loyalty reward call', status: 'open', time: '5:30 PM' },
    ]
  },
  'thisWeek': {
    title: '📆 This Week',
    items: [
      { id: 'FU-001', customer: 'Maria Gonzalez', subject: 'Billing dispute', status: 'overdue', time: 'Mon' },
      { id: 'FU-002', customer: 'James Thornton', subject: 'Resolution summary', status: 'pending', time: 'Tue' },
      { id: 'FU-003', customer: 'Patricia Lam', subject: 'Retention review', status: 'scheduled', time: 'Tue' },
      { id: 'FU-004', customer: 'Robert Kim', subject: 'Installation follow-up', status: 'open', time: 'Tue' },
      { id: 'FU-006', customer: 'Derek Osei', subject: 'Exec review meeting', status: 'scheduled', time: 'Wed' },
      { id: 'FU-007', customer: 'Sandra Okafor', subject: 'Repair update', status: 'open', time: 'Thu' },
      { id: 'FU-010', customer: 'Helen Vargas', subject: 'Refund discussion', status: 'open', time: 'Fri' },
    ]
  },
  'completedMonth': {
    title: '✅ Completed This Month',
    items: [
      { id: 'FU-101', customer: 'Lisa Chen', subject: 'Plan upgrade completed', status: 'completed', time: 'Jun 21' },
      { id: 'FU-102', customer: 'Mike Brown', subject: 'Service restoration confirmed', status: 'completed', time: 'Jun 20' },
      { id: 'FU-103', customer: 'Sarah White', subject: 'Billing question resolved', status: 'completed', time: 'Jun 19' },
    ]
  },
  // Escalations page stats
  'activeEscalations': {
    title: '🔥 Active Escalations',
    items: [
      { id: 'ESC-000009832', customer: 'Maria Gonzalez', subject: 'Billing dispute unresolved >14 days', status: 'overdue', deadline: 'Yesterday' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', subject: 'Service cancellation – retention failure', status: 'escalated', deadline: 'Today 5:00 PM' },
      { id: 'ESC-000009745', customer: 'Derek Osei', subject: 'Multiple failed resolutions – exec complaint', status: 'escalated', deadline: 'Tomorrow' },
      { id: 'ESC-000009720', customer: 'Helen Vargas', subject: 'Refund request denied – legal threat', status: 'pending', deadline: 'Jun 28, 2025' },
    ]
  },

  'resolvedMonth': {
    title: '✅ Resolved This Month',
    items: [
      { id: 'ESC-000009700', customer: 'Amy Johnson', subject: 'Service complaint resolved', status: 'resolved', time: 'Jun 20' },
      { id: 'ESC-000009695', customer: 'Bob Williams', subject: 'Billing escalation closed', status: 'resolved', time: 'Jun 18' },
      { id: 'ESC-000009680', customer: 'Carol Davis', subject: 'Technical issue fixed', status: 'resolved', time: 'Jun 15' },
    ]
  },
  // Admin page stats
  'activeAgents': {
    title: '👥 Active Agents (247 Total)',
    items: [
      { name: 'Lisa Park', title: 'Senior Agent', status: 'online', cases: 8 },
      { name: 'Mike Davis', title: 'Agent', status: 'online', cases: 7 },
      { name: 'Agent Smith', title: 'Agent', status: 'online', cases: 12 },
      { name: 'Samantha Cruz', title: 'Agent', status: 'online', cases: 6 },
      { name: 'Angela Moore', title: 'Senior Agent', status: 'online', cases: 9 },
      { name: 'Tyler Grant', title: 'Junior Agent', status: 'online', cases: 3 },
    ]
  },
  'teamOpenCases': {
    title: '📋 Team Open Cases',
    items: [
      { id: 'CA-0000423891', customer: 'Maria Gonzalez', agent: 'Agent Smith', status: 'open' },
      { id: 'CA-0000423742', customer: 'James Thornton', agent: 'Agent Smith', status: 'pending' },
      { id: 'CA-0000423601', customer: 'Patricia Lam', agent: 'Lisa Park', status: 'escalated' },
      { id: 'CA-0000423301', customer: 'Sandra Okafor', agent: 'Agent Smith', status: 'open' },
    ]
  },
  'teamEscalations': {
    title: '⚠️ Team Escalations',
    items: [
      { id: 'ESC-000009832', customer: 'Maria Gonzalez', agent: 'Agent Smith', status: 'overdue' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', agent: 'Lisa Park', status: 'escalated' },
      { id: 'ESC-000009745', customer: 'Derek Osei', agent: 'Mike Davis', status: 'escalated' },
    ]
  },

  // Reports page stats
  'firstCallResolution': {
    title: '📞 First Call Resolution',
    items: [
      { metric: 'Current Rate', value: '92%' },
      { metric: 'Previous Month', value: '88%' },
      { metric: 'Target', value: '90%' },
      { metric: 'Improvement', value: '+4%' },
    ]
  },
  'avgResolutionTime': {
    title: '⏱️ Average Resolution Time',
    items: [
      { metric: 'Current', value: '4.2 hours' },
      { metric: 'Previous Month', value: '5.0 hours' },
      { metric: 'Target', value: '4.0 hours' },
      { metric: 'Improvement', value: '0.8 hours' },
    ]
  },

  'customerSatisfaction': {
    title: '⭐ Customer Satisfaction',
    items: [
      { metric: 'Current Score', value: '4.7/5' },
      { metric: 'Previous Month', value: '4.4/5' },
      { metric: 'Target', value: '4.5/5' },
      { metric: 'Improvement', value: '+0.3' },
    ]
  },

  // Code Red Page Stats
  'activeCodeReds': {
    title: '🔴 Active Code Reds',
    items: [
      { id: 'ESC-000009832', customer: 'Maria Gonzalez', subject: 'Billing dispute - unresolved, exec escalation', status: 'critical', priority: 'critical' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', subject: 'Cancellation threat - retention offer needed', status: 'critical', priority: 'critical' },
      { id: 'CA-0000422998', customer: 'Derek Osei', subject: 'Multiple failed resolutions - exec complaint', status: 'critical', priority: 'critical' },
      { id: 'ESC-000009720', customer: 'Helen Vargas', subject: 'Legal threat - refund denied after 3 requests', status: 'critical', priority: 'critical' },
    ]
  },
  'codeRedContactedToday': {
    title: '📞 Code Reds Contacted Today',
    items: [
      { id: 'ESC-000009832', customer: 'Maria Gonzalez', subject: 'Called at 10:15 AM - escalation review scheduled', status: 'in-progress', priority: 'critical' },
      { id: 'CA-0000422998', customer: 'Derek Osei', subject: 'Teams meeting at 2:00 PM - manager involved', status: 'in-progress', priority: 'critical' },
    ]
  },
  'codeRedResolvedWeek': {
    title: '✅ Code Reds Resolved This Week (112 Total)',
    items: [
      { id: 'ESC-000009801', customer: 'Thomas Nguyen', subject: 'Billing credit applied - customer satisfied', status: 'resolved', priority: 'high' },
      { id: 'CA-0000423102', customer: 'Aisha Patel', subject: 'Service restored - follow-up confirmed', status: 'resolved', priority: 'high' },
      { id: 'ESC-000009778', customer: 'Robert Kim', subject: 'Retention offer accepted - contract renewed', status: 'resolved', priority: 'high' },
      { id: 'CA-0000422890', customer: 'Sandra Okafor', subject: 'Equipment replaced - issue resolved', status: 'resolved', priority: 'medium' },
      { id: 'ESC-000009754', customer: 'James Thornton', subject: 'Refund processed - customer retained', status: 'resolved', priority: 'high' },
      { id: 'CA-0000422775', customer: 'Lisa Park', subject: 'Rate adjustment applied - complaint closed', status: 'resolved', priority: 'medium' },
    ]
  },

  // Code Yellow Page Stats
  'atRiskAccounts': {
    title: '🟡 At-Risk Accounts',
    items: [
      { id: 'CA-0000423601', customer: 'Patricia Lam', subject: 'Cancellation request submitted - retention pending', status: 'warning', priority: 'high' },
      { id: 'CA-0000422801', customer: 'Helen Vargas', subject: 'Cancellation pending - refund dispute ongoing', status: 'warning', priority: 'high' },
      { id: 'CA-0000422650', customer: 'Thomas Nguyen', subject: 'Considering cancellation - price increase concern', status: 'at-risk', priority: 'medium' },
      { id: 'CA-0000422490', customer: 'Aisha Patel', subject: 'Cancellation threat during call - needs callback', status: 'at-risk', priority: 'high' },
      { id: 'CA-0000422310', customer: 'Marcus Webb', subject: 'Service dissatisfaction - evaluating competitors', status: 'at-risk', priority: 'medium' },
    ]
  },
  'revenueAtRisk': {
    title: '💰 Revenue at Risk',
    items: [
      { id: 'CA-0000423601', customer: 'Patricia Lam', subject: 'Contract value: $1,240/yr - cancellation submitted', status: 'warning', priority: 'high' },
      { id: 'CA-0000422801', customer: 'Helen Vargas', subject: 'Contract value: $480/yr - billing dispute', status: 'warning', priority: 'high' },
      { id: 'CA-0000422650', customer: 'Thomas Nguyen', subject: 'Contract value: $360/yr - price sensitivity', status: 'at-risk', priority: 'medium' },
      { id: 'CA-0000422490', customer: 'Aisha Patel', subject: 'Contract value: $448/yr - poor experience', status: 'at-risk', priority: 'high' },
    ]
  },
  'retainedThisWeek': {
    title: '✅ Accounts Retained This Week (87 Total)',
    items: [
      { id: 'CA-0000422200', customer: 'Robert Kim', subject: 'Retention offer accepted - 12-month extension', status: 'resolved', priority: 'high' },
      { id: 'CA-0000422105', customer: 'Sandra Okafor', subject: 'Service credit applied - customer retained', status: 'resolved', priority: 'medium' },
      { id: 'CA-0000421980', customer: 'Mike Davis', subject: 'Plan downgrade negotiated - cancellation avoided', status: 'resolved', priority: 'medium' },
    ]
  },

  // Credit Requests Page Stats
  'creditsPending': {
    title: '⏳ Pending Credit Approvals',
    items: [
      { id: 'CRE-10081', customer: 'Maria Gonzalez', subject: 'Billing Error - $45.00 | Duplicate charge Jun cycle', status: 'pending', priority: 'medium' },
      { id: 'CRE-10076', customer: 'Sandra Okafor', subject: 'Equipment Issue - $20.00 | Equipment delivery delay', status: 'pending', priority: 'low' },
    ]
  },
  'creditsApproved': {
    title: '✅ Approved Credit Requests',
    items: [
      { id: 'CRE-10080', customer: 'James Thornton', subject: 'Service Outage - $25.00 | SF Pending Sync', status: 'scheduled', priority: 'medium' },
      { id: 'CRE-10079', customer: 'Patricia Lam', subject: 'Retention Offer - $75.00 | Applied in Salesforce', status: 'resolved', priority: 'high' },
      { id: 'CRE-10078', customer: 'Derek Osei', subject: 'Goodwill Credit - $120.00 | Applied in Salesforce', status: 'resolved', priority: 'high' },
    ]
  },
  'creditsDenied': {
    title: '❌ Denied Credit Requests',
    items: [
      { id: 'CRE-10077', customer: 'Helen Vargas', subject: 'Billing Error - $30.00 | Denied by supervisor', status: 'closed', priority: 'low' },
    ]
  },
  'creditsTotalMonth': {
    title: '💰 Total Credits Approved This Month',
    items: [
      { metric: 'Total Approved Amount', value: '$195.00' },
      { metric: 'Credits Applied in SF', value: '$195.00' },
      { metric: 'SF Pending Sync', value: '$25.00' },
      { metric: 'Requests Approved', value: '3' },
    ]
  },

  // AM Approvals Page Stats
  'amPending': {
    title: '⏳ Pending AM Approval Requests',
    items: [
      { id: 'AM-00054', customer: 'Maria Gonzalez', subject: 'Early Termination Waiver | High priority | Agent Smith', status: 'pending', priority: 'high' },
      { id: 'AM-00053', customer: 'Patricia Lam', subject: 'Retention Exception | High priority | Lisa Park', status: 'pending', priority: 'high' },
      { id: 'AM-00052', customer: 'James Thornton', subject: 'Contract Exception | Medium priority | Agent Smith', status: 'pending', priority: 'medium' },
    ]
  },
  'amApproved': {
    title: '✅ Approved AM Requests',
    items: [
      { id: 'AM-00050', customer: 'Robert Kim', subject: 'Service Plan Change | Applied in Salesforce', status: 'resolved', priority: 'low' },
    ]
  },
  'amDenied': {
    title: '❌ Denied AM Requests',
    items: [
      { id: 'AM-00049', customer: 'Helen Vargas', subject: 'Refund Request | Denied - billing start date unconfirmed', status: 'closed', priority: 'medium' },
    ]
  },
  'amSfPending': {
    title: '☁️ AM Approvals - SF Pending Sync',
    items: [
      { id: 'AM-00051', customer: 'Derek Osei', subject: 'Discount Override | 15% loyalty discount - pending Salesforce sync', status: 'scheduled', priority: 'medium' },
    ]
  }
,

  // Code Yellow new stat cards
  'codeYellowsSubmitted': {
    title: '🟡 Code Yellows Submitted This Month (193 Total)',
    items: [
      { id: 'CA-0000423891', customer: 'Maria Gonzalez', subject: 'Moving - wants to cancel service', status: 'warning', priority: 'high' },
      { id: 'CA-0000423742', customer: 'James Thornton', subject: 'Price complaint - found cheaper competitor', status: 'warning', priority: 'medium' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', subject: 'Repeated service failures - frustrated', status: 'escalated', priority: 'high' },
      { id: 'CA-0000424102', customer: 'Sandra Okafor', subject: 'Not happy with response times', status: 'pending', priority: 'medium' },
      { id: 'CA-0000422801', customer: 'Helen Vargas', subject: 'Billing confusion - considering switching', status: 'open', priority: 'low' },
      { id: 'CA-0000422650', customer: 'Thomas Nguyen', subject: 'Considering cancellation - price increase', status: 'at-risk', priority: 'medium' },
      { id: 'CA-0000422490', customer: 'Aisha Patel', subject: 'Cancellation threat during call', status: 'at-risk', priority: 'high' },
      { id: 'CA-0000422310', customer: 'Marcus Webb', subject: 'Service dissatisfaction - evaluating competitors', status: 'at-risk', priority: 'medium' },
    ]
  },
  'codeYellowFiltered': {
    title: '📅 Code Yellows - Filtered by Month',
    items: [
      { id: 'CA-0000423891', customer: 'Maria Gonzalez', subject: 'Moving - wants to cancel service', status: 'warning', priority: 'high' },
      { id: 'CA-0000423742', customer: 'James Thornton', subject: 'Price complaint - found cheaper competitor', status: 'warning', priority: 'medium' },
      { id: 'ESC-000009791', customer: 'Patricia Lam', subject: 'Repeated service failures - frustrated', status: 'escalated', priority: 'high' },
      { id: 'CA-0000424102', customer: 'Sandra Okafor', subject: 'Not happy with response times', status: 'pending', priority: 'medium' },
      { id: 'CA-0000422801', customer: 'Helen Vargas', subject: 'Billing confusion - considering switching', status: 'open', priority: 'low' },
    ]
  },
  'codeYellowFailed': {
    title: '❌ Failed Code Yellows (Not Retained)',
    items: [
      { id: 'CA-0000422200', customer: 'Robert Kim', subject: 'Cancellation processed - retention offer declined', status: 'closed', priority: 'high' },
      { id: 'CA-0000421850', customer: 'Derek Osei', subject: 'Service cancelled - customer moved to competitor', status: 'closed', priority: 'high' },
    ]
  }
};

// Function to show card detail modal
function showCardDetail(cardType) {
  const data = cardDetailData[cardType];
  if (!data) {
    showToast('No details available for this card', 'warning');
    return;
  }
  
  document.getElementById('cardDetailTitle').textContent = data.title;
  
  let bodyHtml = '';
  
  if (cardType === 'activeAgents') {
    bodyHtml = `<div style="display:grid;gap:8px;">
      ${data.items.map(item => `
        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-main);border-radius:8px;">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#0078d4,#50b3f0);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;">${item.name.split(' ').map(n=>n[0]).join('')}</div>
          <div style="flex:1;">
            <div style="font-weight:600;">${item.name}</div>
            <div style="font-size:12px;color:var(--text-secondary);">${item.title}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:var(--text-secondary);">Cases</div>
            <div style="font-weight:600;">${item.cases}</div>
          </div>
          <span style="background:${item.status==='online'?'#e8f5e9':'#fff3e0'};color:${item.status==='online'?'#107c10':'#ff8c00'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:600;">${item.status === 'online' ? '● Online' : '○ Away'}</span>
        </div>
      `).join('')}
    </div>`;
 else if (['firstCallResolution', 'avgResolutionTime', 'customerSatisfaction', 'creditsTotalMonth'].includes(cardType)) {
    bodyHtml = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      ${data.items.map(item => `
        <div style="padding:16px;background:var(--bg-main);border-radius:8px;text-align:center;">
          <div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px;">${item.metric}</div>
          <div style="font-size:24px;font-weight:700;color:var(--primary);">${item.value}</div>
        </div>
      `).join('')}
    </div>`;
  } else {
    // Default table format for case/escalation/follow-up items
    bodyHtml = `<table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:var(--bg-main);">
          <th style="padding:10px;text-align:left;border-radius:6px;">ID</th>
          <th style="padding:10px;text-align:left;border-radius:6px;">Customer</th>
          <th style="padding:10px;text-align:left;border-radius:6px;">Details</th>
          <th style="padding:10px;text-align:center;border-radius:6px;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map(item => `
          <tr style="border-bottom:1px solid var(--border);cursor:pointer;" onclick="handleCardItemClick('${item.id || ''}', '${cardType}')">
            <td style="padding:10px;"><span class="case-badge ${item.id?.startsWith('ESC') ? 'esc' : item.id?.startsWith('S-') ? 'srv' : item.id?.startsWith('CRE-') ? 'cr' : item.id?.startsWith('AM-') ? 'am' : 'ca'}">${item.id || '-'}</span></td>
            <td style="padding:10px;font-weight:600;">${item.customer || '-'}</td>
            <td style="padding:10px;font-size:13px;color:var(--text-secondary);">${item.subject || item.reason || item.time || '-'}</td>
            <td style="padding:10px;text-align:center;"><span class="status-badge ${item.status || 'open'}">${capitalizeStatus(item.status || 'open')}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
  }
  
  document.getElementById('cardDetailBody').innerHTML = bodyHtml;
  openModal('cardDetail');
}

function capitalizeStatus(str) {
  if (typeof capitalize === 'function') return capitalize(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function handleCardItemClick(id, cardType) {
  if (id.startsWith('CA-')) {
    openCaseDetail(id);
    closeModal('cardDetail');
  } else if (id.startsWith('ESC-')) {
    closeModal('cardDetail');
    showPage('escalations');
    showToast(`Viewing escalation ${id}`, 'success');
  } else if (id.startsWith('S-')) {
    closeModal('cardDetail');
    showPage('services');
    showToast(`Viewing service order ${id}`, 'success');
  } else if (id.startsWith('FU-')) {
    closeModal('cardDetail');
    showPage('followups');
    showToast(`Viewing follow-up ${id}`, 'success');
  } else if (id.startsWith('CRE-')) {
    closeModal('cardDetail');
    showPage('credits');
    showToast(`Viewing credit request ${id}`, 'success');
  } else if (id.startsWith('AM-')) {
    closeModal('cardDetail');
    showPage('amapprovals');
    showToast(`Viewing AM approval ${id}`, 'success');
  }
}

// Initialize click handlers on stat cards
function initCardClickHandlers() {
  // Dashboard stat cards
  const cardMappings = {
    // Dashboard
    '.stat-card.blue:has(.stat-label:contains("Open Cases"))': 'openCases',
    '.stat-card.red:has(.stat-label:contains("Escalations"))': 'escalations',
    '.stat-card.orange:has(.stat-label:contains("Follow-Ups"))': 'followupsDue',
    '.stat-card.teal:has(.stat-label:contains("Service"))': 'serviceOrders',
  };
  
  // Add click handlers using event delegation
  document.addEventListener('click', function(e) {
    const card = e.target.closest('.stat-card');
    if (!card) return;
    
    const label = card.querySelector('.stat-label');
    if (!label) return;
    
    const labelText = label.textContent.toLowerCase();
    
    // Determine card type from label
    let cardType = null;
    if (labelText.includes('open cases')) cardType = 'openCases';
    else if (labelText.includes('escalation')) cardType = 'escalations';
    else if (labelText.includes('follow-up') || labelText.includes('follow ups')) cardType = 'followupsDue';
    else if (labelText.includes('service')) cardType = 'serviceOrders';
    else if (labelText.includes('overdue')) cardType = 'overdue';
    else if (labelText.includes('due today')) cardType = 'dueToday';
    else if (labelText.includes('this week')) cardType = 'thisWeek';
    else if (labelText.includes('completed') && labelText.includes('month')) cardType = 'completedMonth';
    else if (labelText.includes('active') && labelText.includes('escalation')) cardType = 'activeEscalations';
    else if (labelText.includes('resolved') && labelText.includes('month')) cardType = 'resolvedMonth';
    else if (labelText.includes('active agent')) cardType = 'activeAgents';
    else if (labelText.includes('open cases') && labelText.includes('team')) cardType = 'teamOpenCases';
    else if (labelText.includes('team escalation')) cardType = 'teamEscalations';
    else if (labelText.includes('first call')) cardType = 'firstCallResolution';
    else if (labelText.includes('resolution time')) cardType = 'avgResolutionTime';
    else if (labelText.includes('customer satisfaction')) cardType = 'customerSatisfaction';
    
    if (cardType) {
      showCardDetail(cardType);
    }
  });
}

// Also handle Code Red and Code Yellow cards (they have different structure)
document.addEventListener('click', function(e) {
  const teamsPanel = e.target.closest('.teams-panel');
  if (teamsPanel) return; // Don't trigger for Teams panels
  
  // Check for Code Red/Yellow style cards
  const alertCard = e.target.closest('[style*="background: linear-gradient(135deg, #ff"]');
  if (alertCard) {
    const label = alertCard.querySelector('.stat-label, [style*="Critical"], [style*="Cancellation"]');
    if (label) {
      if (label.textContent.toLowerCase().includes('critical') || 
          alertCard.querySelector('.stat-value')?.textContent === '4') {
        showCardDetail('codeRed');
      } else if (label.textContent.toLowerCase().includes('cancellation')) {
        showCardDetail('codeYellow');
      }
    }
  }
});

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardClickHandlers);
} else {
  initCardClickHandlers();
}