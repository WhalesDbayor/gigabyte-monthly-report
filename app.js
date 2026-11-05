// Gigabyte Interactive Presentation Engine & Infographics Controller
(function() {
  'use strict';

  const data = window.GIGABYTE_DATA;
  let activeTab = 'overview';
  let chartInstances = {};

  // DOM Elements
  const navTabsContainer = document.getElementById('nav-tabs-container');
  const heroShortcutsContainer = document.getElementById('hero-shortcuts');
  const heroTakeawaysContainer = document.getElementById('hero-takeaways-container');
  const mainContentArea = document.getElementById('main-content-area');
  const printReportBtn = document.getElementById('print-report-btn');
  const scrollProgress = document.getElementById('scroll-progress');

  // Initialize Canvas Ambient Particles
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
      }
      requestAnimationFrame(render);
    }
    render();
  }

  // Scroll Progress Tracking
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  });

  // Render Dynamic Strategic Takeaways in Hero Banner
  function renderStrategicTakeaways() {
    if (!heroTakeawaysContainer) return;
    const takeaways = data.executiveOverview.strategicTakeaways;
    heroTakeawaysContainer.innerHTML = takeaways.map(item => `
      <div class="takeaway-item">
        <i data-lucide="${item.icon}"></i>
        <div>
          <div style="font-size:0.75rem; font-family:var(--font-mono); color:var(--accent-cyan); text-transform:uppercase; margin-bottom:0.25rem;">${item.department}</div>
          <strong style="color:#fff; font-size:0.92rem; display:block; margin-bottom:0.25rem;">${item.title}</strong>
          <span>${item.text}</span>
        </div>
      </div>
    `).join('');
  }

  // Render Navigation Tabs
  function renderNavigation() {
    let html = `
      <button class="nav-btn ${activeTab === 'overview' ? 'active' : ''}" data-target="overview">
        <i data-lucide="layout-dashboard"></i>
        <span>Overview</span>
      </button>
    `;

    data.staff.forEach(person => {
      const isAct = activeTab === person.id ? 'active' : '';
      const firstName = person.name.split(' ')[0];
      html += `
        <button class="nav-btn ${isAct}" data-target="${person.id}">
          <img src="${person.avatar}" class="nav-avatar-mini" alt="${person.name}">
          <span>${firstName} (${person.id === 'cro' ? 'CRO' : person.department.split(' ')[0]})</span>
        </button>
      `;
    });

    navTabsContainer.innerHTML = html;

    // Attach click events
    navTabsContainer.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        switchTab(target);
      });
    });
  }

  // Render Hero Shortcuts
  function renderHeroShortcuts() {
    let html = '';
    data.staff.forEach(person => {
      html += `
        <div class="hero-card" data-target="${person.id}">
          <img src="${person.avatar}" class="hero-card-img" alt="${person.name}">
          <div class="hero-card-info">
            <h3>${person.name}</h3>
            <p>${person.role}</p>
            <span class="hero-card-badge">${person.department}</span>
          </div>
        </div>
      `;
    });
    heroShortcutsContainer.innerHTML = html;

    heroShortcutsContainer.querySelectorAll('.hero-card').forEach(card => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        switchTab(target);
      });
    });
  }

  // Tab Switcher
  function switchTab(tabId) {
    activeTab = tabId;
    renderNavigation();

    // Hide/show views
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active-view');
    });

    const targetSection = document.getElementById(`view-${tabId}`);
    if (targetSection) {
      targetSection.classList.add('active-view');
      const topOffset = targetSection.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }

    // Refresh lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Trigger charts rendering for this specific tab
    if (tabId === 'islamiyyah') {
      initIslamiyyahCharts();
    } else if (tabId === 'samson') {
      initSamsonCharts('october');
    } else if (tabId === 'cro') {
      initCroCharts();
    } else if (tabId === 'overview') {
      initOverviewCharts();
    }
  }

  // Build Overview Page Content
  function buildOverviewPage() {
    return `
      <section id="view-overview" class="view-section active-view">
        <!-- Executive KPI Pulse Grid -->
        <div class="pulse-grid">
          ${data.executiveOverview.stats.map(stat => `
            <div class="pulse-stat-card">
              <div class="pulse-icon-box">
                <i data-lucide="${stat.icon}"></i>
              </div>
              <div class="pulse-label">${stat.label}</div>
              <div class="pulse-value">${stat.value}</div>
              <div class="pulse-delta ${stat.trend}">
                <i data-lucide="${stat.trend === 'up' ? 'arrow-up-right' : stat.trend === 'down' ? 'arrow-down-right' : 'activity'}"></i>
                ${stat.change}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Cross-Departmental Comparison Chart -->
        <div style="margin-top: 2.5rem;" class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="bar-chart-2"></i>
              <span>Hardware, Repairs & Sales Evolution (Aug — Oct 2026)</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Complete three-month velocity tracking laptop sales, inventory throughput, and service repair intake.
            </p>
            <div class="chart-box" style="height: 320px;">
              <canvas id="overview-chart-sales"></canvas>
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="pie-chart"></i>
              <span>October CRM Conversion Funnel (Damilola Afolabi Rachael)</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Breakdown of 129 recorded walk-in prospects yielding 77 closed-won conversions with 0 pending.
            </p>
            <div class="chart-box" style="height: 320px;">
              <canvas id="overview-chart-crm"></canvas>
            </div>
          </div>
        </div>

        <!-- Cross-functional Roadmap -->
        <div class="content-block full-width" style="margin-top: 2rem;">
          <div class="block-title">
            <i data-lucide="compass"></i>
            <span>Executive Strategic Action Matrix (October & Q4 Directives)</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem;">
            ${data.actionableRoadmap.map(item => `
              <div style="background: rgba(8, 12, 20, 0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem;">
                <span style="font-size:0.7rem; font-family:var(--font-mono); color:var(--accent-cyan); text-transform:uppercase;">${item.department}</span>
                <h4 style="font-size: 0.95rem; font-weight: 700; margin: 0.5rem 0; color: #fff;">${item.action}</h4>
                <div style="font-size: 0.78rem; color: var(--accent-amber); display: flex; align-items: center; gap: 0.4rem;">
                  <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
                  <span>Target: ${item.target}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // Build Islamiyyah Adebayo Page
  function buildIslamiyyahPage() {
    const p = data.staff.find(s => s.id === 'islamiyyah');
    return `
      <section id="view-islamiyyah" class="view-section">
        <!-- Profile Banner -->
        <div class="profile-banner">
          <div class="profile-left">
            <div class="profile-avatar-container">
              <img src="${p.avatar}" class="profile-avatar-img" alt="${p.name}">
            </div>
            <div class="profile-info">
              <span class="profile-dept-tag">
                <i data-lucide="shield-check"></i> ${p.department}
              </span>
              <h2>${p.name}</h2>
              <p class="profile-role">${p.role}</p>
              <p class="profile-tagline">${p.tagline}</p>
            </div>
          </div>
          <div class="profile-meta-actions">
            <div class="status-indicator">
              <span class="dot"></span>
              <span>Tri-Month Comparative Audit (Aug - Oct)</span>
            </div>
            <!-- Month Selector -->
            <div class="month-selector" id="islamiyyah-month-selector">
              <button class="month-tab-btn active" data-month="october">October 2026</button>
              <button class="month-tab-btn" data-month="september">September 2026</button>
              <button class="month-tab-btn" data-month="august">August 2026</button>
              <button class="month-tab-btn" data-month="comparison">Comparison Analytics</button>
            </div>
          </div>
        </div>

        <!-- Comparative Metrics Hero Cards -->
        <div class="comparison-hero-card">
          <div class="comparison-header">
            <h3><i data-lucide="trending-up"></i> October Milestone & Multi-Month Performance Signals</h3>
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan);">Verified Oct Audit</span>
          </div>
          <div class="comp-cards-grid">
            ${p.comparisonInsights.map(c => `
              <div class="comp-card">
                <div class="comp-top">
                  <span class="comp-metric-name">${c.title}</span>
                  <span class="comp-badge ${c.type}">${c.badge}</span>
                </div>
                <div class="comp-number">${c.metric}</div>
                <div class="comp-desc">${c.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Comparison Chart Section -->
        <div class="dept-content-grid" id="islamiyyah-chart-row">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="bar-chart"></i>
              <span>Monthly Volume Trends: Laptop Sales, Accessories & Repairs</span>
            </div>
            <div class="chart-box" style="height: 320px;">
              <canvas id="islamiyyah-volume-chart"></canvas>
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="wrench"></i>
              <span>October Laptop Repair Breakdown (81 Units Handled)</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Clear visibility on the 81 serviced units: 47 completed and collected, 22 pending diagnosis/status, and 12 exits.
            </p>
            <div class="chart-box" style="height: 240px;">
              <canvas id="islamiyyah-repair-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Dynamic Month View Container (Swapped by JS) -->
        <div id="islamiyyah-dynamic-month-content">
          <!-- Will render October, September, August or Comparison on toggle -->
        </div>
      </section>
    `;
  }

  // Build Samson Oyedapo Page
  function buildSamsonPage() {
    const p = data.staff.find(s => s.id === 'samson');
    return `
      <section id="view-samson" class="view-section">
        <!-- Profile Banner -->
        <div class="profile-banner">
          <div class="profile-left">
            <div class="profile-avatar-container">
              <img src="${p.avatar}" class="profile-avatar-img" alt="${p.name}">
            </div>
            <div class="profile-info">
              <span class="profile-dept-tag">
                <i data-lucide="video"></i> ${p.department}
              </span>
              <h2>${p.name}</h2>
              <p class="profile-role">${p.role}</p>
              <p class="profile-tagline">${p.tagline}</p>
            </div>
          </div>
          <div class="profile-meta-actions">
            <div class="status-indicator">
              <span class="dot"></span>
              <span>Tri-Month Cross-Platform Media Tracking</span>
            </div>
            <!-- Month Selector -->
            <div class="month-selector" id="samson-month-selector">
              <button class="month-tab-btn active" data-month="october">October 2026</button>
              <button class="month-tab-btn" data-month="september">September 2026</button>
              <button class="month-tab-btn" data-month="august">August 2026</button>
            </div>
          </div>
        </div>

        <!-- Strategic Media Insights Cards -->
        <div class="comparison-hero-card">
          <div class="comparison-header">
            <h3><i data-lucide="sparkles"></i> Content Strategy Breakthrough Highlights</h3>
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-purple);">Multi-Platform Reach</span>
          </div>
          <div class="comp-cards-grid">
            ${p.strategicInsights.map(c => `
              <div class="comp-card">
                <div class="comp-top">
                  <span class="comp-metric-name">${c.title}</span>
                  <span class="comp-badge positive">${c.badge}</span>
                </div>
                <div class="comp-number">${c.metric}</div>
                <div class="comp-desc">${c.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Platform Analytics Engine -->
        <div class="content-block full-width">
          <div class="block-title">
            <i data-lucide="trending-up"></i>
            <span>Cross-Platform Performance Dashboard</span>
          </div>

          <div class="platform-tabs" id="samson-plat-tabs">
            <button class="plat-btn active" data-plat="tiktok"><i data-lucide="play-circle"></i> TikTok Video Performance</button>
            <button class="plat-btn" data-plat="instagram"><i data-lucide="instagram"></i> Instagram Metrics</button>
            <button class="plat-btn" data-plat="facebook"><i data-lucide="facebook"></i> Facebook Reach</button>
          </div>

          <div id="samson-plat-stats-grid" class="pulse-grid" style="margin-bottom: 2rem;">
            <!-- Populated dynamically via JS -->
          </div>

          <div class="dept-content-grid">
            <div class="content-block">
              <div class="block-title">
                <i data-lucide="bar-chart-3"></i>
                <span>Platform Engagement Rate Across Months</span>
              </div>
              <div class="chart-box" style="height: 300px;">
                <canvas id="samson-analytics-chart"></canvas>
              </div>
            </div>

            <div class="content-block">
              <div class="block-title">
                <i data-lucide="award"></i>
                <span>Top Ranked Videos by Audience Affinity</span>
              </div>
              <div id="samson-top-videos-list" class="top-content-list">
                <!-- Populated dynamically -->
              </div>
            </div>
          </div>
        </div>

        <!-- Samson's Actionable Recommendations & Suggestions -->
        <div class="content-block full-width" style="margin-top: 2rem;">
          <div class="block-title">
            <i data-lucide="lightbulb"></i>
            <span>Samson's Key Strategic Recommendations</span>
          </div>
          <div class="rec-list">
            ${p.recommendations.map(r => `
              <div class="rec-card">
                <h4>
                  <span>${r.title}</span>
                  <span class="priority-tag high">Growth Tactic</span>
                </h4>
                <p>${r.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // Build CRO Page (Damilola Afolabi Rachael with Executive Transition Context)
  function buildCroPage() {
    const p = data.staff.find(s => s.id === 'cro');
    return `
      <section id="view-cro" class="view-section">
        <!-- Profile Banner -->
        <div class="profile-banner">
          <div class="profile-left">
            <div class="profile-avatar-container">
              <img src="${p.avatar}" class="profile-avatar-img" alt="${p.name}">
            </div>
            <div class="profile-info">
              <span class="profile-dept-tag">
                <i data-lucide="headset"></i> ${p.department}
              </span>
              <h2>${p.name}</h2>
              <p class="profile-role">${p.role}</p>
              <p class="profile-tagline">${p.tagline}</p>
            </div>
          </div>
          <div class="profile-meta-actions">
            <div class="status-indicator">
              <span class="dot"></span>
              <span>Reporting Date: ${p.reportingDate}</span>
            </div>
            <span style="font-size:0.75rem; font-family:var(--font-mono); color:var(--accent-cyan); background:rgba(0,240,255,0.08); padding:0.4rem 0.8rem; border-radius:var(--radius-full); border:1px solid rgba(0,240,255,0.2);">
              <i data-lucide="award" style="width:13px; height:13px; vertical-align:middle; display:inline-block;"></i> New CRO Administration
            </span>
          </div>
        </div>

        <!-- Executive Succession & Transition Banner -->
        <div style="background: linear-gradient(135deg, rgba(16, 24, 40, 0.95), rgba(30, 27, 75, 0.6)); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 1.25rem;">
          <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(139, 92, 246, 0.2); color: #c084fc; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="user-plus" style="width: 24px; height: 24px;"></i>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 0.75rem; font-family: var(--font-mono); color: #c084fc; text-transform: uppercase; letter-spacing: 0.05em;">Leadership Succession Notice</div>
            <h4 style="font-size: 1rem; font-weight: 700; color: #fff; margin: 0.2rem 0;">Customer Relations Leadership Transition</h4>
            <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.45;">${p.executiveTransitionNote}</p>
          </div>
        </div>

        <!-- CRO Top KPIs (October Under Damilola) -->
        <div class="pulse-grid" style="margin-bottom: 2.5rem;">
          <div class="pulse-stat-card">
            <div class="pulse-icon-box"><i data-lucide="users"></i></div>
            <div class="pulse-label">Total Walk-ins Recorded</div>
            <div class="pulse-value">${p.pipelineSummary.totalWalkIns}</div>
            <div class="pulse-delta up">+19.4% vs Sep (108 -> 129)</div>
          </div>

          <div class="pulse-stat-card">
            <div class="pulse-icon-box" style="color:#10b981; background:rgba(16,185,129,0.1);"><i data-lucide="phone-call"></i></div>
            <div class="pulse-label">Successful Follow-ups</div>
            <div class="pulse-value">${p.pipelineSummary.successfulFollowUps}</div>
            <div class="pulse-delta up">+303% Surge (363 interactions)</div>
          </div>

          <div class="pulse-stat-card">
            <div class="pulse-icon-box" style="color:#10b981; background:rgba(16,185,129,0.1);"><i data-lucide="trophy"></i></div>
            <div class="pulse-label">Won Opportunities</div>
            <div class="pulse-value" style="color:#34d399;">${p.pipelineSummary.wonOpportunities} Closed</div>
            <div class="pulse-delta up">Surged from 1 (Sep) to 77 (Oct)</div>
          </div>

          <div class="pulse-stat-card">
            <div class="pulse-icon-box" style="color:#00f0ff; background:rgba(0,240,255,0.1);"><i data-lucide="check-check"></i></div>
            <div class="pulse-label">Pending Backlog</div>
            <div class="pulse-value">0 Pending</div>
            <div class="pulse-delta up">100% Pipeline Resolution</div>
          </div>
        </div>

        <!-- Comparative Predecessor vs Current Month Banner -->
        <div class="comparison-hero-card">
          <div class="comparison-header">
            <h3><i data-lucide="git-commit"></i> Monthly Comparison: September (Oyinlade) vs October (Damilola)</h3>
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan);">Succession Performance Audit</span>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem; margin-top:0.5rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">
                  <th style="padding:0.9rem;">Metric Dimension</th>
                  <th style="padding:0.9rem;">September 2026 (Oyinlade)</th>
                  <th style="padding:0.9rem;">October 2026 (Damilola Afolabi)</th>
                  <th style="padding:0.9rem;">Performance Delta</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.9rem; font-weight:700; color:#fff;">Total Walk-Ins Logged</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">108 Customers</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">129 Customers</td>
                  <td style="padding:0.9rem; color:var(--accent-emerald); font-weight:600;">+19.4% Footfall Expansion</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.9rem; font-weight:700; color:#fff;">Follow-up Engagement</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">90 Reached</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">363 Successful Follow-ups</td>
                  <td style="padding:0.9rem; color:var(--accent-cyan); font-weight:600;">+303% Multi-Touch Follow-up Depth</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.9rem; font-weight:700; color:#fff;">Pending Follow-ups Backlog</td>
                  <td style="padding:0.9rem; color:#f59e0b;">12 Pending (Unresolved)</td>
                  <td style="padding:0.9rem; color:var(--accent-emerald);">0 Pending (Clear Queue)</td>
                  <td style="padding:0.9rem; color:var(--accent-emerald); font-weight:600;">-100% Backlog Cleared</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.9rem; font-weight:700; color:#fff;">Closed Won Conversions</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">1 Sale</td>
                  <td style="padding:0.9rem; color:#34d399; font-weight:800; font-size:1.05rem;">77 Won Opportunities</td>
                  <td style="padding:0.9rem; color:var(--accent-emerald); font-weight:700;">+7600% Explosive Revenue Impact</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.9rem; font-weight:700; color:#fff;">Lost Opportunities</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">5 Lost</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">5 Lost</td>
                  <td style="padding:0.9rem; color:#60a5fa;">Maintained Low Loss Ceiling</td>
                </tr>
                <tr>
                  <td style="padding:0.9rem; font-weight:700; color:#fff;">Unqualified Inquiries Filtered</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">15 Leads</td>
                  <td style="padding:0.9rem; color:#cbd5e1;">22 Leads</td>
                  <td style="padding:0.9rem; color:#a78bfa;">More Diligent Filtering of Non-Payers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- CRM Funnel & Conversion Journey -->
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="git-commit"></i>
              <span>October Customer Conversion Funnel</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Breakdown of 129 recorded walk-in prospects yielding 77 closed-won conversions with 0 pending.
            </p>
            <div class="funnel-container">
              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 100%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="user-check"></i> Total Walk-Ins Logged</div>
                  <div class="funnel-stage-val">129 <span class="funnel-stage-pct">(100%)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 100%; background: linear-gradient(90deg, rgba(0, 240, 255, 0.2), rgba(16, 185, 129, 0.25));"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="phone"></i> Successful Follow-ups (Multi-Touch)</div>
                  <div class="funnel-stage-val">363 <span class="funnel-stage-pct">(2.8x Depth)</span></div>
                </div>
              </div>

              <div class="funnel-stage" style="border-color: rgba(16,185,129,0.5);">
                <div class="funnel-bar-bg" style="width: 59.7%; background: rgba(16,185,129,0.3);"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name" style="color:#34d399;"><i data-lucide="trophy"></i> Won Opportunities Converted</div>
                  <div class="funnel-stage-val" style="color:#34d399;">77 <span class="funnel-stage-pct">(59.7% of Walk-ins)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 17.1%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="filter"></i> Unqualified Leads Filtered</div>
                  <div class="funnel-stage-val">22 <span class="funnel-stage-pct">(17.1%)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 3.9%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="x-circle"></i> Lost Opportunities</div>
                  <div class="funnel-stage-val">5 <span class="funnel-stage-pct">(3.9%)</span></div>
                </div>
              </div>

              <div class="funnel-stage" style="border-color: rgba(0,240,255,0.4);">
                <div class="funnel-bar-bg" style="width: 0%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name" style="color:var(--accent-cyan);"><i data-lucide="check-circle-2"></i> Pending Backlog Remaining</div>
                  <div class="funnel-stage-val" style="color:var(--accent-cyan);">0 <span class="funnel-stage-pct">(None)</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="alert-octagon"></i>
              <span>Root Causes for Lost Opportunities (5 Cases)</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Qualitative reasons identified by Damilola for the 5 lost cases in October:
            </p>
            <div class="reasons-grid" style="grid-template-columns: 1fr;">
              ${p.lostReasons.map(lr => `
                <div class="reason-card">
                  <div class="reason-icon"><i data-lucide="${lr.icon}"></i></div>
                  <div>
                    <h5>${lr.reason}</h5>
                    <p>${lr.count}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Unqualified Leads & Critical Operational Friction -->
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="filter-x"></i>
              <span>October Unqualified Leads Drivers (22 Inquiries)</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${p.unqualifiedReasons.map(u => `
                <div style="font-size:0.85rem; color:#cbd5e1; background:rgba(8,12,20,0.5); padding:0.65rem 0.95rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; align-items:center; gap:0.6rem;">
                  <i data-lucide="check-circle" style="color:var(--accent-purple); width:15px; height:15px; flex-shrink:0;"></i>
                  <span>${u}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="alert-triangle"></i>
              <span>Field Limitations Encountered (Action Needed)</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              ${p.issuesAndLimitations.map(issue => `
                <div style="background:rgba(8,12,20,0.6); padding:0.9rem 1rem; border-radius:var(--radius-md); border-left:3px solid ${issue.severity === 'high' ? 'var(--accent-rose)' : 'var(--accent-amber)'};">
                  <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.25rem;">
                    <h5 style="color:#fff; font-size:0.88rem; font-weight:700;">${issue.title}</h5>
                    <span class="priority-tag ${issue.severity === 'high' ? 'critical' : 'medium'}">${issue.tag}</span>
                  </div>
                  <p style="font-size:0.8rem; color:#cbd5e1; line-height:1.4;">${issue.detail}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- CRO Strategic Recommendations -->
        <div class="content-block full-width" style="margin-top: 2rem;">
          <div class="block-title">
            <i data-lucide="check-square"></i>
            <span>Damilola's Strategic Suggestions & Action Directives</span>
          </div>
          <div class="rec-list">
            ${p.recommendations.map(r => `
              <div class="rec-card">
                <h4>
                  <span>${r.title}</span>
                  <span class="priority-tag ${r.priority.toLowerCase()}">${r.priority}</span>
                </h4>
                <p>${r.text}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Executive Summary Note -->
        <div class="takeaway-item" style="margin-top: 2rem; border-left-color: var(--accent-cyan); background: rgba(0, 240, 255, 0.08);">
          <i data-lucide="file-text" style="color:var(--accent-cyan);"></i>
          <span><strong>CRO Executive Summary:</strong> ${p.conclusion}</span>
        </div>
      </section>
    `;
  }

  // Populate Islamiyyah Dynamic Month Views
  function renderIslamiyyahMonthView(month) {
    const p = data.staff.find(s => s.id === 'islamiyyah');
    const container = document.getElementById('islamiyyah-dynamic-month-content');
    if (!container) return;

    if (month === 'october') {
      const rep = p.octoberReport;
      container.innerHTML = `
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="alert-circle"></i>
              <span>October Field Observations (Sales & Repairs)</span>
            </div>
            <div class="obs-list">
              ${rep.observations.map(o => `
                <div class="obs-card">
                  <h4>${o.title}</h4>
                  <p>${o.text}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="check-circle"></i>
              <span>October Operational Recommendations</span>
            </div>
            <div class="rec-list">
              ${rep.recommendations.map(r => `
                <div class="rec-card">
                  <h4>${r.title}</h4>
                  <p>${r.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="takeaway-item" style="margin-top: 1.5rem;">
          <i data-lucide="file-check"></i>
          <span><strong>October Conclusion:</strong> ${rep.conclusion}</span>
        </div>
      `;
    } else if (month === 'september') {
      const rep = p.septemberReport;
      container.innerHTML = `
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="alert-circle"></i>
              <span>September Observations & Inventory Findings</span>
            </div>
            <div class="obs-list">
              ${rep.observations.map(o => `
                <div class="obs-card">
                  <h4>${o.title}</h4>
                  <p>${o.text}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="check-circle"></i>
              <span>September Operational Recommendations</span>
            </div>
            <div class="rec-list">
              ${rep.recommendations.map(r => `
                <div class="rec-card">
                  <h4>${r.title}</h4>
                  <p>${r.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="takeaway-item" style="margin-top: 1.5rem;">
          <i data-lucide="file-check"></i>
          <span><strong>September Conclusion:</strong> ${rep.conclusion}</span>
        </div>
      `;
    } else if (month === 'august') {
      const rep = p.augustReport;
      container.innerHTML = `
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="alert-circle"></i>
              <span>August Field Observations</span>
            </div>
            <div class="obs-list">
              ${rep.observations.map(o => `
                <div class="obs-card">
                  <h4>${o.title}</h4>
                  <p>${o.text}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="check-circle"></i>
              <span>August Recommendations</span>
            </div>
            <div class="rec-list">
              ${rep.recommendations.map(r => `
                <div class="rec-card">
                  <h4>${r.title}</h4>
                  <p>${r.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="takeaway-item" style="margin-top: 1.5rem;">
          <i data-lucide="file-check"></i>
          <span><strong>August Conclusion:</strong> ${rep.conclusion}</span>
        </div>
      `;
    } else if (month === 'comparison') {
      container.innerHTML = `
        <div class="content-block full-width">
          <div class="block-title">
            <i data-lucide="git-compare"></i>
            <span>August vs September vs October Detailed Operational Evolution</span>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem; margin-top:0.5rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">
                  <th style="padding:1rem;">Operational Area</th>
                  <th style="padding:1rem;">August 2026</th>
                  <th style="padding:1rem;">September 2026</th>
                  <th style="padding:1rem;">October 2026</th>
                  <th style="padding:1rem;">Strategic Direction</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:1rem; font-weight:700; color:#fff;">Laptop Sales</td>
                  <td style="padding:1rem; color:#cbd5e1;">28 Laptops</td>
                  <td style="padding:1rem; color:#cbd5e1;">27 Laptops</td>
                  <td style="padding:1rem; color:#34d399; font-weight:700;">45 Laptops (+66.7%)</td>
                  <td style="padding:1rem; color:var(--accent-emerald);">All-time monthly high</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:1rem; font-weight:700; color:#fff;">Repair Intake</td>
                  <td style="padding:1rem; color:#cbd5e1;">32 Laptops</td>
                  <td style="padding:1rem; color:#cbd5e1;">Unreported / Focused on sales</td>
                  <td style="padding:1rem; color:#60a5fa; font-weight:700;">81 Laptops (47 Resolved)</td>
                  <td style="padding:1rem; color:var(--accent-cyan);">Implement repair-to-CRO notification protocol</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:1rem; font-weight:700; color:#fff;">Accessories Tracking</td>
                  <td style="padding:1rem; color:#cbd5e1;">29 Units; Mixed records</td>
                  <td style="padding:1rem; color:#cbd5e1;">47 Units; Unclear split</td>
                  <td style="padding:1rem; color:#f59e0b; font-weight:700;">43 Units (12 Office/Gift, 31 Retail)</td>
                  <td style="padding:1rem; color:var(--accent-amber);">Enforce separate commercial sales ledger</td>
                </tr>
                <tr>
                  <td style="padding:1rem; font-weight:700; color:#fff;">Stock Audits</td>
                  <td style="padding:1rem; color:#cbd5e1;">End-of-month counts</td>
                  <td style="padding:1rem; color:#cbd5e1;">Daily sheets proposed</td>
                  <td style="padding:1rem; color:#c084fc;">Pending tracking protocol</td>
                  <td style="padding:1rem; color:var(--accent-purple);">Enforce weekly physical vs register sign-off</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Handle Samson Social Platform Switching
  function renderSamsonPlatformMetrics(platform, month) {
    const p = data.staff.find(s => s.id === 'samson');
    const platData = p.metricsSummary[month][platform];
    const grid = document.getElementById('samson-plat-stats-grid');
    const list = document.getElementById('samson-top-videos-list');
    if (!grid || !list || !platData) return;

    let cardsHtml = '';
    if (platform === 'tiktok') {
      cardsHtml = `
        <div class="pulse-stat-card">
          <div class="pulse-label">Follower Growth</div>
          <div class="pulse-value">${platData.followers}</div>
          <div class="pulse-delta ${platData.followers.startsWith('+') ? 'up' : 'down'}">TikTok Net</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Posts Published</div>
          <div class="pulse-value">${platData.posts}</div>
          <div class="pulse-delta stable">Total Videos</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Total Views</div>
          <div class="pulse-value">${platData.views}</div>
          <div class="pulse-delta up">${platData.reach ? platData.reach + ' Reach' : 'Impressions'}</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Engagement Rate</div>
          <div class="pulse-value" style="color:var(--accent-cyan);">${platData.engRate}</div>
          <div class="pulse-delta up">${platData.reactions} Reactions • ${platData.comments} Comments</div>
        </div>
      `;
    } else if (platform === 'instagram') {
      cardsHtml = `
        <div class="pulse-stat-card">
          <div class="pulse-label">Follower Delta</div>
          <div class="pulse-value">${platData.followers}</div>
          <div class="pulse-delta ${platData.followers.startsWith('+') ? 'up' : 'down'}">Audience Net</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Total Posts</div>
          <div class="pulse-value">${platData.posts}</div>
          <div class="pulse-delta stable">Published Content</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Views / Reach</div>
          <div class="pulse-value">${platData.views} / ${platData.reach || '—'}</div>
          <div class="pulse-delta up">${platData.watchTimeMin ? platData.watchTimeMin + ' Min Watch' : 'Audience Reach'}</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Engagement Rate</div>
          <div class="pulse-value">${platData.engRate}</div>
          <div class="pulse-delta stable">${platData.reactions} Reactions • ${platData.saves || 0} Saves</div>
        </div>
      `;
    } else if (platform === 'facebook') {
      cardsHtml = `
        <div class="pulse-stat-card">
          <div class="pulse-label">Follower Movement</div>
          <div class="pulse-value">${platData.followers}</div>
          <div class="pulse-delta ${platData.followers.startsWith('+') ? 'up' : 'down'}">Follower Net</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Posts Shared</div>
          <div class="pulse-value">${platData.posts}</div>
          <div class="pulse-delta stable">Total Posts</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Impressions</div>
          <div class="pulse-value">${platData.impressions}</div>
          <div class="pulse-delta up">${platData.shares ? platData.shares + ' Shares' : 'Organic Reach'}</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Engagement Rate</div>
          <div class="pulse-value">${platData.engRate}</div>
          <div class="pulse-delta stable">${platData.reactions} Reactions</div>
        </div>
      `;
    }
    grid.innerHTML = cardsHtml;

    // Render top 3 videos for selected platform and month
    const topVideos = (p.topVideos[month] && p.topVideos[month][platform]) || [];
    list.innerHTML = topVideos.map((video, idx) => `
      <div class="top-content-item">
        <div style="display:flex; align-items:center;">
          <span class="rank">#0${idx + 1}</span>
          <span class="title">${video}</span>
        </div>
        <span class="badge"><i data-lucide="star" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:3px;"></i> Top Performing</span>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Setup Chart.js Charts
  function initOverviewCharts() {
    const ctx1 = document.getElementById('overview-chart-sales');
    const ctx2 = document.getElementById('overview-chart-crm');
    if (!ctx1 || !ctx2 || !window.Chart) return;

    if (chartInstances['overview1']) chartInstances['overview1'].destroy();
    if (chartInstances['overview2']) chartInstances['overview2'].destroy();

    chartInstances['overview1'] = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Laptop Sales', 'Accessories Recorded', 'Repairs Handled'],
        datasets: [
          {
            label: 'August 2026',
            data: [28, 29, 32],
            backgroundColor: 'rgba(59, 130, 246, 0.65)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderRadius: 5
          },
          {
            label: 'September 2026',
            data: [27, 47, 0],
            backgroundColor: 'rgba(139, 92, 246, 0.7)',
            borderColor: '#8b5cf6',
            borderWidth: 1,
            borderRadius: 5
          },
          {
            label: 'October 2026',
            data: [45, 43, 81],
            backgroundColor: 'rgba(0, 240, 255, 0.85)',
            borderColor: '#00f0ff',
            borderWidth: 1,
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } } }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' } }
        }
      }
    });

    chartInstances['overview2'] = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Won Opportunities (77)', 'Unqualified Leads (22)', 'Lost Opportunities (5)', 'Pending (0)'],
        datasets: [{
          data: [77, 22, 5, 0.01],
          backgroundColor: [
            'rgba(16, 185, 129, 0.9)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(244, 63, 94, 0.8)',
            'rgba(0, 240, 255, 0.3)'
          ],
          borderColor: '#080c14',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11 } } }
        },
        cutout: '65%'
      }
    });
  }

  function initIslamiyyahCharts() {
    const ctx = document.getElementById('islamiyyah-volume-chart');
    const ctxRepair = document.getElementById('islamiyyah-repair-chart');
    if (!ctx || !window.Chart) return;
    if (chartInstances['islamiyyah']) chartInstances['islamiyyah'].destroy();
    if (chartInstances['islamiyyahRepair']) chartInstances['islamiyyahRepair'].destroy();

    chartInstances['islamiyyah'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['August', 'September', 'October'],
        datasets: [
          {
            label: 'Laptops Sold',
            data: [28, 27, 45],
            backgroundColor: 'rgba(0, 240, 255, 0.85)',
            borderColor: '#00f0ff',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Accessories Logged',
            data: [29, 47, 43],
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: '#8b5cf6',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'Repairs Handled',
            data: [32, 0, 81],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' } }
        }
      }
    });

    if (ctxRepair) {
      chartInstances['islamiyyahRepair'] = new Chart(ctxRepair, {
        type: 'doughnut',
        data: {
          labels: ['Hardware Fixed & Picked (35)', 'Software Fixed & Picked (12)', 'Pending Status (22)', 'Customer Budget/Exit (12)'],
          datasets: [{
            data: [35, 12, 22, 12],
            backgroundColor: [
              'rgba(16, 185, 129, 0.85)',
              'rgba(0, 240, 255, 0.85)',
              'rgba(245, 158, 11, 0.85)',
              'rgba(244, 63, 94, 0.85)'
            ],
            borderColor: '#080c14',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 10, font: { size: 10 } } }
          },
          cutout: '60%'
        }
      });
    }
  }

  function initSamsonCharts(month) {
    const ctx = document.getElementById('samson-analytics-chart');
    if (!ctx || !window.Chart) return;
    if (chartInstances['samson']) chartInstances['samson'].destroy();

    const p = data.staff.find(s => s.id === 'samson');

    chartInstances['samson'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['TikTok', 'Instagram', 'Facebook'],
        datasets: [
          {
            label: 'August Engagement %',
            data: [7.44, 1.72, 1.88],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderRadius: 5
          },
          {
            label: 'September Engagement %',
            data: [45.2, 2.22, 1.12],
            backgroundColor: 'rgba(139, 92, 246, 0.65)',
            borderColor: '#8b5cf6',
            borderWidth: 1,
            borderRadius: 5
          },
          {
            label: 'October Engagement %',
            data: [4.28, 1.96, 1.76],
            backgroundColor: 'rgba(0, 240, 255, 0.8)',
            borderColor: '#00f0ff',
            borderWidth: 1,
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.06)' } },
          y: { 
            ticks: { 
              color: '#94a3b8',
              callback: (val) => `${val}%` 
            }, 
            grid: { color: 'rgba(255,255,255,0.06)' } 
          }
        }
      }
    });
  }

  function initCroCharts() {
    // Handled with interactive CSS funnel and comparative tables
  }

  // Event Listeners for sub-tabs and controls
  function attachSubEventListeners() {
    // Islamiyyah month selector
    const islSelector = document.getElementById('islamiyyah-month-selector');
    if (islSelector) {
      islSelector.querySelectorAll('.month-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          islSelector.querySelectorAll('.month-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const month = btn.getAttribute('data-month');
          renderIslamiyyahMonthView(month);
        });
      });
    }

    // Samson month & platform selector
    let currentSamsonMonth = 'october';
    let currentSamsonPlat = 'tiktok';

    const samMonthSelector = document.getElementById('samson-month-selector');
    if (samMonthSelector) {
      samMonthSelector.querySelectorAll('.month-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          samMonthSelector.querySelectorAll('.month-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentSamsonMonth = btn.getAttribute('data-month');
          renderSamsonPlatformMetrics(currentSamsonPlat, currentSamsonMonth);
        });
      });
    }

    const samPlatTabs = document.getElementById('samson-plat-tabs');
    if (samPlatTabs) {
      samPlatTabs.querySelectorAll('.plat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          samPlatTabs.querySelectorAll('.plat-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentSamsonPlat = btn.getAttribute('data-plat');
          renderSamsonPlatformMetrics(currentSamsonPlat, currentSamsonMonth);
        });
      });
    }

    // Print Report
    if (printReportBtn) {
      printReportBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // Initialize Application
  function init() {
    initAmbientCanvas();

    // Inject Sections
    mainContentArea.innerHTML = `
      ${buildOverviewPage()}
      ${buildIslamiyyahPage()}
      ${buildSamsonPage()}
      ${buildCroPage()}
    `;

    renderStrategicTakeaways();
    renderNavigation();
    renderHeroShortcuts();

    // Initial default renders (October as the latest focal month)
    renderIslamiyyahMonthView('october');
    renderSamsonPlatformMetrics('tiktok', 'october');
    attachSubEventListeners();

    // Initialize initial charts
    initOverviewCharts();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Launch when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
