import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0e0a05;
    color: #ede8e0;
    min-height: 100vh;
  }

  .hero {
    background: linear-gradient(135deg, #0e0a05 0%, #1a0f02 50%, #0e0c07 100%);
    padding: 48px 24px 36px;
    text-align: center;
    border-bottom: 1px solid #3d2a10;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(212,160,23,0.09) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero::after {
    content: '';
    position: absolute;
    bottom: -50px; left: -50px;
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(0,146,70,0.08) 0%, transparent 70%);
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

  .arrow-icon { color: #d4a017; font-size: 20px; }

  .hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 5vw, 44px);
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .hero h1 span { color: #d4a017; }

  .hero p {
    color: #a09070;
    font-size: 15px;
    max-width: 560px;
    margin: 0 auto 20px;
    line-height: 1.6;
  }

  .advantage-banner {
    background: linear-gradient(90deg, rgba(0,146,70,0.12), rgba(212,160,23,0.08));
    border: 1px solid rgba(0,146,70,0.3);
    border-radius: 10px;
    padding: 12px 18px;
    max-width: 640px;
    margin: 0 auto;
    font-size: 13px;
    color: #86efac;
    text-align: left;
  }

  .advantage-banner strong { color: #4ade80; }

  .tabs {
    display: flex;
    overflow-x: auto;
    gap: 0;
    background: #110d03;
    border-bottom: 1px solid #3d2a10;
    padding: 0 16px;
    scrollbar-width: none;
  }

  .tabs::-webkit-scrollbar { display: none; }

  .tab {
    padding: 14px 18px;
    font-size: 13px;
    font-weight: 500;
    color: #6b5a3e;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tab:hover { color: #a09070; }
  .tab.active { color: #d4a017; border-bottom-color: #d4a017; }

  .content { padding: 24px 16px; max-width: 840px; margin: 0 auto; }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    color: #fff;
    margin-bottom: 6px;
    font-weight: 700;
  }

  .section-sub {
    color: #6b5a3e;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .card {
    background: #160f05;
    border: 1px solid #3d2a10;
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

  .badge-gold { background: rgba(212,160,23,0.15); color: #d4a017; border: 1px solid rgba(212,160,23,0.3); }
  .badge-green { background: rgba(0,146,70,0.15); color: #4ade80; border: 1px solid rgba(0,146,70,0.3); }
  .badge-red { background: rgba(220,38,38,0.15); color: #f87171; border: 1px solid rgba(220,38,38,0.3); }
  .badge-blue { background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); }
  .badge-purple { background: rgba(139,92,246,0.15); color: #a78bfa; border: 1px solid rgba(139,92,246,0.3); }

  .card h3 { font-size: 16px; font-weight: 600; color: #ede8e0; }
  .card p { font-size: 14px; color: #a09070; line-height: 1.6; }

  .detail-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
  }

  .detail-chip {
    background: #1e1508;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    color: #a09070;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .detail-chip strong { color: #ede8e0; }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 20px;
  }

  .stat-card {
    background: #160f05;
    border: 1px solid #3d2a10;
    border-radius: 12px;
    padding: 18px;
    text-align: center;
  }

  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px;
    color: #d4a017;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stat-label { font-size: 12px; color: #6b5a3e; }

  .step-grid { display: grid; gap: 12px; }

  .step-row {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    background: #160f05;
    border: 1px solid #3d2a10;
    border-radius: 10px;
    padding: 16px;
  }

  .step-num {
    width: 32px;
    height: 32px;
    background: #1e1508;
    color: #d4a017;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
    border: 1px solid #3d2a10;
  }

  .step-body h4 { font-size: 15px; font-weight: 600; color: #ede8e0; margin-bottom: 4px; }
  .step-body p { font-size: 13px; color: #a09070; line-height: 1.5; }

  .highlight-box {
    background: linear-gradient(135deg, rgba(212,160,23,0.07), rgba(0,146,70,0.04));
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .highlight-box h4 { color: #d4a017; font-size: 15px; margin-bottom: 8px; }
  .highlight-box p { font-size: 14px; color: #a09070; line-height: 1.6; }

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
    background: #3d2a10;
  }

  .month-content {
    flex: 1;
    padding-bottom: 24px;
  }

  .month-label {
    font-size: 11px;
    color: #6b5a3e;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
    margin-top: 8px;
  }

  .month-title {
    font-size: 16px;
    font-weight: 600;
    color: #ede8e0;
    margin-bottom: 10px;
  }

  .task-list { list-style: none; }

  .task-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #1e1508;
    font-size: 14px;
    color: #a09070;
    line-height: 1.5;
  }

  .task-item:last-child { border-bottom: none; }
  .task-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .task-item strong { color: #ede8e0; }

  .skill-track {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }

  .skill-card {
    background: #160f05;
    border: 1px solid #3d2a10;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
  }

  .skill-icon { font-size: 28px; margin-bottom: 8px; }
  .skill-name { font-size: 14px; font-weight: 600; color: #ede8e0; margin-bottom: 4px; }
  .skill-time { font-size: 12px; color: #6b5a3e; }
  .skill-provider { font-size: 12px; color: #4ade80; margin-top: 4px; }

  .progress-bar-outer {
    background: #1e1508;
    border-radius: 4px;
    height: 5px;
    margin-top: 10px;
    overflow: hidden;
  }

  .progress-bar-inner {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, #d4a017, #4ade80);
  }

  .total-cost-table {
    background: #160f05;
    border: 1px solid #3d2a10;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .cost-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 18px;
    border-bottom: 1px solid #1e1508;
    font-size: 14px;
  }

  .cost-row:last-child { border-bottom: none; }
  .cost-label { color: #a09070; }
  .cost-value { color: #ede8e0; font-weight: 600; }
  .cost-total { color: #d4a017; font-size: 16px; font-weight: 700; }

  .alert-box {
    background: rgba(0,146,70,0.07);
    border: 1px solid rgba(0,146,70,0.25);
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .alert-box h4 { color: #4ade80; font-size: 14px; margin-bottom: 6px; }
  .alert-box p, .alert-box li { font-size: 13px; color: #a09070; line-height: 1.6; }
  .alert-box ul { padding-left: 16px; }

  .warning-box {
    background: rgba(220,38,38,0.07);
    border: 1px solid rgba(220,38,38,0.2);
    border-radius: 10px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .warning-box h4 { color: #f87171; font-size: 14px; margin-bottom: 6px; }
  .warning-box p, .warning-box li { font-size: 13px; color: #a09070; line-height: 1.6; }
  .warning-box ul { padding-left: 16px; }

  .compare-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .compare-card {
    background: #160f05;
    border: 1px solid #3d2a10;
    border-radius: 10px;
    padding: 16px;
  }

  .compare-card h4 { font-size: 14px; font-weight: 600; margin-bottom: 10px; }
  .compare-item { font-size: 13px; color: #a09070; padding: 4px 0; border-bottom: 1px solid #1e1508; }
  .compare-item:last-child { border-bottom: none; }
  .compare-item strong { color: #ede8e0; }

  @media (max-width: 480px) {
    .compare-row { grid-template-columns: 1fr; }
    .grid-2 { grid-template-columns: 1fr 1fr; }
    .skill-track { grid-template-columns: 1fr 1fr; }
  }
`;

const tabs = [
    { id: "overview", label: "Overview", icon: "🗺️" },
    { id: "vs_uk", label: "Italy vs UK", icon: "⚖️" },
    { id: "scholarships", label: "Scholarships", icon: "🎓" },
    { id: "universities", label: "Universities", icon: "🏛️" },
    { id: "skills", label: "Skill Plan", icon: "💻" },
    { id: "sixmonths", label: "6-Month Plan", icon: "📅" },
    { id: "visa", label: "Visa & Docs", icon: "📋" },
    { id: "costs", label: "Costs", icon: "💶" },
];

function Overview() {
    return (
        <div>
            <div className="section-title">Your Italy Masters Roadmap</div>
            <div className="section-sub">Tailored for a Bangladeshi CSE graduate | A hidden gem compared to UK</div>

            <div className="highlight-box">
                <h4>🇮🇹 Why Italy is a Seriously Smart Choice</h4>
                <p>
                    Italy is arguably one of the <strong style={{ color: '#ede8e0' }}>best-kept secrets in international education</strong>. Public universities charge just <strong style={{ color: '#ede8e0' }}>€900–€4,000/year tuition</strong> (vs UK's £16,000–£25,000). Living costs are <strong style={{ color: '#ede8e0' }}>€700–€1,000/month</strong> in affordable cities. The Italian Government (MAECI) scholarship is genuinely <strong style={{ color: '#ede8e0' }}>fully funded</strong> — tuition waiver + €9,000 stipend. And the financial proof requirement for the visa is only <strong style={{ color: '#ede8e0' }}>€6,000</strong> — far easier to meet than the UK.
                </p>
            </div>

            <div className="grid-2">
                <div className="stat-card">
                    <div className="stat-value">€900–€4K</div>
                    <div className="stat-label">Annual tuition at public universities (world-class)</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">€9,000</div>
                    <div className="stat-label">MAECI government scholarship stipend (+ tuition waiver)</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">€700–€1K</div>
                    <div className="stat-label">Monthly living cost in affordable Italian cities</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">€50</div>
                    <div className="stat-label">Student visa fee — far cheaper than the UK's £363+</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">2 Years</div>
                    <div className="stat-label">Italian Masters (Laurea Magistrale) duration — more depth than UK</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">1 Year</div>
                    <div className="stat-label">Post-study job search permit after graduation</div>
                </div>
            </div>

            <div className="warning-box">
                <h4>⚠️ Key Difference: Italy Masters = 2 Years</h4>
                <p>Unlike the UK (1 year), Italian Laurea Magistrale programs are <strong style={{ color: '#ede8e0' }}>2 years (120 ECTS)</strong>. This means more time in Italy — which is more expensive overall — but also deeper learning, stronger thesis work, and more time to build experience and find work.</p>
            </div>

            <div className="card">
                <div className="card-header">
                    <span style={{ fontSize: '24px' }}>📌</span>
                    <div>
                        <h3>Your 6-Step Italy Master Plan</h3>
                        <p style={{ marginTop: 6 }}>This is your realistic path. September 2026 intake through universitaly.it pre-enrollment is technically still possible — but September 2027 is the safer, stronger-scholarship target.</p>
                    </div>
                </div>
                <div className="step-grid">
                    {[
                        ["Learn Python + Get Certified", "May–Aug 2026: Self-learn Python free, then complete Google Data Analytics or IBM certificate on Coursera (free with financial aid).", "#d4a017"],
                        ["Clear IELTS (or Italian B2)", "June–Aug 2026: IELTS 6.0+ for English programs. OR learn Italian to B2 level (opens MORE scholarship options + cheaper living).", "#4ade80"],
                        ["Choose Universities + Programs", "July 2026: Shortlist 4–5 Italian universities. Focus: Politecnico di Torino, University of Bologna, University of Padua, University of Pisa — all public, world-ranked, affordable cities.", "#60a5fa"],
                        ["Apply via Universitaly.it", "Aug–Oct 2026: The Italian government portal for non-EU pre-enrollment. This is MANDATORY before applying for a visa. Deadline is usually around June for September intake.", "#a78bfa"],
                        ["Apply for MAECI + ERSu Scholarships", "Sept–Nov 2026: MAECI Italian government scholarship opens around November for next academic year. ERSu/DSU regional scholarships open at enrollment.", "#f87171"],
                        ["Prepare Visa Documents", "Jan–April 2027: Once you have your university offer and pre-enrollment confirmation, gather documents and apply for Type D National Visa at Italian Embassy Dhaka.", "#d4a017"],
                    ].map(([title, desc, color], i) => (
                        <div className="step-row" key={i}>
                            <div className="step-num" style={{ color, borderColor: color + '44', background: color + '11' }}>{i + 1}</div>
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

function VsUK() {
    return (
        <div>
            <div className="section-title">Italy vs UK — Head to Head</div>
            <div className="section-sub">Both are excellent. Here's how they compare for a Bangladeshi student on a budget</div>

            <div className="highlight-box">
                <h4>💡 The Verdict</h4>
                <p>
                    Italy wins on <strong style={{ color: '#ede8e0' }}>cost and scholarship quality</strong> — the MAECI fully funded scholarship beats most UK GREAT scholarships. UK wins on <strong style={{ color: '#ede8e0' }}>duration (1 year vs 2 years)</strong> and <strong style={{ color: '#ede8e0' }}>post-study work rights (2 years)</strong>. If budget is your top concern, Italy is the smarter move. If you want faster graduation and more flexible work rights, UK is better.
                </p>
            </div>

            {[
                ["Tuition Fees", "£16,000–£25,000/year at decent UK universities", "€900–€4,000/year at TOP public Italian universities", "italy"],
                ["Living Costs", "£900–£1,400/month (affordable UK cities)", "€700–€1,000/month (Bologna, Padua, Turin, Pisa)", "italy"],
                ["Masters Duration", "1 year — quick to finish, lower total cost", "2 years — deeper education, more time in Italy", "uk"],
                ["Scholarship (Best)", "GREAT: £10,000–£15,000 off tuition | Chevening: fully funded", "MAECI: fully funded (€9,000 stipend + tuition waiver)", "tie"],
                ["Visa Fee", "£363 + £776/yr NHS surcharge = £1,139+ total", "€50 only — dramatically cheaper", "italy"],
                ["Financial Proof", "Show £10,224 in bank (28 days)", "Show €6,000/year (~£5,000) — much lower bar", "italy"],
                ["English Requirement", "IELTS UKVI 6.0–6.5 mandatory", "IELTS 6.0 for English programs (or Italian B2 for Italian programs)", "tie"],
                ["TB Test", "Mandatory for Bangladesh", "NOT required — saves time and money", "italy"],
                ["Post-Study Work", "Graduate Route Visa: 2 years work rights", "1 year job search permit — less flexible", "uk"],
                ["Visa Scrutiny", "80% of Bangladeshis get credibility interview", "No interview required — more straightforward", "italy"],
                ["University Ranking", "Sheffield: Russell Group; Hull: Top 60; UEA: Top 300", "Politecnico di Milano: QS #98; Bologna: QS #154", "tie"],
                ["Language Opportunity", "English only", "Can learn Italian — opens EU job market + local scholarships", "italy"],
                ["Part-Time Work", "Up to 20 hours/week, ~£10–12/hr", "Up to 20 hours/week, ~€10–14/hr", "tie"],
                ["No. of Intakes", "Mainly September", "September + February (Polimi) — more flexibility", "italy"],
            ].map(([category, uk, italy, winner], i) => (
                <div className="card" key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                        <h3 style={{ fontSize: 15 }}>{category}</h3>
                        <span className={`badge ${winner === 'italy' ? 'badge-green' : winner === 'uk' ? 'badge-blue' : 'badge-gold'}`}>
                            {winner === 'italy' ? '🇮🇹 Italy Wins' : winner === 'uk' ? '🇬🇧 UK Wins' : '🤝 Tie'}
                        </span>
                    </div>
                    <div className="compare-row">
                        <div className="compare-card">
                            <h4 style={{ color: '#60a5fa', fontSize: 13 }}>🇬🇧 UK</h4>
                            <p style={{ fontSize: 13, color: '#a09070' }}>{uk}</p>
                        </div>
                        <div className="compare-card">
                            <h4 style={{ color: '#4ade80', fontSize: 13 }}>🇮🇹 Italy</h4>
                            <p style={{ fontSize: 13, color: '#a09070' }}>{italy}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Scholarships() {
    return (
        <div>
            <div className="section-title">Scholarships for Bangladeshi Students</div>
            <div className="section-sub">Italy has some of the best scholarship opportunities in Europe — often overlooked</div>

            <div className="alert-box">
                <h4>✅ Key Advantage Over UK</h4>
                <p>The MAECI scholarship from the Italian government is TRULY fully funded — it covers tuition AND gives you €9,000 to live on. The UK's GREAT scholarship is partial (tuition only). Bangladesh is eligible for MAECI scholarships. Applications typically open in November for the next academic year.</p>
            </div>

            {[
                {
                    name: "MAECI — Italian Government Scholarship",
                    badge: "FULLY FUNDED ⭐",
                    badgeClass: "badge-green",
                    amount: "€9,000 stipend (paid in installments) + tuition exemption + health insurance",
                    coverage: "Tuition waiver + living stipend + health insurance — ALL costs",
                    eligibility: "Bangladeshi citizen, under 28, Bachelor's degree, IELTS 6.0 or Italian B2, strong academic record",
                    deadline: "Typically late November – March each year for next academic year",
                    link: "studyinitaly.esteri.it",
                    note: "The 2026-27 MAECI deadline was March 26, 2026 — already passed. Apply for 2027-28 when it opens in November 2026. Bangladesh is explicitly eligible (150+ countries covered). This is the #1 scholarship to target for Italy.",
                    icon: "⭐",
                },
                {
                    name: "Erasmus Mundus Scholarship",
                    badge: "FULLY FUNDED",
                    badgeClass: "badge-green",
                    amount: "Full tuition + €1,000/month stipend + travel allowance",
                    coverage: "Everything — truly fully funded, multi-country study experience",
                    eligibility: "Strong academic record, English proficiency, applies to specific joint-degree programs",
                    deadline: "Varies by program — typically October to January each year",
                    link: "eacea.ec.europa.eu/erasmus-plus",
                    note: "Erasmus Mundus funds you to study in 2–3 European countries. Many programs involve Italy. Bangladesh students ARE eligible. Look for programs in Computer Science, AI, Data Science. This is competitive but life-changing if you get it.",
                    icon: "🌍",
                },
                {
                    name: "Politecnico di Milano Merit Scholarship",
                    badge: "PARTIAL — TUITION WAIVER",
                    badgeClass: "badge-gold",
                    amount: "Full tuition fee waiver + possible living support",
                    coverage: "Tuition fees waived based on academic merit",
                    eligibility: "Admitted international student with strong BSc grades (high marks, strong transcript)",
                    deadline: "Applied during university admission process — no separate application needed often",
                    link: "polimi.it/scholarships",
                    note: "Polimi's merit scholarships are automatically assessed during admission. International students with high GPA from their Bachelor's are competitive. The university is QS #98 globally.",
                    icon: "🏆",
                },
                {
                    name: "ERSu / DSU Regional Scholarships",
                    badge: "PARTIAL — REGIONAL",
                    badgeClass: "badge-blue",
                    amount: "€4,000–€6,500/year + reduced/free accommodation at university residences",
                    coverage: "Living allowance + subsidized accommodation",
                    eligibility: "Low-income international students enrolled in Italian public universities",
                    deadline: "Usually August–October after you enroll",
                    link: "Check your specific university's EDiSU/ERSu/DSU welfare organization",
                    note: "Every Italian public university region has a welfare body (DSU in Tuscany, ERSu in Padua, etc.) that gives income-based grants. As a Bangladeshi student from a middle-class family, you have a STRONG chance of qualifying. Apply immediately after enrolling.",
                    icon: "🏠",
                },
                {
                    name: "University of Padua International Excellence Scholarship",
                    badge: "PARTIAL",
                    badgeClass: "badge-gold",
                    amount: "€5,000 + tuition waiver",
                    coverage: "Partial tuition + cash grant",
                    eligibility: "Non-EU students with excellent academic record applying to Masters at UniPD",
                    deadline: "Check university website — typically January–April each year",
                    link: "unipd.it/scholarships",
                    note: "University of Padua is confirmed available for Bangladeshi students. Strong programs in Computer Science and Engineering. Padua is a highly affordable, historic university city.",
                    icon: "🎯",
                },
                {
                    name: "Ca' Foscari Venice — International Scholarships",
                    badge: "UP TO €10,000/year",
                    badgeClass: "badge-gold",
                    amount: "Up to €10,000 per year",
                    coverage: "Partial tuition and/or living",
                    eligibility: "International students enrolling in Masters at Ca' Foscari Venice 2026-27",
                    deadline: "March–April 2026 (check for 2027-28 cycle)",
                    link: "unive.it/scholarships",
                    note: "Ca' Foscari offers up to 28 scholarships for international students. Venice is a stunning (though somewhat pricey) city. Worth applying to for the scholarship.",
                    icon: "🚤",
                },
                {
                    name: "Invest Your Talent in Italy (IYT)",
                    badge: "INTERNSHIP + FUNDING",
                    badgeClass: "badge-purple",
                    amount: "Grant for living + guaranteed internship with Italian company",
                    coverage: "Living support + corporate internship placement",
                    eligibility: "Masters students at specific partner universities in Italy",
                    deadline: "Check country-specific IYT page — Bangladesh is eligible",
                    link: "investyourtalentinItaly.it",
                    note: "A unique program by the Italian Ministry of Foreign Affairs that connects international students with Italian companies for internships during their Masters. Great for building career connections and CV.",
                    icon: "💼",
                },
            ].map((s, i) => (
                <div className="card" key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <span style={{ fontSize: '20px' }}>{s.icon}</span>
                            <h3>{s.name}</h3>
                        </div>
                        <span className={`badge ${s.badgeClass}`}>{s.badge}</span>
                    </div>
                    <div className="detail-row">
                        <div className="detail-chip">💰 <strong>{s.amount}</strong></div>
                        <div className="detail-chip">📅 <strong>{s.deadline}</strong></div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#ede8e0' }}>Covers:</strong> {s.coverage}</p>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#ede8e0' }}>Eligibility:</strong> {s.eligibility}</p>
                        <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(212,160,23,0.07)', borderRadius: 8, borderLeft: '3px solid #d4a017' }}>
                            <p style={{ fontSize: 13, color: '#d4a017' }}>💡 {s.note}</p>
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
            <div className="section-title">Best Universities for CSE / Tech in Italy</div>
            <div className="section-sub">World-class rankings at a fraction of global costs — avoid Milan and Rome for budget</div>

            <div className="highlight-box">
                <h4>🏙️ City Strategy: Avoid Milan & Rome</h4>
                <p>Milan (Politecnico di Milano) is world-class but expensive — rent alone can hit €700–€1,000/month. Instead, target <strong style={{ color: '#ede8e0' }}>Turin, Bologna, Padua, Pisa, or Genoa</strong> — home to equally excellent ranked universities at €350–€550/month rent. Bologna, Padua, and Pisa are Italy's most student-friendly, affordable, and internationally welcoming cities.</p>
            </div>

            {[
                {
                    uni: "Politecnico di Torino",
                    city: "Turin",
                    ranking: "QS Top 300 | Italy's #2 Technical University",
                    rent: "€350–€550/month",
                    tuition: "€900–€3,500/year (income-based)",
                    programs: "MSc Computer Engineering, MSc Data Science & Engineering, MSc Cybersecurity",
                    scholarship: "MAECI + ERSu regional scholarship + merit waivers",
                    why: "Turin is one of Italy's most affordable and liveable student cities. Politecnico di Torino is Italy's second-best tech university. Strong industry links with Fiat/Stellantis, tech startups, and European research centers. English-taught MSc programs available. Pre-enrollment deadline for 2026-27 extended to July 2026.",
                    icon: "⚙️",
                },
                {
                    uni: "University of Bologna (Unibo)",
                    city: "Bologna",
                    ranking: "QS #154 | Oldest university in the world (est. 1088)",
                    rent: "€400–€550/month",
                    tuition: "€1,000–€3,000/year (income-based)",
                    programs: "MSc Computer Science, MSc Artificial Intelligence, MSc Data Science",
                    scholarship: "DSU Emilia-Romagna (regional) + MAECI + merit scholarship",
                    why: "Bologna is Italy's top student city — safe, compact, culturally rich, and specifically built around university life. Unibo consistently ranks in world top 200. MSc in AI is taught entirely in English. DSU Emilia-Romagna provides strong regional welfare grants.",
                    icon: "📚",
                },
                {
                    uni: "University of Padua (UniPD)",
                    city: "Padua",
                    ranking: "QS Top 300 | World Top 250 in CS",
                    rent: "€350–€500/month",
                    tuition: "€1,000–€3,500/year (income-based)",
                    programs: "MSc Computer Science, MSc Cybersecurity, MSc ICT Innovation",
                    scholarship: "International Excellence Scholarship (€5,000 + waiver) + ERSu + MAECI",
                    why: "University of Padua offers a confirmed International Excellence Scholarship for non-EU students. Padua is 30 minutes from Venice, has very low living costs, a huge student population, and strong CS research. ERSu Padua is generous with income-based grants.",
                    icon: "🌟",
                },
                {
                    uni: "University of Pisa",
                    city: "Pisa",
                    ranking: "QS Top 400 | Italy's top for Computer Science",
                    rent: "€300–€450/month",
                    tuition: "€800–€2,500/year",
                    programs: "MSc Computer Science, MSc Artificial Intelligence & Data Engineering",
                    scholarship: "DSU Toscana (regional) + MAECI + merit",
                    why: "Pisa has some of ITALY'S CHEAPEST rents (€300–€450) while hosting a top CS department. The MSc in AI & Data Engineering is English-taught and internationally recognized. University of Pisa was rated as one of Europe's best for computer science research.",
                    icon: "🏰",
                },
                {
                    uni: "Politecnico di Milano",
                    city: "Milan",
                    ranking: "QS #98 Globally | Italy's #1 Technical University",
                    rent: "€600–€1,000/month",
                    tuition: "€900–€4,000/year (income-based)",
                    programs: "MSc Computer Science & Engineering, MSc Artificial Intelligence",
                    scholarship: "Merit scholarship (tuition waiver) + MAECI",
                    why: "The most prestigious option — QS #98 globally, top 20 worldwide in Engineering. Extremely competitive. Tuition is income-based so could be very low. BUT Milan is Italy's most expensive city. Only target Polimi if you can secure a merit scholarship or MAECI. February 2027 intake available.",
                    icon: "🥇",
                },
                {
                    uni: "University of Genoa",
                    city: "Genoa",
                    ranking: "Top Italian universities | Strong in CS & Robotics",
                    rent: "€280–€450/month",
                    tuition: "€800–€2,500/year",
                    programs: "MSc Computer Science, MSc Robotics Engineering, MSc ICT",
                    scholarship: "Regional scholarship (LIGURIA DSU) + MAECI",
                    why: "Genoa has some of Italy's lowest living costs. The port city is vibrant, coastal, and underrated. Strong computer science and robotics department. Excellent for budget-conscious students who still want a quality Italian degree.",
                    icon: "⚓",
                },
            ].map((u, i) => (
                <div className="card" key={i}>
                    <div className="card-header">
                        <span style={{ fontSize: '22px' }}>{u.icon}</span>
                        <div>
                            <h3>{u.uni}</h3>
                            <p style={{ fontSize: 13, color: '#6b5a3e', marginTop: 2 }}>{u.city} · {u.ranking}</p>
                        </div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-chip">🏠 Rent: <strong>{u.rent}</strong></div>
                        <div className="detail-chip">💰 Tuition: <strong>{u.tuition}</strong></div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#ede8e0' }}>Programs:</strong> {u.programs}</p>
                        <p style={{ fontSize: 13, marginBottom: 6 }}><strong style={{ color: '#d4a017' }}>Scholarship:</strong> {u.scholarship}</p>
                        <p style={{ fontSize: 13, color: '#a09070' }}>{u.why}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SkillPlan() {
    return (
        <div>
            <div className="section-title">Skill Building Plan</div>
            <div className="section-sub">Same skill path as the UK plan — but with an added Italy-specific advantage</div>

            <div className="highlight-box">
                <h4>🇮🇹 Italy Bonus: Learn Basic Italian</h4>
                <p>Unlike the UK, learning Italian opens extra scholarship options, increases your visa confidence, makes daily life dramatically easier, and impresses admissions offices. You don't need fluency — just basic conversational Italian (A1–A2) in 6 months is enough to feel comfortable. Use Duolingo + free YouTube Italian courses. Italian language proficiency at B2 level also qualifies you for <strong style={{ color: '#ede8e0' }}>Italian-language programs which often have lower competition</strong> from international students.</p>
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Phase 1: Python (Month 1–2)</div>

            <div className="skill-track">
                {[
                    { icon: "🐍", name: "Python Basics", time: "3–4 weeks", provider: "Free: freeCodeCamp / Kaggle Learn", pct: 100 },
                    { icon: "📊", name: "Python for Data", time: "2–3 weeks", provider: "Free: Kaggle Pandas + Numpy", pct: 80 },
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

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Phase 2: Certificate (Month 2–4)</div>

            {[
                {
                    provider: "Google",
                    cert: "Google Data Analytics Certificate",
                    platform: "Coursera",
                    cost: "FREE with Financial Aid (apply for it!)",
                    duration: "4–6 months",
                    skills: "Data analysis, SQL, R, Tableau, visualization",
                    why: "Most globally recognized. Directly relevant to Italian MSc in Data Science / AI programs. Shows initiative to admissions at Bologna, Padua, Polimi.",
                    badge: "RECOMMENDED",
                    badgeClass: "badge-gold",
                },
                {
                    provider: "IBM",
                    cert: "IBM Data Science Professional Certificate",
                    platform: "Coursera",
                    cost: "FREE with Financial Aid",
                    duration: "4–6 months",
                    skills: "Python, SQL, Machine Learning, Jupyter, data visualization",
                    why: "Heavy Python + ML focus ideal for Italian tech programs. Very strong if applying to AI or Data Engineering masters.",
                    badge: "ALTERNATIVE",
                    badgeClass: "badge-blue",
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
                    <p style={{ fontSize: 13, color: '#4ade80', marginTop: 12 }}>✅ {c.why}</p>
                </div>
            ))}

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12, marginTop: 8 }}>Phase 3: Italian Language (Month 1–6, parallel)</div>

            <div className="card">
                <h3 style={{ marginBottom: 12 }}>🇮🇹 Learn Italian — A Unique Italy Advantage</h3>
                {[
                    ["Duolingo Italian", "Free — 15–20 mins/day. Build A1 foundation in 2 months. Good for basics and vocab."],
                    ["Italian with Lucrezia (YouTube)", "Free — popular YouTube channel for beginners by a native speaker. Watch 20 mins/day."],
                    ["Italiano con Amore (free podcast)", "Free — conversational Italian for intermediate learners. Listen on commute."],
                    ["italki (paid, optional)", "Affordable 1-on-1 online lessons with Italian tutors (~$8–15/session). Practice speaking once a week."],
                    ["Target: A1–A2 in 6 months", "Enough to survive daily life in Italy, impress locals, and show cultural integration in your SOP."],
                ].map(([title, desc], i) => (
                    <div className="task-item" key={i}>
                        <span className="task-icon">🇮🇹</span>
                        <div><strong>{title}:</strong> {desc}</div>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Phase 4: Build Portfolio (Month 4–5)</div>
            <div className="card">
                <h3 style={{ marginBottom: 12 }}>3 Projects for Italian University Applications</h3>
                {[
                    ["Bangladesh Air Quality Dashboard", "Python + Pandas + Plotly. Analyze BNQIS open data. Highly relevant, unique to you, impressive to Italian professors."],
                    ["ML Prediction Project on Kaggle", "Train a model on a Kaggle dataset. Document all steps, upload to GitHub with clean README."],
                    ["Data Analysis Report (PDF)", "Write a data analysis report in English analyzing any social/economic dataset — shows writing ability important for Italian universities."],
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
            title: "Foundation: Python + Italian + Research",
            color: "#d4a017",
            dot: "#4a2e02",
            tasks: [
                ["📚", "Start Python basics: freeCodeCamp Python for Beginners — 2 hours/day"],
                ["🇮🇹", "Start Duolingo Italian — 15 mins/day. Download Italian with Lucrezia on YouTube."],
                ["🔍", "Research Italian universities: shortlist 6–8 MSc programs in CS/AI/Data Science at Bologna, Padua, Turin, Pisa"],
                ["📝", "Read 5 sample SOPs/motivation letters from students who got into Italian universities"],
                ["🎓", "Apply for Coursera Financial Aid for Google Data Analytics Certificate (takes ~15 days)"],
                ["📄", "Start collecting documents: BSc transcripts, degree certificate, ID, passport, photos"],
            ],
        },
        {
            label: "Month 2 — June 2026",
            title: "Python Intermediate + IELTS Prep + universitaly.it Research",
            color: "#4ade80",
            dot: "#052e16",
            tasks: [
                ["🐍", "Move to Python for Data Analysis (Pandas, NumPy on Kaggle — free)"],
                ["📖", "Start IELTS prep: Cambridge IELTS books or free PDFs online. Take first mock test."],
                ["🌐", "Visit universitaly.it — understand the pre-enrollment process for non-EU students"],
                ["📝", "Start Google Data Analytics Certificate Module 1–3 on Coursera"],
                ["🇮🇹", "Italian: complete Duolingo Italian Unit 1–3. Watch Italian YouTube 20 mins/day."],
                ["✍️", "Write first draft of motivation letter (why Italy? why this program? 200 words)"],
            ],
        },
        {
            label: "Month 3 — July 2026",
            title: "IELTS Intensify + Certificate Progress + Pre-enrollment Prep",
            color: "#60a5fa",
            dot: "#0c1a3d",
            tasks: [
                ["📋", "Complete universitaly.it registration — understand what documents you'll need for pre-enrollment"],
                ["📖", "IELTS Writing: 2 essays/week. Speaking: record yourself on phone with IELTS Part 2 topics."],
                ["🎓", "Complete Google Data Analytics Modules 4–6"],
                ["📊", "Start first portfolio project on GitHub (Bangladesh Air Quality or Kaggle dataset)"],
                ["📅", "IMPORTANT: Book IELTS Academic exam for August 2026. Target score: 6.0–6.5"],
                ["🏛️", "Finalize your list of 4–5 specific programs with application deadlines"],
            ],
        },
        {
            label: "Month 4 — August 2026",
            title: "IELTS Exam + Finish Certificate + Portfolio",
            color: "#a78bfa",
            dot: "#2e1065",
            tasks: [
                ["📋", "Take IELTS Academic exam — target 6.0 minimum (6.5 ideal)"],
                ["🎓", "Complete Google Data Analytics Certificate — download official certificate"],
                ["📂", "Finish 2 GitHub portfolio projects — clean up README files"],
                ["✍️", "Write final, strong Motivation Letter (for Italian applications — often called SOP)"],
                ["🌐", "If September 2026 intake is still possible: submit universitaly.it pre-enrollment NOW"],
                ["📊", "Check ISEE equivalent / financial documentation for DSU/ERSu scholarship applications"],
            ],
        },
        {
            label: "Month 5 — September 2026",
            title: "Submit Applications + Watch for MAECI Opening",
            color: "#f87171",
            dot: "#3d0808",
            tasks: [
                ["🏛️", "Submit applications directly to Italian universities (most open Sept–Dec for following year)"],
                ["🎓", "Watch for MAECI 2027-28 scholarship opening (usually November) — prepare your materials"],
                ["📝", "Request 2 strong Letters of Recommendation from BSc professors — give them plenty of time"],
                ["🇮🇹", "Italian: push to A2 level. Practice with free language exchange apps (Tandem, HelloTalk)"],
                ["💼", "Research Erasmus Mundus programs in CS/AI with Italian partner universities"],
                ["📊", "Complete 3rd portfolio project — publish everything on LinkedIn"],
            ],
        },
        {
            label: "Month 6 — October 2026",
            title: "Follow Up + Scholarship Prep + Visa Research",
            color: "#d4a017",
            dot: "#4a2e02",
            tasks: [
                ["⭐", "MAECI scholarship opens (November) — prepare motivation statement, gather all documents"],
                ["🏦", "Build financial evidence: save toward showing €6,000 in a bank account (much less than UK)"],
                ["📋", "Study Italy visa requirements thoroughly: Type D National Visa process, VFS Global Dhaka"],
                ["📝", "Finalize motivation letters — have a trusted person review them for grammar"],
                ["🌐", "Join Facebook groups: 'Bangladeshi Students in Italy' — get real visa and life advice"],
                ["🇮🇹", "Italian: start A2-level content — easy Italian videos, grammar books"],
            ],
        },
    ];

    return (
        <div>
            <div className="section-title">6-Month Daily Action Plan</div>
            <div className="section-sub">May 2026 → October 2026 | Targeting September 2027 Italian Masters intake</div>

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
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
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
            <div className="section-title">Italy Student Visa Process</div>
            <div className="section-sub">Type D National Visa from Bangladesh — much simpler and cheaper than UK</div>

            <div className="alert-box">
                <h4>🎉 Italy Visa Advantages Over UK</h4>
                <ul>
                    <li><strong>No credibility interview</strong> — unlike UK where 80% of Bangladeshis get interviewed</li>
                    <li><strong>No TB test</strong> — Italy doesn't require it for Bangladeshi students</li>
                    <li><strong>Visa fee only €50</strong> — vs UK's £363 + £776 NHS surcharge</li>
                    <li><strong>Financial proof: only €6,000/year</strong> — vs UK's £10,224</li>
                    <li><strong>No restricted bank account</strong> — no 28-day rule like UK</li>
                </ul>
            </div>

            <div className="step-grid">
                {[
                    {
                        num: 1,
                        title: "Get Accepted to an Italian University",
                        detail: "Apply directly to the university AND through universitaly.it (the Italian government pre-enrollment portal for non-EU students). This pre-enrollment is MANDATORY for your visa. Universities issue an acceptance letter after reviewing your application."
                    },
                    {
                        num: 2,
                        title: "Complete Pre-Enrollment on universitaly.it",
                        detail: "This is a mandatory government step unique to Italy. You submit your academic credentials and intended program. The Italian CIMEA office verifies your Bangladesh BSc degree. This must be done well before the visa application — typically deadline is June–July for September intake."
                    },
                    {
                        num: 3,
                        title: "Pass IELTS (for English-taught programs)",
                        detail: "For English-medium MSc programs (most Politecnico and public university programs), you need IELTS 6.0+ or TOEFL/PTE equivalent. Note: If you take Italian-language programs, you need Italian CILS/CELI B2 instead of IELTS. No TB test needed for Italy unlike the UK."
                    },
                    {
                        num: 4,
                        title: "Gather Required Documents",
                        detail: "Collect: valid passport, acceptance letter from university, universitaly.it pre-enrollment confirmation, BSc degree certificate with certified English translation, IELTS score, financial proof (€6,000/year in bank), health insurance (€30,000 coverage), passport photos, and a motivation letter."
                    },
                    {
                        num: 5,
                        title: "Apply at VFS Global Dhaka (Italian Embassy)",
                        detail: "Submit your Type D National Visa application at VFS Global, Dhaka. Unlike UK, you can go without a prior appointment. Pay €50 visa fee + VFS service charge. Provide biometrics (fingerprints). No interview required. Start 3–4 months before your course start date."
                    },
                    {
                        num: 6,
                        title: "Wait for Visa Decision",
                        detail: "Processing takes approximately 21–30 calendar days. Italy's visa processing is generally straightforward for genuine students. Once approved, you get a visa sticker in your passport for entry."
                    },
                    {
                        num: 7,
                        title: "Arrive in Italy + Get Permesso di Soggiorno",
                        detail: "Within 8 days of arriving in Italy, you MUST register with the local police station (Questura) and apply for your Permesso di Soggiorno (residence permit). This costs €76–100 and is how you officially become a legal resident during your studies."
                    },
                    {
                        num: 8,
                        title: "Apply for DSU/ERSu Scholarship Immediately",
                        detail: "As soon as you enroll at your Italian university, apply for the DSU/ERSu income-based regional scholarship. These grants give €4,000–6,500/year + subsidized accommodation to low-income international students. You MUST apply soon after the academic year starts — don't miss this!"
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
                <h3 style={{ marginBottom: 12 }}>📄 Documents Checklist for Italy Student Visa</h3>
                {[
                    "✅ Valid Passport (min 3 months validity beyond intended stay, 2 blank pages)",
                    "✅ University acceptance/offer letter from Italian institution",
                    "✅ universitaly.it pre-enrollment confirmation (mandatory for non-EU)",
                    "✅ BSc degree certificate + official English/Italian translation (notarized)",
                    "✅ Academic transcripts + translations",
                    "✅ IELTS/TOEFL certificate (6.0+ for English programs)",
                    "✅ Bank statement showing ≥€6,000 (or scholarship letter if applicable)",
                    "✅ Health insurance covering €30,000 for emergencies",
                    "✅ Accommodation proof (university dorm booking OR rental agreement in Italy)",
                    "✅ Passport-size photos (3.5×4.5cm, white background)",
                    "✅ Motivation letter (1 page — why Italy, why this program, career goals)",
                    "✅ Completed Type D visa application form (from vfsglobal.com Italy section)",
                    "✅ CIMEA document evaluation (if required — for degree recognition)",
                ].map((item, i) => (
                    <div className="task-item" key={i}>
                        <span style={{ fontSize: 14 }}>{item}</span>
                    </div>
                ))}
            </div>

            <div className="warning-box">
                <h4>⚠️ The Document Translation Rule</h4>
                <p>All your Bangladeshi documents (BSc degree, transcripts, birth certificate) must be <strong style={{ color: '#f87171' }}>officially translated into Italian or English AND notarized/legalized</strong>. Start this early — it takes time and has a cost. Documents must also be apostilled by Bangladesh's Ministry of Foreign Affairs before submission.</p>
            </div>
        </div>
    );
}

function Costs() {
    return (
        <div>
            <div className="section-title">Realistic Cost Breakdown for Italy</div>
            <div className="section-sub">Full financial picture — 2-year Italian Masters from Bangladesh</div>

            <div className="highlight-box">
                <h4>💡 The Core Advantage</h4>
                <p>Italy's tuition is income-based, meaning as a low-income international student, you may qualify for <strong style={{ color: '#ede8e0' }}>near-zero tuition</strong> at public universities. The DSU/ERSu regional scholarships can give you €4,000–6,500/year in living support. Combined with part-time work (€300–600/month), the actual out-of-pocket cost for a 2-year Italian Masters can be <strong style={{ color: '#ede8e0' }}>LESS than a 1-year UK Masters</strong> for a scholarship recipient.</p>
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Before You Go (Bangladesh, 2026–2027)</div>
            <div className="total-cost-table">
                {[
                    ["IELTS Academic Exam", "~৳ 22,000–25,000 (≈ €160)"],
                    ["Google/IBM Certificate (Financial Aid)", "Free – $200 (৳ 0–22,000)"],
                    ["Italian Study Materials (optional)", "Free (Duolingo) – ৳ 3,000 (textbook)"],
                    ["Italy Student Visa Fee (Type D)", "€50 (≈ ৳ 6,000) — much cheaper than UK!"],
                    ["VFS Service Charge (Dhaka)", "~€30–40 (≈ ৳ 3,500–5,000)"],
                    ["Document Translation + Notarization", "~৳ 10,000–20,000"],
                    ["Health Insurance (for visa)", "~€100–150 (≈ ৳ 12,000–18,000)"],
                    ["Plane ticket (Dhaka to Italy)", "~€550–900 (≈ ৳ 65,000–1,10,000)"],
                    ["Pre-departure total (approx)", "≈ ৳ 1,20,000 – 2,00,000 (FAR less than UK's ৳ 3–4 lakh!)"],
                ].map(([label, value], i) => (
                    <div className="cost-row" key={i} style={i === 8 ? { background: '#1e1508' } : {}}>
                        <span className="cost-label">{label}</span>
                        <span className={i === 8 ? "cost-total" : "cost-value"}>{value}</span>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>Annual Italy Costs — Affordable City (No Scholarship)</div>
            <div className="total-cost-table">
                {[
                    ["Tuition (public university, income-based)", "€900 – €3,500/year"],
                    ["Accommodation (shared room, Bologna/Turin/Pisa)", "€4,200–€6,600 (€350–550/mo × 12)"],
                    ["Food (home cooking, discount supermarkets)", "€1,800–€2,400 (€150–200/mo)"],
                    ["Transport (student pass + regional trains)", "€500–€800"],
                    ["Utilities + internet (shared)", "€600–€900"],
                    ["Health insurance + Permesso di Soggiorno", "€300–€400"],
                    ["Miscellaneous (books, phone, social)", "€500–€800"],
                    ["TOTAL PER YEAR (WITHOUT SCHOLARSHIP)", "€8,800 – €15,400/year"],
                    ["FOR 2 YEARS TOTAL (WITHOUT SCHOLARSHIP)", "€17,600 – €30,800"],
                ].map(([label, value], i) => (
                    <div className="cost-row" key={i} style={i >= 7 ? { background: '#1e1508' } : {}}>
                        <span className="cost-label">{label}</span>
                        <span className={i >= 7 ? "cost-total" : "cost-value"} style={i === 8 ? { color: '#f87171' } : {}}>{value}</span>
                    </div>
                ))}
            </div>

            <div className="section-title" style={{ fontSize: 18, marginBottom: 12 }}>With MAECI Scholarship (Fully Funded Scenario)</div>
            <div className="total-cost-table">
                {[
                    ["Tuition after scholarship", "€0 (full exemption)"],
                    ["MAECI stipend received (9 months)", "+€9,000 given to you"],
                    ["Living costs (9 months)", "~€8,100 (€900/mo in affordable city)"],
                    ["Net cost after stipend (9 months of study)", "≈ €0 covered by stipend"],
                    ["Summer months living (3 months)", "~€2,700 (need part-time income)"],
                    ["Part-time work income (20hrs/wk)", "Earn €300–600/month to cover summer"],
                    ["Family contribution (estimated)", "≈ €0 – €5,000 total over 2 years"],
                    ["IN TAKA (approx)", "≈ ৳ 0 – 7,00,000 over entire 2 years!"],
                ].map(([label, value], i) => (
                    <div className="cost-row" key={i} style={i >= 6 ? { background: '#1e1508' } : {}}>
                        <span className="cost-label">{label}</span>
                        <span className={i >= 6 ? "cost-total" : "cost-value"} style={i === 7 ? { color: '#4ade80' } : {}}>{value}</span>
                    </div>
                ))}
            </div>

            <div className="alert-box">
                <h4>🏦 Financial Proof for Italy Visa — Much Easier</h4>
                <ul>
                    <li>You only need to show <strong>€6,000/year</strong> (≈ ৳ 7,00,000) in your bank — vs UK's £10,224 (≈ ৳ 14,00,000)</li>
                    <li>No 28-day holding period rule (unlike UK)</li>
                    <li>A scholarship award letter can REPLACE the financial proof entirely</li>
                    <li>No specific approved banks required — any major Bangladeshi bank works</li>
                    <li>MAECI scholarship, if awarded, completely eliminates the financial proof requirement</li>
                </ul>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: 10 }}>💪 How to Survive Financially in Italy</h3>
                {[
                    ["Work part-time 20hrs/week (allowed on student visa)", "Earn €300–600/month — covers food and transport in affordable cities"],
                    ["Apply for DSU/ERSu regional scholarship immediately after enrollment", "€4,000–6,500/year + subsidized accommodation — massive help"],
                    ["Live in university dormitories (if available)", "€200–400/month vs €400–600 private — apply early as spots are limited"],
                    ["Cook at home, shop at LIDL/Eurospin/Penny Market (Italian discount stores)", "Groceries drop to €100–150/month easily"],
                    ["Use student bus pass and discount cards", "€25–40/month for city transport — ask your university"],
                    ["Exploit the 'Mensa Universitaria' (university cafeteria)", "Hot Italian meal for €3–5 — often subsidized for enrolled students"],
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
            case "vs_uk": return <VsUK />;
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
                    🇧🇩 <span className="arrow-icon">→</span> 🇮🇹
                </div>
                <h1>Your Italy Masters <span>Roadmap</span></h1>
                <p>A complete, research-backed guide for a Bangladeshi CSE graduate — world-class universities at a fraction of the UK's cost, real scholarships, and a simpler visa process.</p>
                <div className="advantage-banner">
                    🎯 <strong>Italy's Secret:</strong> Public universities like Politecnico di Torino, University of Bologna, and University of Padua are world-ranked and charge just €900–€3,500/year — and the Italian government's MAECI scholarship covers tuition + gives you €9,000 to live on. Bangladesh is eligible.
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