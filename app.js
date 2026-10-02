// Gigabyte Interactive Presentation Engine & Infographics Controller
(function() {
  'use strict';

  const data = window.GIGABYTE_DATA;
  let activeTab = 'overview';
  let chartInstances = {};

  // DOM Elements
  const navTabsContainer = document.getElementById('nav-tabs-container');
  const heroShortcutsContainer = document.getElementById('hero-shortcuts');
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
      html += `
        <button class="nav-btn ${isAct}" data-target="${person.id}">
          <img src="${person.avatar}" class="nav-avatar-mini" alt="${person.name}">
          <span>${person.name.split(' ')[0]}</span>
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
      // Scroll to content view smoothly if user is deep down
      const topOffset = targetSection.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }

    // Refresh lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Trigger charts rendering for this specific tab if needed
    if (tabId === 'islamiyyah') {
      initIslamiyyahCharts();
    } else if (tabId === 'samson') {
      initSamsonCharts('september');
    } else if (tabId === 'oyinlade') {
      initOyinladeCharts();
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
              <span>Hardware & Accessory Velocity (Aug vs Sep)</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Direct comparative view of laptop sales, accessory throughput, and service repair intake.
            </p>
            <div class="chart-box">
              <canvas id="overview-chart-sales"></canvas>
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="pie-chart"></i>
              <span>Customer Pipeline & Conversion Distribution (September)</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Breakdown of 108 recorded customer leads across successful follow-ups, lost, and pending.
            </p>
            <div class="chart-box">
              <canvas id="overview-chart-crm"></canvas>
            </div>
          </div>
        </div>

        <!-- Cross-functional Roadmap -->
        <div class="content-block full-width" style="margin-top: 2rem;">
          <div class="block-title">
            <i data-lucide="compass"></i>
            <span>Integrated Strategic Action Matrix</span>
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
              <span>Dual-Month Comparative Report</span>
            </div>
            <!-- Month Selector -->
            <div class="month-selector" id="islamiyyah-month-selector">
              <button class="month-tab-btn" data-month="august">August 2026</button>
              <button class="month-tab-btn active" data-month="september">September 2026</button>
              <button class="month-tab-btn" data-month="comparison">Comparison Analytics</button>
            </div>
          </div>
        </div>

        <!-- Comparative Metrics Hero Cards -->
        <div class="comparison-hero-card">
          <div class="comparison-header">
            <h3><i data-lucide="trending-up"></i> August vs September Performance Signals</h3>
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-cyan);">Q3 Reconciled</span>
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
              <span>Monthly Volume Comparison: Laptop Sales & Accessories</span>
            </div>
            <div class="chart-box">
              <canvas id="islamiyyah-volume-chart"></canvas>
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="layers"></i>
              <span>Accessory Distribution Challenge Matrix</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              The 47 recorded accessories in September require systematic breakdown to prevent margin erosion:
            </p>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(8,12,20,0.6); padding:0.85rem 1.1rem; border-radius:var(--radius-md); border-left:3px solid var(--accent-cyan);">
                <div>
                  <h5 style="color:#fff; font-size:0.88rem;">1. Sold Separately</h5>
                  <p style="font-size:0.76rem; color:var(--text-muted);">Direct cash/transfer retail purchases</p>
                </div>
                <span class="priority-tag high">Separate Ledger</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(8,12,20,0.6); padding:0.85rem 1.1rem; border-radius:var(--radius-md); border-left:3px solid var(--accent-purple);">
                <div>
                  <h5 style="color:#fff; font-size:0.88rem;">2. Complimentary Gifts</h5>
                  <p style="font-size:0.76rem; color:var(--text-muted);">Promotional giveaways (bags, stickers, flash drives)</p>
                </div>
                <span class="priority-tag medium">Zero-Price Tag</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(8,12,20,0.6); padding:0.85rem 1.1rem; border-radius:var(--radius-md); border-left:3px solid var(--accent-amber);">
                <div>
                  <h5 style="color:#fff; font-size:0.88rem;">3. Bundled with Laptops</h5>
                  <p style="font-size:0.76rem; color:var(--text-muted);">Chargers, wired/wireless mouse, laptop sleeves</p>
                </div>
                <span class="priority-tag high">Tag to Laptop ID</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(8,12,20,0.6); padding:0.85rem 1.1rem; border-radius:var(--radius-md); border-left:3px solid var(--accent-emerald);">
                <div>
                  <h5 style="color:#fff; font-size:0.88rem;">4. Balance in Physical Stock</h5>
                  <p style="font-size:0.76rem; color:var(--text-muted);">Unsold units verified during weekly reconciliation</p>
                </div>
                <span class="priority-tag critical">Weekly Audit</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dynamic Month View Container (Swapped by JS) -->
        <div id="islamiyyah-dynamic-month-content">
          <!-- Will render September or August on toggle -->
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
              <span>August & September Cross-Platform Media</span>
            </div>
            <!-- Month Selector -->
            <div class="month-selector" id="samson-month-selector">
              <button class="month-tab-btn" data-month="august">August</button>
              <button class="month-tab-btn active" data-month="september">September</button>
            </div>
          </div>
        </div>

        <!-- Strategic Media Insights Cards -->
        <div class="comparison-hero-card">
          <div class="comparison-header">
            <h3><i data-lucide="sparkles"></i> Content Strategy Breakthrough Highlights</h3>
            <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--accent-purple);">Organic Social Traction</span>
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
                <span>Engagement Rate & View Progression</span>
              </div>
              <div class="chart-box">
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

  // Build Oyinlade Omokanye (CRO) Page
  function buildOyinladePage() {
    const p = data.staff.find(s => s.id === 'oyinlade');
    return `
      <section id="view-oyinlade" class="view-section">
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
              ${p.comparisonNote}
            </span>
          </div>
        </div>

        <!-- CRO Top KPIs -->
        <div class="pulse-grid" style="margin-bottom: 2.5rem;">
          <div class="pulse-stat-card">
            <div class="pulse-icon-box"><i data-lucide="users"></i></div>
            <div class="pulse-label">Total Walk-ins Recorded</div>
            <div class="pulse-value">${p.pipelineSummary.totalWalkIns}</div>
            <div class="pulse-delta baseline">CRM Ground Baseline</div>
          </div>

          <div class="pulse-stat-card">
            <div class="pulse-icon-box" style="color:#10b981; background:rgba(16,185,129,0.1);"><i data-lucide="phone-call"></i></div>
            <div class="pulse-label">Successful Follow-ups</div>
            <div class="pulse-value">${p.pipelineSummary.successfulFollowUps}</div>
            <div class="pulse-delta up">${p.pipelineSummary.followUpRate} Contact Rate</div>
          </div>

          <div class="pulse-stat-card">
            <div class="pulse-icon-box" style="color:#f59e0b; background:rgba(245,158,11,0.1);"><i data-lucide="clock"></i></div>
            <div class="pulse-label">Pending In Pipeline</div>
            <div class="pulse-value">${p.pipelineSummary.pendingFollowUps}</div>
            <div class="pulse-delta stable">Active In Re-engagement</div>
          </div>

          <div class="pulse-stat-card">
            <div class="pulse-icon-box" style="color:#8b5cf6; background:rgba(139,92,246,0.1);"><i data-lucide="check-circle-2"></i></div>
            <div class="pulse-label">Won Sales & Conversion</div>
            <div class="pulse-value">${p.pipelineSummary.wonOpportunities} Won</div>
            <div class="pulse-delta baseline">5 Lost / 15 Unqualified</div>
          </div>
        </div>

        <!-- CRM Funnel & Conversion Journey -->
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="git-commit"></i>
              <span>Customer Conversion Pipeline Funnel</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Full walkthrough of walk-in prospects from front-desk entry to closed outcomes.
            </p>
            <div class="funnel-container">
              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 100%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="user-check"></i> Total Walk-Ins Logged</div>
                  <div class="funnel-stage-val">108 <span class="funnel-stage-pct">(100%)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 83.3%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="phone"></i> Successfully Followed Up</div>
                  <div class="funnel-stage-val">90 <span class="funnel-stage-pct">(83.3%)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 13.9%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="filter"></i> Unqualified Leads Filtered</div>
                  <div class="funnel-stage-val">15 <span class="funnel-stage-pct">(13.9%)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 11.1%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="clock"></i> Pending Consideration / Review</div>
                  <div class="funnel-stage-val">12 <span class="funnel-stage-pct">(11.1%)</span></div>
                </div>
              </div>

              <div class="funnel-stage">
                <div class="funnel-bar-bg" style="width: 4.6%;"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name"><i data-lucide="x-circle"></i> Lost Opportunities</div>
                  <div class="funnel-stage-val">5 <span class="funnel-stage-pct">(4.6%)</span></div>
                </div>
              </div>

              <div class="funnel-stage" style="border-color: rgba(16,185,129,0.5);">
                <div class="funnel-bar-bg" style="width: 1%; background: rgba(16,185,129,0.3);"></div>
                <div class="funnel-stage-content">
                  <div class="funnel-stage-name" style="color:#34d399;"><i data-lucide="trophy"></i> Won Converted Sale</div>
                  <div class="funnel-stage-val" style="color:#34d399;">1 <span class="funnel-stage-pct">(Closed)</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="help-circle"></i>
              <span>Pending Follow-ups Status Breakdown</span>
            </div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:1rem;">
              Qualitative reasons identified for the 12 customers currently in pending state:
            </p>
            <div style="display:flex; flex-direction:column; gap:0.75rem;">
              ${p.pendingBreakdown.map(item => `
                <div style="background:rgba(8,12,20,0.6); padding:0.85rem 1rem; border-radius:var(--radius-md); border-left:3px solid var(--accent-amber); display:flex; align-items:center; gap:0.75rem;">
                  <i data-lucide="hourglass" style="color:var(--accent-amber); width:18px; height:18px; flex-shrink:0;"></i>
                  <span style="font-size:0.85rem; color:#e2e8f0;">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Lost Opportunities & Unqualified Root Causes -->
        <div class="dept-content-grid">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="alert-octagon"></i>
              <span>Why Opportunities Were Lost (5 Cases)</span>
            </div>
            <div class="reasons-grid">
              ${p.lostReasons.map(lr => `
                <div class="reason-card">
                  <div class="reason-icon"><i data-lucide="${lr.icon}"></i></div>
                  <div>
                    <h5>${lr.reason}</h5>
                    <p>Status: ${lr.count}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="filter-x"></i>
              <span>Unqualified Leads Breakdown (15 Leads)</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${p.unqualifiedReasons.map(u => `
                <div style="font-size:0.85rem; color:#cbd5e1; background:rgba(8,12,20,0.5); padding:0.6rem 0.9rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; align-items:center; gap:0.5rem;">
                  <i data-lucide="check" style="color:var(--accent-purple); width:15px; height:15px; flex-shrink:0;"></i>
                  <span>${u}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Technical & Non-Technical Issues and Limitations -->
        <div class="content-block full-width">
          <div class="block-title">
            <i data-lucide="alert-triangle"></i>
            <span>Identified Operational Issues & System Limitations</span>
          </div>
          <div class="split-box-container">
            <div class="split-box tech">
              <h4><i data-lucide="cpu"></i> Technical & Infrastructure Limitations</h4>
              <ul>
                ${p.issuesAndLimitations.technical.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
            <div class="split-box nontech">
              <h4><i data-lucide="shield-alert"></i> Non-Technical & Channel Security Risks</h4>
              <ul>
                ${p.issuesAndLimitations.nonTechnical.map(nt => `<li>${nt}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- CRO Observations & Recommendations -->
        <div class="dept-content-grid" style="margin-top: 2rem;">
          <div class="content-block">
            <div class="block-title">
              <i data-lucide="eye"></i>
              <span>Key Field Observations</span>
            </div>
            <div class="obs-list">
              ${p.observations.map(o => `
                <div class="obs-card">
                  <p>${o}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="content-block">
            <div class="block-title">
              <i data-lucide="check-square"></i>
              <span>Strategic Action Recommendations</span>
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
        </div>

        <!-- Executive Summary Note -->
        <div class="takeaway-item" style="margin-top: 2rem; border-left-color: var(--accent-purple); background: rgba(139, 92, 246, 0.08);">
          <i data-lucide="file-text" style="color:var(--accent-purple);"></i>
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

    if (month === 'august') {
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
    } else if (month === 'comparison') {
      container.innerHTML = `
        <div class="content-block full-width">
          <div class="block-title">
            <i data-lucide="git-compare"></i>
            <span>August vs September Detailed Workflow Evolution</span>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.88rem; margin-top:0.5rem;">
              <thead>
                <tr style="border-bottom:1px solid var(--border-subtle); color:var(--text-muted); font-size:0.8rem; text-transform:uppercase;">
                  <th style="padding:1rem;">Operational Area</th>
                  <th style="padding:1rem;">August State</th>
                  <th style="padding:1rem;">September State</th>
                  <th style="padding:1rem;">Q4 Action Directive</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:1rem; font-weight:700; color:#fff;">Laptop Sales Tracking</td>
                  <td style="padding:1rem; color:#cbd5e1;">28 Laptops Sold (Recorded)</td>
                  <td style="padding:1rem; color:#cbd5e1;">27 Laptops Sold (Accurate)</td>
                  <td style="padding:1rem; color:var(--accent-emerald);">Maintain ledger accuracy</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:1rem; font-weight:700; color:#fff;">Hardware Repairs</td>
                  <td style="padding:1rem; color:#cbd5e1;">32 Laptops intake; Missing dates & statuses</td>
                  <td style="padding:1rem; color:#cbd5e1;">Refocused on sales & accessories</td>
                  <td style="padding:1rem; color:var(--accent-cyan);">Implement unique job cards with pickup timestamps</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:1rem; font-weight:700; color:#fff;">Accessories Tracking</td>
                  <td style="padding:1rem; color:#cbd5e1;">29 Units; Mixed with laptop sales</td>
                  <td style="padding:1rem; color:#cbd5e1;">47 Units; Unclear split (Sold vs Gift vs Bundle)</td>
                  <td style="padding:1rem; color:var(--accent-amber);">Enforce 4-column daily register</td>
                </tr>
                <tr>
                  <td style="padding:1rem; font-weight:700; color:#fff;">Stock Audits</td>
                  <td style="padding:1rem; color:#cbd5e1;">End-of-month manual counts</td>
                  <td style="padding:1rem; color:#cbd5e1;">Daily reconciliation suggested</td>
                  <td style="padding:1rem; color:var(--accent-purple);">Assign single custody officer with daily sign-off</td>
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
    if (!grid || !list) return;

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
          <div class="pulse-delta up">Video Impressions</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Engagement Rate</div>
          <div class="pulse-value" style="color:var(--accent-cyan);">${platData.engRate}</div>
          <div class="pulse-delta up">${platData.reactions} Reactions</div>
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
          <div class="pulse-value">${platData.views} / ${platData.reach}</div>
          <div class="pulse-delta up">Audience Reach</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Engagement Rate</div>
          <div class="pulse-value">${platData.engRate}</div>
          <div class="pulse-delta stable">${platData.reactions} Reactions</div>
        </div>
      `;
    } else if (platform === 'facebook') {
      cardsHtml = `
        <div class="pulse-stat-card">
          <div class="pulse-label">Follower Movement</div>
          <div class="pulse-value">${platData.followers}</div>
          <div class="pulse-delta down">Follower Net</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Posts Shared</div>
          <div class="pulse-value">${platData.posts}</div>
          <div class="pulse-delta stable">Total Posts</div>
        </div>
        <div class="pulse-stat-card">
          <div class="pulse-label">Impressions</div>
          <div class="pulse-value">${platData.impressions}</div>
          <div class="pulse-delta up">Organic Reach</div>
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
    const topVideos = p.topVideos[month][platform] || [];
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
        labels: ['Laptop Sales', 'Accessories Recorded', 'Repair Intake'],
        datasets: [
          {
            label: 'August 2026',
            data: [28, 29, 32],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'September 2026',
            data: [27, 47, 0],
            backgroundColor: 'rgba(0, 240, 255, 0.8)',
            borderColor: '#00f0ff',
            borderWidth: 1,
            borderRadius: 6
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
        labels: ['Followed Up (90)', 'Unqualified (15)', 'Pending (12)', 'Lost (5)', 'Won Sale (1)'],
        datasets: [{
          data: [90, 15, 12, 5, 1],
          backgroundColor: [
            'rgba(0, 240, 255, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(244, 63, 94, 0.8)',
            'rgba(16, 185, 129, 0.9)'
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
    if (!ctx || !window.Chart) return;
    if (chartInstances['islamiyyah']) chartInstances['islamiyyah'].destroy();

    chartInstances['islamiyyah'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Laptops Sold', 'Accessories Recorded', 'Repairs (Aug)'],
        datasets: [
          {
            label: 'August',
            data: [28, 29, 32],
            backgroundColor: 'rgba(59, 130, 246, 0.65)',
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'September',
            data: [27, 47, 0],
            backgroundColor: 'rgba(0, 240, 255, 0.85)',
            borderColor: '#00f0ff',
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
  }

  function initSamsonCharts(month) {
    const ctx = document.getElementById('samson-analytics-chart');
    if (!ctx || !window.Chart) return;
    if (chartInstances['samson']) chartInstances['samson'].destroy();

    const p = data.staff.find(s => s.id === 'samson');
    const aug = p.metricsSummary.august;
    const sep = p.metricsSummary.september;

    chartInstances['samson'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['TikTok', 'Instagram', 'Facebook'],
        datasets: [
          {
            label: 'August Engagement %',
            data: [7.44, 1.72, 1.88],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#3b82f6'
          },
          {
            label: 'September Engagement %',
            data: [45.2, 2.22, 1.12],
            borderColor: '#00f0ff',
            backgroundColor: 'rgba(0, 240, 255, 0.15)',
            fill: true,
            tension: 0.3,
            pointRadius: 6,
            pointBackgroundColor: '#00f0ff'
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

  function initOyinladeCharts() {
    // Already populated with responsive CSS bar animations and flex containers
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
    let currentSamsonMonth = 'september';
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
      ${buildOyinladePage()}
    `;

    renderNavigation();
    renderHeroShortcuts();

    // Initial default renders
    renderIslamiyyahMonthView('september');
    renderSamsonPlatformMetrics('tiktok', 'september');
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
