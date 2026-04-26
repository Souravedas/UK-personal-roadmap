import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0a0f1e;
    color: #e8eaf0;
    min-height: 100vh;
  }

  .hero {
    background: linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #091a2e 100%);
    padding: 48px 24px 36px;
    text-align: center;
    border-bottom: 1px solid #1e3a5f;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -60px; left: -60px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero::after {
    content: '';
    position: absolute;
    bottom: -40px; right: -40px;
    width: 250px; height: 250px;
    background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  .flag-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    font-size: 28px;
  }

  .arrow-icon { color: #60a5fa; font-size: 20px; }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 5vw, 42px);
    font-weight: 900;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .hero h1 span { color: #60a5fa; }

  .hero p {
    color: #94a3b8;
    font-size: 15px;
    max-width: 560px;
    margin: 0 auto 20px;
    line-height: 1.6;
  }

  .warning-banner {
    background: linear-gradient(90deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05));
    border: 1px solid rgba(239,68,68,0.3);
    border-radius: 10px;
    padding: 12px 18px;
    max-width: 640px;
    margin: 0 auto;
    font-size: 13px;
    color: #fca5a5;
    text-align: left;
  }

  .warning-banner strong { color: #f87171; }

  .tabs {
    display: flex;
    overflow-x: auto;
    gap: 0;
    background: #0d1627;
    border-bottom: 1px solid #1e3a5f;
    padding: 0 16px;
    scrollbar-width: none;
  }

  .tabs::-webkit-scrollbar { display: none; }

  .tab {
    padding: 14px 18px;
    font-size: 13px;
    font-weight: 500;
    color: #64748b;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tab:hover { color: #94a3b8; }
  .tab.active { color: #60a5fa; border-bottom-color: #60a5fa; }

  .content { padding: 24px 16px; max-width: 840px; margin: 0 auto; }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    color: #fff;
    margin-bottom: 6px;
  }

  .section-sub {
    color: #64748b;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .card {
    background: #111827;
    border: 1px solid #1e3a5f;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }

  .badge {
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
  }

  .badge-green { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
  .badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }
  .badge-yellow { background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
  .badge-red { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
  .badge-purple { background: rgba(139,92,246,0.15); color: #a78bfa; border: 1px solid rgba(139,92,246,0.3); }

  .card h3 { font-size: 16px; font-weight: 600; color: #e2e8f0; }
  .card p { font-size: 14px; color: #94a3b8; line-height: 1.6; }

  .detail-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
  }

  .detail-chip {
    background: #1e2d45;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .detail-chip strong { color: #e2e8f0; }

  .timeline-container { position: relative; }

  .month-block {
    display: flex;
    gap: 16px;
    margin-bottom: 4px;
  }

  .month-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 44px;
  }

  .month-dot {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .month-connector {
    width: 2px;
    flex: 1;
    min-height: 20px;
    background: #1e3a5f;
  }

  .month-content {
    flex: 1;
    padding-bottom: 24px;
  }

  .month-label {
    font-size: 11px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
    margin-top: 8px;
  }

  .month-title {
    font-size: 16px;
    font-weight: 600;
    color: #e2e8f0;
    margin-bottom: 10px;
  }

  .task-list { list-style: none; }

  .task-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #1a2940;
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.5;
  }

  .task-item:last-child { border-bottom: none; }

  .task-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  .task-item strong { color: #e2e8f0; }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: #111827;
    border: 1px solid #1e3a5f;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
  }

  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    color: #60a5fa;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stat-label { font-size: 13px; color: #64748b; }

  .step-grid {
    display: grid;
    gap: 12px;
  }

  .step-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    background: #111827;
    border: 1px solid #1e3a5f;
    border-radius: 10px;
    padding: 16px;
  }

  .step-num {
    width: 32px;
    height: 32px;
    background: #1e3a5f;
    color: #60a5fa;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
  }

  .step-body h4 { font-size: 15px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
  .step-body p { font-size: 13px; color: #94a3b8; line-height: 1.5; }

  .highlight-box {
    background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.05));
    border: 1px solid rgba(59,130,246,0.25);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .highlight-box h4 { color: #60a5fa; font-size: 15px; margin-bottom: 8px; }
  .highlight-box p { font-size: 14px; color: #94a3b8; line-height: 1.6; }

  .skill-track {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }

  .skill-card {
    background: #111827;
    border: 1px solid #1e3a5f;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
  }

  .skill-icon { font-size: 28px; margin-bottom: 8px; }
  .skill-name { font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; }
  .skill-time { font-size: 12px; color: #64748b; }
  .skill-provider { font-size: 12px; color: #34d399; margin-top: 4px; }

  .progress-bar-outer {
    background: #1e2d45;
    border-radius: 4px;
    height: 6px;
    margin-top: 10px;
    overflow: hidden;
  }

  .progress-bar-inner {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
  }

  .weekly-plan {
    background: #111827;
    border: 1px solid #1e3a5f;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .weekly-header {
    background: #1a2940;
    padding: 12px 18px;
    font-size: 13px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .weekly-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 12px 18px;
    border-bottom: 1px solid #1a2940;
  }

  .weekly-row:last-child { border-bottom: none; }

  .day-label {
    min-width: 34px;
    font-size: 12px;
    font-weight: 700;
    color: #60a5fa;
    padding-top: 2px;
  }

  .day-tasks { font-size: 13px; color: #94a3b8; line-height: 1.6; }
  .day-tasks strong { color: #e2e8f0; }

  .total-cost-table {
    background: #111827;
    border: 1px solid #1e3a5f;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .cost-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 18px;
    border-bottom: 1px solid #1a2940;
    font-size: 14px;
  }

  .cost-row:last-child { border-bottom: none; background: #1a2940; }
  .cost-label { color: #94a3b8; }
  .cost-value { color: #e2e8f0; font-weight: 600; }
  .cost-total { color: #fbbf24; font-size: 16px; font-weight: 700; }

  .alert-box {
    background: rgba(16,185,129,0.08);
    border: 1px solid rgba(16,185,129,0.25);
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .alert-box h4 { color: #34d399; font-size: 14px; margin-bottom: 6px; }
  .alert-box p, .alert-box li { font-size: 13px; color: #94a3b8; line-height: 1.6; }
  .alert-box ul { padding-left: 16px; }

  @media (max-width: 480px) {
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .skill-track { grid-template-columns: 1fr 1fr; }
  }
`;

const tabs = [
    { id: "overview", label: "Overview", icon: "🗺️" },
    { id: "scholarships", label: "Scholarships", icon: "🎓" },
    { id: "universities", label: "Universities", icon: "🏛️" },
    { id: "skills", label: "Skill Plan", icon: "💻" },
    { id: "sixmonths", label: "6-Month Plan", icon: "📅" },
    { id: "visa", label: "Visa & Docs", icon: "📋" },
    { id: "costs", label: "Costs", icon: "💷" },
];

function Overview() {
    return (
        <div>
            <div className="section-title">Your Complete UK Masters Roadmap</div>
            <div className="section-sub">Tailored for a Bangladeshi CSE graduate | September 2027 Intake</div>

            <div className="highlight-box">
                <h4>⚠️ Realistic Timeline Notice</h4>
                <p>
                    Since today is April 26, 2026, <strong style={{ color: '#e2e8f0' }}>September 2026 intake is almost impossible</strong> — most scholarship and application deadlines have already passed.
                    The smart move is to <strong style={{ color: '#e2e8f0' }}>target September 2027</strong>. This gives you a full cycle to build your profile, take IELTS, get certified, gather funds, and apply early — dramatically increasing your scholarship chances. Use these 6 months as serious preparation.
                </p>
            </div>

            <div className="grid-2">
                <div className="stat-card">
                    <div className="stat-value">£10K–£15K</div>
                    <div className="stat-label">GREAT Scholarship available for Bangladeshis</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">1 Year</div>
                    <div className="stat-label">Duration of UK Masters (unlike 2 years elsewhere)</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">2 Years</div>
                    <div className="stat-label">Post-Study Work Visa after graduation</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">98%</div>
                    <div className="stat-label">UK student visa approval rate in 2025 (for valid applicants)</div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <span style={{ fontSize: '24px' }}>📌</span>
                    <div>
                        <h3>Your 6-Step Master Plan</h3>
                        <p style={{ marginTop: 6 }}>Follow this sequence and you will have a realistic shot at a scholarship-supported UK Masters in 2027.</p>
                    </div>
                </div>
                <div className="step-grid">
                    {[
                        ["Learn Python + Get Certified", "May–Aug 2026: Self-learn Python, then complete Google Data Analytics or IBM AI certificate on Coursera.", "#3b82f6"],
                        ["Clear IELTS", "June–Aug 2026: Study and take IELTS (UKVI). Target 6.5 overall. This is mandatory for your visa.", "#10b981"],
                        ["Shortlist Universities", "July–Aug 2026: Choose 5–6 universities in affordable cities offering CSE/AI/Data Science masters with scholarships.", "#8b5cf6"],
                        ["Apply to Universities", "Sept–Nov 2026: Apply early. Most UK universities open for Sept 2027 intake from September 2026.", "#f59e0b"],
                        ["Apply for Scholarships", "Oct–Dec 2026: Chevening opens August, GREAT Scholarship opens Sept/Oct. Apply to all you qualify for.", "#ef4444"],
                        ["Prepare Finances + Visa", "Jan–April 2027: Gather financial proof, do TB test, get CAS from university, apply for student visa.", "#06b6d4"],
                    ].map(([title, desc, color], i) => (
                        <div className="step-row" key={i}>
                            <div className="step-num" style={{ background: `${color}22`, color }}>{i + 1}</div>
                            <div className="step-body">
                                <h4>{title}</h4>
                                <p>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Scholarships() {
    return (
        <div>
            <div className="section-title">Scholarships for Bangladeshi Students</div>
            <div className="section-sub">Real scholarships with verified sources — ranging from £10,000 to fully funded</div>

            <div className="alert-box">
                <h4>✅ Good News for You</h4>
                <p>Bangladesh is specifically included in multiple UK government scholarship programs. The GREAT Scholarship is confirmed available for Bangladeshi students for the 2026-27 academic year, and new cycles open every year.</p>
            </div>

            {[
                {
                    name: "GREAT Scholarship (British Council)",
                    badge: "PARTIAL — £10,000–£15,000",
                    badgeClass: "badge-blue",
                    amount: "£10,000 – £15,000 off tuition fees",
                    coverage: "Tuition only (not living costs)",
                    eligibility: "Bangladeshi citizen & resident, applying for a 1-year taught Masters",
                    universities: "University of Glasgow, UEA Norwich, Keele, Hull, Portsmouth, Loughborough, Cranfield, University of Manchester",
                    deadline: "Varies by university (typically Feb–May annually)",
                    link: "britishcouncil.org.bd/great-scholarships",
                    note: "7 scholarships available for Bangladeshi students for 2026-27. New round opens for 2027-28 around Sept 2026. APPLY FIRST.",
                    icon: "🇬🇧",
                },
                {
                    name: "Chevening Scholarship",
                    badge: "FULLY FUNDED",
                    badgeClass: "badge-green",
                    amount: "Full tuition + £18,000+ living stipend + flights + visa",
                    coverage: "Everything — truly fully funded",
                    eligibility: "2 years work experience, leadership potential, Bangladeshi citizen",
                    universities: "Any UK university — your choice",
                    deadline: "Applications open August, close November each year",
                    link: "chevening.org/scholarship/bangladesh",
                    note: "HIGHLY COMPETITIVE but worth applying. Start building your leadership story now. Work experience requirement means you may need to work part-time or freelance.",
                    icon: "⭐",
                },
                {
                    name: "Commonwealth Masters Scholarship",
                    badge: "FULLY FUNDED",
                    badgeClass: "badge-green",
                    amount: "Full tuition + living allowance + airfare",
                    coverage: "Everything covered",
                    eligibility: "Bangladeshi citizen, strong academics, development-focused study plan",
                    universities: "Selected UK universities",
                    deadline: "Applications typically Nov–Dec for next year",
                    link: "cscuk.fcdo.gov.uk",
                    note: "Bangladesh is a Commonwealth country so you qualify. Focus your SOP on how the degree helps Bangladesh's development.",
                    icon: "🌍",
                },
                {
                    name: "University of Manchester GREAT Scholarship",
                    badge: "£15,000",
                    badgeClass: "badge-blue",
                    amount: "£15,000 off tuition fees",
                    coverage: "Tuition discount",
                    eligibility: "Bangladeshi student, offer for 1-year Masters starting Sept 2027",
                    universities: "University of Manchester",
                    deadline: "April each year (after receiving an offer)",
                    link: "manchester.ac.uk/study/international/country-specific-information/bangladesh/scholarships",
                    note: "Manchester is a Russell Group university in an affordable, vibrant city. This scholarship is worth applying for.",
                    icon: "🏛️",
                },
                {
                    name: "Sussex Bangladesh Scholarship",
                    badge: "AUTOMATIC",
                    badgeClass: "badge-yellow",
                    amount: "Partial tuition discount",
                    coverage: "Automatic if eligible — no separate application needed",
                    eligibility: "Bangladeshi national, accepted to eligible Masters at Sussex",
                    universities: "University of Sussex",
                    deadline: "Automatic on admission",
                    link: "sussex.ac.uk",
                    note: "No extra application needed! If you get an offer, you automatically get this scholarship. Perfect for backup.",
                    icon: "🤝",
                },
                {
                    name: "Loughborough University GREAT Scholarship",
                    badge: "UP TO £15,000",
                    badgeClass: "badge-blue",
                    amount: "Up to £15,000",
                    coverage: "Tuition fees",
                    eligibility: "Bangladeshi student applying for selected Masters",
                    universities: "Loughborough University",
                    deadline: "Check university page",
                    link: "lboro.ac.uk",
                    note: "Loughborough is consistently ranked among UK's top universities. Subjects include International Management, Entrepreneurship, Net-zero Engineering.",
                    icon: "🎯",
                },
            ].map((s, i) => (
                <div className="card" key={i}>
                    <div className="card-header">
                        <span style={{ fontSize: '22px' }}>{s.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                                <h3>{s.name}</h3>
                                <span className={`badge ${s.badgeClass}`}>{s.badge}</span>
                            </div>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-chip">💰 <strong>{s.amount}</strong></div>
                        <div className="detail-chip">📅 <strong>{s.deadline}</strong></div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#e2e8f0' }}>Covers:</strong> {s.coverage}</p>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#e2e8f0' }}>Eligibility:</strong> {s.eligibility}</p>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#e2e8f0' }}>Applicable universities:</strong> {s.universities}</p>
                        <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(16,185,129,0.07)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
                            <p style={{ fontSize: 13, color: '#86efac' }}>💡 {s.note}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Universities() {
    return (
        <div>
            <div className="section-title">Best Affordable Universities for CSE/Tech</div>
            <div className="section-sub">Good rankings + low city costs + scholarship opportunities = best value</div>

            <div className="highlight-box">
                <h4>🏙️ Cities to Avoid (Too Expensive)</h4>
                <p>London, Oxford, Cambridge — living costs are £1,400–£2,000+/month. Instead, target <strong style={{ color: '#e2e8f0' }}>Sheffield, Nottingham, Leicester, Hull, Belfast, Glasgow, Norwich</strong> where monthly costs are £900–£1,200 and universities are still ranked and respected.</p>
            </div>

            {[
                {
                    uni: "University of Sheffield",
                    city: "Sheffield",
                    ranking: "Russell Group | Top 15 UK",
                    rent: "£470–£600/month",
                    tuition: "~£20,000–£25,000/year",
                    programs: "MSc Computer Science, MSc AI, MSc Data Science",
                    scholarship: "GREAT + merit scholarships",
                    why: "Russell Group status = globally recognized degree. Sheffield is consistently ranked UK's #3–4 most affordable city for students. Large South Asian community. Strong tech ecosystem.",
                    icon: "🔵",
                },
                {
                    uni: "University of Nottingham",
                    city: "Nottingham",
                    ranking: "Russell Group | Top 20 UK",
                    rent: "£450–£650/month",
                    tuition: "~£22,000–£26,000/year",
                    programs: "MSc Computer Science, MSc AI & ML, MSc Data Science",
                    scholarship: "£3,000 Masters Scholarship (automatic) + GREAT",
                    why: "Offers automatic £3,000 masters scholarship for international students! Russell Group university with strong research in AI and CS. Affordable Midlands city.",
                    icon: "🟢",
                },
                {
                    uni: "University of Glasgow",
                    city: "Glasgow",
                    ranking: "Russell Group | Top 20 UK (World Top 100)",
                    rent: "£500–£700/month",
                    tuition: "~£22,000–£26,000/year",
                    programs: "MSc Computing Science, MSc Data Science, MSc AI",
                    scholarship: "GREAT Scholarship available for Bangladesh",
                    why: "World Top 100 university. GREAT scholarship confirmed available for Bangladeshi students! Glasgow is cheaper than Edinburgh with vibrant student life.",
                    icon: "🟣",
                },
                {
                    uni: "University of East Anglia (UEA)",
                    city: "Norwich",
                    ranking: "Top 30 UK | World Top 300",
                    rent: "£450–£600/month",
                    tuition: "~£19,000–£22,000/year",
                    programs: "MSc Computing Science, MSc Data Science",
                    scholarship: "GREAT Scholarship confirmed for Bangladesh",
                    why: "GREAT Scholarship confirmed available. Norwich is a safe, small, affordable city. Campus university = walkable life. Strong CS department.",
                    icon: "🟡",
                },
                {
                    uni: "University of Hull",
                    city: "Hull",
                    ranking: "Top 60 UK",
                    rent: "£350–£500/month",
                    tuition: "~£16,000–£20,000/year",
                    programs: "MSc Computer Science, MSc Data Science & Analytics",
                    scholarship: "GREAT Scholarship confirmed for Bangladesh",
                    why: "Hull is one of the CHEAPEST UK cities (£350–£500 rent). GREAT Scholarship confirmed. Lower tuition than Russell Group. Good for budget-conscious students.",
                    icon: "🔴",
                },
                {
                    uni: "Keele University",
                    city: "Staffordshire",
                    ranking: "Top 50 UK",
                    rent: "£400–£550/month",
                    tuition: "~£16,500–£20,000/year",
                    programs: "MSc Computer Science, MSc Computing & Business",
                    scholarship: "GREAT Scholarship for Bangladesh (Computing courses)",
                    why: "GREAT scholarship specifically for Computing & Business at Keele for Bangladeshi students. Small campus, safe environment, highly affordable rural setting.",
                    icon: "🟠",
                },
            ].map((u, i) => (
                <div className="card" key={i}>
                    <div className="card-header">
                        <span style={{ fontSize: '22px' }}>{u.icon}</span>
                        <div>
                            <h3>{u.uni}</h3>
                            <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{u.city} · {u.ranking}</p>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-chip">🏠 Rent: <strong>{u.rent}</strong></div>
                        <div className="detail-chip">💰 Tuition: <strong>{u.tuition}</strong></div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#e2e8f0' }}>Programs:</strong> {u.programs}</p>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#34d399' }}>Scholarship:</strong> {u.scholarship}</p>
                        <p style={{ fontSize: 13, color: '#94a3b8' }}>{u.why}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SkillPlan() {
    return (
        <div>
            <div className="section-title">Your Skill Building Plan</div>
            <div className="section-sub">Python → Professional Certificate → Portfolio → Confidence for UK</div>

            <div className="highlight-box">
                <h4>💡 Why This Skill Path?</h4>
                <p>As a CSE graduate, Python is your foundation. After Python, a <strong style={{ color: '#e2e8f0' }}>Data Analytics or AI/ML certificate from Google, IBM, or Microsoft</strong> on Coursera/edX will (1) strengthen your SOP for UK masters, (2) build a real portfolio for scholarship essays, and (3) give you genuine skills that are in high demand — both in UK and Bangladesh. You can do all of this for free or very low cost from home.</p>
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Phase 1: Python (Month 1–2)</div>

            <div className="skill-track">
                {[
                    { icon: "🐍", name: "Python Basics", time: "3–4 weeks", provider: "Free: freeCodeCamp / Automate the Boring Stuff", pct: 100 },
                    { icon: "📊", name: "Python for Data", time: "2–3 weeks", provider: "Free: Kaggle Learn Python + Pandas", pct: 80 },
                    { icon: "🤖", name: "Intro to ML", time: "2 weeks", provider: "Free: Google ML Crash Course", pct: 60 },
                ].map((s, i) => (
                    <div className="skill-card" key={i}>
                        <div className="skill-icon">{s.icon}</div>
                        <div className="skill-name">{s.name}</div>
                        <div className="skill-time">{s.time}</div>
                        <div className="skill-provider">{s.provider}</div>
                        <div className="progress-bar-outer"><div className="progress-bar-inner" style={{ width: `${s.pct}%` }}></div></div>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Phase 2: Professional Certificate (Month 2–4)</div>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>Choose ONE of these. All are recognized by UK universities and employers globally. Coursera offers financial aid (free!) for most certificates — apply for it.</p>

            {[
                {
                    provider: "Google",
                    cert: "Google Data Analytics Certificate",
                    platform: "Coursera",
                    cost: "~$49/month or FREE with financial aid",
                    duration: "4–6 months at your own pace",
                    skills: "Data analysis, SQL, R, Tableau, visualization",
                    why: "Most recognized globally. Directly relevant to MSc Data Science. Shows initiative to UK universities.",
                    badge: "RECOMMENDED #1",
                    badgeClass: "badge-green",
                },
                {
                    provider: "IBM",
                    cert: "IBM Data Science Professional Certificate",
                    platform: "Coursera",
                    cost: "~$49/month or FREE with financial aid",
                    duration: "4–6 months",
                    skills: "Python, SQL, Machine Learning, IBM Watson, Jupyter",
                    why: "Heavy Python + ML focus. Very strong for CSE background. Respected by tech employers.",
                    badge: "RECOMMENDED #2",
                    badgeClass: "badge-blue",
                },
                {
                    provider: "Microsoft",
                    cert: "Microsoft Azure AI Fundamentals",
                    platform: "Microsoft Learn (FREE)",
                    cost: "Free to learn, exam fee ~$165",
                    duration: "2–3 months",
                    skills: "AI, Machine Learning, Azure Cloud",
                    why: "Cloud AI skills are extremely in-demand. Free learning path. Good if you want a cloud/AI angle.",
                    badge: "ALTERNATIVE",
                    badgeClass: "badge-yellow",
                },
            ].map((c, i) => (
                <div className="card" key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                        <h3>{c.provider}: {c.cert}</h3>
                        <span className={`badge ${c.badgeClass}`}>{c.badge}</span>
                    </div>
                    <div className="detail-row">
                        <div className="detail-chip">🌐 <strong>{c.platform}</strong></div>
                        <div className="detail-chip">💰 <strong>{c.cost}</strong></div>
                        <div className="detail-chip">⏱ <strong>{c.duration}</strong></div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#e2e8f0' }}>Skills gained:</strong> {c.skills}</p>
                        <p style={{ fontSize: 13, color: '#86efac' }}>✅ {c.why}</p>
                    </div>
                </div>
            ))}

            <div className="alert-box" style={{ marginTop: 20 }}>
                <h4>💸 How to Get Financial Aid on Coursera (Free!)</h4>
                <ul>
                    <li>Go to the course page → Click "Enroll" → Select "Financial Aid"</li>
                    <li>Write a short paragraph about your situation (250 words) — be honest</li>
                    <li>Approval usually takes 15 days and gives you full free access</li>
                    <li>Kaggle Learn (Python, ML, SQL) is always 100% free with no form needed</li>
                </ul>
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Phase 3: Build a Portfolio (Month 4–5)</div>
            <div className="card">
                <h3 style={{ marginBottom: 12 }}>3 Projects to Impress UK Admissions Officers</h3>
                {[
                    ["Bangladesh Air Quality Analyzer", "Use Python + public data to analyze Dhaka's pollution. Upload to GitHub. Relevant and unique."],
                    ["E-Commerce Sales Dashboard", "Build a Tableau or Power BI dashboard from a Kaggle dataset. Demonstrates analytics skill."],
                    ["Predictive ML Model", "Train a classification model (e.g., loan default prediction). Document on GitHub with README."],
                ].map(([title, desc], i) => (
                    <div className="task-item" key={i}>
                        <span className="task-icon">🛠️</span>
                        <div><strong>{title}:</strong> {desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SixMonths() {
    const months = [
        {
            label: "Month 1 — May 2026",
            title: "Foundation: Python + Research",
            color: "#3b82f6",
            dot: "#1d3a6e",
            tasks: [
                ["📚", "Start Python: freeCodeCamp Python for Beginners (free, YouTube) — 2 hours/day"],
                ["🔍", "Research UK universities: shortlist 8–10 CSE/Data Science Masters programs"],
                ["📝", "Start an IELTS vocabulary notebook — 20 words/day"],
                ["📄", "Collect your documents: BSc transcripts, certificates, ID, passport photo"],
                ["🎯", "Apply for Coursera Financial Aid for Google Data Analytics Certificate"],
                ["💡", "Study: What is a Statement of Purpose (SOP)? Read 5 example SOPs online"],
            ],
            weekly: "Weekdays: 2h Python + 30min IELTS vocab | Weekends: University research",
        },
        {
            label: "Month 2 — June 2026",
            title: "Python Intermediate + IELTS Prep Intensifies",
            color: "#8b5cf6",
            dot: "#2d1b69",
            tasks: [
                ["🐍", "Complete Python: move to Python for Data Analysis (Pandas, NumPy on Kaggle — free)"],
                ["📖", "Start formal IELTS prep: Cambridge IELTS Past Papers (buy books or use free PDFs)"],
                ["📝", "Begin Google Data Analytics Certificate on Coursera (Module 1–3)"],
                ["🏛️", "Email 2–3 universities asking about scholarship deadlines and September 2027 intake info"],
                ["✍️", "Write your first rough draft of your SOP (200 words — just brainstorm, no pressure)"],
                ["🧪", "Take your first IELTS mock test. Identify weak areas (Writing/Speaking?)"],
            ],
            weekly: "Daily: 1.5h Python + 1.5h IELTS | Weekends: Certificate + SOP work",
        },
        {
            label: "Month 3 — July 2026",
            title: "Certificate Progress + IELTS Target Band",
            color: "#10b981",
            dot: "#064e3b",
            tasks: [
                ["🎓", "Complete Google Data Analytics Modules 4–6 (SQL, R basics, visualization)"],
                ["🏋️", "IELTS Writing: Practice Task 1 (graphs) and Task 2 (essays) — 2 per week"],
                ["🗣️", "IELTS Speaking: Record yourself answering IELTS Part 2 topics (use a phone)"],
                ["📊", "Start your first portfolio project on GitHub (pick one from the Skill Plan)"],
                ["🏛️", "Finalize your university shortlist to 5–6 specific programs with scholarship info"],
                ["📅", "Book your IELTS (UKVI Academic) exam for August 2026"],
            ],
            weekly: "Daily: 2h Certificate + 1.5h IELTS | Weekend: Project + SOP revision",
        },
        {
            label: "Month 4 — August 2026",
            title: "IELTS Exam + Complete Certificate",
            color: "#f59e0b",
            dot: "#6b3a0f",
            tasks: [
                ["📋", "Take IELTS UKVI Academic exam — target minimum 6.0 (ideally 6.5)"],
                ["🎓", "Complete Google Data Analytics Certificate (finish remaining modules, get certificate)"],
                ["📂", "Finish and upload 2 portfolio projects to GitHub"],
                ["✍️", "Write a strong, final SOP (Statement of Purpose) — get someone to review it"],
                ["📸", "Gather all required documents: transcripts, degree certificate, passport"],
                ["💰", "Have honest conversation with family about finances — how much can you show for visa?"],
            ],
            weekly: "Focus on IELTS exam week. Rest of month: certificate completion + documents",
        },
        {
            label: "Month 5 — September 2026",
            title: "Apply to Universities + Scholarship Applications",
            color: "#ef4444",
            dot: "#6b0f1a",
            tasks: [
                ["🏛️", "Submit university applications (most UK Sept 2027 intake opens around now)"],
                ["⭐", "Apply for Chevening Scholarship (opens August, closes November) — START NOW"],
                ["🎓", "Apply for GREAT Scholarship at your target universities (check deadlines!)"],
                ["🤝", "Request 2 strong Letters of Recommendation from your BSc professors"],
                ["📊", "Complete your 3rd portfolio project — polish your GitHub profile"],
                ["💳", "Check if IELTS score meets university requirements — retake if below 6.0"],
            ],
            weekly: "Application week is critical. Spend weekends perfecting each university application",
        },
        {
            label: "Month 6 — October 2026",
            title: "Follow Up + Prepare for Offers + Visa Ready",
            color: "#06b6d4",
            dot: "#0c4a6e",
            tasks: [
                ["📬", "Follow up on university applications if no acknowledgment received"],
                ["💼", "If any part-time/freelance work possible, start — builds work experience for Chevening"],
                ["🏦", "Begin building financial proof: ensure bank statements show steady savings"],
                ["💉", "Book TB test at a UKVI-approved clinic in Bangladesh (required for visa)"],
                ["📋", "Research the visa process thoroughly (GOV.UK student visa page — official source)"],
                ["🌐", "Join Facebook groups and forums: 'Bangladeshi Students in UK' — get real advice"],
            ],
            weekly: "Waiting period — use it to strengthen finances, freelance, and follow up on applications",
        },
    ];

    return (
        <div>
            <div className="section-title">6-Month Daily Action Plan</div>
            <div className="section-sub">May 2026 → October 2026 | Targeting September 2027 UK Masters intake</div>

            <div className="timeline-container">
                {months.map((m, i) => (
                    <div className="month-block" key={i}>
                        <div className="month-line">
                            <div className="month-dot" style={{ background: m.dot, color: m.color, border: `2px solid ${m.color}` }}>
                                {i + 1}
                            </div>
                            {i < months.length - 1 && <div className="month-connector" />}
                        </div>
                        <div className="month-content">
                            <div className="month-label">{m.label}</div>
                            <div className="month-title">{m.title}</div>
                            <ul className="task-list">
                                {m.tasks.map(([icon, text], j) => (
                                    <li className="task-item" key={j}>
                                        <span className="task-icon">{icon}</span>
                                        <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, fontSize: 13, color: '#64748b' }}>
                                ⏰ Weekly rhythm: {m.weekly}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Visa() {
    return (
        <div>
            <div className="section-title">UK Student Visa Process</div>
            <div className="section-sub">Step-by-step from Bangladesh — based on 2026 Home Office requirements</div>

            <div className="alert-box">
                <h4>🔑 Key Requirements Summary</h4>
                <ul>
                    <li><strong>IELTS:</strong> Minimum 6.0–6.5 UKVI Academic (or PTE/TOEFL equivalent)</li>
                    <li><strong>Financial proof:</strong> £1,136 × 9 months = £10,224 in bank (outside London) — held for 28 days continuously</li>
                    <li><strong>TB Test:</strong> Mandatory for Bangladesh — from approved clinic only</li>
                    <li><strong>CAS:</strong> Confirmation of Acceptance for Studies — issued by university after you accept offer</li>
                    <li><strong>Visa fee:</strong> £363 application + £776/year NHS surcharge (Immigration Health Surcharge)</li>
                    <li><strong>Approved banks:</strong> HSBC, Standard Chartered, BRAC Bank, Eastern Bank, City Bank</li>
                </ul>
            </div>

            <div className="step-grid">
                {[
                    {
                        num: 1,
                        title: "Get an Unconditional University Offer",
                        detail: "Apply to your chosen universities. Once they make you an offer and you accept it, they generate your CAS number. You CANNOT apply for a visa without a CAS."
                    },
                    {
                        num: 2,
                        title: "Pass IELTS (UKVI Academic)",
                        detail: "Take IELTS for UKVI — not just regular IELTS. Target 6.0–6.5 overall. Most UK Masters for CSE require this. Some universities accept PTE or TOEFL instead. MOI letter is accepted by a few universities but IELTS is safer for visa."
                    },
                    {
                        num: 3,
                        title: "TB Test at Approved Clinic",
                        detail: "Bangladesh requires a mandatory TB (tuberculosis) test for stays over 6 months. Get it done at a UKVI-approved clinic in Dhaka. This takes a few days — book early."
                    },
                    {
                        num: 4,
                        title: "Prepare Financial Documents",
                        detail: "Show £10,224 in your (or a parent/sponsor's) bank account at a UKVI-approved bank (BRAC, Eastern, City, HSBC, StanChart). The money must be there for 28 CONSECUTIVE days before your application date. Your bank statement must be dated within 31 days of your visa application."
                    },
                    {
                        num: 5,
                        title: "Apply Online via Gov.UK",
                        detail: "Go to gov.uk/student-visa. Fill out the application form online. Pay £363 visa fee + NHS Health Surcharge (£776 × course length in years). Upload your CAS, IELTS, TB test, passport, financial proof."
                    },
                    {
                        num: 6,
                        title: "Biometrics Appointment",
                        detail: "Book a biometrics appointment in Dhaka (usually at the VFS Global centre). Bring your passport and documents. Your fingerprints and photo will be taken."
                    },
                    {
                        num: 7,
                        title: "Wait for eVisa Decision",
                        detail: "As of 2025–2026, UK no longer gives physical visa stickers. You'll get a digital eVisa via your UKVI account. Processing takes about 3 weeks normally. In 2026, approximately 80% of Bangladeshi students are called for a credibility interview (video call with Home Office officer)."
                    },
                    {
                        num: 8,
                        title: "Credibility Interview — Prepare Well",
                        detail: "Questions include: Why this university? Why this course? Who is paying? Name 3 modules you'll study. What will you do after graduating? Be specific, honest and confident. Research your course modules in detail before the interview."
                    },
                ].map(s => (
                    <div className="step-row" key={s.num}>
                        <div className="step-num">{s.num}</div>
                        <div className="step-body">
                            <h4>{s.title}</h4>
                            <p>{s.detail}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginTop: 20 }}>
                <h3 style={{ marginBottom: 12 }}>📄 Documents Checklist</h3>
                {[
                    "✅ Valid Passport (min 1 year validity beyond course end date)",
                    "✅ CAS number from university (received after accepting offer)",
                    "✅ IELTS/PTE/TOEFL score certificate (UKVI version)",
                    "✅ Academic transcripts + BSc degree certificate (official)",
                    "✅ Bank statements (28-day rule, UKVI-approved bank)",
                    "✅ TB test certificate (from approved Dhaka clinic)",
                    "✅ Scholarship award letter (if applicable — reduces financial requirement)",
                    "✅ Statement of Purpose or study plan (sometimes requested)",
                    "✅ Passport-size photo (UK spec)",
                    "✅ Proof of sponsor's income if family is funding you",
                ].map((item, i) => (
                    <div className="task-item" key={i}>
                        <span style={{ fontSize: 14 }}>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Costs() {
    return (
        <div>
            <div className="section-title">Realistic Cost Breakdown</div>
            <div className="section-sub">Full financial picture for 1-year UK Masters from Bangladesh</div>

            <div className="highlight-box">
                <h4>💡 The Game Plan to Reduce Costs</h4>
                <p>Target an <strong style={{ color: '#e2e8f0' }}>affordable city outside London</strong> (Sheffield, Hull, Norwich, Keele area). Apply for the <strong style={{ color: '#e2e8f0' }}>GREAT Scholarship (£10,000–£15,000 off tuition)</strong>. Work part-time 20 hours/week during term (earn ~£400–£800/month). Cook at home, shop at Aldi/Lidl. This can bring your total family contribution down significantly.</p>
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Before You Go (Bangladesh, 2026–2027)</div>
            <div className="total-cost-table">
                {[
                    ["IELTS UKVI Academic Exam", "~৳ 22,000 – 25,000 (≈ £160)"],
                    ["Google/IBM Certificate (or free with aid)", "Free – $200 (৳ 0 – 22,000)"],
                    ["TB Test (Dhaka approved clinic)", "~৳ 3,000 – 5,000"],
                    ["UK Visa Application Fee", "£363 (≈ ৳ 50,000)"],
                    ["NHS Health Surcharge (IHS) for 1 year + extras", "~£1,164 (≈ ৳ 1,60,000)"],
                    ["Plane ticket (Dhaka to UK)", "~£500–£900 (≈ ৳ 70,000–1,25,000)"],
                    ["Pre-departure total (approx)", "≈ ৳ 3,00,000 – 4,00,000"],
                ].map(([label, value], i) => (
                    <div className="cost-row" key={i} style={i === 6 ? { background: '#1a2940' } : {}}>
                        <span className="cost-label">{label}</span>
                        <span className={i === 6 ? "cost-total" : "cost-value"}>{value}</span>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Annual UK Costs (Affordable City — No Scholarship)</div>
            <div className="total-cost-table">
                {[
                    ["Tuition (affordable university, CSE Masters)", "£16,000 – £22,000"],
                    ["Accommodation (shared, outside London)", "£5,500 – £7,200 (£450–£600/mo × 12)"],
                    ["Food (cooking at home, Aldi/Lidl)", "£1,800 – £2,400 (£150–£200/mo)"],
                    ["Transport (student bus pass)", "£600 – £900"],
                    ["Utilities + internet (shared)", "£800 – £1,200"],
                    ["Miscellaneous (books, phone, social)", "£600 – £1,000"],
                    ["TOTAL WITHOUT SCHOLARSHIP", "£25,300 – £34,700"],
                ].map(([label, value], i) => (
                    <div className="cost-row" key={i} style={i === 6 ? { background: '#1a2940' } : {}}>
                        <span className="cost-label">{label}</span>
                        <span className={i === 6 ? "cost-total" : "cost-value"}>{value}</span>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>With GREAT Scholarship (£10,000–£15,000)</div>
            <div className="total-cost-table">
                {[
                    ["Tuition after GREAT scholarship (e.g., Hull or Keele)", "£6,000 – £12,000"],
                    ["Living costs (12 months, affordable city)", "£9,300 – £12,700"],
                    ["Minus part-time income (20hrs/wk × ~£10/hr × 30 weeks)", "− £6,000 earned"],
                    ["NET FAMILY CONTRIBUTION (estimated)", "≈ £9,000 – £19,000"],
                    ["In Bangladeshi Taka (approx)", "≈ ৳ 12,50,000 – 26,00,000"],
                ].map(([label, value], i) => (
                    <div className="cost-row" key={i} style={i === 3 ? { background: '#1a2940' } : i === 4 ? { background: 'rgba(16,185,129,0.08)' } : {}}>
                        <span className="cost-label">{label}</span>
                        <span className={i >= 3 ? "cost-total" : "cost-value"} style={i === 4 ? { color: '#34d399' } : {}}>{value}</span>
                    </div>
                ))}
            </div>

            <div className="alert-box">
                <h4>🏦 Financial Proof for Visa (Important!)</h4>
                <ul>
                    <li>You need to show <strong>£10,224</strong> (£1,136 × 9 months) in your bank if studying outside London</li>
                    <li>This does NOT mean you spend it all — it's just proof of savings</li>
                    <li>A university scholarship letter <strong>reduces this requirement</strong> significantly</li>
                    <li>Use UKVI-approved banks: BRAC, Eastern Bank, City Bank, HSBC, Standard Chartered</li>
                    <li>Money must be in the account for <strong>28 consecutive days</strong> before visa application</li>
                </ul>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: 10 }}>💪 How to Survive Financially in the UK</h3>
                {[
                    ["Work part-time 20hrs/week (allowed on student visa)", "Earn £400–£800/month — covers food + transport completely"],
                    ["Cook at home, shop at Aldi/Lidl", "Food budget drops from £300 to £150–£180/month"],
                    ["Share accommodation with other students", "Cuts rent by 30–40%"],
                    ["Use student discounts everywhere", "TOTUM/NUS card: 10–20% off food, transport, shops"],
                    ["Use a 16-25 Railcard (£35/year)", "Saves 1/3 on all train travel across UK"],
                    ["Freelance online (Python/data skills)", "Earn extra while building your career portfolio"],
                ].map(([title, desc], i) => (
                    <div className="task-item" key={i}>
                        <span className="task-icon">💡</span>
                        <div><strong>{title}:</strong> {desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function App() {
    const [active, setActive] = useState("overview");

    const renderContent = () => {
        switch (active) {
            case "overview": return <Overview />;
            case "scholarships": return <Scholarships />;
            case "universities": return <Universities />;
            case "skills": return <SkillPlan />;
            case "sixmonths": return <SixMonths />;
            case "visa": return <Visa />;
            case "costs": return <Costs />;
            default: return <Overview />;
        }
    };

    return (
        <>
            <style>{style}</style>
            <div className="hero">
                <div className="flag-row">
                    🇧🇩 <span className="arrow-icon">→</span> 🇬🇧
                </div>
                <h1>Your UK Masters <span>Roadmap</span></h1>
                <p>A complete, research-backed guide for a Bangladeshi CSE graduate — scholarships, universities, visa, skill plan, and a 6-month daily action plan.</p>
                <div className="warning-banner">
                    ⚠️ <strong>Target: September 2027 Intake.</strong> September 2026 deadlines have mostly passed. Use these 6 months (May–Oct 2026) to build your profile, get IELTS, get certified, and apply early in 2026–27 cycle for best scholarship chances.
                </div>
            </div>

            <div className="tabs">
                {tabs.map(t => (
                    <div
                        key={t.id}
                        className={`tab ${active === t.id ? "active" : ""}`}
                        onClick={() => setActive(t.id)}
                    >
                        {t.icon} {t.label}
                    </div>
                ))}
            </div>

            <div className="content">
                {renderContent()}
            </div>
        </>
    );
}
