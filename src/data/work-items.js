import { workSlugs } from "./routes.js";

const image = (src, width, height, enAlt, thAlt, layout = "full") => ({
  src,
  width,
  height,
  alt: { en: enAlt, th: thAlt },
  layout
});

const flowEvidence = (src, width, height, enTitle, thTitle, enDescription, thDescription) => ({
  src,
  width,
  height,
  title: { en: enTitle, th: thTitle },
  description: { en: enDescription, th: thDescription },
  alt: {
    en: `${enTitle} activity diagram`,
    th: `แผนภาพกิจกรรม ${thTitle}`
  }
});

const cover = (slug, width, height, enAlt, thAlt) =>
  image(`src/assets/images/work/${slug}/cover.png`, width, height, enAlt, thAlt, "poster");

const workItemData = [
  {
    slug: "smart-asset-sa-ai",
    order: 1,
    featuredOrder: 1,
    year: "2026",
    contentLevel: "long",
    factsLayout: "compact",
    narrativeLayout: "combined",
    cover: cover(
      "smart-asset-sa-ai",
      1024,
      1536,
      "Smart Asset SA & AI case study cover",
      "ภาพหน้าปกกรณีศึกษา Smart Asset SA & AI"
    ),
    coverFlow: {
      heading: {
        en: "From master data to a site-ready asset",
        th: "จาก Master Data สู่ทรัพย์สินที่พร้อมใช้งานในไซต์"
      },
      headingLines: {
        en: ["From master data", "to a site-ready asset"],
        th: ["จาก Master Data", "สู่ทรัพย์สินที่", "พร้อมใช้งานในไซต์"]
      },
      mobileHeadingLines: {
        en: ["From master data", "to a site-ready asset"],
        th: ["จาก Master Data", "สู่ทรัพย์สินที่", "พร้อมใช้งาน", "ในไซต์"]
      },
      description: {
        en: "Category rules shape reusable SKU metadata. Each physical asset then receives its own identity, QR code, status, and site context.",
        th: "กติกาของ Category กำหนด metadata ที่ใช้ซ้ำใน SKU ก่อนที่ทรัพย์สินจริงแต่ละชิ้นจะได้รับ identity, QR, สถานะ และบริบทของไซต์"
      },
      lanes: {
        master: { en: "Master data", th: "ข้อมูลตั้งต้น" },
        operations: { en: "Site operations", th: "การทำงานที่ไซต์" }
      },
      nodes: [
        {
          id: "category",
          stage: 1,
          mobilePriority: true,
          title: { en: "Define category", th: "กำหนด Category" },
          description: { en: "Set the shared product structure.", th: "กำหนดโครงสร้างร่วมของสินค้า" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/category.webp",
            width: 1455,
            height: 1267,
            alt: { en: "Product Category list defining Smart Asset product groups", th: "รายการ Product Category สำหรับกำหนดกลุ่มสินค้าใน Smart Asset" }
          }
        },
        {
          id: "category-rules",
          stage: 2,
          mobilePriority: false,
          title: { en: "Configure field rules", th: "จัดโครงข้อมูลเฉพาะ" },
          description: { en: "Choose metadata required by the category.", th: "เลือก metadata ที่แต่ละ Category ต้องใช้" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/category-rules.webp",
            width: 1327,
            height: 886,
            alt: { en: "Product group form configuring category-specific fields", th: "ฟอร์ม Product Group สำหรับกำหนดข้อมูลเฉพาะของ Category" }
          }
        },
        {
          id: "sku",
          stage: 3,
          mobilePriority: true,
          title: { en: "Create reusable SKU", th: "สร้าง SKU ที่ใช้ซ้ำ" },
          description: { en: "Turn category rules into a reusable definition.", th: "เปลี่ยนกติกา Category เป็นแม่แบบที่นำกลับมาใช้ได้" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/sku.webp",
            width: 1440,
            height: 735,
            alt: { en: "Smart Asset create SKU interface", th: "หน้าจอสร้าง SKU ใน Smart Asset" }
          }
        },
        {
          id: "sku-detail",
          stage: 3,
          mobilePriority: false,
          title: { en: "Carry metadata forward", th: "ส่งต่อ metadata" },
          description: { en: "Reuse the definition across registered units.", th: "ใช้โครงเดียวกันกับทรัพย์สินที่ลงทะเบียนแต่ละชิ้น" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/sku-detail.webp",
            width: 1440,
            height: 990,
            alt: { en: "SKU detail and registered inventory list", th: "รายละเอียด SKU และรายการทรัพย์สินที่ลงทะเบียน" }
          }
        },
        {
          id: "asset",
          stage: 4,
          mobilePriority: true,
          title: { en: "Register asset + QR", th: "ลงทะเบียน Asset + QR" },
          description: { en: "Give each physical unit an identity.", th: "สร้าง identity ให้ทรัพย์สินจริงแต่ละชิ้น" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/asset.webp",
            width: 1440,
            height: 1015,
            alt: { en: "Physical asset registration interface with QR identity", th: "หน้าจอลงทะเบียนทรัพย์สินจริงพร้อม QR identity" }
          }
        },
        {
          id: "site",
          stage: 5,
          mobilePriority: true,
          title: { en: "Place in site context", th: "ผูกเข้ากับ Site" },
          description: { en: "Connect the asset to its operational owner and location.", th: "เชื่อมทรัพย์สินกับผู้รับผิดชอบและตำแหน่งใช้งาน" },
          mobileTitle: { en: "Site + operational status", th: "Site + สถานะใช้งาน" },
          mobileDescription: { en: "Keep ownership, location, status, and next action visible.", th: "แสดงเจ้าของ ตำแหน่ง สถานะ และสิ่งที่ต้องทำต่อในมุมมองเดียว" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/site.webp",
            width: 1340,
            height: 843,
            alt: { en: "Site detail showing assigned Smart Asset records", th: "รายละเอียด Site พร้อมทรัพย์สินที่ได้รับมอบหมาย" }
          }
        },
        {
          id: "status",
          stage: 6,
          mobilePriority: false,
          title: { en: "Track operational status", th: "ติดตามสถานะใช้งาน" },
          description: { en: "Keep the next action visible through the asset lifecycle.", th: "ทำให้สถานะและสิ่งที่ต้องทำต่อมองเห็นได้ตลอด lifecycle" },
          media: {
            src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/status.webp",
            width: 1360,
            height: 671,
            alt: { en: "Site asset list showing tracked items and assigned owners", th: "รายการทรัพย์สินในไซต์พร้อมรายการติดตามและผู้รับผิดชอบ" }
          }
        }
      ],
      edges: [
        { from: "category", to: "category-rules", label: { en: "defines fields", th: "กำหนดฟิลด์" } },
        { from: "category-rules", to: "sku", label: { en: "maps metadata", th: "วาง metadata" } },
        { from: "sku", to: "sku-detail", label: { en: "reuses structure", th: "ใช้โครงร่วม" } },
        { from: "sku-detail", to: "asset", label: { en: "registers identity", th: "สร้าง identity" } },
        { from: "asset", to: "site", label: { en: "assigns to site", th: "ผูกเข้ากับไซต์" } },
        { from: "site", to: "status", label: { en: "tracks state", th: "ติดตามสถานะ" } }
      ]
    },
    gallery: [
      image("src/assets/images/work/smart-asset-sa-ai/master-asset-metadata.png", 1024, 1536, "Metadata-driven Master Asset screens", "หน้าจอ Master Asset ที่ขับเคลื่อนด้วย metadata", "portrait"),
      image("src/assets/images/work/smart-asset-sa-ai/employee-management.png", 1024, 1536, "Smart Asset employee management screens", "หน้าจอจัดการพนักงานใน Smart Asset", "portrait"),
      image("src/assets/images/work/smart-asset-sa-ai/asset-lifecycle.png", 1424, 1000, "Asset lifecycle decision diagram", "แผนภาพการตัดสินใจตามวงจรทรัพย์สิน")
    ],
    facts: {
      client: { en: "PROGRESS ENGINEER CONSTRUCTION", th: "PROGRESS ENGINEER CONSTRUCTION" },
      product: { en: "Smart Asset Management", th: "Smart Asset Management" },
      domain: { en: ["Asset Management", "Warehouse Workflow"], th: ["Asset Management", "Warehouse Workflow"] },
      platform: { en: ["Asset Management Platform", "Operational Workflow"], th: ["แพลตฟอร์มจัดการทรัพย์สิน", "ระบบโฟลว์ปฏิบัติการ"] },
      role: { en: ["UX × SA Intern"], th: ["UX × SA Intern"] },
      workArea: {
        en: ["System Mapping", "Rental Workflow", "Return Operations", "Data Rules", "Dashboard UX"],
        th: ["การทำแผนที่ระบบ", "โฟลว์เช่า", "กระบวนการคืน", "กติกาข้อมูล", "Dashboard UX"]
      }
    },
    // RECHECK: Keep the overview in this trial so the six-card sequence can be judged in context.
    // Remove it in a review pass if it repeats the five stage diagrams without improving orientation.
    flowEvidence: [
      flowEvidence(
        "src/assets/images/work/smart-asset-sa-ai/flow-order-to-invoice.png",
        8400,
        1280,
        "Order-to-Invoice overview",
        "ภาพรวม Order-to-Invoice",
        "The wider status flow from request and quotation through delivery, return, and billing.",
        "ภาพรวมสถานะตั้งแต่คำขอและใบเสนอราคา ไปจนถึงการส่งมอบ การคืน และการวางบิล"
      ),
      flowEvidence(
        "src/assets/images/work/smart-asset-sa-ai/flow-01-request-to-order.png",
        1784,
        1736,
        "Request to Order",
        "จากคำขอสู่ออเดอร์",
        "Turns a rental need into a versioned quotation, customer decision, and confirmed order.",
        "เปลี่ยนความต้องการเช่าเป็นใบเสนอราคาที่มีเวอร์ชัน การตัดสินใจของลูกค้า และออเดอร์ที่ยืนยันแล้ว"
      ),
      flowEvidence(
        "src/assets/images/work/smart-asset-sa-ai/flow-02-reservation-to-delivery.png",
        1784,
        1763,
        "Reservation to Delivery",
        "จากการจองสู่การส่งมอบ",
        "Separates reservation, preparation, delivery rounds, and the movement of real assets or lots.",
        "แยกการจอง การเตรียมของ รอบส่ง และการเคลื่อนย้ายทรัพย์สินหรือ lot จริงออกจากกัน"
      ),
      flowEvidence(
        "src/assets/images/work/smart-asset-sa-ai/flow-03-site-receiving.png",
        1784,
        1673,
        "Site Receiving",
        "การรับของที่ไซต์",
        "Uses delivery and permanent asset QR codes to record actual receiving and exceptions at the source.",
        "ใช้ QR ของการส่งและ QR ถาวรของทรัพย์สินเพื่อบันทึกผลรับจริงและกรณียกเว้นที่ต้นทาง"
      ),
      flowEvidence(
        "src/assets/images/work/smart-asset-sa-ai/flow-04-use-and-extension.png",
        1784,
        1513,
        "Use and Extension",
        "การใช้งานและต่อระยะเวลา",
        "Keeps asset status separate from due-date reminders and manual rental extensions.",
        "แยกสถานะทรัพย์สินออกจากการเตือนกำหนดคืนและการต่อระยะเวลาเช่าแบบ manual"
      ),
      flowEvidence(
        "src/assets/images/work/smart-asset-sa-ai/flow-05-return-intake-and-close.png",
        1784,
        1718,
        "Return Intake and Close",
        "การรับคืนและปิดงาน",
        "Handles partial returns, evidence, inspection decisions, holds, and administrative closure.",
        "รองรับการคืนบางส่วน หลักฐาน การตรวจสภาพ การพักทรัพย์สิน และการปิดงานเชิงบริหาร"
      )
    ],
    en: {
      title: "Smart Asset SA & AI",
      cardTitle: "Product Design · System Analysis",
      eyebrow: "Asset management / System analysis",
      listStatement: "Smart Asset is a lightweight ERP system designed and developed collaboratively by me, a software engineer, and AI.",
      summary: "As a UX × SA Intern, I drafted initial specifications and contributed to the project’s UX/UI design alongside a Software Engineer, using AI to support the work.",
      challenge: "How could one asset platform support different kinds of assets and the people managing them?",
      approach: "My contribution focused on initial specifications and design, using the operational flow to frame what each screen needed to support.",
      outcome: "The system is live. From my observations, it works well overall, while day-to-day use has exposed friction around SKU navigation and incomplete migrated data.",
      detail: [],
      sections: [
        { eyebrow: "01 · The problem", title: "Master Asset was never one thing.", copy: "A vehicle, a drill, a bag of cement, and an expiring permit may share a menu, but each carries a different identity, quantity model, history, and lifecycle.", media: [0] },
        { eyebrow: "02 · Initial specifications", title: "Making the starting requirements visible.", copy: "I drafted the initial specifications alongside the UX/UI design. My scope was to establish the starting requirements with the Software Engineer, rather than provide an in-depth technical specification for every part of the system." },
        { eyebrow: "03 · Operational context", title: "Every screen sat inside a longer flow.", copy: "Request, quotation, confirmation, reservation, delivery, use, return, and billing each owned different states. Mapping the flow gave interface decisions a reliable operational context.", media: [1] },
        { eyebrow: "04 · The model", title: "Different assets needed different truths.", copy: "Durable units need serialization and movement history; consumables need lot and quantity logic; renewal documents need dated records that preserve earlier evidence.", media: [2] },
        { eyebrow: "05 · After launch", title: "The data structure needed a clearer way in.", copy: "Users did not understand why a SKU had to come before a physical asset. Two migration rounds had not yet brought across all the data, concentrating the friction around adding large amounts of asset data. This showed that the structure alone did not explain the workflow to users." },
        { eyebrow: "06 · Planned improvements", title: "Direct access to assets, with SKU relationships intact.", copy: "My next steps are to complete and correct the imported data and add a direct entry point for viewing assets, without navigating through SKU first. This keeps the existing SKU structure and relationships. It is a planned improvement to browsing; it does not remove the SKU requirement for asset creation, and its effect has not yet been evaluated." }
      ],
      seoTitle: "Smart Asset SA & AI — Dhittawat Thongkhum",
      seoDescription: "A long-form case study connecting asset workflows, system analysis, data rules, and UX/UI."
    },
    th: {
      title: "Smart Asset SA & AI",
      cardTitle: "Product Design · System Analysis",
      eyebrow: "การจัดการทรัพย์สิน / การวิเคราะห์ระบบ",
      listStatement: "Smart Asset คือระบบ ERP ขนาดเบาที่ผมร่วมออกแบบและพัฒนากับ Software Engineer และ AI",
      summary: "ในบทบาท UX × SA Intern ผมทำสเปกเบื้องต้นและร่วมออกแบบ UX/UI ของโครงการกับ Software Engineer โดยใช้ AI ช่วยในการทำงาน",
      challenge: "จะออกแบบแพลตฟอร์มเดียวให้รองรับทั้งทรัพย์สินต่างชนิดและคนที่ต้องจัดการทรัพย์สินเหล่านั้นได้อย่างไร",
      approach: "ผมรับผิดชอบงานสเปกตั้งต้นและการออกแบบ โดยใช้ flow การทำงานเป็นกรอบว่าหน้าจอแต่ละส่วนต้องรองรับอะไรบ้าง",
      outcome: "ระบบใช้งานจริงแล้ว จากที่ผมสังเกต ระบบทำงานได้ดีโดยรวม แต่การใช้งานประจำวันทำให้เห็นความติดขัดเรื่องการเข้าถึงผ่าน SKU และข้อมูลที่ย้ายมายังไม่ครบ",
      detail: [],
      sections: [
        { eyebrow: "01 · ปัญหา", title: "Master Asset ไม่เคยมีรูปแบบเดียว", copy: "รถยนต์ สว่าน ปูนหนึ่งถุง และใบอนุญาตอาจอยู่ในเมนูเดียวกัน แต่แต่ละชนิดมี identity, quantity model, ประวัติ และ lifecycle ต่างกัน", media: [0] },
        { eyebrow: "02 · สเปกเบื้องต้น", title: "ทำให้ requirement ตั้งต้นมองเห็นได้", copy: "ผมจัดทำสเปกเบื้องต้นควบคู่กับการออกแบบ UX/UI โดยวาง requirement ตั้งต้นร่วมกับ Software Engineer ขอบเขตนี้ยังไม่ได้ลงลึกเป็นข้อกำหนดทางเทคนิคทุกส่วนของระบบ" },
        { eyebrow: "03 · บริบทการทำงาน", title: "ทุกหน้าจออยู่ใน flow ที่ยาวกว่า", copy: "คำขอ ใบเสนอราคา การยืนยัน การจอง การส่ง การใช้ การคืน และการวางบิลต่างมีสถานะของตัวเอง การวาง flow ทำให้การตัดสินใจบนหน้าจอมีบริบทปฏิบัติการที่เชื่อถือได้", media: [1] },
        { eyebrow: "04 · โมเดล", title: "ทรัพย์สินต่างชนิดต้องการความจริงต่างกัน", copy: "ทรัพย์สินถาวรต้องติดตามรายชิ้นและประวัติการเคลื่อนย้าย วัสดุสิ้นเปลืองต้องมี lot และ quantity ส่วนเอกสารต่ออายุต้องเก็บข้อมูลตามวันที่และรักษาหลักฐานเดิม", media: [2] },
        { eyebrow: "05 · หลังใช้งานจริง", title: "โครงข้อมูลยังต้องมีทางเข้าที่ผู้ใช้เข้าใจ", copy: "ผู้ใช้ไม่เข้าใจว่าทำไมต้องมี SKU ก่อนสร้างทรัพย์สินจริง ขณะเดียวกันการย้ายข้อมูลสองรอบยังไม่ครบ ทำให้ความติดขัดมารวมอยู่ตอนเพิ่มข้อมูลทรัพย์สินจำนวนมาก สิ่งนี้ทำให้เห็นว่าโครงข้อมูลเพียงอย่างเดียวยังไม่ช่วยให้ผู้ใช้เข้าใจลำดับการทำงาน" },
        { eyebrow: "06 · แผนปรับปรุงถัดไป", title: "เข้าดู Asset ได้โดยตรง โดยคงความสัมพันธ์กับ SKU", copy: "ขั้นถัดไปที่ผมวางไว้คือเติมและปรับข้อมูลที่นำเข้าให้ครบ พร้อมเพิ่มทางเข้าดู Asset โดยไม่ต้องเปิดผ่าน SKU ก่อน โครงสร้างและความสัมพันธ์กับ SKU ยังคงเดิม แนวทางนี้เป็นแผนปรับการเรียกดู ไม่ได้ยกเลิก SKU ในขั้นตอนสร้าง Asset และยังไม่ได้ประเมินผลหลังปรับ" }
      ],
      seoTitle: "Smart Asset SA & AI — Dhittawat Thongkhum",
      seoDescription: "กรณีศึกษาแบบยาวที่เชื่อมโฟลว์ทรัพย์สิน การวิเคราะห์ระบบ กติกาข้อมูล และ UX/UI"
    }
  },
  {
    slug: "lccs-personal-research",
    order: 6,
    featuredOrder: null,
    year: "2026",
    contentLevel: "summary",
    cover: cover("lccs-personal-research", 1086, 1448, "LCCS Personal Research case study cover", "ภาพหน้าปกกรณีศึกษา LCCS Personal Research"),
    gallery: [],
    facts: {
      client: { en: "Life Connection Crisis Systems", th: "Life Connection Crisis Systems" },
      product: { en: "Crisis Coordination Platform", th: "แพลตฟอร์มประสานงานวิกฤต" },
      domain: { en: ["Crisis Coordination", "Public Response", "Multi-agency Operations"], th: ["การประสานงานวิกฤต", "การตอบสนองสาธารณะ", "การทำงานหลายหน่วยงาน"] },
      platform: { en: ["Coordination Platform", "Mission Management"], th: ["แพลตฟอร์มประสานงาน", "ระบบจัดการภารกิจ"] },
      role: { en: ["Personal Research", "UX Systems Design"], th: ["Personal Research", "UX Systems Design"] },
      workArea: { en: ["Identity & Roles", "Event Registry", "Resource Visibility", "Mission Status"], th: ["ตัวตนและบทบาท", "ทะเบียนเหตุการณ์", "การมองเห็นทรัพยากร", "สถานะภารกิจ"] }
    },
    en: {
      title: "LCCS Personal Research",
      eyebrow: "Crisis coordination / Personal research",
      listStatement: "Connect people. Coordinate action.",
      summary: "A research concept for shared identity, incident visibility, missions, and resource coordination during urgent events.",
      challenge: "Roles, incidents, resources, and community requests can fragment across agencies and channels. Without shared operational visibility, teams lose time aligning action and status.",
      approach: "The case frames the problem as a connected workflow rather than a screen redesign, focusing on roles, status, information timing, and handoff points.",
      outcome: "A system concept connecting agencies, volunteers, resources, missions, and communities through a shared event registry and action-oriented flows.",
      detail: ["The concept explores how a crisis coordination platform can help many hands move in the same direction during urgent events."],
      seoTitle: "LCCS Personal Research — Dhittawat Thongkhum",
      seoDescription: "A crisis coordination platform research concept for multi-agency operational visibility."
    },
    th: {
      title: "LCCS Personal Research",
      eyebrow: "การประสานงานวิกฤต / งานวิจัยส่วนตัว",
      listStatement: "เชื่อมคน ประสานการลงมือทำ",
      summary: "แนวคิดระบบสำหรับตัวตนร่วม การมองเห็นเหตุการณ์ ภารกิจ และการประสานทรัพยากรในสถานการณ์เร่งด่วน",
      challenge: "บทบาท เหตุการณ์ ทรัพยากร และคำขอจากชุมชนกระจายอยู่หลายหน่วยงานและหลายช่องทาง เมื่อไม่มี operational visibility ร่วมกัน ทีมต้องเสียเวลาเทียบ action และสถานะ",
      approach: "เคสมองปัญหาเป็น workflow ที่เชื่อมต่อกัน ไม่ใช่เพียงการ redesign หน้าจอ โดยเน้นบทบาท สถานะ จังหวะของข้อมูล และจุดส่งต่องาน",
      outcome: "แนวคิดระบบที่เชื่อมหน่วยงาน อาสาสมัคร ทรัพยากร ภารกิจ และชุมชนผ่าน event registry ร่วมและโฟลว์ที่นำไปสู่การลงมือทำ",
      detail: ["แนวคิดนี้สำรวจว่าแพลตฟอร์มประสานงานวิกฤตจะช่วยให้หลายฝ่ายเคลื่อนไปในทิศทางเดียวกันระหว่างเหตุการณ์เร่งด่วนได้อย่างไร"],
      seoTitle: "LCCS Personal Research — Dhittawat Thongkhum",
      seoDescription: "แนวคิดแพลตฟอร์มประสานงานวิกฤตเพื่อสร้าง operational visibility ระหว่างหลายหน่วยงาน"
    }
  },
  {
    slug: "wcf-digital",
    order: 2,
    featuredOrder: 2,
    year: "2025-2026",
    contentLevel: "summary",
    cover: cover("wcf-digital", 1055, 1491, "WCF Digital case study cover", "ภาพหน้าปกกรณีศึกษา WCF Digital"),
    gallery: [
      image("src/assets/images/work/wcf-digital/hero.png", 1672, 941, "WCF Hospital Billing redesign interface", "หน้าจอ redesign ระบบ WCF Hospital Billing"),
      image("src/assets/images/work/wcf-digital/workflow.png", 2172, 724, "WCF workflow overview", "ภาพรวม workflow ของ WCF")
    ],
    facts: {
      client: { en: "Social Security Office Thailand", th: "สำนักงานประกันสังคม ประเทศไทย" },
      product: { en: "Workmen’s Compensation Fund System", th: "ระบบกองทุนเงินทดแทน" },
      domain: { en: ["Legal & Policy-Based", "Claims & Compensation"], th: ["Legal & Policy-Based", "Claims & Compensation"] },
      platform: { en: ["Internal Web System", "Case Management"], th: ["ระบบเว็บภายใน", "ระบบจัดการเคส"] },
      role: { en: ["UX/UI Design", "System Foundation"], th: ["UX/UI Design", "System Foundation"] },
      workArea: { en: ["Case Workflow", "System Mapping", "Master Data", "Handoff Logic"], th: ["โฟลว์เคส", "การทำแผนที่ระบบ", "Master Data", "กติกาการส่งต่องาน"] }
    },
    en: {
      title: "WCF Digital",
      cardTitle: "UX/UI · Workflow Design",
      eyebrow: "Government service / Case management",
      listStatement: "WCF Digital is a national-scale claims and compensation management system for insured workers",
      summary: "A workflow foundation for compensation cases where policy, status, ownership, and external handoffs must remain traceable.",
      challenge: "The long-running system carried extensive legal requirements while real work was scattered across channels, leaving case status, handoffs, and ownership unclear.",
      approach: "I interviewed domain experts and worked with vendors, BA, backend leads, and users to map contradictions, policies, master data, and case handoffs into one buildable workflow foundation.",
      outcome: "The redesigned structure reduces ambiguous handoffs and off-system work, supports policy-complete processing, and makes each case easier to follow and audit.",
      detail: ["The design went beyond new screens to make case, status, ownership, master data, and handoff logic operate as one system."],
      seoTitle: "WCF Digital — Dhittawat Thongkhum",
      seoDescription: "Government compensation case-management UX grounded in workflow, ownership, and auditability."
    },
    th: {
      title: "WCF Digital",
      cardTitle: "UX/UI · Workflow Design",
      eyebrow: "บริการภาครัฐ / ระบบจัดการเคส",
      listStatement: "WCF Digital คือระบบจัดการเคลมและเงินทดแทนระดับประเทศสำหรับผู้ประกันตน",
      summary: "วาง workflow foundation สำหรับเคสเงินทดแทนที่นโยบาย สถานะ ownership และการส่งต่อภายนอกต้องตรวจสอบย้อนกลับได้",
      challenge: "ระบบเดิมถูกใช้อย่างยาวนาน มีข้อกำหนดทางกฎหมายจำนวนมาก และงานจริงกระจายอยู่หลายที่ ทำให้สถานะ การส่งต่อ และ ownership ของแต่ละเคสไม่ชัดเจน",
      approach: "ผมสัมภาษณ์ domain expert และทำงานร่วมกับ vendor, BA, backend lead และผู้ใช้ เพื่อเปลี่ยนข้อขัดแย้ง นโยบาย master data และ handoff ให้เป็น workflow foundation ที่ทีมสร้างต่อได้",
      outcome: "โครงสร้างใหม่ลดความคลุมเครือในการส่งต่อและงานนอกระบบ รองรับขั้นตอนตามนโยบาย และทำให้แต่ละเคสติดตามกับตรวจสอบย้อนหลังได้ง่ายขึ้น",
      detail: ["งานออกแบบไม่ได้ทำเพียงหน้าจอใหม่ แต่ทำให้ case, status, ownership, master data และ handoff ทำงานร่วมกันเป็นระบบเดียว"],
      seoTitle: "WCF Digital — Dhittawat Thongkhum",
      seoDescription: "งาน UX ระบบเงินทดแทนภาครัฐที่วางบน workflow, ownership และการตรวจสอบย้อนหลัง"
    }
  },
  {
    slug: "maxi-task",
    order: 4,
    featuredOrder: 4,
    year: "2019–2020",
    contentLevel: "summary",
    cover: cover("maxi-task", 1055, 1491, "MAXI TASK case study cover", "ภาพหน้าปกกรณีศึกษา MAXI TASK"),
    gallery: [],
    facts: {
      client: { en: "BCH Group", th: "BCH Group" },
      product: { en: "Telecom Infrastructure Platform", th: "แพลตฟอร์มโครงสร้างพื้นฐานโทรคมนาคม" },
      domain: { en: ["Telecom Infrastructure", "GIS Workflow", "Network Operations"], th: ["Telecom Infrastructure", "GIS Workflow", "Network Operations"] },
      platform: { en: ["Web Application", "GIS Infrastructure System"], th: ["Web Application", "ระบบจัดการโครงสร้างพื้นฐานด้วย GIS"] },
      role: { en: ["UX/UI Bridge with Engineering"], th: ["UX/UI Bridge with Engineering"] },
      workArea: { en: ["GIS Workflow", "Network Mapping", "Information Architecture", "Traceability"], th: ["GIS Workflow", "การทำแผนที่เครือข่าย", "สถาปัตยกรรมข้อมูล", "การ trace ข้อมูล"] }
    },
    en: {
      title: "MAXI TASK (Telecom GIS)",
      cardTitle: "UX/UI · Workflow Design",
      eyebrow: "Telecom infrastructure / GIS workflow",
      listStatement: "MAXI TASK unifies GIS, telecom infrastructure, and network tracing into one operational workflow.",
      summary: "A telecom infrastructure workflow that connects spatial context, network assets, and engineering constraints.",
      challenge: "Critical information was spread across many screens, forcing field, operations, and management teams to interpret context themselves and spend too long tracing network problems.",
      approach: "I restructured information around the moment it is needed, connecting map, asset, and core network relationships while respecting engineering and compliance constraints.",
      outcome: "A context-rich view reduces screen switching, supports continuous tracing, and gives teams one shared model of the network.",
      detail: ["The work connects UX, engineering, and regulatory concerns so people can scan, trace, and decide with less memory overhead."],
      seoTitle: "MAXI TASK — Dhittawat Thongkhum",
      seoDescription: "A GIS-based telecom infrastructure UX connecting map, network assets, and traceability."
    },
    th: {
      title: "MAXI TASK (Telecom GIS)",
      cardTitle: "UX/UI · Workflow Design",
      eyebrow: "โครงสร้างพื้นฐานโทรคมนาคม / GIS workflow",
      listStatement: "MAXI TASK รวม GIS โครงสร้างพื้นฐานโทรคมนาคม และการ trace เครือข่ายไว้ใน operational workflow เดียว",
      summary: "โฟลว์ระบบโทรคมนาคมที่เชื่อมบริบทเชิงพื้นที่ ทรัพย์สินเครือข่าย และข้อจำกัดทางวิศวกรรม",
      challenge: "ข้อมูลสำคัญกระจายอยู่หลายหน้าจอ ทำให้ field team, operation และ management ต้องตีความ context เอง และใช้เวลานานในการ trace ปัญหา network",
      approach: "ผมจัดโครงสร้างข้อมูลตามจังหวะที่ต้องใช้ เชื่อมความสัมพันธ์ระหว่าง map, asset และ core network โดยคำนึงถึงข้อจำกัดทาง engineering และ compliance",
      outcome: "มุมมองที่รวม context ช่วยลดการกระโดดข้ามหน้าจอ ทำให้ tracing ต่อเนื่องขึ้น และทำให้ทุกทีมเห็นโครงสร้างเครือข่ายแบบเดียวกัน",
      detail: ["งานนี้เชื่อม UX, engineering และข้อกำกับ เพื่อให้ผู้ใช้ scan, trace และตัดสินใจได้โดยไม่ต้องจำข้อมูลจำนวนมาก"],
      seoTitle: "MAXI TASK — Dhittawat Thongkhum",
      seoDescription: "งาน UX ระบบโทรคมนาคมบน GIS ที่เชื่อม map, network asset และการ trace ข้อมูล"
    }
  },
  {
    slug: "asean-summit-2019",
    order: 5,
    featuredOrder: 5,
    year: "2019",
    contentLevel: "summary",
    cover: cover("asean-summit-2019", 1055, 1491, "ASEAN Summit 2019 case study cover", "ภาพหน้าปกกรณีศึกษา ASEAN Summit 2019"),
    gallery: [],
    facts: {
      client: { en: "ASEAN Summit 2019 · Thailand", th: "ASEAN Summit 2019 · ประเทศไทย" },
      product: { en: "ASEAN Summit Registration System", th: "ระบบลงทะเบียน ASEAN Summit" },
      domain: { en: ["Diplomatic Registration", "Delegate Verification", "Multi-agency Workflow"], th: ["Diplomatic Registration", "Delegate Verification", "Multi-agency Workflow"] },
      platform: { en: ["Web Registration", "Delegate Management"], th: ["ระบบลงทะเบียนเว็บ", "ระบบจัดการผู้แทน"] },
      role: { en: ["UX/UI Contributor", "Workflow Design"], th: ["UX/UI Contributor", "Workflow Design"] },
      workArea: { en: ["DAO Validation", "Host Review", "Status Tracking", "Data Safeguards"], th: ["DAO Validation", "Host Review", "การติดตามสถานะ", "การป้องกันข้อมูลผิดพลาด"] }
    },
    en: {
      title: "ASEAN Summit 2019",
      cardTitle: "UX/UI · Workflow Design",
      eyebrow: "Diplomatic registration / Delegate workflow",
      listStatement: "A multi-country delegate registration system that moves identity verification closer to the source before central review.",
      summary: "A multi-country registration workflow that makes verification happen closer to the source.",
      challenge: "Delegate data could reach the central host before country-level verification, turning the host into a single point of failure in a context where errors are difficult to absorb.",
      approach: "I introduced a DAO validation layer and explicit invitation, verification, attention, and host-review states across the registration journey.",
      outcome: "The Host → DAO → Delegate → DAO Recheck → Host Review flow reduces upstream errors, clarifies ownership, and improves auditability across countries and agencies.",
      detail: ["The added friction is a safeguard: each country validates its own delegate information before it enters the central system."],
      seoTitle: "ASEAN Summit 2019 — Dhittawat Thongkhum",
      seoDescription: "A diplomatic delegate registration workflow with country-level validation and central review."
    },
    th: {
      title: "ASEAN Summit 2019",
      cardTitle: "UX/UI · Workflow Design",
      eyebrow: "การลงทะเบียนทางการทูต / โฟลว์ผู้แทน",
      listStatement: "ระบบลงทะเบียนผู้แทนหลายประเทศที่ย้ายการตรวจสอบตัวตนให้ใกล้แหล่งข้อมูลมากขึ้นก่อนเข้าสู่การตรวจส่วนกลาง",
      summary: "โฟลว์ลงทะเบียนหลายประเทศที่ย้ายการตรวจสอบให้เกิดใกล้แหล่งข้อมูลมากขึ้น",
      challenge: "ข้อมูล delegate สามารถไหลถึง host กลางก่อนตรวจระดับประเทศ ทำให้ host เป็น single point of failure ในบริบทที่รองรับความผิดพลาดได้ยาก",
      approach: "ผมเพิ่ม DAO validation layer และกำหนดสถานะ invitation, verification, need-attention และ host review ตลอดเส้นทางลงทะเบียน",
      outcome: "โฟลว์ Host → DAO → Delegate → DAO Recheck → Host Review ลด upstream error ทำให้ ownership ชัด และเพิ่มการตรวจสอบย้อนหลังระหว่างประเทศกับหน่วยงาน",
      detail: ["friction ที่เพิ่มขึ้นคือ safeguard ให้แต่ละประเทศตรวจข้อมูลผู้แทนของตัวเองก่อนเข้าสู่ระบบกลาง"],
      seoTitle: "ASEAN Summit 2019 — Dhittawat Thongkhum",
      seoDescription: "โฟลว์ลงทะเบียนผู้แทนทางการทูตที่มีการตรวจระดับประเทศก่อน host review"
    }
  },
  {
    slug: "redesign-landing-v1-5",
    order: 7,
    featuredOrder: null,
    year: "2023",
    contentLevel: "summary",
    cover: cover("redesign-landing-v1-5", 1055, 1491, "Redesign Landing V1.5 case study cover", "ภาพหน้าปกกรณีศึกษา Redesign Landing V1.5"),
    gallery: [],
    facts: {
      client: { en: "Q-CHANG", th: "Q-CHANG" },
      product: { en: "Redesign Landing V1.5", th: "Redesign Landing V1.5" },
      domain: { en: ["Marketplace", "Home Service", "Service Booking"], th: ["Marketplace", "บริการบ้าน", "การจองบริการ"] },
      platform: { en: ["Website Homepage", "Landing Page"], th: ["Website Homepage", "Landing Page"] },
      role: { en: ["UX/UI Designer", "Landing Page Redesign"], th: ["UX/UI Designer", "Landing Page Redesign"] },
      workArea: { en: ["Conversion UX", "Service Discovery", "Trust UI", "Booking Entry"], th: ["Conversion UX", "Service Discovery", "Trust UI", "จุดเริ่มจอง"] }
    },
    en: {
      title: "Redesign Landing V1.5",
      eyebrow: "Marketplace / Service booking",
      listStatement: "Bridge intent to booking.",
      summary: "A homepage redesign connecting paid traffic, service discovery, trust, and a clear booking entry point.",
      challenge: "Visitors arrived from paid traffic with specific service intent, but the broad homepage offered no clear next step and stopped that intent from moving forward.",
      approach: "I reorganized the first moments around four questions: what Q-CHANG is, which services exist, why the service is trustworthy, and where booking begins.",
      outcome: "The homepage became a bridge from advertising to service discovery and booking, helping new users understand the offer and move forward with more confidence.",
      detail: ["The redesign combines clearer navigation, service grouping, real-work proof, partners, and service information visible from the entry point."],
      seoTitle: "Redesign Landing V1.5 — Dhittawat Thongkhum",
      seoDescription: "A Q-CHANG homepage redesign connecting paid traffic, service discovery, trust, and booking."
    },
    th: {
      title: "Redesign Landing V1.5",
      eyebrow: "Marketplace / การจองบริการ",
      listStatement: "เชื่อมความตั้งใจของผู้ใช้ไปสู่การจอง",
      summary: "งาน redesign หน้าแรกที่เชื่อม paid traffic, service discovery, ความน่าเชื่อถือ และจุดเริ่มจองที่ชัด",
      challenge: "ผู้ใช้เข้ามาจาก paid traffic ด้วยความตั้งใจเฉพาะ แต่ homepage เดิมกว้างและไม่มี next step ที่ชัด ทำให้ความตั้งใจหยุดอยู่กับที่",
      approach: "ผมจัดโครงสร้างช่วงแรกของหน้าให้ตอบว่า Q-CHANG คืออะไร มีบริการอะไร น่าเชื่อถืออย่างไร และควรเริ่มจองตรงไหน",
      outcome: "homepage กลายเป็น bridge ระหว่าง ads, service discovery และ booking ช่วยให้ผู้ใช้ใหม่เข้าใจบริการและไปต่อด้วยความมั่นใจมากขึ้น",
      detail: ["โครงสร้างใหม่รวม navigation การจัดกลุ่มบริการ ผลงานจริง partner และข้อมูลบริการที่มองเห็นได้ตั้งแต่ต้นทาง"],
      seoTitle: "Redesign Landing V1.5 — Dhittawat Thongkhum",
      seoDescription: "งาน redesign หน้าแรก Q-CHANG ที่เชื่อม paid traffic, service discovery, trust และ booking"
    }
  },
  {
    "slug": "rescheduling-pain",
    "order": 3,
    "featuredOrder": 3,
    "year": "2022",
    "contentLevel": "summary",
    "caseStudy": "change-date",
    "cover": {
      "src": "src/assets/images/work/rescheduling-pain/change-date-cover.svg",
      "width": 1120,
      "height": 1440,
      "alt": {
        "en": "Change Date: an appointment connecting customers, technicians and service teams",
        "th": "Change Date: นัดหมายที่เชื่อมลูกค้า ช่าง และทีมบริการ"
      },
      "layout": "poster"
    },
    "gallery": [
      {
        "src": "src/assets/images/work/rescheduling-pain/research-channels.png",
        "width": 2553,
        "height": 1301,
        "alt": {
          "en": "Original research sample and channel breakdown",
          "th": "ข้อมูลและช่องทางจากงานวิจัยต้นฉบับ"
        },
        "layout": "full"
      },
      {
        "src": "src/assets/images/work/rescheduling-pain/research-proposal.png",
        "width": 2688,
        "height": 1512,
        "alt": {
          "en": "Original capacity and reminder proposal",
          "th": "ข้อเสนอเรื่องความพร้อมและการแจ้งเตือนต้นฉบับ"
        },
        "layout": "full"
      },
      {
        "src": "src/assets/images/work/rescheduling-pain/research-service-loop.png",
        "width": 2688,
        "height": 1512,
        "alt": {
          "en": "Original proposed service loop",
          "th": "วงจรบริการที่เสนอในต้นฉบับ"
        },
        "layout": "full"
      }
    ],
    "facts": {
      "client": {
        "en": "Q-CHANG",
        "th": "Q-CHANG"
      },
      "product": {
        "en": "Customer Change Date",
        "th": "การเปลี่ยนวันนัดบริการ"
      },
      "domain": {
        "en": [
          "Service Design",
          "Customer Journey Mapping",
          "Operational Workflow Design"
        ],
        "th": [
          "Service Design",
          "Customer Journey Mapping",
          "Operational Workflow Design"
        ]
      },
      "platform": {
        "en": [
          "Home Services",
          "Booking Operations"
        ],
        "th": [
          "บริการช่างในบ้าน",
          "การจัดการนัดหมาย"
        ]
      },
      "role": {
        "en": [
          "Senior UX/UI · CX Strategy"
        ],
        "th": [
          "Senior UX/UI · CX Strategy"
        ]
      },
      "workArea": {
        "en": [
          "Research Analysis",
          "Workflow Mapping",
          "Stakeholder Presentation"
        ],
        "th": [
          "วิเคราะห์ข้อมูล",
          "วาง flow",
          "นำเสนอแนวทาง"
        ]
      }
    },
    "en": {
      "title": "Q-CHANG · Change Date",
      "cardTitle": "UX · Workflow Design",
      "eyebrow": "Service design / Customer rescheduling",
      "listStatement": "One date changes. Everyone has to move.",
      "summary": "Analysis of 3,999 rescheduling records, connecting customer requests with technician availability and service coordination.",
      "challenge": "How could the service accommodate changes before turning to fees?",
      "approach": "I analyzed the data, mapped the workflow and presented possible directions. My manager decided how to proceed.",
      "outcome": "Teams refined response scripts, technician calendar rules, promotion preparation and onboarding. Outcomes are based on my recollection; no measured reduction is claimed.",
      "detail": [
        "Approximately 4,000 records were presented to executives; the exact total was 3,999. The five-day reminder was a coordination proposal, not a proven optimum."
      ],
      "seoTitle": "Q-CHANG Change Date — Dhittawat Thongkhum",
      "seoDescription": "A service design case connecting 3,999 rescheduling records with customer needs, technician availability and cross-team coordination."
    },
    "th": {
      "title": "Q-CHANG · Change Date",
      "cardTitle": "UX · Workflow Design",
      "eyebrow": "Service design / การเปลี่ยนวันนัด",
      "listStatement": "เปลี่ยนวันหนึ่งครั้ง หลายฝ่ายต้องขยับตาม",
      "summary": "วิเคราะห์รายการเปลี่ยนวัน 3,999 รายการ เพื่อเชื่อมคำขอลูกค้ากับความพร้อมของช่างและงานประสานบริการ",
      "challenge": "ทำอย่างไรให้บริการรับมือการเปลี่ยนวันได้ ก่อนตัดสินใจเรื่องค่าธรรมเนียม?",
      "approach": "ฉันวิเคราะห์ข้อมูล วาง flow และนำเสนอแนวทาง ส่วนวิธีดำเนินงานขึ้นอยู่กับหัวหน้างาน",
      "outcome": "ทีมปรับสคริปต์สื่อสาร กติกาปฏิทินช่าง การเตรียมโปรโมชั่น และ onboarding ตามสิ่งที่ฉันจำได้ โดยไม่มีการอ้างตัวเลขลดลงหลังใช้งาน",
      "detail": [
        "นำเสนอประมาณ 4,000 รายการเพื่อให้ผู้บริหารจดจำง่าย จำนวนจริง 3,999 รายการ ส่วนแนวทางแจ้งเตือนล่วงหน้า 5 วันเป็นช่วงเวลาประสานงานที่เสนอ ไม่ใช่ค่าที่ทดลองแล้วว่าดีที่สุด"
      ],
      "seoTitle": "Q-CHANG Change Date — Dhittawat Thongkhum",
      "seoDescription": "เคส Service Design จากรายการเปลี่ยนวัน 3,999 รายการ สู่การประสานความต้องการลูกค้า ตารางช่าง และงานบริการ"
    }
  },
  {
    slug: "buddy-app-2-0",
    order: 8,
    featuredOrder: null,
    year: "2023",
    contentLevel: "summary",
    cover: cover("buddy-app-2-0", 1055, 1491, "Buddy App 2.0 case study cover", "ภาพหน้าปกกรณีศึกษา Buddy App 2.0"),
    gallery: [],
    facts: {
      client: { en: "Q-CHANG", th: "Q-CHANG" },
      product: { en: "Buddy App", th: "Buddy App" },
      domain: { en: ["Mobile App", "Field Service UX", "Technician Workflow"], th: ["Mobile App", "Field Service UX", "โฟลว์ช่าง"] },
      platform: { en: ["Mobile Application"], th: ["Mobile Application"] },
      role: { en: ["UX/UI Designer", "Team Contributor"], th: ["UX/UI Designer", "Team Contributor"] },
      workArea: { en: ["Job Selection", "Acceptance Flow", "Field Research", "Team Coordination"], th: ["การเลือกงาน", "โฟลว์รับงาน", "Field Research", "การประสานทีม"] }
    },
    en: {
      title: "Buddy App 2.0",
      eyebrow: "Mobile app / Field service UX",
      listStatement: "Help technicians choose with confidence.",
      summary: "A mobile workflow for finding, evaluating, accepting, and coordinating field-service jobs.",
      challenge: "The operation had outgrown a visual refresh. Small friction in job discovery, acceptance, and team coordination slowed field work and reduced technician confidence.",
      approach: "Research focused on the information needed before accepting work: distance, time, job type, effort, rejection risk, and sub-team support. Those insights became a practical mobile flow.",
      outcome: "The workflow clarifies job choice, reduces hesitation at acceptance, supports technician and sub-team coordination, and turns research insight into usable screens.",
      detail: ["The redesign begins with the real decision cost of taking a job in the field, not only with the previous interface."],
      seoTitle: "Buddy App 2.0 — Dhittawat Thongkhum",
      seoDescription: "A field-service mobile UX case study for technician job selection and team coordination."
    },
    th: {
      title: "Buddy App 2.0",
      eyebrow: "Mobile app / Field service UX",
      listStatement: "ช่วยให้ช่างเลือกงานได้อย่างมั่นใจ",
      summary: "mobile workflow สำหรับค้นหา ประเมิน รับ และประสานงานภาคสนาม",
      challenge: "operation หลังบ้านซับซ้อนเกินกว่าจะทำเพียง visual refresh friction ในการหางาน รับงาน และประสานทีมทำให้งานช้าและลดความมั่นใจของช่าง",
      approach: "งานวิจัยเน้นข้อมูลก่อนรับงาน เช่น ระยะทาง เวลา ประเภทงาน แรงกาย ความเสี่ยงเมื่อปฏิเสธ และ sub-team support แล้วแปลง insight เป็น mobile flow ที่ใช้ได้จริง",
      outcome: "โฟลว์ช่วยให้เลือกงานชัด ลด hesitation ตอนรับงาน รองรับการประสาน technician กับ sub-team และเปลี่ยน research insight เป็นหน้าจอที่ใช้งานได้",
      detail: ["งาน redesign เริ่มจากต้นทุนจริงของการตัดสินใจรับงานภาคสนาม ไม่ได้เริ่มจากหน้าจอเดิมเพียงอย่างเดียว"],
      seoTitle: "Buddy App 2.0 — Dhittawat Thongkhum",
      seoDescription: "กรณีศึกษา mobile UX สำหรับการเลือกงานของช่างและการประสานทีมภาคสนาม"
    }
  },
  {
    slug: "intergold",
    order: 9,
    featuredOrder: null,
    year: "2018",
    contentLevel: "poster",
    cover: cover("intergold", 1086, 1448, "InterGOLD mobile gold trading app case study cover", "ภาพหน้าปกกรณีศึกษาแอปซื้อขายทอง InterGOLD"),
    gallery: [],
    facts: {
      client: { en: "Gold trading business", th: "ธุรกิจซื้อขายทอง" },
      product: { en: "Gold Trading Mobile App", th: "แอปซื้อขายทองบนมือถือ" },
      domain: { en: ["Mobile Application", "Gold Trading", "Realtime Market Data"], th: ["Mobile Application", "การซื้อขายทอง", "ข้อมูลตลาดแบบเรียลไทม์"] },
      platform: { en: ["Mobile Application", "Trading Information"], th: ["Mobile Application", "ข้อมูลการซื้อขาย"] },
      role: { en: ["UX/UI Design", "Mobile Product Design"], th: ["UX/UI Design", "Mobile Product Design"] },
      workArea: { en: ["Realtime Price", "Gold Chart", "Price Alerts", "Trading Actions"], th: ["ราคาทองเรียลไทม์", "กราฟทอง", "การแจ้งเตือนราคา", "การซื้อขาย"] }
    },
    en: {
      title: "InterGOLD",
      eyebrow: "Mobile app / Gold trading",
      listStatement: "Make time-critical decisions easier to scan.",
      summary: "A mobile trading concept that brings live price, chart movement, alerts, news, and actions into one clearer flow.",
      challenge: "Users need to compare live prices, monitor movement, and act quickly. Fragmented price, chart, alert, and transaction views reduce confidence and can cost timing.",
      approach: "The product is framed as a decision workflow, organizing information by timing and the action it enables rather than as isolated screens.",
      outcome: "A clearer mobile experience helps users monitor the market, understand movement, and decide faster from one connected flow.",
      detail: ["The direction makes gold prices, order actions, alerts, news, and payment reminders easier to scan and act on."],
      seoTitle: "InterGOLD — Dhittawat Thongkhum",
      seoDescription: "A mobile gold-trading UX concept for realtime information and fast decisions."
    },
    th: {
      title: "InterGOLD",
      eyebrow: "Mobile app / การซื้อขายทอง",
      listStatement: "ทำให้การตัดสินใจที่แข่งกับเวลามองเห็นง่ายขึ้น",
      summary: "แนวคิดแอปซื้อขายที่รวมราคาเรียลไทม์ การเคลื่อนไหวของกราฟ alert ข่าว และ action ไว้ในโฟลว์ที่ชัดขึ้น",
      challenge: "ผู้ใช้ต้องเทียบราคา ติดตามการเคลื่อนไหว และลงมือเร็ว เมื่อราคา กราฟ alert และ transaction กระจายกัน ความมั่นใจลดลงและอาจพลาดจังหวะสำคัญ",
      approach: "ผลิตภัณฑ์ถูกวางเป็น decision workflow โดยจัดข้อมูลตามจังหวะและ action ที่รองรับ แทนการมองเป็นหน้าจอแยกกัน",
      outcome: "ประสบการณ์มือถือที่ชัดขึ้นช่วยให้ผู้ใช้ติดตามตลาด เข้าใจการเคลื่อนไหว และตัดสินใจเร็วจากโฟลว์เดียว",
      detail: ["ทิศทางงานทำให้ราคา คำสั่ง alert ข่าว และการเตือนชำระเงิน scan และนำไปใช้ได้ง่ายขึ้น"],
      seoTitle: "InterGOLD — Dhittawat Thongkhum",
      seoDescription: "แนวคิด UX แอปซื้อขายทองสำหรับข้อมูลเรียลไทม์และการตัดสินใจที่รวดเร็ว"
    }
  },
  {
    slug: "my-exim",
    order: 10,
    featuredOrder: null,
    year: "2018",
    contentLevel: "poster",
    cover: cover("my-exim", 1086, 1448, "MY EXIM online transaction platform case study cover", "ภาพหน้าปกกรณีศึกษาแพลตฟอร์มธุรกรรม MY EXIM"),
    gallery: [],
    facts: {
      client: { en: "Corporate banking service", th: "บริการธนาคารสำหรับธุรกิจ" },
      product: { en: "Online Transaction Platform", th: "แพลตฟอร์มธุรกรรมออนไลน์" },
      domain: { en: ["Banking", "SME & Corporate", "Digital Transaction"], th: ["ธนาคาร", "SME และองค์กร", "ธุรกรรมดิจิทัล"] },
      platform: { en: ["Mobile Application", "Online Transaction"], th: ["Mobile Application", "Online Transaction"] },
      role: { en: ["UX/UI Design", "Banking Workflow Design"], th: ["UX/UI Design", "Banking Workflow Design"] },
      workArea: { en: ["Portfolio Overview", "Transactions", "Approvals", "Financial Visibility"], th: ["ภาพรวมพอร์ต", "ธุรกรรม", "การอนุมัติ", "การมองเห็นข้อมูลการเงิน"] }
    },
    en: {
      title: "MY EXIM",
      eyebrow: "Banking platform / SME & corporate",
      listStatement: "Keep business banking activity under control.",
      summary: "An online transaction platform organized around portfolio visibility, account information, approvals, and daily financial monitoring.",
      challenge: "Business users needed to understand portfolio status, transaction history, approvals, and financial information without switching between fragmented views or waiting for manual updates.",
      approach: "The workflow groups financial overview, accounts, statements, transactions, approver states, reminders, and exchange information around daily monitoring and decisions.",
      outcome: "A clearer structure helps SME and corporate users follow financial activity and approval states with greater control.",
      detail: ["MY EXIM brings business banking information and actions into one operational view for regular monitoring and approval work."],
      seoTitle: "MY EXIM — Dhittawat Thongkhum",
      seoDescription: "An SME and corporate banking UX concept for transactions, approvals, and financial visibility."
    },
    th: {
      title: "MY EXIM",
      eyebrow: "แพลตฟอร์มธนาคาร / SME และองค์กร",
      listStatement: "ควบคุมกิจกรรมธนาคารธุรกิจได้จากภาพเดียว",
      summary: "แพลตฟอร์มธุรกรรมออนไลน์ที่จัดรอบภาพรวมพอร์ต ข้อมูลบัญชี การอนุมัติ และการติดตามการเงินรายวัน",
      challenge: "ผู้ใช้ธุรกิจต้องเข้าใจสถานะพอร์ต ประวัติธุรกรรม approval และข้อมูลการเงิน โดยไม่สลับหลายมุมมองหรือรอการอัปเดตแบบ manual",
      approach: "โฟลว์รวมภาพรวมการเงิน บัญชี statement transaction สถานะ approver reminder และข้อมูลอัตราแลกเปลี่ยนไว้รอบงานติดตามกับตัดสินใจรายวัน",
      outcome: "โครงสร้างที่ชัดขึ้นช่วยให้ผู้ใช้ SME และองค์กรติดตามกิจกรรมการเงินกับสถานะอนุมัติได้อย่างควบคุมมากขึ้น",
      detail: ["MY EXIM รวมข้อมูลและ action ด้านธนาคารธุรกิจไว้ใน operational view เดียวสำหรับงานติดตามและอนุมัติประจำวัน"],
      seoTitle: "MY EXIM — Dhittawat Thongkhum",
      seoDescription: "แนวคิด UX ธนาคารสำหรับ SME และองค์กร ครอบคลุมธุรกรรม การอนุมัติ และ financial visibility"
    }
  },
  {
    slug: "oil-reserve-reporting-system",
    order: 11,
    featuredOrder: null,
    year: "2018",
    contentLevel: "poster",
    cover: cover("oil-reserve-reporting-system", 1122, 1402, "Oil Reserve Reporting System case study cover", "ภาพหน้าปกกรณีศึกษา Oil Reserve Reporting System"),
    gallery: [],
    facts: {
      client: { en: "National energy compliance service", th: "บริการกำกับและรายงานพลังงานระดับประเทศ" },
      product: { en: "National Fuel Reserve Monitoring Platform", th: "แพลตฟอร์มติดตามปริมาณสำรองเชื้อเพลิงระดับประเทศ" },
      domain: { en: ["Government Service", "Energy", "Compliance Reporting"], th: ["บริการภาครัฐ", "พลังงาน", "การรายงานตามข้อกำกับ"] },
      platform: { en: ["Reporting System", "National Dashboard"], th: ["ระบบรายงาน", "แดชบอร์ดระดับประเทศ"] },
      role: { en: ["UX/UI Design", "Workflow Design"], th: ["UX/UI Design", "Workflow Design"] },
      workArea: { en: ["Daily Reporting", "Site Approval", "Compliance Status", "Audit Trail"], th: ["รายงานรายวัน", "อนุมัติสถานที่", "สถานะ compliance", "Audit Trail"] }
    },
    en: {
      title: "Oil Reserve Reporting System",
      eyebrow: "Government service / Compliance reporting",
      listStatement: "Make national reporting easier to trust.",
      summary: "A government workflow connecting storage sites, daily reserve data, approvals, compliance, and dashboard visibility.",
      challenge: "National monitoring depends on accurate daily data, location approval, compliance status, and auditability. Fragmented reporting and verification slow the system and weaken trust.",
      approach: "The direction connects storage sites, reporting, remote verification, approval, legal reserve status, and audit history into one compliance-driven workflow.",
      outcome: "A clearer, more auditable reporting structure supports national fuel-reserve visibility and verification.",
      detail: ["The concept focuses on daily reporting, storage-site approval, dashboard visibility, remote verification, and secure audit trails."],
      seoTitle: "Oil Reserve Reporting System — Dhittawat Thongkhum",
      seoDescription: "A government compliance-reporting UX concept for national fuel-reserve monitoring."
    },
    th: {
      title: "Oil Reserve Reporting System",
      eyebrow: "บริการภาครัฐ / การรายงานตามข้อกำกับ",
      listStatement: "ทำให้รายงานระดับประเทศเชื่อถือได้ง่ายขึ้น",
      summary: "โฟลว์ภาครัฐที่เชื่อมสถานที่จัดเก็บ ข้อมูลสำรองรายวัน approval, compliance และ dashboard visibility",
      challenge: "การติดตามระดับประเทศต้องพึ่งข้อมูลรายวันที่ถูกต้อง การอนุมัติสถานที่ สถานะ compliance และ auditability เมื่อการรายงานกับ verification กระจายกัน ระบบจะช้าและเชื่อถือยาก",
      approach: "ทิศทางงานเชื่อม storage site, reporting, remote verification, approval, legal reserve status และ audit history ไว้ใน compliance workflow เดียว",
      outcome: "โครงสร้างรายงานที่ชัดและตรวจสอบย้อนหลังได้มากขึ้น รองรับการมองเห็นกับ verification ปริมาณสำรองเชื้อเพลิงระดับประเทศ",
      detail: ["แนวคิดเน้นรายงานรายวัน การอนุมัติสถานที่ dashboard ระดับประเทศ remote verification และ audit trail ที่ปลอดภัย"],
      seoTitle: "Oil Reserve Reporting System — Dhittawat Thongkhum",
      seoDescription: "แนวคิด UX ระบบรายงานตามข้อกำกับสำหรับติดตามปริมาณสำรองเชื้อเพลิงระดับประเทศ"
    }
  }
];

const sundaySelection = ['smart-asset-sa-ai', 'rescheduling-pain', 'wcf-digital'];
workItemData.forEach(item => { const i = sundaySelection.indexOf(item.slug); item.featuredOrder = i < 0 ? null : i + 1; });

export const workItems = workItemData.sort((a, b) => a.order - b.order);

if (workItems.length !== 11) {
  throw new Error(`Expected 11 work items, received ${workItems.length}`);
}

const slugs = workItems.map((item) => item.slug);
if (JSON.stringify(slugs) !== JSON.stringify(workSlugs)) {
  throw new Error("Work data order must match the route contract");
}

export const featuredWork = workItems
  .filter((item) => item.featuredOrder !== null)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

export function findWork(slug) {
  return workItems.find((item) => item.slug === slug);
}
