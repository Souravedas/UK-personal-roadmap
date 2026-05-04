import { useState } from "react";

/* ─── FONTS & BASE STYLES ───────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:#07080e;color:#dde1ee;min-height:100vh;}
::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#2a2f45;border-radius:4px;}
.pill{display:inline-flex;align-items:center;gap:5px;padding:3px 11px;border-radius:20px;font-size:11px;font-weight:600;white-space:nowrap;}
.pill-g{background:rgba(52,211,153,.13);color:#34d399;border:1px solid rgba(52,211,153,.25);}
.pill-y{background:rgba(251,191,36,.12);color:#fbbf24;border:1px solid rgba(251,191,36,.24);}
.pill-r{background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.24);}
.pill-b{background:rgba(96,165,250,.12);color:#60a5fa;border:1px solid rgba(96,165,250,.24);}
.pill-p{background:rgba(167,139,250,.12);color:#a78bfa;border:1px solid rgba(167,139,250,.24);}
.card{background:#0d0f19;border:1px solid #1c2035;border-radius:12px;padding:18px;margin-bottom:14px;}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px;margin-bottom:18px;}
.stat-box{background:#0d0f19;border:1px solid #1c2035;border-radius:10px;padding:16px;text-align:center;}
.stat-val{font-family:'Syne',serif;font-size:26px;font-weight:800;margin-bottom:3px;}
.stat-lbl{font-size:12px;color:#5a6380;line-height:1.4;}
.step-list{display:grid;gap:10px;}
.step-row{display:flex;gap:12px;align-items:flex-start;background:#0d0f19;border:1px solid #1c2035;border-radius:10px;padding:14px;}
.step-num{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0;}
.step-body h4{font-size:14px;font-weight:600;color:#dde1ee;margin-bottom:3px;}
.step-body p{font-size:13px;color:#7e8aaa;line-height:1.5;}
.info-box{border-radius:10px;padding:14px 16px;margin-bottom:14px;}
.info-box h4{font-size:13px;font-weight:600;margin-bottom:6px;}
.info-box p,.info-box li{font-size:13px;line-height:1.6;}
.info-box ul{padding-left:16px;}
.green-box{background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.2);}
.green-box h4{color:#34d399;} .green-box p,.green-box li{color:#94a3b8;}
.warn-box{background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.2);}
.warn-box h4{color:#fbbf24;} .warn-box p,.warn-box li{color:#94a3b8;}
.red-box{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);}
.red-box h4{color:#f87171;} .red-box p,.red-box li{color:#94a3b8;}
.cost-table{background:#0d0f19;border:1px solid #1c2035;border-radius:10px;overflow:hidden;margin-bottom:14px;}
.cost-row{display:flex;justify-content:space-between;padding:11px 16px;border-bottom:1px solid #131625;font-size:13px;}
.cost-row:last-child{border-bottom:none;}
.cost-label{color:#7e8aaa;} .cost-val{color:#dde1ee;font-weight:600;}
.cost-total{background:#131625;} .cost-total .cost-label{color:#dde1ee;font-weight:600;} .cost-total .cost-val{font-size:15px;}
.tabs-bar{display:flex;overflow-x:auto;gap:0;background:#09090f;border-bottom:1px solid #1c2035;scrollbar-width:none;}
.tabs-bar::-webkit-scrollbar{display:none;}
.tab-btn{padding:12px 16px;font-size:12px;font-weight:500;color:#5a6380;cursor:pointer;border-bottom:2px solid transparent;white-space:nowrap;transition:all .2s;display:flex;align-items:center;gap:5px;font-family:'Outfit',sans-serif;}
.tab-btn:hover{color:#94a3b8;} .tab-btn.on{border-bottom-color:var(--ac);color:var(--ac);}
.section-h{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;margin-bottom:4px;}
.section-sub{font-size:13px;color:#5a6380;margin-bottom:18px;}
.detail-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;}
.chip{background:#131625;border-radius:6px;padding:5px 10px;font-size:12px;color:#7e8aaa;}
.chip strong{color:#dde1ee;}
@media(max-width:480px){.stat-grid{grid-template-columns:1fr 1fr;}}
`;

/* ─── COUNTRY DATA ───────────────────────────────────────────────────── */
const COUNTRIES = [
  {
    id:"de", name:"Germany", flag:"🇩🇪", accent:"#e63946",
    tagline:"Near-free tuition at world-class universities",
    budgetLabel:"11–15 Lakh/year", budgetType:"y",
    budgetNote:"Free tuition + DAAD scholarship brings it within budget",
    overview:{
      keyFacts:[
        {val:"€0–350",lbl:"Semester admin fee (NOT tuition — truly free)"},
        {val:"€992/mo",lbl:"DAAD Masters scholarship monthly stipend (2026 rate)"},
        {val:"€11,904",lbl:"Blocked account required for student visa (2026)"},
        {val:"18 mo",lbl:"Post-study job seeker visa after graduation"},
      ],
      advantage:"Germany is the world leader in free higher education. Public universities charge ZERO tuition — you only pay a semester fee of €150–350 that includes public transport. Germany has a DAAD Information Center in Dhaka. 18 DAAD scholarships are available specifically for Bangladeshi students.",
      warning:"The biggest hurdle is the blocked account: €11,904 (≈16 lakh BDT) must be deposited into a German bank before your visa. This is the main financial barrier. With a DAAD scholarship, this requirement is waived.",
      steps:[
        {t:"Learn Python + German basics",d:"May–Aug 2026: Python skills + start German A1 on Duolingo. German B2 opens massive amounts of additional programs."},
        {t:"IELTS 6.5 or German B2",d:"English programs need IELTS 6.5. German programs need B2 — opens even cheaper and more prestigious options."},
        {t:"Apply DAAD EPOS Scholarship",d:"June–Oct 2026: DAAD EPOS (Development-Related Postgraduate Courses) is specifically for students from developing countries like Bangladesh. Deadline: October/November annually."},
        {t:"Apply to Universities",d:"Sept–Dec 2026: Most German MSc programs open applications for October 2027 intake. Apply to 5–6 programs on uni-assist.de."},
        {t:"Open Blocked Account",d:"March–April 2027: Once you have university admission, open a Fintiba or Expatrio blocked account with €11,904."},
        {t:"Apply for Student Visa",d:"April–May 2027: Apply at German Embassy Dhaka. Pay €75 fee. Processing takes 6–12 weeks."},
      ]
    },
    scholarships:[
      {name:"DAAD EPOS Development Scholarship",badge:"PARTIALLY FUNDED",badgeType:"b",amount:"€992/month + travel allowance + insurance",covers:"Living stipend, health insurance, one-time travel grant",eligibility:"Bangladeshi citizen, BSc degree with top-third results, 2 years work experience (some programs waive this)",deadline:"October–November each year for following year intake",note:"18 DAAD scholarships available for Bangladeshi students. EPOS targets development-related programs. Apply to specific German university programs listed on DAAD website — each has its own deadline."},
      {name:"Deutschlandstipendium",badge:"€300/MONTH",badgeType:"b",amount:"€300/month for at least 2 semesters",covers:"Living support — not tuition (tuition is already free)",eligibility:"Enrolled students at German universities with strong academic record",deadline:"Varies by university — apply after enrollment",note:"Many German universities offer this national scholarship. Apply after you enroll. Paired with part-time work (up to 20 hrs/week, €12.41/hr minimum wage), this significantly reduces financial pressure."},
      {name:"Konrad-Adenauer-Stiftung",badge:"FULLY FUNDED",badgeType:"g",amount:"€934/month + travel + research allowance",covers:"Full living support — highly prestigious",eligibility:"Above-average grades, strong social/political engagement, Christian values alignment",deadline:"January and July applications per year",note:"Very competitive but highly prestigious. Only for students who align with its values. Worth applying alongside other scholarships."},
    ],
    universities:[
      {name:"TU Dresden",city:"Dresden",ranking:"QS Top 300 | Excellence University",rent:"€400–550/month",tuition:"€0 (admin fee €250/semester)",programs:"MSc Computer Science, MSc Distributed Systems, MSc Computational Logic",schol:"DAAD EPOS",note:"Dresden is one of Germany's most affordable and beautiful cities. Very strong CS department. Large international student community."},
      {name:"Uni Magdeburg (OVGU)",city:"Magdeburg",ranking:"Top German Research University",rent:"€300–450/month",tuition:"€0 (admin fee €180/semester)",programs:"MSc Data & Knowledge Engineering, MSc Computer Science",schol:"DAAD + Deutschlandstipendium",note:"Magdeburg is Germany's most affordable city for students. OVGU has strong English-taught MSc programs in CS and Data Science."},
      {name:"TU Dortmund",city:"Dortmund",ranking:"Top Research University",rent:"€380–520/month",tuition:"€0 (admin fee €330/semester)",programs:"MSc Data Science, MSc Computer Science",schol:"DAAD + Deutschlandstipendium",note:"Dortmund is in the affordable Ruhr region. Strong industry connections with tech companies."},
      {name:"University of Passau",city:"Passau",ranking:"Focused Excellence",rent:"€400–550/month",tuition:"€0 (admin fee €140/semester)",programs:"MSc Computer Science, MSc Internet Computing",schol:"DAAD",note:"Passau has a highly-regarded CS department with English programs. Small, safe city with a stunning setting. Low semester fee."},
    ],
    visa:{
      keyFacts:["Visa type: National Visa (Schengen) for studies","Fee: €75 at German Embassy Dhaka","Blocked account: €11,904 required (waived with DAAD scholarship)","Processing: 6–12 weeks — apply EARLY","IELTS: 6.5 for English programs","No TB test required","Language: Proof of German B2 for German-language programs"],
      steps:[
        {t:"Get university admission",d:"A formal admission letter (Zulassung) from a German university is required before you can apply for a visa."},
        {t:"Open blocked account (Sperrkonto)",d:"Open with Fintiba or Expatrio (€99 setup fee). Deposit €11,904. Processing: ~3–5 business days. This is waived if you have a qualifying DAAD scholarship letter."},
        {t:"Get health insurance",d:"You need German health insurance proof (TK, AOK, Barmer). Most students use German statutory insurance starting from ~€110/month."},
        {t:"Book appointment at German Embassy Dhaka",d:"German Embassy is at Gulshan 1, Dhaka. Book via email appointment. Bring all documents."},
        {t:"Attend visa appointment",d:"Pay €75 fee. Submit: passport, admission letter, blocked account certificate, health insurance, language proof, motivation letter, CVs, academic certificates."},
        {t:"Wait for visa & travel",d:"Processing: 6–12 weeks. Once approved, travel to Germany, register at Bürgeramt (city hall), enroll in university, convert visa to residence permit."},
      ],
      checklist:["✅ Valid passport (6+ months beyond study period)","✅ University admission letter (Zulassung)","✅ Blocked account certificate (€11,904 deposited)","✅ German health insurance confirmation","✅ IELTS/TOEFL certificate or German language proof","✅ BSc degree certificate + certified German/English translation","✅ Academic transcripts + translations","✅ Motivation letter (why Germany, why this program)","✅ CV/Resume","✅ Passport-size photo","✅ Proof of accommodation in Germany (if available)"],
    },
    costs:{
      predeparture:[["IELTS Exam","≈ ৳22,000–25,000"],["Document translation + certification","≈ ৳10,000–15,000"],["German visa fee","€75 (≈ ৳9,000)"],["Blocked account deposit (refundable!)","€11,904 (≈ ৳16 lakh — returned monthly!)"],["Fintiba/Expatrio setup fee","€99 (≈ ৳12,000)"],["Health insurance (initial)","~€110/month"],["Plane ticket Dhaka–Germany","~€600–900"],["Pre-departure total (excl. blocked account)","≈ ৳55,000–75,000"]],
      annual:[["Tuition","€0 (truly free at public universities)"],["Semester admin fee","€150–350/semester × 2 = €300–700"],["Accommodation (affordable city)","€3,600–6,600 (€300–550/month)"],["Food + daily life","€2,400–3,600"],["Transport (often included in semester fee)","€0–600"],["Health insurance","€1,320 (€110/month)"],["Total per year","€7,620–12,820"]],
      withScholarship:[["DAAD stipend received (€992 × 12)","−€11,904/year (covers most costs!)"],["Part-time work (20hrs/wk × €12/hr)","Earn €1,000/month = €12,000/year"],["Net family cost with DAAD","≈ €0–3,000/year"],["In BDT","≈ ৳0–4,00,000/year"],["Note","Blocked account money is YOURS — returned to you €992/month after arrival!"]],
    }
  },

  {
    id:"no", name:"Norway", flag:"🇳🇴", accent:"#ef4444",
    tagline:"The only country with truly free tuition for ALL nationalities",
    budgetLabel:"15–18 Lakh/year", budgetType:"y",
    budgetNote:"Free tuition but expensive living — only viable with Norwegian Quota Scholarship",
    overview:{
      keyFacts:[
        {val:"€0",lbl:"Tuition at ALL Norwegian public universities — for every nationality"},
        {val:"€75–100",lbl:"Semester fee only (covers student welfare services)"},
        {val:"€1,200–1,500",lbl:"Monthly living cost (Oslo) — the main challenge"},
        {val:"€1,000–1,200",lbl:"Monthly living in Bergen, Tromsø, Stavanger (cheaper)"},
      ],
      advantage:"Norway is unique globally — public universities charge ZERO tuition for ALL nationalities, including non-EU/EEA students. This includes world-class institutions like NTNU (top 400 QS). The catch: Norway has Europe's highest cost of living. You MUST get the Norwegian Quota Scholarship to make this work within your budget.",
      warning:"Without scholarship, Norway is likely OVER your 15 lakh budget due to living costs alone (~€13,000-16,000/year). With the Norwegian Quota Scheme scholarship, it becomes fully funded. Apply very early — competition is high.",
      steps:[
        {t:"Python + Data Skills",d:"May–Aug 2026: Build Python and data science skills — relevant for NTNU and UiB programs."},
        {t:"IELTS 6.5",d:"Target IELTS 6.5 for English programs at Norwegian universities. TOEFL 90+ also accepted."},
        {t:"Research Norwegian Quota Scholarship",d:"July–Sept 2026: The Norwegian Quota Scheme targets students from developing countries. Research eligibility carefully — Bangladesh qualifies."},
        {t:"Apply to Norwegian Universities",d:"Sept–Nov 2026: Most Norwegian universities have October–December deadlines for next autumn intake."},
        {t:"Apply for Scholarship",d:"Oct–Dec 2026: Norwegian Quota Scheme applications open. Also apply for university-specific grants."},
        {t:"Residence Permit + Visa",d:"March–May 2027: Apply for student residence permit online via UDI.no. Processing: 2–4 months."},
      ]
    },
    scholarships:[
      {name:"Norwegian Quota Scheme",badge:"FULLY FUNDED",badgeType:"g",amount:"Full tuition (free anyway) + living stipend + travel support",covers:"Designed for students from developing countries including Bangladesh",eligibility:"Bangladeshi citizen, admitted to Norwegian public university Masters program, strong academics",deadline:"Varies by university — check Lånekassen.no and individual university pages",note:"This is the primary scholarship for international students. Managed by Norwegian State Educational Loan Fund (Lånekassen). Competition is very high but Bangladesh is eligible. Apply to the university AND simultaneously apply for the scholarship."},
      {name:"NTNU International Student Scholarship",badge:"PARTIAL",badgeType:"b",amount:"Varies — partial tuition and/or living support",covers:"Partial support for admitted international students",eligibility:"Admitted students with excellent academic record",deadline:"Automatically assessed at admission",note:"NTNU (Norwegian University of Science and Technology) in Trondheim is Norway's top tech university. Strong programs in AI, Computer Science, and Engineering. Apply for their internal scholarship alongside university application."},
    ],
    universities:[
      {name:"NTNU — Norwegian Univ. of Science & Technology",city:"Trondheim",ranking:"QS Top 400 | Norway's Top Tech University",rent:"€600–850/month",tuition:"€0",programs:"MSc Computer Science, MSc AI & Robotics, MSc Data Science",schol:"Norwegian Quota Scheme",note:"Norway's best tech university. Trondheim is a beautiful student city and cheaper than Oslo. Strong research in AI and robotics."},
      {name:"University of Bergen",city:"Bergen",ranking:"QS Top 400",rent:"€600–850/month",tuition:"€0",programs:"MSc Computer Science, MSc Informatics",schol:"Norwegian Quota Scheme",note:"Stunning coastal city. Smaller and more affordable than Oslo. Strong CS department."},
      {name:"University of Oslo",city:"Oslo",ranking:"QS Top 200",rent:"€900–1,300/month",tuition:"€0",programs:"MSc Informatics (CS), MSc Data Science",schol:"Norwegian Quota Scheme",note:"Norway's top-ranked university but Oslo is the most expensive city. Only target if you get the full scholarship."},
    ],
    visa:{
      keyFacts:["Visa type: Student Residence Permit (NOT Schengen visa)","Apply online via UDI.no — no embassy visit needed in most cases","Fee: NOK 3,300 (~€290)","Financial proof: NOK 128,887/year (~€11,000)","Processing: 2–4 months — apply 3 months before studies start","IELTS: 6.5 or TOEFL 90","No TB test required"],
      steps:[
        {t:"Get university admission letter",d:"Apply via the university's international admissions portal. Most Norwegian universities accept Bangladeshi BSc degrees."},
        {t:"Apply for residence permit online",d:"Go to UDI.no. Create an account. Apply for Student Residence Permit (Type D). Upload all documents digitally."},
        {t:"Pay residence permit fee",d:"NOK 3,300 (~€290). Pay online. Keep receipt."},
        {t:"Submit biometrics if required",d:"Some applicants must visit a Norwegian Embassy or designated biometrics centre. Check UDI guidance."},
        {t:"Wait for decision",d:"Processing: 2–4 months. You'll receive decision via UDI portal. If approved, receive residence permit card upon arrival in Norway."},
        {t:"Register with the police in Norway",d:"Within 1 week of arrival, register with local police to activate your residence permit. Then get a D-number (personal ID number)."},
      ],
      checklist:["✅ Valid passport","✅ University admission letter","✅ Financial proof (NOK 128,887 or scholarship letter)","✅ IELTS/TOEFL certificate","✅ BSc degree + transcripts","✅ Passport photo","✅ Accommodation proof in Norway","✅ Health insurance (public healthcare available after registration)"],
    },
    costs:{
      predeparture:[["IELTS Exam","≈ ৳22,000–25,000"],["Norway residence permit fee","NOK 3,300 (≈ ৳36,000)"],["Document preparation","≈ ৳8,000–12,000"],["Plane ticket Dhaka–Norway","~€700–1,100"],["Pre-departure total","≈ ৳75,000–1,00,000"]],
      annual:[["Tuition","€0 (free for all)"],["Semester fee","~€75–100"],["Accommodation","€7,200–15,600 (€600–1,300/month)"],["Food","€3,000–4,200"],["Transport","€600–900"],["Total per year WITHOUT SCHOLARSHIP","€10,875–20,800"]],
      withScholarship:[["Norwegian Quota Scheme (if awarded)","Covers living costs — check specific amount"],["Part-time work (limited hours permitted)","Earn €500–800/month to supplement"],["BUDGET REALITY","Norway only works within 15 lakh if you get Norwegian Quota scholarship"],["Advice","If no scholarship offer, consider Germany or Italy instead — same quality, more accessible"]],
    }
  },

  {
    id:"fr", name:"France", flag:"🇫🇷", accent:"#3b82f6",
    tagline:"Government-fixed tuition of €243/year — cheaper than most countries",
    budgetLabel:"11–14 Lakh/year", budgetType:"y",
    budgetNote:"€243/yr tuition + affordable cities = within budget with careful planning",
    overview:{
      keyFacts:[
        {val:"€243/yr",lbl:"Government-fixed tuition at ALL French public universities (Masters level)"},
        {val:"€1,181/mo",lbl:"Eiffel Excellence Scholarship monthly stipend"},
        {val:"€750–1,000",lbl:"Monthly living cost outside Paris (Grenoble, Lyon, Toulouse)"},
        {val:"1 year",lbl:"Post-study Autorisation Provisoire de Séjour (work permit)"},
      ],
      advantage:"France has one of the best deals in Europe — the French government caps tuition at just €243/year at all public universities by law. This isn't a scholarship; it's just the standard price. Combined with the Eiffel Excellence Scholarship (€1,181/month), France becomes one of the cheapest high-quality options in Europe.",
      warning:"French Masters is 2 years (M1+M2). Paris is expensive (€1,200–1,600/month). You MUST do the Campus France registration process (mandatory for Bangladeshis) before applying for a visa. Start this 6+ months early.",
      steps:[
        {t:"Python + Data Skills + French basics",d:"May–Aug 2026: Tech skills + start French A1 (optional but helps a lot with daily life and scholarship chances)."},
        {t:"IELTS 6.0–6.5",d:"English programs at French public universities typically require IELTS 6.0–6.5. Grenoble INP, Télécom Paris, and INSA Lyon all have English MSc programs."},
        {t:"Register on Campus France",d:"CRITICAL: Register at campusfrance.org and Campus France Bangladesh office. This is MANDATORY before applying for a student visa. Cost: ~€60–90."},
        {t:"Apply to Universities",d:"Sept–Dec 2026: Apply to 4–6 French public universities in affordable cities for September 2027 intake."},
        {t:"Apply for Eiffel Scholarship",d:"Nov–Jan 2026-27: Eiffel Excellence Scholarship deadline is usually January. Must be nominated by your target French university."},
        {t:"Apply for Student Visa",d:"April–May 2027: After receiving French university offer, apply at VFS Global Dhaka (French visa section). Fee: €99."},
      ]
    },
    scholarships:[
      {name:"Eiffel Excellence Scholarship",badge:"FULLY FUNDED",badgeType:"g",amount:"€1,181/month + travel allowance + health insurance + cultural activities grant",covers:"Living stipend + travel + insurance — tuition is already only €243/year so effectively fully funded",eligibility:"Under 30, Bangladeshi citizen, admitted/applying to French public university Masters, nominated by French institution",deadline:"January each year for following September intake",note:"This is France's flagship international scholarship. You do NOT apply directly — your target French university nominates you. So FIRST get admitted to a French university, THEN ask them to nominate you for Eiffel. Start building your profile now."},
      {name:"French Government Excellence Scholarship (BGF)",badge:"PARTIAL",badgeType:"b",amount:"€700–1,200/month stipend + benefits",covers:"Living allowance + exemption from tuition",eligibility:"Bangladeshi citizen, excellent academics, apply through French Embassy Dhaka",deadline:"March–April each year",note:"Managed by the French Embassy in Dhaka. Less competitive than Eiffel. Contact the Cultural Section of the French Embassy for Bangladesh-specific info."},
    ],
    universities:[
      {name:"Grenoble INP",city:"Grenoble",ranking:"Top French Engineering School",rent:"€450–600/month",tuition:"€243/year",programs:"MSc Computer Science, MSc Data Science, MSc Cybersecurity",schol:"Eiffel + BGF",note:"Grenoble is one of France's most affordable and liveable cities. Grenoble INP has strong English MSc programs in CS and AI. Beautiful Alpine setting."},
      {name:"Télécom Paris",city:"Paris area (Palaiseau)",ranking:"Top 5 French Engineering Schools",rent:"€600–900/month",tuition:"€243/year",programs:"MSc Data Science & AI, MSc Computer Science",schol:"Eiffel",note:"One of France's most prestigious CS schools. Located in Palaiseau (cheaper than Paris). Excellent industry connections with tech giants."},
      {name:"INSA Lyon",city:"Lyon",ranking:"Top French Engineering School",rent:"€450–650/month",tuition:"€243/year",programs:"MSc Computer Science, MSc AI, MSc Bioinformatics",schol:"Eiffel + BGF",note:"Lyon is France's most liveable city — great food, affordable, excellent transport. INSA has strong English-medium programs."},
      {name:"Univ. Paul Sabatier (Toulouse III)",city:"Toulouse",ranking:"Top French Research University",rent:"€400–600/month",tuition:"€243/year",programs:"MSc Computer Science, MSc AI & Data Science",schol:"Eiffel + BGF",note:"Toulouse is France's aerospace capital. Very affordable city with a huge student population. Strong CS and AI research."},
    ],
    visa:{
      keyFacts:["Visa type: Long-stay student visa (Visa de long séjour étudiant)","Campus France registration is MANDATORY before visa — do this first","Fee: €99","Financial proof: ~€615/month (€7,380/year)","Processing: 3–5 weeks","IELTS: 6.0–6.5 for English programs"],
      steps:[
        {t:"Complete Campus France registration",d:"Go to Bangladesh.campusfrance.org. Create profile, pay fee (~€60–90), and have an interview/evaluation. This is the gateway to France — do it early!"},
        {t:"Apply and get French university offer",d:"Apply via the university website. Submit your Campus France dossier number. Receive conditional or unconditional offer."},
        {t:"Apply for VFS visa appointment",d:"Book at VFS Global Dhaka (French Visa). Pay €99 visa fee. Bring all documents."},
        {t:"Submit documents",d:"Submit: passport, Campus France registration confirmation, university acceptance letter, financial proof, accommodation proof, IELTS, photos, CV."},
        {t:"Receive visa decision",d:"Processing ~3–5 weeks. You get a long-stay student visa valid for 1 year, renewable annually."},
        {t:"Arrive + register at OFII",d:"Within 3 months of arrival, validate your visa at OFII (French immigration office) and get your residence permit."},
      ],
      checklist:["✅ Campus France registration confirmation (MANDATORY)","✅ University acceptance letter","✅ Valid passport","✅ IELTS/TOEFL certificate","✅ Financial proof (€615/month or scholarship letter)","✅ Accommodation proof in France","✅ Academic transcripts + certified translations","✅ BSc degree certificate + certified translation","✅ 2 passport photos (white background)","✅ Health insurance"],
    },
    costs:{
      predeparture:[["IELTS Exam","≈ ৳22,000–25,000"],["Campus France registration fee","~€60–90 (≈ ৳8,000–12,000)"],["French student visa fee","€99 (≈ ৳13,000)"],["Document translations","≈ ৳8,000–15,000"],["Plane ticket Dhaka–France","~€600–900"],["Pre-departure total","≈ ৳55,000–85,000"]],
      annual:[["Tuition (fixed by French government)","€243/year — by law"],["Accommodation (affordable city)","€5,400–7,200 (€450–600/month)"],["Food + daily life","€2,400–3,600"],["Transport","€600–900"],["Health insurance (covered by CVEC €103 annual fee)","€103/year"],["Total per year","€8,746–12,046"]],
      withScholarship:[["Eiffel stipend (€1,181 × 10 months)","−€11,810/year received"],["Annual living costs","~€9,000/year"],["Net family cost","≈ €0–2,000/year"],["In BDT","≈ ৳0–2,50,000/year"],["Note","Tuition is €243/year even without scholarship — France is the cheapest in Europe per se"]],
    }
  },

  {
    id:"pl", name:"Poland", flag:"🇵🇱", accent:"#e11d48",
    tagline:"Europe's hidden gem — quality education at Eastern European prices",
    budgetLabel:"7–10 Lakh/year", budgetType:"g",
    budgetNote:"Among cheapest in Europe — well within 15 lakh budget even without scholarship",
    overview:{
      keyFacts:[
        {val:"€2K–4.5K",lbl:"Annual tuition at public universities for English programs"},
        {val:"€500–750",lbl:"Monthly living cost in student-friendly cities like Kraków, Wrocław"},
        {val:"€80",lbl:"Student visa fee — cheapest in this guide"},
        {val:"QS #251",lbl:"Warsaw University of Technology — Poland's top CS university"},
      ],
      advantage:"Poland is genuinely affordable — you can live well on €500–700/month. It's EU membership means your degree is fully EU-recognized. Polish universities are ranked and improving fast. No language barrier at English programs. NAWA scholarships are specifically available for developing-country students. Very easy visa process.",
      warning:"Poland is NOT free like Germany or Norway. English programs cost €2,000–4,500/year tuition. However, this is still among the cheapest in Europe, and living costs are so low that the total annual cost can be LOWER than Germany (which has higher living costs despite free tuition).",
      steps:[
        {t:"Python + Data Skills",d:"May–Aug 2026: Build tech skills — directly relevant for Warsaw Uni of Technology, AGH, Wrocław programs."},
        {t:"IELTS 6.0",d:"Lower requirement than UK/Germany. IELTS 6.0 is sufficient for most Polish university English programs."},
        {t:"Shortlist 4–5 Polish Universities",d:"July–Aug 2026: Target: Warsaw University of Technology, AGH Kraków, Wrocław University of Science, Gdańsk Tech."},
        {t:"Apply to Universities",d:"Aug–Dec 2026: Most Polish universities open applications November–March for October 2027 intake. Apply early for scholarship consideration."},
        {t:"Apply for NAWA Scholarship",d:"Check NAWA (nawa.gov.pl) for Bangladesh-specific programs. Deadlines vary."},
        {t:"Apply for Schengen D-Visa",d:"March–April 2027: Apply at Polish Embassy/VFS Dhaka. Fee: ~€80. Very straightforward process."},
      ]
    },
    scholarships:[
      {name:"NAWA (Polish National Agency for Academic Exchange)",badge:"PARTIAL",badgeType:"b",amount:"PLN 1,500/month (≈€350) + accommodation support",covers:"Monthly living stipend, some accommodation benefits",eligibility:"Bangladeshi citizen, admitted to Polish public university Masters program",deadline:"Check nawa.gov.pl — varies by program",note:"NAWA specifically has programs for students from developing countries. Check their 'Ulam Programme' and 'PROM Programme'. Less competitive than Erasmus or Chevening."},
      {name:"University-specific merit scholarships",badge:"VARIES",badgeType:"y",amount:"€500–2,000/year — varies significantly",covers:"Partial tuition reduction or one-time grant",eligibility:"Top-performing international students",deadline:"Usually at enrollment",note:"Warsaw University of Technology and AGH Kraków offer merit scholarships automatically to high-achieving international students. Apply early and get good grades."},
    ],
    universities:[
      {name:"Warsaw University of Technology (PW)",city:"Warsaw",ranking:"QS #251–300 | Poland's #1 Technical",rent:"€500–700/month",tuition:"€2,500–4,500/year",programs:"MSc Computer Science, MSc Data Science, MSc AI",schol:"NAWA + merit",note:"Poland's top tech university. Warsaw is more expensive than other Polish cities but cheaper than any Western European capital. QS-ranked globally."},
      {name:"AGH University of Science & Technology",city:"Kraków",ranking:"QS Top 600",rent:"€400–600/month",tuition:"€2,000–3,500/year",programs:"MSc Computer Science, MSc Applied Informatics",schol:"NAWA + merit",note:"Kraków is Poland's most beautiful city and cheaper than Warsaw. AGH has excellent engineering and CS programs. Large Bangladeshi/South Asian student community."},
      {name:"Wrocław University of Science & Technology",city:"Wrocław",ranking:"QS Top 700",rent:"€380–550/month",tuition:"€2,000–3,500/year",programs:"MSc Computer Science, MSc Cybersecurity",schol:"NAWA",note:"Wrocław is Poland's most liveable and affordable student city. Strong tech ecosystem with many European companies."},
    ],
    visa:{
      keyFacts:["Visa type: Type D National Visa (for studies >90 days)","Fee: ~€80","Processing: 2–4 weeks","Financial proof: ~€500/month","No TB test required","IELTS: 6.0","No blocked account required — just bank statement"],
      steps:[
        {t:"Get university admission",d:"Apply online to your chosen Polish university. Receive official acceptance letter."},
        {t:"Book Polish visa appointment",d:"Contact Polish Embassy in Dhaka or apply via VFS Global. Book appointment 2–3 months before course start."},
        {t:"Submit documents at appointment",d:"Submit: passport, acceptance letter, financial proof, health insurance, IELTS, degree + transcripts, accommodation proof, 2 photos."},
        {t:"Wait and receive visa",d:"Processing 2–4 weeks. Receive Type D Schengen visa. Valid for full course duration."},
        {t:"Register with local authorities",d:"Within 30 days of arrival, register at local Voivodship Office for residence permit (temporary)."},
      ],
      checklist:["✅ Valid passport","✅ University acceptance letter","✅ Bank statement showing €500/month capacity","✅ IELTS 6.0 certificate","✅ BSc degree + transcripts (notarized English translation)","✅ Health insurance (European-level coverage)","✅ Accommodation proof in Poland","✅ 2 passport photos","✅ Completed visa application form"],
    },
    costs:{
      predeparture:[["IELTS Exam","≈ ৳22,000–25,000"],["Polish visa fee","€80 (≈ ৳10,000)"],["Document notarization + translation","≈ ৳8,000–12,000"],["Plane ticket Dhaka–Poland","~€550–800"],["Pre-departure total","≈ ৳48,000–70,000"]],
      annual:[["Tuition (English program, public university)","€2,000–4,500/year"],["Accommodation (Kraków, Wrocław, Gdańsk)","€4,800–7,200 (€400–600/month)"],["Food (cooking at home)","€1,800–2,400"],["Transport (student pass)","€300–500"],["Health insurance","€300–500"],["Total per year","€9,200–15,100"]],
      withScholarship:[["NAWA scholarship (€350/month × 12)","Receive €4,200/year"],["Part-time work (20 hrs/week, €7–10/hr)","Earn €700–1,000/month = €8,400–12,000/year"],["Net cost to family","€0–6,000/year"],["In BDT","≈ ৳0–8,00,000/year"],["Note","Poland is WELL within 15 lakh budget even without any scholarship"]],
    }
  },

  {
    id:"hu", name:"Hungary", flag:"🇭🇺", accent:"#16a34a",
    tagline:"Fully funded scholarship in the heart of Europe — Bangladesh eligible",
    budgetLabel:"1–3 Lakh (pre-departure only)", budgetType:"g",
    budgetNote:"Stipendium Hungaricum covers EVERYTHING — only pre-departure costs from Bangladesh",
    overview:{
      keyFacts:[
        {val:"FREE",lbl:"Tuition — 100% waived under Stipendium Hungaricum"},
        {val:"FREE",lbl:"University dormitory accommodation"},
        {val:"€105/mo",lbl:"Monthly stipend (modest but supplementable with part-time work)"},
        {val:"Jan 15",lbl:"Application deadline each year — Bangladesh must be nominated by MoE"},
      ],
      advantage:"Stipendium Hungaricum is one of Europe's most accessible fully funded scholarships for Bangladeshi students. Bangladesh is a confirmed partner country. You apply through the Bangladesh Ministry of Education (MoE) who nominates candidates. 800+ English-taught programs across Hungarian universities. The degree is EU-recognized. No IELTS required for many programs.",
      warning:"The monthly stipend (HUF 40,500 ≈ €105) is MODEST — you'll need part-time work or savings to live comfortably. Living costs beyond the dorm are €150–250/month extra. The process requires Bangladesh MoE nomination — watch the MoE website (shed.gov.bd) for the annual circular in October/November.",
      steps:[
        {t:"Watch MoE announcement",d:"The Bangladesh Ministry of Education publishes the Stipendium Hungaricum circular on shed.gov.bd every October–November. This is your entry point — you CANNOT apply without MoE nomination."},
        {t:"Apply via MoE + DreamApply portal",d:"Register at apply.stipendiumhungaricum.hu. Fill out application in English. Choose up to 2 programs at Hungarian universities. Upload documents. Submit hard copies to MoE."},
        {t:"University interview (if called)",d:"Some Hungarian universities may call shortlisted candidates for online interviews in March–May."},
        {t:"Receive offer",d:"Results announced May–June. If selected, receive official offer from Hungarian university."},
        {t:"Medical exam + visa",d:"Complete medical examination (required). Apply for Type D student visa at Hungarian Embassy Dhaka. Scholarship usually covers visa cost."},
        {t:"Arrive + enroll",d:"Hungarian language course offered to all scholarship holders. Enroll at university in September."},
      ]
    },
    scholarships:[
      {name:"Stipendium Hungaricum",badge:"FULLY FUNDED ⭐",badgeType:"g",amount:"Full tuition waiver + free university dormitory + €105/month stipend + health insurance",covers:"Literally everything except food and personal expenses",eligibility:"Bangladeshi citizen, BSc degree, not currently enrolled in Hungary, min GPA ~3.5, IELTS 5.5–6.0 or English medium background",deadline:"January 15 each year — nomination through Bangladesh MoE",note:"This is confirmed available for Bangladesh. Applied via shed.gov.bd. Very competitive — you need good academics, a strong motivation letter, and ideally some extracurricular/leadership background. 800+ English programs available at BME, ELTE, Uni Debrecen, Óbuda."},
    ],
    universities:[
      {name:"Budapest University of Technology (BME)",city:"Budapest",ranking:"QS Top 500 | Hungary's #1 Tech Uni",rent:"Free (dorm) or €200–400 private",tuition:"€0 (Stipendium)",programs:"MSc Computer Science, MSc Software Engineering, MSc AI",schol:"Stipendium Hungaricum",note:"BME is Hungary's top engineering university. Budapest is Europe's most underrated city — beautiful, vibrant, and affordable. English-taught CS programs are strong."},
      {name:"Eötvös Loránd University (ELTE)",city:"Budapest",ranking:"QS Top 600 | Hungary's top Research University",rent:"Free (dorm) or €200–400 private",tuition:"€0 (Stipendium)",programs:"MSc Computer Science, MSc Data Science, MSc AI",schol:"Stipendium Hungaricum",note:"One of Central Europe's most prestigious universities. Strong mathematics and computer science faculty. Budapest location means great networking and job opportunities in the region."},
      {name:"University of Debrecen",city:"Debrecen",ranking:"QS Top 800",rent:"Free (dorm) or €150–300 private",tuition:"€0 (Stipendium)",programs:"MSc Computer Science, MSc Information Technology",schol:"Stipendium Hungaricum",note:"Debrecen is cheaper than Budapest. A popular choice for Bangladeshi students — large South Asian community. More relaxed, student-friendly environment."},
    ],
    visa:{
      keyFacts:["Visa type: Type D National Visa","Scholarship usually covers visa costs","Processing: 4–6 weeks","No financial proof needed (scholarship covers everything)","IELTS: 5.5–6.0 for English programs (or proven English medium background)","Medical examination required after acceptance"],
      steps:[
        {t:"Receive Stipendium offer letter",d:"After MoE nomination and university selection, receive official Stipendium Hungaricum award letter. This is your main document for the visa."},
        {t:"Get medical exam",d:"Required for all Stipendium holders. Standard health checkup at an approved clinic in Bangladesh."},
        {t:"Apply for visa at Hungarian Embassy",d:"Hungarian Embassy is in Gulshan, Dhaka. Submit: passport, offer letter, medical certificate, degree + transcripts, photos."},
        {t:"Receive visa and travel",d:"Processing ~4–6 weeks. Once approved, travel to Budapest."},
        {t:"Register at university + get residence permit",d:"Register within 30 days of arrival. University helps with this process."},
      ],
      checklist:["✅ Stipendium Hungaricum award letter","✅ Valid passport","✅ Medical examination certificate","✅ BSc degree + transcripts","✅ IELTS certificate (if required by program)","✅ 2 passport photos","✅ Completed visa application form","✅ Accommodation proof (scholarship provides dorm)"],
    },
    costs:{
      predeparture:[["IELTS Exam (if required)","≈ ৳22,000–25,000"],["Document preparation","≈ ৳5,000–8,000"],["Medical exam in Bangladesh","≈ ৳3,000–5,000"],["Plane ticket Dhaka–Budapest","~€550–800"],["Visa fee (often covered by scholarship)","≈ €0–50"],["Pre-departure total","≈ ৳95,000–1,55,000 (~1–2 lakh)"]],
      annual:[["Tuition","€0 (100% Stipendium cover)"],["Accommodation (university dorm)","€0 (covered by scholarship)"],["Monthly stipend received","€105/month = €1,260/year"],["Food (not covered — your cost)","€1,200–1,800/year"],["Transport","€300–500/year"],["Net cost after stipend","≈ €1,440–3,040/year"],["In BDT","≈ ৳1,90,000–4,00,000/year"]],
      withScholarship:[["Total 2-year cost to family","≈ ৳3,80,000–8,00,000 (food + personal)"],["Part-time work income","~€400–600/month available"],["Effective cost with part-time work","≈ ৳0–3,00,000 over 2 years"],["Note","This is the most budget-friendly European option for Bangladesh"]],
    }
  },

  {
    id:"tr", name:"Turkey", flag:"🇹🇷", accent:"#dc2626",
    tagline:"Fully funded with Turkish language included — flights paid, zero cost",
    budgetLabel:"1–2 Lakh (pre-departure only)", budgetType:"g",
    budgetNote:"Türkiye Burslari covers tuition, dorm, flights, stipend, language course, health insurance",
    overview:{
      keyFacts:[
        {val:"100%",lbl:"Türkiye Burslari covers: tuition + dorm + flights + health + Turkish language course"},
        {val:"TRY 5,500",lbl:"Monthly stipend for Masters (≈ €155–180/month at current rates)"},
        {val:"Feb",lbl:"Annual application deadline at turkiyeburslari.gov.tr"},
        {val:"IELTS 5.5",lbl:"One of the lowest English requirements of any fully funded scholarship"},
      ],
      advantage:"Türkiye Burslari is one of the world's most complete scholarships — it literally covers round-trip airfare from Bangladesh, a 1-year free Turkish language course, university tuition, dormitory, health insurance, and a monthly stipend. Turkey has world-ranked technical universities like METU which is fully English-medium. Very accessible for Bangladeshis.",
      warning:"The monthly stipend (TRY 5,500 ≈ €155–180) is modest due to Turkish lira devaluation. Cost of living in Turkey is very affordable though — €200–350/month is enough for food and personal expenses. Turkey is also outside the EU, so your degree has less EU-wide recognition than a German or French degree.",
      steps:[
        {t:"Python + Data Skills",d:"May–Aug 2026: Build skills — very relevant for METU and Istanbul Tech programs in CS and AI."},
        {t:"IELTS 5.5",d:"Türkiye Burslari requires only IELTS 5.5 — one of the lowest requirements of any major scholarship. Get this done first."},
        {t:"Prepare Türkiye Burslari Application",d:"The application portal (turkiyeburslari.gov.tr) opens every January and closes in February. Prepare: motivation letter, transcripts, CV, IELTS, photos."},
        {t:"Apply by February deadline",d:"CRITICAL: Submit by the February deadline each year. The 2026 deadline has passed — target February 2027 for the 2027-28 cycle."},
        {t:"Interviews",d:"Shortlisted candidates are called for online interviews. Prepare answers on why Turkey, why this program, career goals."},
        {t:"Results + Visa",d:"Results announced May–June. If selected, apply for Type D visa at Turkish Embassy Dhaka. Scholarship covers visa costs."},
      ]
    },
    scholarships:[
      {name:"Türkiye Burslari (YTB) Scholarship",badge:"FULLY FUNDED ⭐",badgeType:"g",amount:"Tuition + dorm + TRY 5,500/month + return flights + 1-year Turkish language course + health insurance",covers:"Everything — the most complete scholarship in this guide",eligibility:"Bangladeshi citizen, under 30, BSc degree, IELTS 5.5, minimum 70% GPA in BSc",deadline:"February each year — apply at turkiyeburslari.gov.tr",note:"Bangladesh is a strong applicant country. Competition is very high (300,000+ applications worldwide for ~5,000 spots). You need EXCELLENT motivation letter and interview performance. METU, Bilkent, and Istanbul Technical University are among the top choices."},
    ],
    universities:[
      {name:"Middle East Technical University (METU)",city:"Ankara",ranking:"QS Top 600 | Turkey's #1 for CS/Engineering",rent:"Free (scholarship dorm)",tuition:"€0 (scholarship)",programs:"MSc Computer Engineering, MSc Data Informatics, MSc Cybersecurity",schol:"Türkiye Burslari",note:"METU is fully English-medium and is Turkey's best university for CS and engineering. Ankara is cheaper than Istanbul. Very international campus."},
      {name:"Istanbul Technical University (ITU)",city:"Istanbul",ranking:"QS Top 500",rent:"Free (scholarship dorm)",tuition:"€0 (scholarship)",programs:"MSc Computer Engineering, MSc AI, MSc Software Engineering",schol:"Türkiye Burslari",note:"Istanbul is Turkey's most vibrant city. ITU is among Turkey's top tech universities. Very strong industry connections."},
      {name:"Bilkent University",city:"Ankara",ranking:"QS Top 500 | Turkey's Most Prestigious Private",rent:"Free (scholarship dorm)",tuition:"€0 (scholarship)",programs:"MSc Computer Science, MSc Information Systems",schol:"Türkiye Burslari",note:"Bilkent is Turkey's most prestigious university. Fully English-medium. Top choice for Türkiye Burslari applicants."},
    ],
    visa:{
      keyFacts:["Visa type: Type D student visa","Scholarship covers visa costs","Processing: 2–4 weeks","No financial proof needed (scholarship letter suffices)","IELTS: 5.5 minimum","Medical exam required after selection"],
      steps:[
        {t:"Receive Türkiye Burslari offer",d:"After interview and selection, receive official scholarship award letter from YTB."},
        {t:"Medical examination",d:"Required for all scholarship holders. Standard health checkup in Bangladesh."},
        {t:"Apply at Turkish Embassy Dhaka",d:"Submit: award letter, passport, medical certificate, photos, university acceptance, BSc degree + transcripts."},
        {t:"Travel to Turkey",d:"Scholarship provides round-trip airfare. Travel to Turkey before studies begin."},
        {t:"1-year Turkish language course",d:"All scholarship holders complete a mandatory 1-year Turkish language course before their Masters program begins. Paid for by the scholarship."},
        {t:"Begin Masters program",d:"After Turkish language year, begin your 2-year Masters program at your assigned university."},
      ],
      checklist:["✅ Türkiye Burslari award letter","✅ Valid passport","✅ Medical certificate","✅ IELTS 5.5 certificate","✅ BSc degree + transcripts","✅ 2 passport photos","✅ Scholarship covers dorm — no accommodation proof needed"],
    },
    costs:{
      predeparture:[["IELTS Exam (5.5 target)","≈ ৳22,000–25,000"],["Document preparation","≈ ৳5,000–8,000"],["Medical exam","≈ ৳3,000–5,000"],["Flights (COVERED by scholarship)","€0 — scholarship pays"],["Visa (COVERED by scholarship)","€0"],["Pre-departure total","≈ ৳30,000–45,000 (LOWEST in this guide!)"]],
      annual:[["Tuition","€0 (scholarship)"],["Dormitory","€0 (scholarship)"],["Monthly stipend received","TRY 5,500 ≈ €155/month"],["Food (personal expense)","~€100–150/month"],["Transport + personal","~€50/month"],["Net cost","≈ €0–1,200/year"],["In BDT","≈ ৳0–1,60,000/year"]],
      withScholarship:[["Total 3-year cost (1yr Turkish + 2yr Masters)","≈ ৳50,000–2,00,000 total — CHEAPEST OPTION"],["Stipend vs personal expenses","Stipend covers most food + personal needs"],["Part-time work","Allowed 20 hrs/week in Turkey"],["Verdict","Most complete scholarship in this guide — lowest total cost"]],
    }
  },

  {
    id:"cn", name:"China", flag:"🇨🇳", accent:"#dc2626",
    tagline:"CSC fully-funded scholarship — largest scholarship program on Earth",
    budgetLabel:"1–3 Lakh (pre-departure only)", budgetType:"g",
    budgetNote:"CSC covers tuition, dorm, ¥3,000/month stipend, health insurance — Bangladesh eligible",
    overview:{
      keyFacts:[
        {val:"¥3,000",lbl:"Monthly stipend for Masters students ≈ €380/month — comfortable in China"},
        {val:"FREE",lbl:"Tuition and university dormitory — fully covered by CSC"},
        {val:"Mar–Apr",lbl:"Annual application deadline (embassy route or direct university route)"},
        {val:"No IELTS",lbl:"No IELTS required for English-taught programs at most universities"},
      ],
      advantage:"China Scholarship Council (CSC) runs the world's largest scholarship program. Bangladesh is a priority country. The stipend (¥3,000/month ≈ €380) is actually comfortable in China where food costs just ¥15-30 per meal. No IELTS required for most English programs — just pass the university's own English proficiency test. Huge Bangladeshi student community in China.",
      warning:"China is NOT in Europe — your degree may have less recognition in European job markets than a German or French degree. However, for South Asian job markets, tech skills matter more than university location. China's tech sector (Alibaba, Huawei, Tencent, ByteDance) offers world-class research experience.",
      steps:[
        {t:"Python + Data Skills",d:"May–Aug 2026: Build Python, ML skills. Extremely relevant for Zhejiang University, Tongji, and BJTU's English CS programs."},
        {t:"Contact professors (Type B route)",d:"For the direct/Type B route, email Chinese professors in your target universities. A positive professor response dramatically increases your CSC chances."},
        {t:"IELTS (optional but helps)",d:"While not mandatory for most Chinese universities' English programs, IELTS 6.0+ strengthens your application and shows credibility."},
        {t:"Apply via campuschina.org",d:"The CSC portal (campuschina.org) opens February–April each year. You can apply via Chinese Embassy in Dhaka (Type A) or directly to university (Type B — university nominates you for CSC)."},
        {t:"Medical exam",d:"Required for all Chinese university applicants. Very thorough including chest X-ray, HIV test, etc. Do this at an approved clinic in Dhaka."},
        {t:"Receive offer + visa",d:"Offers arrive June–July. Apply for student visa (X1/X2) at Chinese Embassy Dhaka. Processing ~2 weeks."},
      ]
    },
    scholarships:[
      {name:"CSC (Chinese Government Scholarship)",badge:"FULLY FUNDED ⭐",badgeType:"g",amount:"Full tuition + university dormitory + ¥3,000/month stipend + health insurance",covers:"Everything except personal food and transport",eligibility:"Bangladeshi citizen, BSc degree, under 35, CGPA satisfactory (check per university), no criminal record",deadline:"February–April each year (campuschina.org)",note:"Bangladesh is a priority country for CSC. Apply via Type A (through Chinese Embassy Dhaka) for government-assigned placement, or Type B (directly to university you want) for specific placement. Type B is preferred if you've already contacted a professor."},
      {name:"Provincial Government Scholarships (China)",badge:"PARTIAL",badgeType:"y",amount:"¥1,000–2,000/month + tuition waiver",covers:"Living stipend and/or tuition — slightly less than full CSC",eligibility:"Admitted to a university in that Chinese province",deadline:"Varies by province and university",note:"Provinces like Zhejiang, Jiangsu, Guangdong offer their own scholarships on top of or instead of CSC. Check Zhejiang University's specific scholarship page."},
    ],
    universities:[
      {name:"Zhejiang University",city:"Hangzhou",ranking:"QS Top 50 | China's Top 3",rent:"Free (scholarship dorm)",tuition:"€0 (CSC)",programs:"MSc Computer Science, MSc AI, MSc Data Science (English-taught)",schol:"CSC Type B",note:"Zhejiang University is consistently ranked China's top 3. Hangzhou is Alibaba's headquarters — incredible tech ecosystem and internship opportunities. English MSc programs available."},
      {name:"Beijing Jiaotong University (BJTU)",city:"Beijing",ranking:"QS Top 700 | China's Railway/CS Specialist",rent:"Free (scholarship dorm)",tuition:"€0 (CSC)",programs:"MSc Computer Science, MSc Information Engineering",schol:"CSC Type A & B",note:"BJTU is a popular choice for Bangladeshi students — large community. CSC Type A (embassy route) applicants are often placed here. Strong in CS and networking."},
      {name:"Tongji University",city:"Shanghai",ranking:"QS Top 200 | Strong in Engineering & CS",rent:"Free (scholarship dorm)",tuition:"€0 (CSC)",programs:"MSc Computer Science, MSc Software Engineering, MSc AI",schol:"CSC Type B",note:"Shanghai — China's financial and tech hub. Tongji has excellent English-medium CS programs. Proximity to Chinese tech companies is a major advantage."},
      {name:"Huazhong University of Science & Technology (HUST)",city:"Wuhan",ranking:"QS Top 250",rent:"Free (scholarship dorm)",tuition:"€0 (CSC)",programs:"MSc Computer Science, MSc AI, MSc Data Engineering",schol:"CSC Type A & B",note:"HUST is one of China's best universities for CS and AI research. Wuhan is more affordable than Shanghai/Beijing. Strong research culture."},
    ],
    visa:{
      keyFacts:["Visa type: X1 (for study >180 days) or X2 (initial entry, converted to X1)","Fee: ~$50 (≈ ৳6,000)","Medical exam is MANDATORY and thorough — do this early in Bangladesh","Processing: ~2 weeks","No financial proof needed (CSC letter covers this)","After arrival: convert to residence permit within 30 days"],
      steps:[
        {t:"Receive university Admission Notice + CSC Award letter",d:"These are the two key documents you need. Both come from your Chinese university."},
        {t:"Medical examination in Bangladesh",d:"Very thorough exam required — includes chest X-ray, HIV, hepatitis, ECG. Do at an approved clinic. Results valid for 6 months."},
        {t:"Apply at Chinese Embassy Dhaka",d:"Submit: passport, Admission Notice, CSC Award letter, medical exam, visa application form, photos."},
        {t:"Receive X2 visa",d:"Pay ~$50. Processing ~2 weeks. You receive an X2 entry visa."},
        {t:"Arrive in China + convert to residence permit",d:"Within 30 days of arrival, go to local Public Security Bureau to convert X2 to Residence Permit for Study (valid for full degree duration)."},
      ],
      checklist:["✅ Admission Notice from Chinese university","✅ CSC Award letter","✅ Medical examination certificate (approved clinic)","✅ Valid passport","✅ Visa application form (JW201/JW202)","✅ 2 passport photos (white background)","✅ Academic certificates + translations","✅ Police clearance certificate (some universities require)"],
    },
    costs:{
      predeparture:[["IELTS (optional but helpful)","≈ ৳22,000–25,000 OR skip"],["Medical exam in Bangladesh","≈ ৳5,000–8,000 (thorough exam)"],["Chinese student visa fee","~$50 (≈ ৳6,000)"],["Document apostille/notarization","≈ ৳5,000–10,000"],["Plane ticket Dhaka–China","~€450–700"],["Pre-departure total","≈ ৳65,000–1,10,000"]],
      annual:[["Tuition","¥0 (CSC covers completely)"],["Dormitory","¥0 (CSC covers)"],["Monthly stipend received","¥3,000 = ≈€380/month × 12 = €4,560/year"],["Food (3 meals/day at canteen)","~¥1,200/month = ≈€150/month"],["Transport + personal","~¥300–500/month"],["Net cost after stipend","≈ ¥0 or surplus"],["In BDT","≈ ৳0/year — stipend covers food!"]],
      withScholarship:[["Total 2.5-year cost to family","≈ ৳65,000–1,10,000 pre-departure ONLY"],["Monthly pocket money from stipend","¥3,000 covers food and transport in China"],["Part-time tutoring/freelancing","Possible — Bangladeshi students do this often"],["Verdict","Second cheapest option after Turkey — virtually free education"]],
    }
  },

  {
    id:"jp", name:"Japan", flag:"🇯🇵", accent:"#bc002d",
    tagline:"MEXT scholarship — ¥143,000/month, one of the world's best-paying fully funded scholarships",
    budgetLabel:"1–3 Lakh (pre-departure only)", budgetType:"g",
    budgetNote:"MEXT covers tuition + ¥143,000/month stipend (~€900) + flights — only pre-departure needed",
    overview:{
      keyFacts:[
        {val:"¥143,000",lbl:"Monthly MEXT stipend ≈ €900/month — highest stipend in this guide"},
        {val:"FREE",lbl:"Tuition at all MEXT-approved Japanese national universities"},
        {val:"Flights",lbl:"Round-trip airfare from Bangladesh covered by MEXT"},
        {val:"2+ years",lbl:"Masters = 2 years. Optional 6-month Research Student period before starting"},
      ],
      advantage:"Japan's MEXT scholarship pays the highest monthly stipend (¥143,000 ≈ €900) of ANY fully-funded scholarship in this guide — more than enough to live comfortably in Japan. Japanese universities are among the world's best for CS and engineering research. Japan is safe, clean, technologically advanced, and has a post-study work visa. IMPORTANT: You must contact a professor BEFORE applying.",
      warning:"MEXT requires you to contact a Japanese professor and get a positive response BEFORE your application. This is the hardest step — professors receive many emails. Write a personalized, specific research proposal email. Your research interests must align with the professor's current work. Without a professor's letter of intent, your MEXT chances are near zero.",
      steps:[
        {t:"Research Japanese professors NOW",d:"May–June 2026: Find professors at Kyushu, Tohoku, Osaka, or Nagoya universities whose research aligns with YOUR interests. Read their papers. Write personalized emails."},
        {t:"Get professor's letter of intent",d:"This is THE most critical step. Get a positive reply from a professor saying they're willing to supervise you. This makes your MEXT application strong."},
        {t:"Prepare research proposal",d:"Write a detailed research proposal (2-3 pages). Must be specific to your target professor's field. Generic proposals are rejected."},
        {t:"Apply via Japanese Embassy Dhaka",d:"MEXT Embassy route: applications open May–June each year. Submit all documents including professor's acceptance letter."},
        {t:"Primary and secondary screening",d:"Embassy conducts written tests and interview. Then your application is forwarded to Japan for final decision."},
        {t:"Receive offer + visa",d:"Results announced September–October. Apply for College Student visa at Japanese Embassy Dhaka. Processing ~2 weeks."},
      ]
    },
    scholarships:[
      {name:"MEXT (Monbukagakusho) Research Scholarship",badge:"FULLY FUNDED ⭐",badgeType:"g",amount:"¥143,000/month (Masters) + full tuition waiver + round-trip flights + settling allowance",covers:"Everything — the most generous monthly stipend of any scholarship here",eligibility:"Bangladeshi citizen, under 35, BSc degree, IELTS or TOEFL for English programs, professor's acceptance required",deadline:"Embassy route: May–June each year",note:"Apply via Japanese Embassy Dhaka. Must have a professor at target university willing to supervise. Strong motivation letter and research proposal are essential. Also check: University-Recommended MEXT (universities recommend students directly)."},
    ],
    universities:[
      {name:"Kyushu University",city:"Fukuoka",ranking:"QS Top 150",rent:"Free (MEXT pays stipend covering dorm costs)",tuition:"€0 (MEXT)",programs:"MSc Computer Science & Communication Engineering, MSc AI",schol:"MEXT",note:"Kyushu is more accessible than Tokyo/Osaka for international students. Fukuoka is Japan's most liveable city — modern, affordable, with a growing startup scene. Strong CS and AI research."},
      {name:"Tohoku University",city:"Sendai",ranking:"QS Top 90",rent:"Free (stipend covers)",tuition:"€0 (MEXT)",programs:"MSc Information Sciences, MSc Computer Science",schol:"MEXT",note:"Tohoku is one of Japan's best research universities. Sendai is smaller, safer, and cheaper than Tokyo. Very international research environment."},
      {name:"Osaka University",city:"Osaka",ranking:"QS Top 80",rent:"Free (stipend covers)",tuition:"€0 (MEXT)",programs:"MSc Computer Science, MSc AI, MSc Information Networking",schol:"MEXT",note:"Top 100 globally. Osaka is Japan's most food-loving, vibrant city — cheaper than Tokyo. Strong tech industry connections."},
    ],
    visa:{
      keyFacts:["Visa type: College Student Visa (ryugaku)","Fee: ~¥3,000 (~€18) — very cheap","Processing: ~2 weeks","MEXT letter replaces all financial requirements","No TB test, no blocked account","After arrival: get Residence Card at airport"],
      steps:[
        {t:"Receive MEXT acceptance letter + CoE",d:"After selection, Japanese university sends a Certificate of Eligibility (CoE). This is the key document for your visa."},
        {t:"Apply at Japanese Embassy Dhaka",d:"Submit: CoE, passport, MEXT letter, photos, visa application form. Pay ¥3,000 fee (~€18)."},
        {t:"Receive College Student Visa",d:"Processing 2 weeks. Get multi-entry visa valid for course duration."},
        {t:"Arrive in Japan + get Residence Card",d:"At airport, receive Residence Card (zairyu card). Register at your municipality within 14 days. Open Japanese bank account immediately."},
        {t:"Enroll + research student period (if applicable)",d:"Some MEXT scholars begin as Research Students for 6 months before formally starting the Masters program — this is normal and paid."},
      ],
      checklist:["✅ Certificate of Eligibility (CoE) from Japanese university","✅ MEXT scholarship certificate","✅ Valid passport","✅ 2 passport photos","✅ BSc degree + transcripts","✅ IELTS/TOEFL (if English program)","✅ Professor's acceptance letter","✅ Research proposal"],
    },
    costs:{
      predeparture:[["IELTS/TOEFL (if required)","≈ ৳22,000–30,000"],["Document preparation","≈ ৳5,000–10,000"],["Japanese visa fee","¥3,000 (≈ ৳2,500) — almost free"],["Flights (COVERED by MEXT)","€0"],["Pre-departure total","≈ ৳30,000–45,000"]],
      annual:[["Tuition","¥0 (MEXT)"],["Monthly stipend received","¥143,000 × 12 = ¥1,716,000/year (≈€10,800/year!)"],["Living costs in Japan","~¥8,000–10,000/month (€500–630)"],["Net surplus per year from stipend","≈ ¥636,000–876,000 (you SAVE money!)"],["In BDT","MEXT is the BEST-paying scholarship in this guide by far"]],
      withScholarship:[["Total 2-year cost to family","≈ ৳30,000–45,000 pre-departure ONLY"],["Monthly surplus after expenses","¥40,000–60,000 ≈ €250–380 savings/month"],["Post-study option","HSP (Highly Skilled Professional) visa or work visa available after graduation"],["Verdict","Highest monthly income of any scholarship. Japan is actually affordable with MEXT."]],
    }
  },

  {
    id:"kr", name:"South Korea", flag:"🇰🇷", accent:"#0ea5e9",
    tagline:"GKS scholarship — ₩1,000,000/month + free Korean language year + world-class universities",
    budgetLabel:"1–3 Lakh (pre-departure only)", budgetType:"g",
    budgetNote:"GKS covers tuition, dorm, flights, stipend, and even Korean language training",
    overview:{
      keyFacts:[
        {val:"₩1,000,000",lbl:"Monthly GKS stipend ≈ €710/month — very comfortable in Korea"},
        {val:"IELTS 3.0",lbl:"Minimum for Embassy track — lowest language requirement of any major scholarship!"},
        {val:"3 years",lbl:"Total: 1 year Korean language + 2 years Masters (all funded)"},
        {val:"QS #42",lbl:"KAIST — Korea's top university, globally ranked #42 in Engineering"},
      ],
      advantage:"The Global Korea Scholarship (GKS/KGSP) is one of the world's most accessible fully-funded scholarships. The embassy track requires IELTS minimum 3.0 — essentially anyone can apply. You get paid to learn Korean for a full year before your degree. South Korea is one of the world's most technologically advanced countries with companies like Samsung, LG, Kakao, and Naver.",
      warning:"The total duration is 3 years (1 Korean language + 2 Masters). You'll be away from home for longer. Korean language learning is mandatory during the first year. Competition is HIGH for top universities like KAIST and POSTECH. The embassy track may place you at a less-prestigious university — the university track lets you target KAIST directly.",
      steps:[
        {t:"Python + Data Skills",d:"May–Aug 2026: Build strong CS skills — directly relevant for KAIST, POSTECH, and GIST applications."},
        {t:"IELTS 3.0+ (embassy) or 5.5+ (university track)",d:"Embassy track minimum is IELTS 3.0. But for KAIST/POSTECH direct applications, aim for IELTS 6.0+. Take IELTS as soon as possible."},
        {t:"Research Korean universities",d:"July–Aug 2026: Identify target universities and professors. For university track, contact Korean professors via email with your research interests."},
        {t:"Apply for GKS — Embassy Track",d:"Applications open September, deadline October–November each year. Apply at Korean Embassy Dhaka. Includes written test and interview."},
        {t:"OR Apply — University Track",d:"Directly apply to GKS through universities like KAIST, POSTECH, UNIST, GIST — check their scholarship pages for deadlines (typically September)."},
        {t:"Interview + Results",d:"Results announced March–April. If selected, prepare for 1-year Korean language program starting in March of that year."},
      ]
    },
    scholarships:[
      {name:"Global Korea Scholarship (GKS/KGSP)",badge:"FULLY FUNDED ⭐",badgeType:"g",amount:"Full tuition + dormitory + ₩1,000,000/month stipend + airfare + Korean language training (1 year)",covers:"Truly everything for 3 years",eligibility:"Bangladeshi citizen, under 40, BSc degree, IELTS 3.0 minimum (embassy track), no Korean degree previously held",deadline:"October–November each year (embassy track) | September (university track)",note:"Bangladesh is eligible. Embassy track applies through Korean Embassy Dhaka (limited spots per country). University track lets you target specific universities directly — more competitive but higher chance of KAIST/POSTECH. Both are fully funded."},
    ],
    universities:[
      {name:"KAIST",city:"Daejeon",ranking:"QS #42 in Engineering | South Korea's MIT",rent:"Free (GKS dorm)",tuition:"€0 (GKS)",programs:"MSc Computer Science, MSc AI, MSc Data Science",schol:"GKS University Track",note:"KAIST is one of Asia's best universities and globally ranked #42 in Engineering. 100% English-medium. Very competitive admission. For GKS University Track, contact a KAIST professor FIRST."},
      {name:"POSTECH",city:"Pohang",ranking:"QS Top 100",rent:"Free (GKS dorm)",tuition:"€0 (GKS)",programs:"MSc Computer Science & Engineering, MSc AI",schol:"GKS University Track",note:"POSTECH is Korea's second-best tech university — smaller, more research-focused. Less competitive than KAIST for GKS. Pohang is a smaller, affordable city."},
      {name:"Yonsei University",city:"Seoul",ranking:"QS Top 70",rent:"Free (GKS dorm)",tuition:"€0 (GKS)",programs:"MSc Computer Science, MSc AI & Software",schol:"GKS Embassy or University Track",note:"One of Korea's most prestigious universities (SKY universities). Located in Seoul. Strong industry connections with Korean tech giants."},
      {name:"GIST",city:"Gwangju",ranking:"Top Korean Research University",rent:"Free (GKS dorm)",tuition:"€0 (GKS)",programs:"MSc Computer Science, MSc AI, MSc Data Science",schol:"GKS University Track — EASIER to get",note:"GIST (Gwangju Institute of Science and Technology) is less famous than KAIST but has excellent CS/AI programs. Less competition for GKS. Good choice for Bangladeshi students."},
    ],
    visa:{
      keyFacts:["Visa type: D-2 (Student Visa)","Fee: $45–60 (~€40–55)","Processing: ~5–7 business days — very fast","GKS letter replaces financial proof requirement","After arrival: Register at immigration office within 90 days for ARC (Alien Registration Card)"],
      steps:[
        {t:"Receive GKS Certificate of Admission",d:"Korean university sends an admission certificate. This is your main visa document."},
        {t:"Apply at Korean Embassy Dhaka",d:"Korean Embassy is in Gulshan. Submit: passport, GKS certificate, D-2 visa application, photos, BSc degree + transcripts."},
        {t:"Pay visa fee and wait",d:"~$45–60. Processing 5–7 business days — fastest visa in this guide."},
        {t:"Arrive in Korea + get ARC",d:"Within 90 days of arrival, go to local Immigration Office to get Alien Registration Card (ARC) — your Korean ID for the duration of studies."},
        {t:"Korean language year",d:"Attend TOPIK language program for 1 year. Learn Korean — genuinely useful for daily life and job hunting in Korea."},
      ],
      checklist:["✅ GKS Certificate of Admission (or Acceptance)","✅ Valid passport (6+ months validity)","✅ D-2 Visa application form","✅ IELTS certificate (3.0+ for embassy, 5.5–6.0 for top universities)","✅ BSc degree + transcripts","✅ 2 passport photos","✅ Medical certificate (standard health check)","✅ GKS scholarship award letter"],
    },
    costs:{
      predeparture:[["IELTS Exam","≈ ৳22,000–25,000"],["Korean student visa fee","~$50 (≈ ৳6,000)"],["Document preparation","≈ ৳5,000–8,000"],["Flights (COVERED by GKS)","₩0 — scholarship pays"],["Pre-departure total","≈ ৳35,000–45,000"]],
      annual:[["Tuition","₩0 (GKS)"],["Dormitory","₩0 (GKS)"],["Monthly stipend received","₩1,000,000 × 12 = ₩12,000,000/year (≈ €8,500/year)"],["Food + daily expenses","~₩400,000/month = ~€285/month"],["Net after expenses","~₩600,000/month = ~€425/month SAVED"],["In BDT","Surplus every month — you can SAVE during your degree!"]],
      withScholarship:[["Total 3-year cost to family","≈ ৳35,000–45,000 pre-departure ONLY"],["Monthly surplus (save toward future)","~€400/month = €14,400 saved over 3 years"],["Post-study options","E-7 (skilled worker) visa available — Korean tech companies actively hire"],["Verdict","Best ROI: high stipend + world-class degree + Korean tech job opportunities"]],
    }
  },

  {
    id:"my", name:"Malaysia", flag:"🇲🇾", accent:"#16a34a",
    tagline:"English-medium, no IELTS required, affordable living — easiest entry in this guide",
    budgetLabel:"6–9 Lakh/year", budgetType:"g",
    budgetNote:"Most accessible option — well within 15 lakh budget, large Bangladeshi community",
    overview:{
      keyFacts:[
        {val:"RM 18K–30K",lbl:"Annual tuition at public universities ≈ €3,600–6,000"},
        {val:"€300–500",lbl:"Monthly living cost in Kuala Lumpur, Johor Bahru, Penang"},
        {val:"No IELTS",lbl:"Most Malaysian public universities don't require IELTS — English is the medium"},
        {val:"20 hrs/wk",lbl:"Part-time work allowed — earn RM 1,500–2,500 extra monthly"},
      ],
      advantage:"Malaysia is the most accessible option in this guide for a Bangladeshi CSE graduate. English is Malaysia's academic language — no IELTS typically required. Cost of living is extremely affordable (€300-500/month). Large established Bangladeshi community (estimated 1 million+ Bangladeshis live in Malaysia). Halal food everywhere. Strong tech industry with Intel, AMD, Dell, and dozens of tech companies in Penang and KL.",
      warning:"Malaysia is NOT in Europe — degree recognition differs. However, Malaysian public universities (UTM, USM, UPM) are globally ranked and their degrees are internationally recognized in Asia, Middle East, and beyond. The Malaysian Ringgit has weakened against EUR/USD, making it even more affordable. Make sure you apply to PUBLIC universities (not private ones which are more expensive and less recognized).",
      steps:[
        {t:"Python + Data Skills",d:"May–Aug 2026: Build skills. Directly relevant for UTM, USM, and UPM's CS, AI, and Data Science programs."},
        {t:"No IELTS needed for most programs",d:"Most Malaysian public universities accept IELTS 5.5 OR an MOI (medium of instruction) letter from your BSc university proving English-medium education — much easier!"},
        {t:"Apply directly to universities",d:"July–Oct 2026: Apply directly to UTM (utm.my), USM (usm.my), UPM (upm.edu.my). No central application portal — each university has its own online form."},
        {t:"Apply for Malaysian International Scholarship (MIS)",d:"July–Sept 2026: Check scholarship.mohe.gov.my for Malaysia's government scholarship program."},
        {t:"Receive offer + Student Pass",d:"Receive acceptance letter. University applies for your Student Pass (student visa) on your behalf — you don't do it yourself!"},
        {t:"Arrive + study",d:"Processing: 4–8 weeks. Arrive in Malaysia, register at university, get your Student Pass sticker."},
      ]
    },
    scholarships:[
      {name:"Malaysian International Scholarship (MIS)",badge:"PARTIAL",badgeType:"b",amount:"RM 1,500–2,000/month + tuition support",covers:"Partial tuition + monthly living stipend",eligibility:"Bangladeshi citizen, excellent academic record, fields aligned with Malaysia's national priorities (CS, Engineering, AI qualify)",deadline:"Check mohe.gov.my annually",note:"Apply through the Malaysian Ministry of Higher Education (MOHE) portal. Bangladesh is eligible. Less well-known than CSC or GKS but worth applying for — less competition."},
      {name:"UTM Graduate Research Fellowship (GRF)",badge:"PARTIAL",badgeType:"y",amount:"RM 1,000–1,500/month",covers:"Research stipend for research-mode Masters",eligibility:"Admitted as research student at UTM with supervisor",deadline:"At enrollment — apply to potential supervisors",note:"If doing a research-based Masters (Mode by Research) at UTM, a supervisor can provide you a GRF. Email potential UTM supervisors BEFORE applying. This is how many international students at UTM get funded."},
    ],
    universities:[
      {name:"Universiti Teknologi Malaysia (UTM)",city:"Johor Bahru / Kuala Lumpur",ranking:"QS Top 200 | Malaysia's #1 for Engineering & CS",rent:"€200–400/month",tuition:"RM 18,000–25,000/year",programs:"MSc Computer Science, MSc AI, MSc Data Science (English)",schol:"MIS + GRF supervisor funding",note:"UTM is Malaysia's top CS and engineering university. QS ranked top 200. Two campuses: main in Johor Bahru (cheapest city) and branch in KL. Very strong Bangladeshi alumni network."},
      {name:"Universiti Sains Malaysia (USM)",city:"Penang",ranking:"QS Top 300 | Malaysia's APEX University",rent:"€250–400/month",tuition:"RM 15,000–25,000/year",programs:"MSc Computer Science, MSc AI & Data Analytics",schol:"MIS",note:"USM in Penang is Malaysia's only APEX (Accelerated Programme for Excellence) university. Penang is a beautiful, affordable island city. Strong research culture."},
      {name:"Universiti Putra Malaysia (UPM)",city:"Selangor (near KL)",ranking:"QS Top 300",rent:"€250–400/month",tuition:"RM 16,000–24,000/year",programs:"MSc Computer Science, MSc Software Engineering",schol:"MIS",note:"UPM is near Kuala Lumpur. Strong in CS and technology. UPM campus is large and green — very affordable on-campus accommodation available."},
    ],
    visa:{
      keyFacts:["Visa type: Student Pass (NOT a visa — managed by university)","No embassy visit for student pass — university processes it for you","Processing: 4–8 weeks after acceptance","Financial proof: RM 3,000–5,000/month (university confirms your funds)","No IELTS required — MOI letter from BSc university is accepted","Work: 20 hours/week on approved jobs"],
      steps:[
        {t:"Receive university conditional offer",d:"Apply online. Upload transcripts, BSc degree, MOI letter (or IELTS if you have it), passport copy."},
        {t:"Accept offer and pay deposit",d:"Pay RM 1,000–3,000 registration deposit. University then starts your Student Pass application."},
        {t:"University submits eVisa application",d:"The university submits your Student Pass through EMGS (Education Malaysia Global Services). This is done entirely by the university on your behalf."},
        {t:"Receive eVAL (approval letter)",d:"EMGS approves, university receives eVAL approval. This is your entry approval."},
        {t:"Arrive in Malaysia + get Student Pass",d:"Enter Malaysia with your regular passport (no visa sticker needed beforehand). University handles the Student Pass sticker within 1–2 weeks of arrival."},
        {t:"Annual renewal",d:"Student Pass renewed each year by your university. Easy process."},
      ],
      checklist:["✅ University acceptance letter","✅ Valid passport (valid for full course duration)","✅ BSc degree + transcripts","✅ MOI letter from your BSc university (or IELTS 5.5)","✅ Passport-size photos","✅ Medical fitness certificate (done in Malaysia on arrival)","✅ Health insurance (provided by EMGS/university)","✅ RM 3,000–5,000 initial funds proof"],
    },
    costs:{
      predeparture:[["IELTS (optional — MOI letter usually accepted)","€0 (skip) or ≈ ৳22,000–25,000"],["Document preparation + notarization","≈ ৳5,000–8,000"],["University registration deposit (refundable)","RM 1,000–3,000 (≈ ৳25,000–75,000)"],["Plane ticket Dhaka–Malaysia","~€200–400 — cheapest flights in this guide!"],["Pre-departure total","≈ ৳40,000–1,10,000"]],
      annual:[["Tuition","RM 18,000–30,000 (≈€3,600–6,000)"],["Accommodation (shared room, affordable)","RM 400–700/month (≈€80–140)"],["Food (Bangladeshi/halal available cheaply)","RM 500–800/month (≈€100–160)"],["Transport","RM 100–200/month"],["Total per year","RM 30,000–45,000 (≈€6,000–9,000 = ৳7–10 lakh)"]],
      withScholarship:[["MIS scholarship (if awarded)","RM 1,500–2,000/month received"],["Part-time work (20 hrs/wk × RM 15/hr)","Earn RM 1,200–2,400/month extra"],["Net family cost with part-time work","≈ RM 10,000–20,000/year (≈€2,000–4,000)"],["In BDT","≈ ৳2,50,000–5,00,000/year"],["Verdict","Most accessible. Cheapest flights. No IELTS. Large Bangladeshi community. Halal food. Easy visa."]],
    }
  },

  {
    id:"gb", name:"United Kingdom", flag:"🇬🇧", accent:"#3b82f6",
    tagline:"1-year Masters, Russell Group prestige, 2-year post-study work visa",
    budgetLabel:"Need Scholarship", budgetType:"r",
    budgetNote:"Without scholarship: 25–35 lakh/year. With GREAT scholarship: ~13–18 lakh. DETAILED GUIDE AVAILABLE",
    overview:{
      keyFacts:[
        {val:"£16K–25K",lbl:"Annual tuition at good UK universities — expensive without scholarship"},
        {val:"£10K–15K",lbl:"GREAT Scholarship discount for Bangladeshi students (British Council)"},
        {val:"1 Year",lbl:"UK Masters duration — fastest in this guide"},
        {val:"2 Years",lbl:"Graduate Route Visa post-study work rights"},
      ],
      advantage:"UK offers 1-year Masters (shortest in this guide), globally recognized degrees, and the 2-year Graduate Route Visa for post-study work. GREAT Scholarship is confirmed available for Bangladeshi students at multiple universities. Chevening Scholarship is fully funded. Russell Group universities are among the world's most respected.",
      warning:"UK is the most expensive country in this guide without a scholarship — 25–35 lakh/year total. The financial proof requirement (£10,224 in bank for 28 days) and NHS surcharge make the visa expensive. However, the 1-year duration means TOTAL cost is comparable to 2-year programs elsewhere. A DETAILED 7-tab guide is available separately for UK.",
      steps:[
        {t:"Build Python + data skills",d:"May–Aug 2026: Essential for CS/Data Science Masters applications."},
        {t:"IELTS UKVI 6.5",d:"Must be UKVI version (not regular IELTS). Target 6.5 overall."},
        {t:"Target September 2027 intake",d:"September 2026 scholarship deadlines have mostly passed. Apply for 2027 cycle starting Sept 2026."},
        {t:"Apply to universities with GREAT Scholarship",d:"Sheffield, Nottingham, Glasgow, UEA, Hull, Keele — all confirmed GREAT Scholarship partners for Bangladesh."},
        {t:"Apply for Chevening (opens Aug, closes Nov)",d:"Fully funded but requires 2 years work experience and strong leadership profile."},
        {t:"Visa: blocked bank account + TB test + CAS",d:"Need £10,224 in bank (28 days), TB test, and CAS from university before visa application."},
      ]
    },
    scholarships:[
      {name:"GREAT Scholarship (British Council)",badge:"£10,000–15,000",badgeType:"b",amount:"£10,000–15,000 off tuition fees",covers:"Tuition reduction only (not living costs)",eligibility:"Bangladeshi citizen, 1-year taught Masters, confirmed offer from partner university",deadline:"Typically Feb–May annually — check each university",note:"7 GREAT Scholarships confirmed for Bangladeshi students per year. Sheffield, Nottingham, Glasgow, UEA, Hull, Keele are partners. Apply as soon as you have a university offer."},
      {name:"Chevening Scholarship",badge:"FULLY FUNDED",badgeType:"g",amount:"Full tuition + £18,000+ living + flights + visa",covers:"Absolutely everything",eligibility:"2 years work experience, leadership, Bangladeshi citizen",deadline:"Opens August, closes November each year",note:"Highly competitive but life-changing. Start building leadership and professional profile now. Work/freelance experience is key."},
    ],
    universities:[
      {name:"University of Sheffield",city:"Sheffield",ranking:"Russell Group | QS Top 120",rent:"£470–600/month",tuition:"~£20,000–24,000/year",programs:"MSc CS, MSc AI, MSc Data Science",schol:"GREAT Scholarship",note:"Sheffield is UK's most affordable Russell Group city. Strong CS programs. Large student population."},
      {name:"University of Hull",city:"Hull",ranking:"Top 60 UK",rent:"£350–500/month",tuition:"~£16,000–18,000/year",programs:"MSc CS, MSc Data Science",schol:"GREAT Scholarship confirmed for Bangladesh",note:"Hull has UK's lowest rent costs. GREAT Scholarship confirmed. Lower tuition. Budget-friendly option."},
    ],
    visa:{
      keyFacts:["Visa fee: £363 + £776/year NHS surcharge","Financial proof: £10,224 (28-day rule, UKVI-approved banks)","TB test: MANDATORY for Bangladesh","IELTS UKVI: 6.0–6.5","CAS from university required","80% of Bangladeshis face credibility interview"],
      steps:[
        {t:"Get university CAS",d:"Confirmation of Acceptance for Studies — issued by university after you accept offer."},
        {t:"TB test at approved Dhaka clinic",d:"Mandatory for Bangladesh. Allow 1 week for results."},
        {t:"Prepare £10,224 in UKVI-approved bank",d:"Must be held for 28 consecutive days. Use BRAC, Eastern, City Bank, HSBC, StanChart."},
        {t:"Apply online at gov.uk/student-visa",d:"Pay £363 + NHS surcharge. Upload CAS, IELTS, TB test, bank statement, degree."},
        {t:"Biometrics at VFS Global Dhaka",d:"Fingerprints and photo taken at VFS Dhaka. No appointment needed."},
        {t:"Credibility interview (likely)",d:"~80% of Bangladeshis are called. Know your course modules and career plan in detail."},
      ],
      checklist:["✅ CAS from university","✅ IELTS UKVI 6.0–6.5","✅ TB test certificate","✅ £10,224 in bank (28 days)","✅ BSc degree + transcripts","✅ Valid passport","✅ Passport photos"],
    },
    costs:{
      predeparture:[["IELTS UKVI exam","≈ ৳22,000–25,000"],["TB test (Dhaka approved clinic)","≈ ৳3,000–5,000"],["UK visa + NHS surcharge","£363 + £776 ≈ ৳1,60,000"],["Plane ticket","~£600–900"],["Pre-departure total","≈ ৳2,00,000–2,50,000"]],
      annual:[["Tuition (average affordable university)","£16,000–22,000"],["Living (Sheffield/Hull/Nottingham)","£9,600–14,400 (£800–1,200/month)"],["Total WITHOUT scholarship","£25,600–36,400"]],
      withScholarship:[["With GREAT £10,000–15,000 off","£10,600–26,400/year"],["Part-time work (20 hrs × £10/hr)","Earn £800–1,000/month"],["Net family cost","~£7,000–18,000 total (1 year only)"],["Note","For DETAILED UK guide with all scholarships, universities, costs — see UK Roadmap"]],
    }
  },

  {
    id:"it", name:"Italy", flag:"🇮🇹", accent:"#16a34a",
    tagline:"€900–4,000/year tuition at QS Top 100 universities — MAECI fully funded scholarship",
    budgetLabel:"1–2 Lakh (with MAECI) or 11–14 Lakh/year", budgetType:"y",
    budgetNote:"MAECI covers everything. Even without scholarship, tuition is income-based and very low.",
    overview:{
      keyFacts:[
        {val:"€900–4K",lbl:"Annual tuition at public universities (income-based — could be near zero)"},
        {val:"€9,000",lbl:"MAECI Italian government scholarship stipend + tuition waiver"},
        {val:"€50",lbl:"Student visa fee — cheapest European visa in this guide"},
        {val:"€6,000",lbl:"Annual financial proof required (vs UK's £10,224)"},
      ],
      advantage:"Italy offers an extraordinary combination: world-ranked universities (Politecnico di Milano at QS #98) at near-free tuition. The government sets tuition as income-based — as a Bangladeshi student from a middle-class family, you likely qualify for the lowest fee bracket. MAECI scholarship is fully funded. Visa is simpler and cheaper than UK. No TB test required.",
      warning:"Italian Masters is 2 years (vs UK's 1 year). Milan is expensive — target Turin, Bologna, Padua, or Pisa instead. Must register on universitaly.it (mandatory pre-enrollment portal) before applying for visa — start this process early. The 2026-27 MAECI deadline has passed; target 2027-28 (opens Nov 2026). A DETAILED 8-tab guide is available separately for Italy.",
      steps:[
        {t:"Python + data skills",d:"May–Aug 2026: Directly relevant for CS/AI programs at Polito, Bologna, Padua."},
        {t:"IELTS 6.0 (or Italian B2)",d:"English MSc programs need IELTS 6.0. Learning Italian to B2 opens more options."},
        {t:"Register on universitaly.it",d:"Mandatory for non-EU students. This validates your Bangladesh degree for Italian universities. Must be done before applying for visa."},
        {t:"Apply to Italian universities",d:"Sept–Dec 2026 for Sept 2027 intake."},
        {t:"Apply for MAECI scholarship (opens Nov 2026)",d:"studyinitaly.esteri.it — deadline typically March."},
        {t:"Visa: Type D National Visa (€50)",d:"Much simpler than UK. No credibility interview. No TB test. Apply at Italian Embassy Dhaka."},
      ]
    },
    scholarships:[
      {name:"MAECI Italian Government Scholarship",badge:"FULLY FUNDED ⭐",badgeType:"g",amount:"€9,000 stipend (over 9 months) + tuition exemption + health insurance",covers:"Living stipend + tuition waiver + health insurance",eligibility:"Bangladeshi citizen, under 28, BSc degree, IELTS 6.0 or Italian B2",deadline:"November–March annually (studyinitaly.esteri.it)",note:"Opens for 2027-28 cycle around November 2026. Bangladesh is explicitly eligible across 150+ countries. Applications via studyinitaly.esteri.it. Highly competitive but very worthwhile."},
      {name:"ERSu/DSU Regional Income-Based Grant",badge:"€4,000–6,500/year",badgeType:"b",amount:"€4,000–6,500/year + subsidized accommodation",covers:"Living allowance + reduced-cost dorm placement",eligibility:"Low-income international students enrolled at Italian public university",deadline:"August–October each academic year (automatic upon enrollment)",note:"Apply IMMEDIATELY after enrolling. As a middle-class Bangladeshi student, you're likely to qualify. This is automatic — not competitive. Most powerful when combined with MAECI or merit scholarship."},
    ],
    universities:[
      {name:"Politecnico di Torino",city:"Turin",ranking:"QS Top 300 | Italy's #2 Tech Uni",rent:"€350–550/month",tuition:"€900–3,500/year",programs:"MSc Computer Engineering, MSc Data Science & Engineering, MSc Cybersecurity",schol:"MAECI + ERSu",note:"Turin is Italy's most affordable major city. Strong tech industry (former Fiat/Stellantis center, growing tech hub). English MSc programs available."},
      {name:"University of Bologna",city:"Bologna",ranking:"QS #154 | World's Oldest University",rent:"€400–550/month",tuition:"€1,000–3,000/year",programs:"MSc Computer Science, MSc AI, MSc Data Science",schol:"MAECI + DSU",note:"Italy's top student city. Bologna's AI and CS programs are internationally renowned. MAECI strongly competitive here."},
      {name:"University of Pisa",city:"Pisa",ranking:"Top Italian CS University",rent:"€300–450/month",tuition:"€800–2,500/year",programs:"MSc CS, MSc AI & Data Engineering",schol:"MAECI + DSU Toscana",note:"Italy's cheapest major student city (€300 rent!). Strong CS research. MSc AI & Data Engineering is English-taught and highly regarded."},
    ],
    visa:{
      keyFacts:["Visa type: Type D National Visa","Fee: €50 — cheapest in this guide","No TB test required (unlike UK)","Financial proof: €6,000/year only (vs UK's £10,224)","universitaly.it pre-enrollment is MANDATORY","No credibility interview"],
      steps:[
        {t:"Complete universitaly.it pre-enrollment",d:"Mandatory for all non-EU students. Validates your Bangladesh BSc degree for Italian universities."},
        {t:"Get university admission",d:"Apply directly to university AND via universitaly.it. Receive acceptance letter."},
        {t:"Gather documents",d:"Admission letter, university pre-enrollment confirmation, BSc degree + notarized Italian/English translation, IELTS, financial proof (€6,000) or MAECI scholarship letter."},
        {t:"Apply at VFS Global Dhaka (Italian section)",d:"No appointment needed. Pay €50. Provide biometrics. No credibility interview."},
        {t:"Receive visa + arrive",d:"Processing ~21–30 days. Arrive. Within 8 days: register at Questura (police) for Permesso di Soggiorno (€76–100)."},
      ],
      checklist:["✅ universitaly.it pre-enrollment confirmation","✅ University acceptance letter","✅ €6,000 in bank (or MAECI scholarship letter)","✅ BSc degree + notarized Italian/English translation","✅ IELTS 6.0","✅ Health insurance (€30,000 coverage)","✅ Accommodation proof","✅ 2 passport photos"],
    },
    costs:{
      predeparture:[["IELTS Exam","≈ ৳22,000–25,000"],["Document translation + notarization","≈ ৳10,000–15,000"],["Italian visa fee","€50 (≈ ৳6,000) — cheapest!"],["Plane ticket Dhaka–Italy","~€500–800"],["Pre-departure total","≈ ৳45,000–65,000"]],
      annual:[["Tuition (income-based public university)","€900–3,500/year"],["Accommodation (shared, affordable city)","€3,600–6,600"],["Food","€1,800–2,400"],["Total per year","€6,300–12,500"]],
      withScholarship:[["MAECI: €9,000 stipend + tuition waiver","Covers most costs over 9 months"],["ERSu grant: €4,000–6,500/year + dorm","Reduces accommodation cost"],["Part-time work (20 hrs/wk)","€300–600/month additional income"],["Note","For the DETAILED 8-tab Italy guide including all universities and scholarships — see Italy Roadmap"]],
    }
  }
];

/* ─── BUDGET DISPLAY CONFIG ──────────────────────────────────────────── */
const BUDGET_CFG = {
  g:{label:"✅ Well Within Budget",cls:"pill-g"},
  y:{label:"🟡 Doable with Care",cls:"pill-y"},
  r:{label:"🔴 Needs Scholarship",cls:"pill-r"},
};

/* ─── COMPONENTS ─────────────────────────────────────────────────────── */
function InfoBox({type,title,children}) {
  return <div className={`info-box ${type}-box`}><h4>{title}</h4>{children}</div>;
}

function CostTable({rows,totalIndex}) {
  return (
    <div className="cost-table">
      {rows.map(([label,val],i)=>(
        <div className={`cost-row${i===totalIndex?" cost-total":""}`} key={i}>
          <span className="cost-label">{label}</span>
          <span className="cost-val">{val}</span>
        </div>
      ))}
    </div>
  );
}

function OverviewTab({data,accent}) {
  return (
    <div>
      <InfoBox type="green" title="💡 Why Choose This Country">
        <p>{data.advantage}</p>
      </InfoBox>
      {data.warning && <InfoBox type="warn" title="⚠️ Know Before You Go"><p>{data.warning}</p></InfoBox>}
      <div className="stat-grid">
        {data.keyFacts.map((f,i)=>(
          <div className="stat-box" key={i}>
            <div className="stat-val" style={{color:accent}}>{f.val}</div>
            <div className="stat-lbl">{f.lbl}</div>
          </div>
        ))}
      </div>
      <div className="section-h" style={{fontSize:18,marginBottom:12}}>Your 6-Step Action Plan</div>
      <div className="step-list">
        {data.steps.map((s,i)=>(
          <div className="step-row" key={i}>
            <div className="step-num" style={{background:accent+"22",color:accent,border:`1px solid ${accent}44`}}>{i+1}</div>
            <div className="step-body"><h4>{s.t}</h4><p>{s.d}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScholarshipsTab({data}) {
  return (
    <div>
      {data.map((s,i)=>(
        <div className="card" key={i}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8,marginBottom:10}}>
            <h3 style={{fontSize:15,color:"#dde1ee"}}>{s.name}</h3>
            <span className={`pill ${s.badgeType==="g"?"pill-g":s.badgeType==="b"?"pill-b":s.badgeType==="p"?"pill-p":"pill-y"}`}>{s.badge}</span>
          </div>
          <div className="detail-chips">
            <div className="chip">💰 <strong>{s.amount}</strong></div>
            <div className="chip">📅 Deadline: <strong>{s.deadline}</strong></div>
          </div>
          <p style={{fontSize:13,marginBottom:6,color:"#94a3b8"}}><strong style={{color:"#dde1ee"}}>Covers:</strong> {s.covers}</p>
          <p style={{fontSize:13,marginBottom:8,color:"#94a3b8"}}><strong style={{color:"#dde1ee"}}>Eligibility:</strong> {s.eligibility}</p>
          <div style={{padding:"10px 14px",background:"rgba(251,191,36,.06)",border:"1px solid rgba(251,191,36,.15)",borderRadius:8}}>
            <p style={{fontSize:13,color:"#fbbf24"}}>💡 {s.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function UniversitiesTab({data}) {
  return (
    <div>
      {data.map((u,i)=>(
        <div className="card" key={i}>
          <div style={{marginBottom:10}}>
            <h3 style={{fontSize:15,color:"#dde1ee",marginBottom:3}}>{u.name}</h3>
            <p style={{fontSize:12,color:"#5a6380"}}>{u.city} · {u.ranking}</p>
          </div>
          <div className="detail-chips">
            <div className="chip">🏠 <strong>{u.rent}/month</strong></div>
            <div className="chip">💰 Tuition: <strong>{u.tuition}</strong></div>
          </div>
          <p style={{fontSize:13,marginTop:10,marginBottom:6,color:"#94a3b8"}}><strong style={{color:"#dde1ee"}}>Programs:</strong> {u.programs}</p>
          <p style={{fontSize:13,marginBottom:8,color:"#34d399"}}><strong>Scholarship:</strong> {u.schol}</p>
          <p style={{fontSize:13,color:"#94a3b8"}}>{u.note}</p>
        </div>
      ))}
    </div>
  );
}

function VisaTab({data}) {
  return (
    <div>
      <InfoBox type="green" title="🔑 Key Visa Facts">
        <ul>{data.keyFacts.map((f,i)=><li key={i}>{f}</li>)}</ul>
      </InfoBox>
      <div className="section-h" style={{fontSize:17,marginBottom:12}}>Step-by-Step Process</div>
      <div className="step-list" style={{marginBottom:18}}>
        {data.steps.map((s,i)=>(
          <div className="step-row" key={i}>
            <div className="step-num" style={{background:"#131625",color:"#60a5fa"}}>{i+1}</div>
            <div className="step-body"><h4>{s.t}</h4><p>{s.d}</p></div>
          </div>
        ))}
      </div>
      <div className="section-h" style={{fontSize:17,marginBottom:12}}>Documents Checklist</div>
      <div className="card">
        {data.checklist.map((item,i)=>(
          <div key={i} style={{padding:"8px 0",borderBottom:i<data.checklist.length-1?"1px solid #131625":"none",fontSize:14,color:"#94a3b8"}}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function CostsTab({data,accent}) {
  return (
    <div>
      <div className="section-h" style={{fontSize:17,marginBottom:6}}>Pre-Departure Costs (from Bangladesh)</div>
      <p className="section-sub">What you pay before leaving Dhaka</p>
      <CostTable rows={data.predeparture} totalIndex={data.predeparture.length-1}/>

      <div className="section-h" style={{fontSize:17,marginBottom:6}}>Annual Costs in Country</div>
      <p className="section-sub">Living + tuition once you arrive</p>
      <CostTable rows={data.annual} totalIndex={data.annual.length-1}/>

      <div className="section-h" style={{fontSize:17,marginBottom:6}}>With Scholarship Scenario</div>
      <p className="section-sub">Net cost after receiving scholarship/stipend/work income</p>
      <CostTable rows={data.withScholarship} totalIndex={data.withScholarship.length-1}/>
    </div>
  );
}

/* ─── COUNTRY PAGE ───────────────────────────────────────────────────── */
const TABS = [
  {id:"ov",label:"Overview",icon:"🗺️"},
  {id:"sc",label:"Scholarships",icon:"🎓"},
  {id:"un",label:"Universities",icon:"🏛️"},
  {id:"vi",label:"Visa & Docs",icon:"📋"},
  {id:"co",label:"Costs",icon:"💶"},
];

function CountryPage({c,onBack}) {
  const [tab,setTab] = useState("ov");
  const ac = c.accent;
  return (
    <div style={{minHeight:"100vh"}}>
      {/* Header */}
      <div style={{background:"#09090f",borderBottom:"1px solid #1c2035",padding:"14px 18px",display:"flex",alignItems:"center",gap:14,position:"sticky",top:0,zIndex:100}}>
        <button onClick={onBack} style={{background:"#131625",border:"1px solid #1c2035",color:"#7e8aaa",borderRadius:8,padding:"7px 14px",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:13,display:"flex",alignItems:"center",gap:6}}>
          ← All Countries
        </button>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:24}}>{c.flag}</span>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:"#fff",fontSize:17}}>{c.name}</div>
            <div style={{fontSize:12,color:"#5a6380"}}>{c.tagline}</div>
          </div>
        </div>
        <div style={{marginLeft:"auto"}}>
          <span className={`pill ${BUDGET_CFG[c.budgetType].cls}`}>{c.budgetLabel}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-bar" style={{"--ac":ac}}>
        {TABS.map(t=>(
          <button key={t.id} className={`tab-btn${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{padding:"20px 18px",maxWidth:820,margin:"0 auto"}}>
        {tab==="ov" && <OverviewTab data={c.overview} accent={ac}/>}
        {tab==="sc" && (
          <>
            <div className="section-h">Scholarships Available</div>
            <p className="section-sub">Research-verified funding opportunities for Bangladeshi students</p>
            <ScholarshipsTab data={c.scholarships}/>
          </>
        )}
        {tab==="un" && (
          <>
            <div className="section-h">Recommended Universities</div>
            <p className="section-sub">Best value for CSE/Tech — good rankings, affordable cities, scholarship access</p>
            <UniversitiesTab data={c.universities}/>
          </>
        )}
        {tab==="vi" && (
          <>
            <div className="section-h">Visa & Documentation</div>
            <p className="section-sub">Step-by-step process from Bangladesh</p>
            <VisaTab data={c.visa}/>
          </>
        )}
        {tab==="co" && (
          <>
            <div className="section-h">Cost Breakdown</div>
            <p className="section-sub">Full financial picture — pre-departure + annual + scholarship scenario</p>
            <CostsTab data={c.costs} accent={ac}/>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────────────────── */
function Home({setCountry}) {
  const [filter,setFilter] = useState("all");
  const filtered = filter==="all" ? COUNTRIES : COUNTRIES.filter(c=>c.budgetType===filter);
  return (
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#07080e 0%,#0d1020 60%,#07080e 100%)",padding:"48px 20px 36px",textAlign:"center",borderBottom:"1px solid #1c2035",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-100,left:"50%",transform:"translateX(-50%)",width:600,height:300,background:"radial-gradient(ellipse,rgba(96,165,250,.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{fontSize:"28px",marginBottom:12}}>🇧🇩 → 🌍</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,5vw,44px)",fontWeight:800,color:"#fff",marginBottom:8,lineHeight:1.2}}>
          Study Abroad <span style={{color:"#60a5fa"}}>Master Guide</span>
        </h1>
        <p style={{color:"#5a6380",fontSize:15,maxWidth:540,margin:"0 auto 14px",lineHeight:1.6}}>12 countries. Every scholarship. Complete visa process. All researched for Bangladeshi CSE graduates with a max 15 lakh BDT budget.</p>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(52,211,153,.08)",border:"1px solid rgba(52,211,153,.2)",borderRadius:10,padding:"10px 18px",fontSize:13,color:"#34d399"}}>
          ✅ <strong>7 countries are within 15 lakh BDT</strong> — China, Turkey, Hungary, South Korea, Japan offer fully-funded scholarships with only 1–3 lakh pre-departure cost
        </div>
      </div>

      {/* Budget Filter */}
      <div style={{display:"flex",gap:10,padding:"14px 18px",background:"#09090f",borderBottom:"1px solid #1c2035",flexWrap:"wrap"}}>
        <span style={{fontSize:13,color:"#5a6380",alignSelf:"center"}}>Filter:</span>
        {[["all","All 12 Countries","#7e8aaa"],["g","✅ Best Budget","#34d399"],["y","🟡 Doable","#fbbf24"],["r","🔴 Needs Scholarship","#f87171"]].map(([v,l,c])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${filter===v?c:"#1c2035"}`,background:filter===v?c+"22":"transparent",color:filter===v?c:"#5a6380",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'Outfit',sans-serif",transition:"all .2s"}}>
            {l}
          </button>
        ))}
      </div>

      {/* Quick Compare Banner */}
      <div style={{padding:"14px 18px",background:"#09090f",borderBottom:"1px solid #1c2035"}}>
        <div style={{maxWidth:820,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {[
            {flag:"🇨🇳",name:"China",tag:"CSC: ¥3,000/mo",color:"#dc2626"},
            {flag:"🇹🇷",name:"Turkey",tag:"Full+Flights+Language",color:"#dc2626"},
            {flag:"🇭🇺",name:"Hungary",tag:"Stipendium: Free EU",color:"#16a34a"},
            {flag:"🇰🇷",name:"Korea",tag:"GKS: ₩1M/mo",color:"#0ea5e9"},
            {flag:"🇯🇵",name:"Japan",tag:"MEXT: ¥143K/mo",color:"#bc002d"},
            {flag:"🇲🇾",name:"Malaysia",tag:"No IELTS needed",color:"#16a34a"},
          ].map(c=>(
            <div key={c.flag} onClick={()=>setCountry(COUNTRIES.find(x=>x.flag===c.flag))} style={{background:"#0d0f19",border:"1px solid #1c2035",borderRadius:8,padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,transition:"border-color .2s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=c.color}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1c2035"}>
              <span style={{fontSize:20}}>{c.flag}</span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:"#dde1ee"}}>{c.name}</div>
                <div style={{fontSize:11,color:c.color}}>{c.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country Grid */}
      <div style={{padding:"20px 18px",maxWidth:820,margin:"0 auto"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff",marginBottom:4}}>
          {filter==="all"?"All Destinations":`${filtered.length} Countries Found`}
        </div>
        <p style={{fontSize:13,color:"#5a6380",marginBottom:18}}>Click any country for full details — scholarships, universities, visa process, and cost breakdown</p>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
          {filtered.map(c=>(
            <div key={c.id} onClick={()=>setCountry(c)}
              style={{background:"#0d0f19",border:"1px solid #1c2035",borderRadius:12,padding:"18px",cursor:"pointer",transition:"all .2s",position:"relative",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.accent;e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#1c2035";e.currentTarget.style.transform="none";}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:c.accent+"66",borderRadius:"12px 12px 0 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontSize:28}}>{c.flag}</span>
                  <div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#fff"}}>{c.name}</div>
                    <div style={{fontSize:11,color:"#5a6380",marginTop:1}}>{c.budgetLabel}</div>
                  </div>
                </div>
                <span className={`pill ${BUDGET_CFG[c.budgetType].cls}`} style={{fontSize:10}}>
                  {c.budgetType==="g"?"✅ Budget":c.budgetType==="y"?"🟡 Doable":"🔴 Scholarship"}
                </span>
              </div>
              <p style={{fontSize:13,color:"#7e8aaa",marginBottom:12,lineHeight:1.5}}>{c.tagline}</p>
              <p style={{fontSize:12,color:"#5a6380",borderTop:"1px solid #131625",paddingTop:10}}>{c.budgetNote}</p>
              <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
                <span style={{fontSize:12,color:c.accent,fontWeight:600}}>Explore →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary comparison */}
        <div style={{marginTop:32,background:"#0d0f19",border:"1px solid #1c2035",borderRadius:12,overflow:"hidden"}}>
          <div style={{padding:"14px 18px",background:"#131625",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#fff"}}>
            📊 Quick Budget Comparison (Annual Total)
          </div>
          {[
            {flag:"🇨🇳",name:"China",annual:"€0/year (CSC scholarship)",total:"1–2 lakh BDT pre-departure",tc:"g"},
            {flag:"🇹🇷",name:"Turkey",annual:"€0/year (Türkiye Burslari)",total:"1–2 lakh BDT pre-departure",tc:"g"},
            {flag:"🇭🇺",name:"Hungary",annual:"€0 tuition + €105/mo stipend",total:"1–3 lakh BDT pre-departure",tc:"g"},
            {flag:"🇯🇵",name:"Japan",annual:"€0 + ¥143K/mo (€900!) stipend",total:"1–3 lakh BDT pre-departure",tc:"g"},
            {flag:"🇰🇷",name:"South Korea",annual:"€0 + ₩1M/mo (€710) stipend",total:"1–3 lakh BDT pre-departure",tc:"g"},
            {flag:"🇲🇾",name:"Malaysia",annual:"€6,000–9,000/year",total:"7–10 lakh/year",tc:"g"},
            {flag:"🇵🇱",name:"Poland",annual:"€9,000–15,000/year",total:"8–12 lakh/year",tc:"g"},
            {flag:"🇫🇷",name:"France",annual:"€8,700–12,000/year (€243 tuition!)",total:"11–14 lakh/year",tc:"y"},
            {flag:"🇩🇪",name:"Germany",annual:"€7,500–13,000/year (free tuition!)",total:"11–16 lakh/year",tc:"y"},
            {flag:"🇮🇹",name:"Italy",annual:"€6,300–12,500/year (income-based)",total:"10–15 lakh/year",tc:"y"},
            {flag:"🇳🇴",name:"Norway",annual:"€10,800–20,800/year (free tuition!)",total:"15–18 lakh/year",tc:"y"},
            {flag:"🇬🇧",name:"UK",annual:"£25,600–36,400/year",total:"25–35 lakh without scholarship",tc:"r"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",borderBottom:i<11?"1px solid #131625":"none",fontSize:13}}>
              <span>{r.flag}</span>
              <span style={{color:"#dde1ee",minWidth:90,fontWeight:600}}>{r.name}</span>
              <span style={{color:"#7e8aaa",flex:1}}>{r.annual}</span>
              <span className={`pill pill-${r.tc}`} style={{fontSize:10}}>{r.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function App() {
  const [country,setCountry] = useState(null);
  return (
    <>
      <style>{G}</style>
      {country
        ? <CountryPage c={country} onBack={()=>setCountry(null)}/>
        : <Home setCountry={setCountry}/>}
    </>
  );
}
