const localized = (en, th) => ({ en, th });

const linkedProject = (slug, business, flow, responsibility) => ({
  slug,
  business,
  flow,
  responsibility
});

const resumeProject = (id, title, year, business, flow, responsibility) => ({
  id,
  title,
  year,
  business,
  flow,
  responsibility
});

export const careerProfile = {
  name: "Dhittawat Thongkhum",
  targetRole: localized("Senior Product Designer", "Senior Product Designer"),
  specialization: localized("Complex Operational Systems", "Complex Operational Systems"),
  valueProposition: localized(
    "I design workflow-driven products that turn scattered information, unclear ownership, and legacy constraints into decisions teams can move forward with.",
    "ผมออกแบบผลิตภัณฑ์ที่ขับเคลื่อนด้วย workflow เพื่อเปลี่ยนข้อมูลที่กระจัดกระจาย เจ้าของงานที่ไม่ชัด และข้อจำกัดของระบบเดิม ให้เป็นจุดตัดสินใจที่ทีมทำงานต่อได้"
  ),
  availability: localized("Bangkok · On-site / Hybrid", "กรุงเทพฯ · On-site / Hybrid"),
  email: "dhittawat@gmail.com",
  linkedIn: "https://www.linkedin.com/in/dhittaawat-thongkhum-44bb94a7",
  portrait: {
    src: "src/assets/images/about/portrait-temp.jpg",
    width: 124,
    height: 156,
    alt: localized("Temporary portrait of Dhittawat Thongkhum", "ภาพบุคคลชั่วคราวของ Dhittawat Thongkhum")
  },
  languages: [
    { label: localized("Thai", "ภาษาไทย"), level: localized("Native", "ภาษาแม่") },
    { label: localized("English", "ภาษาอังกฤษ"), level: localized("Working proficiency", "ใช้ในการทำงาน") }
  ],
  education: {
    degree: localized("Bachelor of Art and Design", "ศิลปบัณฑิตด้านศิลปะและการออกแบบ"),
    field: localized("Visual Communication Design", "การออกแบบนิเทศศิลป์"),
    school: localized("Rangsit University, Thailand", "มหาวิทยาลัยรังสิต ประเทศไทย"),
    year: "2014",
    gpa: "2.91"
  },
  capabilities: [
    localized("System analysis", "การวิเคราะห์ระบบ"),
    localized("UX strategy", "กลยุทธ์ UX"),
    localized("Workflow design", "การออกแบบ workflow"),
    localized("Information architecture", "สถาปัตยกรรมข้อมูล"),
    localized("Product UX/UI", "Product UX/UI"),
    localized("Cross-functional delivery", "การส่งมอบร่วมกับทีมข้ามสายงาน")
  ],
  tools: ["Figma", "Framer", "Adobe", "Notion", "Jira", "Claude"],
  methods: [localized("AI-assisted prototyping", "การทำต้นแบบโดยใช้ AI ช่วย")]
};

export const careerTimeline = [
  {
    id: "capability-expansion",
    kind: "expansion",
    period: localized("2026—Now", "2026—ปัจจุบัน"),
    employer: "Code(Hard)",
    role: localized("UX × SA Intern", "UX × SA Intern"),
    scope: localized(
      "Expanding a Senior Product Designer practice through system analysis, data rules, technical constraints, and AI-assisted documentation.",
      "ต่อยอดบทบาท Senior Product Designer ผ่านการวิเคราะห์ระบบ กติกาข้อมูล ข้อจำกัดทางเทคนิค และเอกสารที่ใช้ AI ช่วย"
    ),
    projects: [
      linkedProject(
        "smart-asset-sa-ai",
        localized("Asset management / rental operations", "การจัดการทรัพย์สิน / งานเช่า"),
        localized("Proposal → approval → reservation → delivery → return → billing", "ข้อเสนอ → อนุมัติ → จอง → ส่งมอบ → คืน → วางบิล"),
        localized("System mapping, lifecycle and data rules, dashboard UX, and return operations.", "วางแผนผังระบบ กติกา lifecycle และข้อมูล Dashboard UX และกระบวนการคืน")
      )
    ]
  },
  {
    id: "depthfirst",
    kind: "career",
    period: localized("2024—2026", "2024—2026"),
    employer: "Depthfirst Co., Ltd.",
    role: localized("Senior UX / Product Designer", "Senior UX / Product Designer"),
    scope: localized(
      "Designed policy-driven services where claims, contributions, benefits, documents, permissions, and backend constraints had to become deployable UX.",
      "ออกแบบบริการที่ขับเคลื่อนด้วยนโยบาย ซึ่งต้องแปลงงานเคลม เงินสมทบ สิทธิประโยชน์ เอกสาร สิทธิ์ และข้อจำกัดหลังบ้านให้เป็น UX ที่พัฒนาได้จริง"
    ),
    projects: [
      linkedProject(
        "wcf-digital",
        localized("Government compensation claims", "งานเรียกร้องเงินทดแทนภาครัฐ"),
        localized("Claim intake → validation → referral and hospital billing → multi-tier approval", "รับคำร้อง → ตรวจสอบ → ส่งต่อและค่ารักษาพยาบาล → อนุมัติหลายระดับ"),
        localized("End-to-end UX/UI, master data, handoff logic, and design-system governance.", "ออกแบบ UX/UI แบบ end-to-end, master data, กติกาการส่งต่องาน และมาตรฐาน design system")
      ),
      resumeProject(
        "sso-core",
        localized("SSO Core", "SSO Core"),
        "2024—2026",
        localized("Social-security core services", "บริการหลักด้านประกันสังคม"),
        localized("Contribution records → eligibility → benefit processing", "ข้อมูลเงินสมทบ → ตรวจสิทธิ์ → ประมวลผลสิทธิประโยชน์"),
        localized("Journey continuity and shared interface standards across a core-service transformation.", "ดูแลความต่อเนื่องของ journey และมาตรฐานอินเทอร์เฟซร่วมระหว่างการปรับระบบบริการหลัก")
      )
    ]
  },
  {
    id: "codehard-consulting",
    kind: "career",
    period: localized("2023—2024", "2023—2024"),
    employer: "Code(Hard)",
    role: localized("UX Systems Consultant", "UX Systems Consultant"),
    scope: localized(
      "Connected UX strategy with delivery reality through requirements, task maps, client review, proof of concept, testing, and production handoff.",
      "เชื่อม UX strategy กับข้อเท็จจริงในการส่งมอบ ผ่าน requirement, task map, client review, proof of concept, testing และ production handoff"
    ),
    projects: [
      resumeProject(
        "mobile-pos",
        localized("Mobile POS", "Mobile POS"),
        "2023—2024",
        localized("FMCG retail network", "เครือข่ายร้านค้าปลีกสินค้าอุปโภคบริโภค"),
        localized("Scan product → identify missing item → capture image and details → checkout", "สแกนสินค้า → พบสินค้าที่ไม่มีในระบบ → ถ่ายภาพและกรอกรายละเอียด → ชำระเงิน"),
        localized("Mapped the missing-product journey and designed the product-entry and checkout decisions for store owners.", "ทำแผนที่ journey เมื่อไม่พบสินค้า และออกแบบการตัดสินใจในขั้นเพิ่มสินค้ากับ checkout สำหรับเจ้าของร้าน")
      ),
      resumeProject(
        "cargo-quotation",
        localized("Cargo Project", "Cargo Project"),
        "2023—2024",
        localized("Freight logistics", "โลจิสติกส์ขนส่งสินค้า"),
        localized("Quotation request → rate comparison → approval → quote confirmation", "ขอใบเสนอราคา → เปรียบเทียบราคา → อนุมัติ → ยืนยันราคา"),
        localized("Requirement framing, quotation workflow design, review, and implementation handoff.", "วางกรอบ requirement ออกแบบ quotation workflow ตรวจทาน และส่งต่อให้ทีมพัฒนา")
      ),
      resumeProject(
        "company-website",
        localized("Company Website", "Company Website"),
        "2023—2024",
        localized("Digital consulting services", "บริการที่ปรึกษาดิจิทัล"),
        localized("Service discovery → proof and trust → contact lead", "ค้นพบบริการ → หลักฐานและความน่าเชื่อถือ → ติดต่อ"),
        localized("Information architecture, UX/UI, responsive states, and development handoff.", "ออกแบบสถาปัตยกรรมข้อมูล UX/UI responsive states และส่งต่อให้ทีมพัฒนา")
      )
    ]
  },
  {
    id: "q-chang",
    kind: "career",
    period: localized("2021—2023", "2021—2023"),
    employer: "Q-CHANG",
    role: localized("Senior UX/UI · CX Strategy", "Senior UX/UI · CX Strategy"),
    scope: localized(
      "Worked across customer, technician, service-provider, and operations journeys in a home-service marketplace.",
      "ทำงานครอบคลุม journey ของลูกค้า ช่าง ผู้ให้บริการ และทีมปฏิบัติการใน marketplace บริการบ้าน"
    ),
    projects: [
      linkedProject(
        "redesign-landing-v1-5",
        localized("Home-service marketplace", "Marketplace บริการบ้าน"),
        localized("Paid traffic → service discovery → trust → booking entry", "Paid traffic → ค้นหาบริการ → สร้างความเชื่อมั่น → เริ่มจอง"),
        localized("Homepage information architecture, service grouping, trust UI, and booking entry points.", "ออกแบบสถาปัตยกรรมหน้าแรก การจัดกลุ่มบริการ Trust UI และจุดเริ่มจอง")
      ),
      linkedProject(
        "rescheduling-pain",
        localized("Service operations / booking", "งานปฏิบัติการบริการ / การจอง"),
        localized("Change request → availability check → cross-team handoff → revised appointment", "คำขอเปลี่ยนนัด → ตรวจเวลาว่าง → ส่งต่อข้ามทีม → นัดหมายใหม่"),
        localized("Service blueprint, scheduling logic, handoff design, and cross-team visibility.", "ออกแบบ service blueprint, scheduling logic, การส่งต่องาน และการมองเห็นข้อมูลร่วมกัน")
      ),
      linkedProject(
        "buddy-app-2-0",
        localized("Field-service mobile application", "แอปมือถือสำหรับงานบริการภาคสนาม"),
        localized("Find job → review context → accept → coordinate with team", "ค้นหางาน → ตรวจบริบท → รับงาน → ประสานทีม"),
        localized("Field research, job-selection and acceptance flows, mobile task UX, and team coordination.", "ทำ field research ออกแบบ flow เลือกและรับงาน Mobile task UX และการประสานทีม")
      )
    ]
  },
  {
    id: "wedev",
    kind: "career",
    period: localized("2020—2021", "2020—2021"),
    employer: "Wedev",
    role: localized("Senior UX/UI Designer", "Senior UX/UI Designer"),
    scope: localized(
      "Expanded into product-team collaboration, Agile delivery, junior mentoring, and operational dashboards.",
      "ขยายบทบาทสู่การทำงานร่วมกับทีมผลิตภัณฑ์ การส่งมอบแบบ Agile การดูแลนักออกแบบรุ่นน้อง และ operational dashboard"
    ),
    projects: []
  },
  {
    id: "benchachinda",
    kind: "career",
    period: localized("2019—2020", "2019—2020"),
    employer: "Benchachinda Group",
    role: localized("Senior UX/UI Designer", "Senior UX/UI Designer"),
    scope: localized(
      "Designed for field teams handling real telecom network assets across Thailand, Myanmar, and Laos.",
      "ออกแบบสำหรับทีมภาคสนามที่ดูแลทรัพย์สินโครงข่ายโทรคมนาคมจริงในไทย เมียนมา และลาว"
    ),
    projects: [
      linkedProject(
        "maxi-task",
        localized("Telecom infrastructure / GIS", "โครงสร้างพื้นฐานโทรคมนาคม / GIS"),
        localized("Network asset → map context → field task → status and traceability", "ทรัพย์สินโครงข่าย → บริบทบนแผนที่ → งานภาคสนาม → สถานะและการติดตาม"),
        localized("GIS asset views, field-technician dashboards, information architecture, and operational interfaces.", "ออกแบบมุมมองทรัพย์สิน GIS แดชบอร์ดช่างภาคสนาม สถาปัตยกรรมข้อมูล และอินเทอร์เฟซปฏิบัติการ")
      )
    ]
  },
  {
    id: "clicknext",
    kind: "career",
    period: localized("2018—2019", "2018—2019"),
    employer: "ClickNext",
    role: localized("UX/UI Designer", "UX/UI Designer"),
    scope: localized(
      "Translated complex requirements and legacy processes into structured workflows for finance, trading, compliance, and registration products.",
      "แปลง requirement ที่ซับซ้อนและกระบวนการเดิมให้เป็น workflow ที่มีโครงสร้าง สำหรับผลิตภัณฑ์การเงิน การซื้อขาย compliance และการลงทะเบียน"
    ),
    projects: [
      linkedProject(
        "my-exim",
        localized("Corporate digital banking", "ธนาคารดิจิทัลสำหรับธุรกิจ"),
        localized("Portfolio overview → transaction → approval → financial visibility", "ภาพรวมพอร์ต → ธุรกรรม → อนุมัติ → การมองเห็นข้อมูลการเงิน"),
        localized("Information architecture, transaction states, approval flow, and mobile UX/UI.", "ออกแบบสถาปัตยกรรมข้อมูล สถานะธุรกรรม Approval flow และ Mobile UX/UI")
      ),
      linkedProject(
        "intergold",
        localized("Gold trading / realtime market data", "การซื้อขายทอง / ข้อมูลตลาด realtime"),
        localized("Monitor price and chart → set alert → review context → trading action", "ติดตามราคาและกราฟ → ตั้งแจ้งเตือน → ตรวจบริบท → ทำรายการซื้อขาย"),
        localized("Realtime price hierarchy, chart and alert flows, trading actions, and mobile product design.", "ออกแบบลำดับข้อมูลราคา realtime, flow กราฟและแจ้งเตือน การทำรายการ และ mobile product design")
      ),
      linkedProject(
        "oil-reserve-reporting-system",
        localized("Energy compliance reporting", "การรายงานตามข้อกำกับด้านพลังงาน"),
        localized("Daily reserve submission → site approval → monitoring → audit trail", "ส่งข้อมูลสำรองรายวัน → อนุมัติสถานที่ → ติดตาม → audit trail"),
        localized("Reporting workflow, approval states, national-dashboard structure, and audit visibility.", "ออกแบบ reporting workflow สถานะอนุมัติ โครงสร้าง dashboard และการมองเห็น audit")
      ),
      linkedProject(
        "asean-summit-2019",
        localized("Diplomatic event registration", "การลงทะเบียนงานทางการทูต"),
        localized("Delegate onboarding → validation → host review → status tracking", "Onboarding ผู้แทน → ตรวจสอบข้อมูล → เจ้าภาพ review → ติดตามสถานะ"),
        localized("Registration UX/UI, validation rules, review flow, status communication, and data safeguards.", "ออกแบบ Registration UX/UI กติกาตรวจสอบ Review flow การสื่อสารสถานะ และการป้องกันข้อมูล")
      )
    ]
  },
  {
    id: "digitech",
    kind: "career",
    period: localized("2015—2018", "2015—2018"),
    employer: "Digitech 4.0 / iBusiness Corp.",
    role: localized("Web Designer", "Web Designer"),
    scope: localized(
      "Built client web applications from requirements through user flows, interface visuals, feedback loops, and implementation-ready handoff.",
      "สร้าง web application ตั้งแต่ requirement, user flow, interface visual, feedback loop ไปจนถึง handoff ที่พร้อมสำหรับการพัฒนา"
    ),
    projects: []
  }
];

export const personalProjects = [
  resumeProject(
    "thaiwater-war-room",
    localized("ThaiWater / War Room", "ThaiWater / War Room"),
    "2020—2021",
    localized("Water and disaster monitoring", "การติดตามสถานการณ์น้ำและภัยพิบัติ"),
    localized("Realtime data → monitoring dashboard → incident awareness → field coordination", "ข้อมูล realtime → monitoring dashboard → รับรู้เหตุการณ์ → ประสานงานภาคสนาม"),
    localized("Journey mapping, dashboard UX/UI, operational states, and product-team collaboration.", "ทำ journey mapping ออกแบบ Dashboard UX/UI สถานะปฏิบัติการ และทำงานร่วมกับทีมผลิตภัณฑ์")
  ),
  linkedProject(
    "lccs-personal-research",
    localized("Crisis coordination / public response", "การประสานงานวิกฤต / การตอบสนองสาธารณะ"),
    localized("Identity and roles → event registry → resources → mission status", "ตัวตนและบทบาท → ทะเบียนเหตุการณ์ → ทรัพยากร → สถานะภารกิจ"),
    localized("Research framing, actor mapping, and mission-management information architecture.", "วางกรอบงานวิจัย ทำแผนที่ผู้เกี่ยวข้อง และออกแบบสถาปัตยกรรมข้อมูลสำหรับจัดการภารกิจ")
  )
];

export function localizedValue(value, locale) {
  return typeof value === "string" ? value : value[locale];
}
