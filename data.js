// Gigabyte Monthly Performance Presentation Data Model
window.GIGABYTE_DATA = {
  meta: {
    company: "Gigabyte Tech Innovations",
    reportTitle: "Executive Performance & Operations Report",
    periods: ["August 2026", "September 2026"],
    publishedDate: "October 3, 2026",
    status: "Verified Q3 Review"
  },
  executiveOverview: {
    title: "Executive Cross-Departmental Pulse",
    summary: "Comprehensive synthesis of sales, customer acquisition, inventory operations, and digital audience growth across Q3 (August - September 2026).",
    stats: [
      { label: "Total Laptops Sold (Aug-Sep)", value: "55 units", icon: "laptop", change: "-3.6% (28 vs 27)", trend: "stable" },
      { label: "Accessories Recorded", value: "76 units", icon: "package", change: "+62.1% (29 vs 47)", trend: "up" },
      { label: "CRM Walk-Ins Tracked", value: "108 leads", icon: "users", change: "September Baseline", trend: "baseline" },
      { label: "Social Video Reach (Sep)", value: "4,000+", icon: "share-2", change: "+507% TikTok Eng Rate", trend: "up" }
    ],
    strategicTakeaways: [
      "Inventory & Tracking: Need immediate transition from manual recording to structured digital tracking categories (Sales vs Gift vs Laptop Bundle vs Balance in stock).",
      "Customer Relationship: High walk-in interest (108 leads) with 83.3% contact rate (90 reached). Key priority is safe cadence (<20/day) and tailored financing/budget options to convert price-sensitive prospects.",
      "Digital Media Engagement: Shift toward repair tutorials, hardware maintenance, and unboxing videos delivered exponential TikTok engagement spikes (up to 45.2% engagement rate)."
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
      monthsAvailable: ["August 2026", "September 2026"],
      metricsSummary: {
        august: { laptopsSold: 28, laptopsRepaired: 32, accessories: 29 },
        september: { laptopsSold: 27, laptopsRepaired: null, accessories: 47 }
      },
      comparisonInsights: [
        {
          title: "Laptop Sales Consistency",
          metric: "28 vs 27 Units",
          badge: "Steady (-3.6%)",
          type: "neutral",
          desc: "Laptop sales maintained strong stability across both months with consistent revenue generation."
        },
        {
          title: "Accessories Volume Expansion",
          metric: "29 -> 47 Units",
          badge: "+62.1% Surge",
          type: "positive",
          desc: "Recorded accessory volume surged by 62%, requiring immediate categorization between standalone sales and bundle inclusions."
        },
        {
          title: "Repair Operations Visibility",
          metric: "32 Units (Aug Baseline)",
          badge: "Needs Digital Register",
          type: "warning",
          desc: "August highlighted critical need for lifecycle timestamps (Received -> Under Repair -> Fixed -> Collected)."
        }
      ],
      augustReport: {
        title: "Report on Laptop Sales, Repairs and Accessories (August)",
        intro: "This report presents the activities recorded for the month of August regarding laptop sales, repairs, and accessories. A total of 28 laptops were sold, 32 laptops were brought in for repairs, and 29 accessories were recorded during the month.",
        kpis: [
          { label: "Laptops Sold", value: "28", icon: "laptop" },
          { label: "Laptops For Repair", value: "32", icon: "tool" },
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
        conclusion: "The month of August recorded 28 laptops sold, 32 laptops received for repairs, and 29 accessories. However, the lack of proper date recording and the mixing of accessory records with laptop sales created challenges in accurately tracking the activities. Implementing a more organized recording and tracking system will improve accuracy, accountability, and efficiency in future months."
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
          { title: "Use a Simple 4-Column Tracking Sheet", text: "A daily spreadsheet or sales book can have separate columns for Accessories Sold, Accessories Gifted, Accessories Used for Laptop Sales, and Balance in Stock." },
          { title: "Assign Responsibility for Recording", text: "One person should be responsible for ensuring that every accessory leaving the store is properly documented." },
          { title: "Review Records Daily", text: "Daily reconciliation will make it easier to identify mistakes before they accumulate at the end of the month." }
        ],
        conclusion: "The month of September recorded 27 laptops sold and 47 accessories recorded. While laptop sales were successfully tracked, the major challenge was the inability to accurately distinguish between accessories that were sold, gifted to customers, and used in laptop sales. Going forward, a more detailed accessory tracking system should be introduced."
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
      monthsAvailable: ["August 2026", "September 2026"],
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
        }
      },
      strategicInsights: [
        { title: "TikTok Explosive Engagement Spike", metric: "7.44% -> 45.2%", badge: "+507% Growth", desc: "TikTok views jumped from 945 to 3,000+ with 103 reactions, proving high viral traction on short-form inventory showcases." },
        { title: "Follower Growth Reversal on IG & TikTok", metric: "-2 -> +9 Net Gain", badge: "Turnaround", desc: "Turned negative Instagram follower growth (-3 to +3) and accelerated TikTok subscriber growth (+1 to +6)." },
        { title: "Core Content Theme Winner", metric: "Repairs & Showcases", badge: "High Virality", desc: "'MacBook Maintenance' and 'Keyboard Replacement' consistently generated highest engagement across all 3 platforms." }
      ],
      recommendations: [
        { title: "Interactive Comment Pinning", text: "Pin a comment on every post asking an intriguing question to trigger organic comment section discussions." },
        { title: "Viral Social Call-to-Action", text: "Add closing text to every video: 'Save this for later' or 'Share with someone who needs a laptop'." },
        { title: "Direct Conversational DM Outreach", text: "When someone likes or views your story, send a polite message: 'Hi, I noticed you saw the laptop post. Are you still looking for one?'" },
        { title: "Bi-Weekly Paid Ad Campaigns", text: "August recommendation: Push targeted paid ads twice a month targeting product showcase and repair service videos." }
      ]
    },
    {
      id: "oyinlade",
      name: "Omokanye Oyinlade",
      role: "Customer Relations Officer (CRO)",
      department: "Customer Relations",
      avatar: "assets/images/avatar_oyinlade_1790951016397.jpg",
      tagline: "CRM lead lifecycle, walk-in consultations & client conversion analytics",
      hasComparison: false,
      comparisonNote: "First Monthly Executive Presentation (September Baseline - No prior month comparison)",
      reportingDate: "Saturday, 3 October 2026",
      pipelineSummary: {
        totalWalkIns: 108,
        successfulFollowUps: 90,
        pendingFollowUps: 12,
        wonOpportunities: 1,
        lostOpportunities: 5,
        unqualifiedLeads: 15,
        followUpRate: "83.3%",
        activePipelineRate: "94.4%"
      },
      lostReasons: [
        { reason: "Price / Budget Issues", count: "Primary factor", icon: "dollar-sign" },
        { reason: "Customer Purchased Elsewhere", count: "Competitor", icon: "shopping-bag" },
        { reason: "Customer Postponed the Purchase", count: "Timing", icon: "clock" },
        { reason: "Customer Decided Not to Proceed", count: "Changed mind", icon: "slash" },
        { reason: "Customer Could No Longer Be Reached", count: "Unreachable", icon: "phone-off" }
      ],
      unqualifiedReasons: [
        "No immediate need",
        "Requirements did not match our services",
        "Insufficient budget",
        "Incomplete / incorrect information",
        "Information-only enquiries",
        "Familiarity with the business owner (non-commercial visits)",
        "Duplicate or irrelevant leads"
      ],
      pendingBreakdown: [
        "Phone switched off / unreachable",
        "No response to calls or messages",
        "Customer requested a later follow-up",
        "Customer is still considering the offer",
        "Customer needs more information"
      ],
      issuesAndLimitations: {
        technical: [
          "Occasional difficulty updating the CRM",
          "Slow CRM response at times",
          "Network and internet issues",
          "Double entry of customer details",
          "Difficulty tracking some follow-ups"
        ],
        nonTechnical: [
          "Some customers do not answer calls or messages",
          "Some customers provide incorrect or incomplete details",
          "Some leads require several follow-ups",
          "Price is a major concern for some customers",
          "Account Safety: Contacting too many new numbers through the company account can lead to the account being restricted/banned"
        ]
      },
      observations: [
        "The 108 CRM records provide a good database for future follow-ups.",
        "Not all walk-ins immediately become sales.",
        "Consistent follow-up is important for conversion.",
        "Customer response varies, and some leads require multiple contacts.",
        "Price and budget are common factors affecting decisions.",
        "Accurate CRM records make follow-up easier."
      ],
      recommendations: [
        { title: "Strict Contact Limit (Max 20/Day)", text: "Limit daily follow-up of new contacts to about 20 to reduce the risk of the company account being restricted or banned by messaging platforms.", priority: "CRITICAL" },
        { title: "Structured Follow-up Schedule", text: "Maintain regular follow-ups with qualified leads using a clear follow-up schedule and SLA cadence.", priority: "HIGH" },
        { title: "Prioritise High-Potential Leads", text: "Prioritise serious and high-potential leads based on clear qualification criteria during walk-ins.", priority: "HIGH" },
        { title: "Multi-Channel Contact Strategy", text: "Use calls, SMS, and WhatsApp where appropriate depending on customer availability.", priority: "MEDIUM" },
        { title: "Data Hygiene & Lost Reason Logging", text: "Ensure customer details are entered correctly and record clear reasons for lost and unqualified leads.", priority: "MEDIUM" },
        { title: "Regular Pending Lead Reviews", text: "Review pending leads regularly to re-engage warm prospects.", priority: "MEDIUM" }
      ],
      conclusion: "A total of 108 customers were recorded in the CRM, with 90 successful follow-ups, 12 pending follow-ups, 1 won opportunity, 5 lost opportunities, and 15 unqualified leads. The main areas requiring attention are consistent follow-up, accurate CRM updates, customer response, and controlling the number of new contacts reached daily."
    }
  ],
  actionableRoadmap: [
    { department: "Accounting & Inventory", action: "Deploy 4-Column Stock Register & Job Card System for Repairs", target: "Immediate (Week 1)" },
    { department: "Content Production", action: "Implement Question Pinning, Story DMs & Hardware Maintenance Video Strategy", target: "Immediate (Daily)" },
    { department: "Customer Relations", action: "Enforce 20-Leads/Day WhatsApp Cap & Multi-Touch Cadence Protocol", target: "Immediate (Week 1)" },
    { department: "Executive Leadership", action: "Establish Flexible Budget Packages to Convert Price-Sensitive Walk-Ins", target: "Monthly Strategy" }
  ]
};
