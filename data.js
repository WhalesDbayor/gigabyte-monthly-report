// Gigabyte Monthly Performance Presentation Data Model
window.GIGABYTE_DATA = {
  meta: {
    company: "Gigabyte Tech Innovations",
    reportTitle: "Executive Performance & Operations Report",
    periods: ["August 2026", "September 2026", "October 2026"],
    publishedDate: "November 7, 2026",
    status: "Verified Q4 Initial Review"
  },
  executiveOverview: {
    title: "Executive Cross-Departmental Pulse",
    summary: "Comprehensive synthesis of sales throughput, customer acquisition, inventory operations, and digital audience growth spanning August through October 2026.",
    stats: [
      { label: "Total Laptops Sold (Aug-Oct)", value: "100 units", icon: "laptop", change: "+66.7% in Oct (45 units)", trend: "up" },
      { label: "Hardware Repairs (October)", value: "81 units", icon: "wrench", change: "47 completed (35 HW + 12 SW)", trend: "up" },
      { label: "CRM Conversions (October)", value: "77 Won", icon: "check-circle", change: "+7600% Surge (77 vs 1 Sep)", trend: "up" },
      { label: "Total Digital Video Views", value: "6.5k+", icon: "share-2", change: "3.3k TikTok • 3.2k IG", trend: "up" }
    ],
    strategicTakeaways: [
      {
        department: "Sales & Inventory (Islamiyyah Adebayo)",
        icon: "database",
        title: "Record Laptop Sales & Repair Diagnostic Pipeline",
        text: "Laptop sales jumped to an all-time record of 45 units in October (+66.7% vs Sep). 81 laptops were received for repairs (47 successfully resolved, 22 in progress, 12 budget/unfixable exits). 43 accessories tracked with 12 allocated for office use/customer gifts and 31 for retail."
      },
      {
        department: "Customer Relations (Damilola Afolabi Rachael)",
        icon: "shield-check",
        title: "Spectacular CRM Conversion Expansion (77 Won Opportunities)",
        text: "Under our new CRO Damilola Afolabi Rachael, walk-ins surged to 129 (+19.4%) with 363 successful follow-ups and zero pending backlog. Won deals skyrocketed from 1 to 77. Crucial workflow fix needed: Repair department must liaise directly with CRO upon diagnostic outcome prior to customer pick-up (in the case of Wazcom)."
      },
      {
        department: "Brand Media & Content (Samson Oyedapo)",
        icon: "trending-up",
        title: "Cross-Platform Video Scale (6.5k Combined Views)",
        text: "Delivered 18 posts across all channels (+20% volume). TikTok generated 3.3k views and 251.6 watch minutes led by 'New stock' and 'Lenovo ThinkPad T540p'. Instagram generated 3.2k views and 734.1 watch minutes. Immediate tactic: Pin comment questions and deploy polite story DM follow-ups."
      }
    ]
  },
  staff: [
    {
      id: "islamiyyah",
      name: "Islamiyyah Adebayo",
      role: "Accounting & Inventory Officer",
      department: "Finance & Inventory Operations",
      avatar: "assets/images/avatar_islamiyyah_1790951004258.jpg",
      tagline: "Precision accounting, stock reconciliation & hardware repair tracking",
      hasComparison: true,
      monthsAvailable: ["August 2026", "September 2026", "October 2026"],
      metricsSummary: {
        august: { laptopsSold: 28, laptopsRepaired: 32, accessories: 29 },
        september: { laptopsSold: 27, laptopsRepaired: null, accessories: 47 },
        october: { laptopsSold: 45, laptopsRepaired: 81, accessories: 43 }
      },
      comparisonInsights: [
        {
          title: "Laptop Sales Surge",
          metric: "27 -> 45 Units",
          badge: "+66.7% Growth",
          type: "positive",
          desc: "October achieved the highest monthly laptop sales record (45 units), marking a strong revenue boost."
        },
        {
          title: "Repair Operations Intake",
          metric: "81 Laptops Handled",
          badge: "47 Completed",
          type: "positive",
          desc: "35 hardware + 12 software repairs fully resolved and collected; 22 pending status and 12 customer exits."
        },
        {
          title: "Accessory Classification",
          metric: "12 Office/Gift vs 31 Retail",
          badge: "Categorized",
          type: "neutral",
          desc: "Improved categorization: separated 12 promotional/office accessories from 31 commercial inventory units."
        }
      ],
      augustReport: {
        title: "Report on Laptop Sales, Repairs and Accessories (August)",
        intro: "This report presents the activities recorded for the month of August regarding laptop sales, repairs, and accessories. A total of 28 laptops were sold, 32 laptops were brought in for repairs, and 29 accessories were recorded during the month.",
        kpis: [
          { label: "Laptops Sold", value: "28", icon: "laptop" },
          { label: "Laptops For Repair", value: "32", icon: "wrench" },
          { label: "Accessories Recorded", value: "29", icon: "package" }
        ],
        observations: [
          { title: "Difficulty Tracking Repaired Laptops", text: "I was unable to accurately track some laptops that had been repaired and were already collected by customers because there was no specific date recorded for when the laptop was received, repaired, or collected." },
          { title: "Lack of Proper Repair Records", text: "The absence of dates and proper status updates made it difficult to determine which laptops had been fixed, which were still under repair, and which had already been collected." },
          { title: "Mix-up Between Laptops & Accessories", text: "There was some confusion in the records because accessories were mixed up with laptop sales. This made it difficult to accurately separate the number of laptops sold from the accessories sold or supplied." },
          { title: "Inaccurate Tracking of Customer Collections", text: "Without proper documentation of collection dates and customer details, it was difficult to confirm whether a repaired laptop was still in the shop or had already been collected." }
        ],
        recommendations: [
          { title: "Record Date for Every Repair", text: "Every laptop brought in for repair should have the date received, customer name, contact information, repair status, and date collected clearly recorded." },
          { title: "Use a Repair Tracking Register", text: "A proper repair register or digital spreadsheet should be maintained with categories such as Received, Under Repair, Repaired, and Collected." },
          { title: "Separate Laptop Sales from Accessories", text: "Laptop sales and accessories should have separate records to prevent confusion and make monthly calculations easier." },
          { title: "Use Unique Reference Numbers", text: "Each repair should be given a unique job or receipt number. This will make it easier to locate the customer’s laptop and track its progress." },
          { title: "Update Records Immediately", text: "Whenever a laptop is repaired or collected, the record should be updated immediately to avoid missing information." },
          { title: "Carry Out Regular Reconciliation", text: "At the end of every week or month, the physical laptops in the repair section should be compared with the records to identify missing, collected, or outstanding items." }
        ],
        conclusion: "The month of August recorded 28 laptops sold, 32 laptops received for repairs, and 29 accessories. However, the lack of proper date recording and the mixing of accessory records with laptop sales created challenges in accurately tracking the activities."
      },
      septemberReport: {
        title: "Monthly Sales Report for Laptops and Accessories Sold (September)",
        intro: "This report presents the sales activities and performance recorded during the month of September. The report covers the number of laptops and accessories handled during the month, as well as the challenges encountered in tracking accessory usage.",
        kpis: [
          { label: "Laptops Sold", value: "27", icon: "laptop" },
          { label: "Accessories Recorded", value: "47", icon: "package" },
          { label: "Logging Accuracy", value: "High (Laptops)", icon: "check-circle" },
          { label: "Inventory Classification", value: "Action Required", icon: "alert-triangle" }
        ],
        observations: [
          { title: "Laptops Sold", text: "A total of 27 laptops were sold during the month." },
          { title: "Uncertain Accessory Usage", text: "47 accessories were recorded, but their individual usage could not be accurately determined." },
          { title: "Lack of Categorization", text: "There was no clear distinction between accessories sold, gifted to customers, and accessories used as part of laptop sales." },
          { title: "Revenue Impact", text: "The lack of proper tracking made it difficult to determine the actual revenue generated from accessories." },
          { title: "Reconciliation Discrepancies", text: "The situation can also make stock reconciliation difficult and may lead to discrepancies between physical stock and recorded stock." }
        ],
        recommendations: [
          { title: "Create Separate Accessory Sales Record", text: "Every accessory sold should be recorded separately with the date, quantity, type of accessory, and amount paid." },
          { title: "Record Complimentary/Gift Items", text: "Accessories given to customers for free should be recorded as “gift” or “complimentary” rather than being included with normal sales." },
          { title: "Record Laptop Bundles Explicitly", text: "When an accessory is given or sold together with a laptop, it should be clearly recorded against that particular laptop sale." },
          { title: "Conduct Regular Stock Checks", text: "Physical accessories should be counted regularly and compared with the records." },
          { title: "Use a Simple 4-Column Tracking Sheet", text: "A daily spreadsheet or sales book can have separate columns for Accessories Sold, Accessories Gifted, Accessories Used for Laptop Sales, and Balance in Stock." }
        ],
        conclusion: "The month of September recorded 27 laptops sold and 47 accessories recorded. While laptop sales were successfully tracked, the major challenge was the inability to accurately distinguish between accessories that were sold, gifted to customers, and used in laptop sales."
      },
      octoberReport: {
        title: "Monthly Performance Report for October (Sales, Repairs & Inventory)",
        reportingDate: "Saturday, 7 November 2026",
        intro: "This report provides a summary of the company's activities and performance for the month of October, covering laptop repairs, laptop sales, and accessories recorded during the period.",
        kpis: [
          { label: "Laptops Sold", value: "45", icon: "laptop", delta: "+66.7% vs Sep" },
          { label: "Repair Intake", value: "81", icon: "wrench", delta: "47 Resolved & Picked" },
          { label: "Pending Repairs", value: "22", icon: "clock", delta: "Follow-up required" },
          { label: "Accessories Recorded", value: "43", icon: "package", delta: "12 Office/Gift • 31 Retail" }
        ],
        repairBreakdown: {
          total: 81,
          hardwareCompleted: 35,
          softwareCompleted: 12,
          pendingConfirmation: 22,
          customerExit: 12
        },
        observations: [
          { title: "Record-Breaking Sales Performance", text: "The company recorded 45 laptop sales in October, showing very active commercial performance and significant expansion over the prior months." },
          { title: "High Volume Repair Intake", text: "A total of 81 laptops were received for repairs. Hardware faults accounted for 35 completed and picked-up repairs, while 12 laptops were successfully serviced for software faults." },
          { title: "Pending Diagnostic Status", text: "22 laptops remain with the company pending confirmation of their repair status or reasons for technical delay." },
          { title: "Financial & Unfixable Exits", text: "12 laptops left the shop because customers faced financial budget constraints or the systems were unfixable scrap. Some promised return visits." },
          { title: "Accessory Segregation", text: "43 total accessories were logged: 12 allocated for internal office use and complimentary gifts to customers, and 31 for commercial sales." }
        ],
        recommendations: [
          { title: "Strict Repair Documentation Protocol", text: "All laptops received for repairs must be comprehensively documented with customer details, exact nature of fault, serial number, and dynamic repair status." },
          { title: "Proactive Pending Follow-up SLA", text: "Customers whose laptops are pending (22 units) should be contacted within a 48-hour cadence to confirm diagnosis, estimate cost, and explain delays." },
          { title: "Technical Turnaround Time Optimization", text: "The technical engineering team should work towards reducing repair cycle time to elevate customer satisfaction and repeat referrals." },
          { title: "Scalable Sales Marketing Strategies", text: "Capitalize on the 45-unit sales momentum by reinforcing customer care, cross-selling accessories, and running corporate bundle campaigns." },
          { title: "Structured Accessories Ledger", text: "Maintain strict continuous separation between commercial sales stock and operational/promotional gifting units." }
        ],
        conclusion: "October was a standout month with 45 laptops sold, 81 laptops serviced/received, and 43 accessories accounted for. 47 laptops were fully repaired and collected. Implementing seamless CRO communication, rigorous pending repair follow-up, and timely service delivery will ensure continued operational excellence."
      }
    },
    {
      id: "samson",
      name: "Samson Oyedapo",
      role: "Content Director",
      department: "Brand Media & Content Production",
      avatar: "assets/images/avatar_samson_1790951031068.jpg",
      tagline: "Viral video production, organic brand reach & multi-platform engagement",
      hasComparison: true,
      monthsAvailable: ["August 2026", "September 2026", "October 2026"],
      metricsSummary: {
        august: {
          tiktok: { followers: "+1", posts: 12, reactions: 71, comments: 0, engRate: "7.44%", views: "945", reach: "916", watchTimeMin: "115.67", avgWatchSec: "57.22s" },
          instagram: { followers: "-3", posts: 12, reactions: 35, comments: 3, engRate: "1.72%", views: "2.7k", reach: "7.4k", watchTimeMin: "404.22", avgWatchSec: "95.25s", shares: 1 },
          facebook: { followers: "-7", posts: 12, reactions: 26, comments: 0, engRate: "1.88%", impressions: "1.4k" }
        },
        september: {
          tiktok: { followers: "+6", posts: 15, reactions: 103, comments: 5, engRate: "45.20%", views: "3.0k", reach: "2.7k", watchTimeMin: "233.50", avgWatchSec: "3.32s", visibility: 20 },
          instagram: { followers: "+3", posts: 15, reactions: 21, comments: 2, engRate: "2.22%", views: "1.5k", reach: "1.3k", watchTimeMin: "128.16", avgWatchSec: "5.61s", shares: 0 },
          facebook: { followers: "-3", posts: 15, reactions: 13, comments: 0, engRate: "1.12%", impressions: "1.7k" }
        },
        october: {
          tiktok: { followers: "+2", posts: 18, reactions: 135, comments: 3, engRate: "4.28%", views: "3.3k", reach: "2.4k", watchTimeMin: "251.60", avgWatchSec: "3.70s", shares: 5, profileViews: 50 },
          instagram: { followers: "+3", posts: 18, reactions: 60, comments: 2, engRate: "1.96%", views: "3.2k", reach: "2.9k", watchTimeMin: "734.11", avgWatchSec: "9.02s", shares: 0, saves: 3 },
          facebook: { followers: "+8", posts: 18, reactions: 50, comments: 0, engRate: "1.76%", impressions: "1.6k", shares: 3 }
        }
      },
      topVideos: {
        august: {
          tiktok: ["Academy Workspace", "MacBook Maintenance", "Comparing video for Lenovo and HP Envy"],
          instagram: ["MacBook Maintenance", "HP Envy 17", "MacBook Pro 2020"],
          facebook: ["MacBook Maintenance", "MacBook Pro 2020", "Lenovo ThinkPad T240"]
        },
        september: {
          tiktok: ["New Stock Short Video", "Laptop Showcasing", "Keyboard Replacement Video"],
          instagram: ["MacBook Video", "Keyboard Replacement", "New Stock Video"],
          facebook: ["MacBook Pro 2020", "Keyboard Replacement", "HP EliteBook 430 G3"]
        },
        october: {
          tiktok: ["New stock video", "Lenovo ThinkPad T540p video", "HP EliteBook 430 G3 video"],
          instagram: ["Keyboard replacement", "New stock", "Lenovo ThinkPad T540p"],
          facebook: ["Raffle videos", "Keyboard replacement", "Lenovo ThinkPad T540p"]
        }
      },
      strategicInsights: [
        { title: "Facebook Net Follower Turnaround", metric: "-3 -> +8 Followers", badge: "Positive Inflection", desc: "Facebook achieved its first positive follower growth of +8 (after -7 in Aug and -3 in Sep), paired with 50 reactions and 3 shares." },
        { title: "Instagram Watch Time Peak", metric: "734.11 Minutes", badge: "+473% Surge", desc: "Total Instagram watch time skyrocketed to 734.11 minutes (over 12 hours of total viewing) with 3.2k views and 2.9k organic reach." },
        { title: "TikTok Reaction Record", metric: "135 Reactions (+7.1%)", badge: "Peak Engagement", desc: "TikTok generated a new peak of 135 reactions, 3.3k views, and 251.6 watch minutes driven by 'New stock' and 'ThinkPad T540p'." }
      ],
      recommendations: [
        { title: "Pin Conversational Comment Questions", text: "Pin a comment on every post asking a question to stimulate comment section engagement and algorithmic distribution." },
        { title: "Call-to-Action Closing Cards", text: "Add closing visual and spoken call-to-action: 'Save this for later' or 'Share with someone who needs a laptop'." },
        { title: "Polite Warm Story DM Outreach", text: "When someone likes or views a story, send a courteous DM: 'Hi, I noticed you saw the laptop post. Are you still looking for one?'" }
      ]
    },
    {
      id: "cro",
      name: "Damilola Afolabi Rachael",
      role: "Customer Relations Officer (CRO)",
      department: "Customer Relations",
      avatar: "assets/images/avatar_damilola.jpg",
      tagline: "CRM lead lifecycle, walk-in consultations & customer conversion velocity",
      hasComparison: true,
      executiveTransitionNote: "Damilola Afolabi Rachael took office as our new Customer Relations Officer for the month of October, succeeding Omokanye Oyinlade. Her October administration achieved a historic leap in won deals (77 won vs 1 in September) and cleared all pending follow-up backlogs.",
      reportingDate: "Saturday, 7 November 2026",
      pipelineSummary: {
        totalWalkIns: 129,
        successfulFollowUps: 363,
        pendingFollowUps: 0,
        wonOpportunities: 77,
        lostOpportunities: 5,
        unqualifiedLeads: 22,
        followUpRate: "100%",
        conversionRate: "59.7%"
      },
      predecessorSummary: {
        officer: "Omokanye Oyinlade",
        month: "September 2026",
        totalWalkIns: 108,
        successfulFollowUps: 90,
        pendingFollowUps: 12,
        wonOpportunities: 1,
        lostOpportunities: 5,
        unqualifiedLeads: 15
      },
      lostReasons: [
        { reason: "Customer Traveling / Unavailable", count: "Unavailable to drop & pick up laptop", icon: "plane" },
        { reason: "System Beyond Economical Repair", count: "Laptop scrapped / unfixable", icon: "alert-triangle" },
        { reason: "Budget & Price Mismatch", count: "Unable to afford current quote", icon: "dollar-sign" },
        { reason: "Spare Parts Unavailability", count: "Required components unavailable", icon: "package-x" }
      ],
      unqualifiedReasons: [
        "Enquirer is not the financial decision-maker / payer",
        "Customer came exclusively for price enquiries",
        "Customer lacked immediate funds at the time of consultation",
        "Customer came strictly to compare market competitor prices"
      ],
      issuesAndLimitations: [
        {
          title: "Inter-Department Repair Communication Gap",
          detail: "Repair department proceeded to fix a customer's laptop without informing the CRO of the diagnosis outcome. If a customer is to pick up a system from repairs, the CRO must be pre-notified (specifically in the case of Wazcom).",
          severity: "high",
          tag: "Workflow Friction"
        },
        {
          title: "Credit Direct & Network Failures",
          detail: "Recurrent issues with Credit Direct platform and intermittent telecommunications network connectivity hindering instantaneous customer onboarding.",
          severity: "medium",
          tag: "Financing & Infrastructure"
        },
        {
          title: "OS Installation & Driver Update Lapses",
          detail: "Systems claimed to have completed proper OS installation were discovered to have undone system updates and missing driver patches post-setup.",
          severity: "high",
          tag: "Quality Assurance"
        }
      ],
      recommendations: [
        {
          title: "Mandatory CRO Handoff for Repair Pickups",
          text: "Enforce a formal protocol requiring the repair section to notify the CRO upon diagnostic completion before any customer collection, notably for corporate/partner accounts like Wazcom.",
          priority: "CRITICAL"
        },
        {
          title: "Credit Direct Backup Network Setup",
          text: "Establish dedicated alternative network routing (dual-SIM Mifi / Fiber) to ensure uninterrupted customer Credit Direct credit assessment checks.",
          priority: "HIGH"
        },
        {
          title: "Rigorous OS & Driver Checklists",
          text: "Implement a physical/digital post-install inspection checklist ensuring all Windows updates, drivers, and runtime libraries are 100% verified prior to customer handover.",
          priority: "HIGH"
        },
        {
          title: "Decision-Maker Early Qualification",
          text: "Train front-desk intake staff to identify whether the visitor is the authorized financial payer early in the consultation to reduce unqualified lead cycle time.",
          priority: "MEDIUM"
        }
      ],
      conclusion: "In October, under new CRO Damilola Afolabi Rachael, Customer Relations achieved exceptional results with 129 walk-ins logged, 363 successful follow-up interactions, and 77 won opportunities (a 77x surge over September). The pending follow-up queue was completely eliminated. Key priorities going forward include establishing seamless repair-to-CRO handoffs, optimizing Credit Direct uptime, and strictly auditing system software installations."
    }
  ],
  actionableRoadmap: [
    { department: "Sales & Inventory", action: "Deploy standardized repair job cards with status timestamps and enforce 4-column accessory tracking", target: "Immediate (Week 1)" },
    { department: "Customer Relations", action: "Establish protocol for repair diagnostic notifications to CRO prior to customer collection (Wazcom protocol)", target: "Immediate (Week 1)" },
    { department: "Quality Assurance & Tech", action: "Institute post-repair & sales OS verification checklists ensuring complete driver and software updates", target: "Immediate (Week 2)" },
    { department: "Brand Media & Content", action: "Deploy pinned interactive questions on video posts, closing CTAs, and warm story viewer DM outreach", target: "Immediate (Daily)" },
    { department: "Executive Leadership", action: "Resolve Credit Direct connectivity backups and formalize installment financing for budget-constrained leads", target: "Monthly Strategy" }
  ]
};
