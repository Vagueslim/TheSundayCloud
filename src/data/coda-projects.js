// Shared order for the Sunday Cloud edition: cards, case counts, and next-case links.
// Research figures are sample counts, never post-launch improvement metrics.
export const codaProjects = [
  {
    slug: "wcf-digital", year: "2025–2026", color: "#215664",
    cover: { src: "src/assets/images/work/wcf-digital/coda/medical-items.png", alt: { en: "WCF medical item selection with multiple selected rows and quantity controls", th: "หน้าจอเลือกเวชภัณฑ์ WCF หลายรายการพร้อมระบุจำนวน" } },
    en: {
      title: "WCF Digital", problem: "Bring the billing work back into the system.",
      role: "UX/UI design, workflow mapping & UAT support",
      summary: "Restructuring hospital billing so officers could enter medical costs, review prices, and work within the required rules.",
      domain: "Government services / Hospital billing", status: "Live · 27 July 2026", outcome: "Revised billing flow completed by users during training and UAT."
    },
    th: {
      title: "WCF Digital", problem: "พางานค่ารักษาพยาบาลกลับเข้ามาในระบบ",
      role: "ออกแบบ UX/UI · วาง workflow · สนับสนุน UAT",
      summary: "จัดโครงงานใบแจ้งหนี้ให้เจ้าหน้าที่ลงรายการค่ารักษา ตรวจราคา และทำงานตามกฎที่ต้องใช้จริงได้",
      domain: "บริการภาครัฐ / ค่ารักษาพยาบาล", status: "เปิดใช้ · 27 กรกฎาคม 2026", outcome: "ผู้ใช้ทำงานตาม flow ใบแจ้งหนี้ใหม่ได้ระหว่างอบรมและ UAT"
    }
  },
  {
    slug: "rescheduling-pain", year: "2022", color: "#66518b",
    cover: { src: "src/assets/images/work/rescheduling-pain/stations/station-05.webp", alt: { en: "An isometric calendar with a promotion tag", th: "ปฏิทิน isometric พร้อมป้ายโปรโมชั่น" } },
    en: {
      title: "Q-CHANG · Change Date", problem: "One date changes. Everyone has to move.",
      role: "Research analysis, workflow mapping & presentation",
      summary: "Following 3,999 rescheduling records into the coordination between customers, technicians, and service teams.",
      domain: "Home services / Service design", status: "Research & team actions", outcome: "A clearer coordination problem and proposed directions for the team."
    },
    th: {
      title: "Q-CHANG · Change Date", problem: "เปลี่ยนวันหนึ่งครั้ง หลายฝ่ายต้องขยับตาม",
      role: "วิเคราะห์ข้อมูล · วาง flow · นำเสนอแนวทาง",
      summary: "ตามข้อมูลเปลี่ยนวัน 3,999 รายการไปสู่งานประสานระหว่างลูกค้า ช่าง และทีมบริการ",
      domain: "บริการช่างในบ้าน / Service design", status: "งานวิจัยและสิ่งที่ทีมปรับ", outcome: "ทำให้ปัญหาประสานงานชัดขึ้น พร้อมแนวทางให้ทีมตัดสินใจต่อ"
    }
  },
  {
    slug: "smart-asset-sa-ai", year: "2026", color: "#304e82",
    cover: { src: "src/assets/images/work/smart-asset-sa-ai/cover-flow/sku.webp", alt: { en: "PEC Smart Asset SKU screen with category-specific metadata", th: "หน้าจอ SKU ของ PEC Smart Asset พร้อม metadata ตามประเภท" } },
    en: {
      title: "PEC Smart Asset", problem: "Different assets need different information.",
      role: "UX × SA Intern · Initial specifications & UX/UI",
      summary: "Working with a software engineer to connect category rules, reusable SKU data, and the identity of each physical asset.",
      domain: "Asset management / System analysis", status: "Master Asset in use", outcome: "Delivered Master Asset, with post-launch navigation and data issues identified."
    },
    th: {
      title: "PEC Smart Asset", problem: "ทรัพย์สินต่างชนิด ต้องการข้อมูลต่างกัน",
      role: "UX × SA Intern · สเปกเบื้องต้นและ UX/UI",
      summary: "ทำงานร่วมกับ software engineer เพื่อเชื่อมกติกา Category ข้อมูล SKU ที่ใช้ซ้ำ และตัวตนของทรัพย์สินแต่ละชิ้น",
      domain: "การจัดการทรัพย์สิน / การวิเคราะห์ระบบ", status: "Master Asset เริ่มใช้แล้ว", outcome: "ส่งมอบ Master Asset และพบจุดปรับปรุงเรื่องทางเข้าถึงข้อมูลกับข้อมูลย้ายระบบ"
    }
  }
];

codaProjects.sort((a, b) => ['smart-asset-sa-ai', 'rescheduling-pain', 'wcf-digital'].indexOf(a.slug) - ['smart-asset-sa-ai', 'rescheduling-pain', 'wcf-digital'].indexOf(b.slug));

// Localized editorial copy for the two delivery cases. Q-CHANG reads its
// established bilingual research copy directly from change-date.js.
export const codaCaseCopy = {
  "wcf-digital": {
    en: {
      context: "WCF Digital supports workmen’s compensation case management for Thailand’s Social Security Office. This case focuses on hospital billing: the point where treatment records, invoices, declared prices, and supporting documents meet.",
      scope: "I gathered requirements with experienced officers, mapped workflows and exceptions, designed WCF screens, and supported implementation, testing, and training with BA, SA, and developers. The team delivered the system; my responsibility was the design, not deployment or pricing policy.",
      challenge: "A billing screen existed. The complete task still happened elsewhere.",
      before: "Legacy constraints prevented officers from entering all the required costs in the system. They prepared documents and calculations outside WCF, including Excel, then entered the results again. I needed to understand the work behind the form before reorganizing the interface.",
      beforeCaption: "Legacy hospital billing screen · the starting point for understanding the entry task.",
      structureTitle: "Start with the officer’s task, then organize the information.",
      structure: "I organized the billing work around the hospital and treatment period, with invoices, treatment categories, medical items, and supporting documents kept in context.",
      structureSteps: ["Compensation case", "Hospital / treatment period", "Invoice or receipt", "Treatment category & medical items"],
      decisions: [
        ["Separate the categories", "Medical supplies are divided into types 1, 2, and 3, so officers can enter each item within the appropriate group."],
        ["Enter several items together", "Officers can select multiple medical items, set quantities, review their selection, and save the batch."],
        ["Keep the price comparison visible", "Charged, eligible, and declared amounts appear together for review. A mismatch prompts a warning and correction of the source document, rather than silently changing the amount."]
      ],
      paymentFlowCaption: "WCF payment wireflow connecting payment screens for hospitals, beneficiaries, and physician compensation.",
      itemsCaption: "The item picker supports multiple selections, quantities, a selection summary, and one save action.",
      pricesCaption: "Charged, eligible, and declared prices are available in the billing context.",
      outcomeTitle: "A flow users could complete under the required rules.",
      outcome: "During training and UAT, I observed users understanding the revised flow and completing the required entry tasks. The delivered design supported billing work from entry and category review through document output in the tested flow.",
      live: "The system went live on 27 July 2026. The observations above come from training and UAT; I do not have production measurements for time saved or error reduction.",
      learningTitle: "Usability also means respecting what the system cannot decide.",
      learning: "The most important design work was making the rules and exceptions understandable at the point of entry. A cleaner screen was useful only if officers could complete the real task and know when a document needed correction.",
      evidence: "Design screens and the legacy interface are shown as project evidence. Launch status and qualitative observations are based on my project experience."
    },
    th: {
      context: "WCF Digital รองรับงานบริหารกองทุนเงินทดแทนของสำนักงานประกันสังคม เคสนี้เลือกเล่า Hospital Billing ซึ่งเป็นจุดที่ข้อมูลรักษา ใบแจ้งหนี้ ราคาประกาศ และเอกสารหลักฐานมาพบกัน",
      scope: "ฉันเก็บ requirement กับเจ้าหน้าที่ที่มีประสบการณ์ วาง workflow และข้อยกเว้น ออกแบบหน้าจอ WCF และสนับสนุนการพัฒนา ทดสอบ และอบรมร่วมกับ BA, SA และ developer ทีมเป็นผู้ส่งมอบระบบ โดยฉันรับผิดชอบงานออกแบบ ไม่ได้เป็นผู้ deploy หรือกำหนดนโยบายราคา",
      challenge: "มีหน้าจอใบแจ้งหนี้ แต่ผู้ใช้ยังต้องออกไปทำงานข้างนอก",
      before: "ข้อจำกัดของระบบเดิมทำให้เจ้าหน้าที่ลงค่ารักษาที่จำเป็นได้ไม่ครบ ต้องทำเอกสารและคำนวณนอกระบบ รวมถึง Excel แล้วนำผลกลับมาคีย์อีกครั้ง ฉันจึงต้องเข้าใจงานที่อยู่หลังแบบฟอร์มก่อนจัดหน้าจอใหม่",
      beforeCaption: "หน้าจอใบแจ้งหนี้เดิม · จุดเริ่มต้นในการทำความเข้าใจงานกรอกข้อมูล",
      structureTitle: "เริ่มจากงานของเจ้าหน้าที่ แล้วจึงจัดโครงข้อมูล",
      structure: "ฉันจัดงานใบแจ้งหนี้ตามสถานพยาบาลและช่วงเวลารักษา โดยเก็บใบแจ้งหนี้ หมวดค่ารักษา รายการเวชภัณฑ์ และเอกสารประกอบให้อยู่ในบริบทเดียวกัน",
      structureSteps: ["เคสเงินทดแทน", "สถานพยาบาล / ช่วงเวลารักษา", "ใบแจ้งหนี้หรือใบเสร็จ", "หมวดค่ารักษาและรายการเวชภัณฑ์"],
      decisions: [
        ["แยกประเภทให้ลงข้อมูลได้ตรง", "แบ่งเวชภัณฑ์เป็นประเภท 1, 2 และ 3 เพื่อให้เจ้าหน้าที่ลงรายการในกลุ่มที่เกี่ยวข้องได้"],
        ["เลือกและบันทึกหลายรายการพร้อมกัน", "เจ้าหน้าที่เลือกรายการเวชภัณฑ์หลายข้อ ระบุจำนวน ตรวจรายการที่เลือก และบันทึกพร้อมกันได้"],
        ["เห็นราคาที่ต้องเทียบในบริบทเดียวกัน", "แสดงยอดเรียกเก็บ จ่ายได้ และราคาประกาศเพื่อใช้ตรวจสอบ หากไม่ตรง ระบบแจ้งเตือนเพื่อให้แก้เอกสารต้นทาง ไม่เปลี่ยนยอดให้อัตโนมัติ"]
      ],
      paymentFlowCaption: "ผังหน้าจอการจ่ายเงิน WCF เชื่อมการจ่ายโรงพยาบาล การจ่ายทายาท และค่าตอบแทนแพทย์",
      itemsCaption: "หน้าจอเลือกหลายรายการ ระบุจำนวน สรุปรายการที่เลือก และบันทึกในครั้งเดียว",
      pricesCaption: "ราคาเรียกเก็บ จ่ายได้ และราคาประกาศอยู่ในบริบทงานใบแจ้งหนี้",
      outcomeTitle: "ผู้ใช้ทำงานได้ภายใต้ระเบียบที่ต้องใช้จริง",
      outcome: "ระหว่างอบรมและ UAT ฉันสังเกตว่าผู้ใช้เข้าใจ flow ใหม่และทำงานกรอกข้อมูลที่ต้องการได้ งานออกแบบที่ส่งมอบรองรับตั้งแต่ลงข้อมูล ตรวจหมวด ไปจนถึงออกเอกสารในกระบวนการที่ทดสอบ",
      live: "ระบบเปิดใช้จริงวันที่ 27 กรกฎาคม 2026 ผลสังเกตข้างต้นมาจากการอบรมและ UAT โดยยังไม่มีตัวเลข production เรื่องเวลาที่ลดลงหรือความผิดพลาด",
      learningTitle: "ใช้งานได้ ต้องเข้าใจด้วยว่าระบบตัดสินใจแทนอะไรไม่ได้",
      learning: "งานสำคัญคือทำให้กฎและข้อยกเว้นเข้าใจได้ในจังหวะที่ผู้ใช้กำลังกรอกข้อมูล หน้าจอที่เป็นระเบียบมีประโยชน์เมื่อเจ้าหน้าที่จบงานจริงได้ และรู้ว่าเมื่อใดต้องส่งเอกสารกลับไปแก้",
      evidence: "ภาพหน้าจอออกแบบและระบบเดิมเป็นหลักฐานประกอบโครงการ สถานะเปิดใช้และผลสังเกตเชิงคุณภาพอ้างอิงประสบการณ์ของฉันในงานนี้"
    }
  },
  "smart-asset-sa-ai": {
    en: {
      context: "PEC Smart Asset supports asset and rental operations. I focused on Master Asset: defining the information that different asset types need, then connecting it to the screens used to register and inspect real assets.",
      scope: "As a UX × SA Intern, I drafted initial specifications and contributed UX/UI and workflow design alongside a software engineer. I used Codex to support specification and design work, then reviewed the requirements and constraints with the engineer.",
      challenge: "One menu, several kinds of asset.",
      before: "A vehicle, a drill, a bag of cement, and a renewal document have different identities, quantities, and lifecycles. Treating them as the same form would hide the information each task depends on.",
      modelTitle: "Make the relationship visible: category → SKU → asset.",
      model: "Category rules determine the fields. A SKU carries a reusable product definition. Each physical asset has its own identity, QR code, status, and site context. I used this relationship to frame what the screens needed to explain.",
      modelSteps: ["Category & field rules", "Reusable SKU definition", "Physical asset & QR", "Status & site context"],
      modelCaption: "Design artifact · how category-specific metadata connects the SKU and the registered physical asset.",
      decisions: [
        ["Let the category shape the fields", "Different types need different metadata. The specification and screens make those differences explicit instead of collecting every field in one fixed form."],
        ["Separate the model from the physical unit", "A SKU is reusable; an asset is an individual unit with its own history. The design carries the shared definition forward while preserving each unit’s identity."],
        ["Keep the operational context", "Asset status and site context help explain what can happen next. I mapped wider rental workflows to understand the handoffs around these screens."]
      ],
      categoryCaption: "Category settings define which information the group needs.",
      skuCaption: "SKU creation brings the category-specific information into a reusable definition.",
      assetCaption: "A physical asset receives its own identity and QR while retaining its SKU relationship.",
      flowTitle: "See the handoff around the screen.",
      flowCopy: "This request-to-order diagram is a specification artifact showing the wider operational context. It does not establish that every rental module has launched.",
      flowCaption: "Specification artifact · request, quotation, customer decision, and confirmed order.",
      flowEvidenceTitle: "System flow evidence",
      flowEvidenceIntro: "Six specification artifacts connect interface decisions to the wider rental workflow. Open any snapshot to inspect the full diagram. The confirmed live scope remains Master Asset.",
      openDiagram: "Open full diagram",
      outcomeTitle: "Master Asset is in use. It also exposed a navigation gap.",
      outcome: "The Master Asset work was delivered and began real use. I observed that users did not understand why a SKU had to be created before a physical asset. Two migration rounds had not yet brought across all the data, adding friction during bulk entry.",
      nextTitle: "Planned: a direct way to view assets.",
      next: "My next direction is to complete and correct the imported data and add a direct asset-view entry point. The SKU structure stays intact; this does not remove SKU from asset creation. The improvement is planned and has not been evaluated.",
      learningTitle: "A correct structure still needs a clear way in.",
      learning: "Working with the engineer helped me connect interface choices to data relationships. Real use then showed where the structure was understandable to the team but not yet obvious to users.",
      evidence: "Screens and diagrams document my design and specification contribution. The confirmed live scope is Master Asset; other modules and planned improvements are not presented as launched outcomes."
    },
    th: {
      context: "PEC Smart Asset รองรับการจัดการทรัพย์สินและงานเช่า ฉันเลือกเล่าส่วน Master Asset ซึ่งกำหนดข้อมูลที่ทรัพย์สินต่างชนิดต้องใช้ แล้วเชื่อมไปสู่หน้าจอลงทะเบียนและตรวจดูทรัพย์สินจริง",
      scope: "ในบทบาท UX × SA Intern ฉันทำสเปกเบื้องต้นและร่วมออกแบบ UX/UI กับ workflow คู่กับ software engineer โดยใช้ Codex ช่วยงานสเปกและการออกแบบ แล้วตรวจ requirement และข้อจำกัดร่วมกับ engineer",
      challenge: "เมนูเดียว แต่ทรัพย์สินมีหลายแบบ",
      before: "รถยนต์ สว่าน ปูนหนึ่งถุง และเอกสารต่ออายุมีตัวตน จำนวน และวงจรการใช้งานต่างกัน หากใช้แบบฟอร์มเดียวกันทั้งหมด ข้อมูลที่แต่ละงานต้องใช้จะถูกซ่อนไว้",
      modelTitle: "ทำความสัมพันธ์ให้เห็น: Category → SKU → Asset",
      model: "กติกา Category กำหนดช่องข้อมูล SKU เก็บนิยามสินค้าที่ใช้ซ้ำ ส่วนทรัพย์สินจริงแต่ละชิ้นมีตัวตน QR สถานะ และบริบทไซต์ของตัวเอง ฉันใช้ความสัมพันธ์นี้เป็นกรอบว่าหน้าจอต้องอธิบายอะไร",
      modelSteps: ["Category และกติกาข้อมูล", "นิยาม SKU ที่ใช้ซ้ำ", "ทรัพย์สินจริงและ QR", "สถานะและบริบทไซต์"],
      modelCaption: "หลักฐานงานออกแบบ · metadata ตามประเภทเชื่อม SKU กับทรัพย์สินจริงที่ลงทะเบียนอย่างไร",
      decisions: [
        ["ให้ประเภทกำหนดข้อมูลที่จำเป็น", "ทรัพย์สินต่างชนิดใช้ metadata ต่างกัน สเปกและหน้าจอจึงแสดงความต่างนั้น แทนการรวมทุกช่องไว้ในฟอร์มตายตัว"],
        ["แยกนิยามสินค้าออกจากทรัพย์สินจริง", "SKU ใช้ซ้ำได้ แต่ทรัพย์สินแต่ละชิ้นมีประวัติของตัวเอง งานออกแบบส่งต่อนิยามร่วมโดยคงตัวตนรายชิ้นไว้"],
        ["มองบริบทงานที่หน้าจอต้องรองรับ", "สถานะทรัพย์สินและไซต์ช่วยอธิบายว่าจะทำอะไรต่อได้ ฉันจึงวาง flow งานเช่าที่กว้างขึ้นเพื่อเข้าใจจุดส่งต่องานรอบหน้าจอ"]
      ],
      categoryCaption: "ตั้งค่า Category เพื่อระบุข้อมูลที่สินค้าในกลุ่มนั้นต้องใช้",
      skuCaption: "การสร้าง SKU นำข้อมูลเฉพาะประเภทมาเป็นนิยามที่ใช้ซ้ำได้",
      assetCaption: "ทรัพย์สินแต่ละชิ้นมีตัวตนและ QR ของตัวเอง โดยยังเชื่อมกับ SKU",
      flowTitle: "มองจุดส่งต่องานที่อยู่รอบหน้าจอ",
      flowCopy: "แผนภาพ Request to Order เป็นหลักฐานงานสเปกที่ใช้ทำความเข้าใจบริบทปฏิบัติการ ไม่ได้ยืนยันว่าทุกโมดูลเช่าเปิดใช้แล้ว",
      flowCaption: "หลักฐานงานสเปก · คำขอ ใบเสนอราคา การตัดสินใจของลูกค้า และออเดอร์ที่ยืนยัน",
      flowEvidenceTitle: "หลักฐานการเข้าใจ flow ของระบบ",
      flowEvidenceIntro: "แผนภาพงานสเปก 6 รายการเชื่อมการตัดสินใจบนหน้าจอกับ flow งานเช่าที่กว้างขึ้น กดแต่ละภาพเพื่อดูแผนภาพเต็ม ขอบเขตที่ยืนยันว่าเริ่มใช้จริงยังคงเป็น Master Asset",
      openDiagram: "เปิดแผนภาพเต็ม",
      outcomeTitle: "Master Asset เริ่มใช้แล้ว และทำให้เห็นจุดติดขัดเรื่องทางเข้า",
      outcome: "ส่วน Master Asset ส่งมอบและเริ่มใช้จริงแล้ว ฉันสังเกตว่าผู้ใช้ไม่เข้าใจว่าทำไมต้องมี SKU ก่อนสร้างทรัพย์สินจริง ขณะเดียวกันการย้ายข้อมูลสองรอบยังไม่ครบ ทำให้ติดขัดเพิ่มเมื่อต้องลงข้อมูลจำนวนมาก",
      nextTitle: "แผนถัดไป: เปิดดู Asset ได้โดยตรง",
      next: "แนวทางถัดไปคือเติมและแก้ข้อมูลนำเข้าให้ครบ พร้อมเพิ่มทางเข้าดู Asset โดยตรง โครงสร้าง SKU ยังคงเดิม และไม่ได้ยกเลิก SKU ตอนสร้างทรัพย์สิน แนวทางนี้ยังเป็นแผนและยังไม่ได้ประเมินผล",
      learningTitle: "โครงสร้างที่ถูกต้อง ยังต้องมีทางเข้าที่เข้าใจได้",
      learning: "การทำงานคู่กับ engineer ช่วยให้ฉันเชื่อมการตัดสินใจบนหน้าจอกับความสัมพันธ์ของข้อมูล ส่วนการใช้จริงทำให้เห็นจุดที่ทีมเข้าใจโครงสร้างแล้ว แต่ผู้ใช้ยังมองไม่เห็นลำดับงานเดียวกัน",
      evidence: "ภาพหน้าจอและแผนภาพแสดงส่วนร่วมด้านออกแบบและสเปก ขอบเขตที่ยืนยันว่าใช้จริงคือ Master Asset โดยไม่ได้รวมโมดูลอื่นหรือแผนปรับปรุงเป็นผลที่เปิดใช้แล้ว"
    }
  }
};
