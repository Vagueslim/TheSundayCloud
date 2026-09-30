# Innovative — หลักฐานที่ใช้ปรับพอร์ต

สถานะ: working brief สำหรับพอร์ตในโฟลเดอร์นี้ ยังไม่ใช่คำกล่าวอ้างในใบสมัคร

## ข้อเท็จจริง

- ทรีเลือกชื่อที่แสดงบนพอร์ตว่า **Innovative** แม้เว็บไซต์บริษัทใช้ชื่อ INOX
- JD ที่ทรีส่งมาเน้น user journey, research, requirement-to-flow, การทำงานกับ PO/PM/BA/developer, Design System, staging QA/UAT, UX writing และ AI prototyping
- เว็บไซต์ [INOX](https://inox.co.th/) ระบุบริการด้าน infrastructure และ enterprise technology ส่วน [AiNOX](https://inox.co.th/ainox) ระบุ Enterprise Knowledge Management และ Finance Workflow
- **WCF Digital**: มีหลักฐานการเก็บ requirement กับเจ้าหน้าที่, การวาง workflow/exception, ออกแบบหน้าจอ, ทำงานกับ BA/SA/developer และสนับสนุน UAT/อบรม (`src/data/coda-projects.js`)
- **Q-CHANG**: มีการวิเคราะห์ข้อมูลเปลี่ยนวัน 3,999 รายการเพื่อมองปัญหาการประสานงานระหว่างลูกค้า ช่าง และทีมบริการ ตัวเลขนี้เป็นขนาดข้อมูลที่ศึกษา ไม่ใช่ผลลัพธ์หลังออกแบบ (`src/data/coda-projects.js`)
- **PEC Smart Asset**: มีงานสเปกและ UX/UI ร่วมกับ software engineer ใช้ Codex ช่วยงานสเปก/ออกแบบ และมีภาพ flow กับหน้าจอ Master Asset (`src/data/coda-projects.js`, `src/data/work-items.js`)

## การตีความเพื่อจัดเรื่อง

| สิ่งที่ JD มองหา | หลักฐานที่แสดงได้ตอนนี้ | ขอบเขตการเล่า |
| --- | --- | --- |
| Research และ pain point | Q-CHANG วิเคราะห์รายการเปลี่ยนวัน; WCF ศึกษางานเจ้าหน้าที่ | แยกข้อมูลที่ศึกษาออกจากผลลัพธ์หลังเปิดใช้ |
| Journey, wireflow และ requirement → interaction | WCF มีลำดับงานใบแจ้งหนี้ กฎราคา และข้อยกเว้น; Smart Asset มี Category → SKU → Asset และ flow ของงานเช่า | ระบุว่า flow ใดเป็นสเปก และส่วนใดเปิดใช้แล้ว |
| ทำงานกับ BA และ developer | WCF ทำงานกับ BA/SA/developer; Smart Asset ทำงานกับ software engineer | ไม่สรุปเพิ่มว่าเป็น PO/PM หรือเจ้าของ architecture |
| UAT และการทบทวนงานที่ทำจริง | WCF มีผลสังเกตระหว่างอบรมและ UAT; Smart Asset มีปัญหาหลังเริ่มใช้ Master Asset | ยังไม่อ้างว่าเคยทำ staging visual QA ครบวงจรหรือมีผลวัดเชิงปริมาณ |
| AI ในกระบวนการออกแบบ | Smart Asset ระบุว่าใช้ Codex ช่วยสเปกและออกแบบ | ยังไม่อ้างว่า AI prototype ถูกทดสอบกับผู้ใช้หรือวัดผลแล้ว |

## สิ่งที่ยังขาดหลักฐานสำหรับ JD

- ตัวอย่าง Design System ที่แสดง component, token, variant และขอบเขตการมีส่วนร่วมของทรีอย่างตรวจสอบได้
- หลักฐาน staging visual QA ที่ชี้หน้าจอจริง ปัญหาที่พบ และการแก้ไขร่วมกับ developer
- ตัวอย่าง UX writing guideline หรือการตัดสินใจเรื่องข้อความใน flow
- ตัวอย่าง prototype ที่ผู้ชมทดลองได้ พร้อมคำอธิบายว่าทรีทดสอบแนวคิดอะไร
- ขอบเขตประสบการณ์กับ PO/PM โดยตรง และจำนวนปีเฉพาะงาน product UX/UI ที่ตรวจจากประวัติได้

## การตัดสินใจสำหรับรอบนี้

- ตามการตัดสินใจของทรี ให้ WCF เป็นเคสเปิดเรื่องและลำดับแรก: WCF → Q-CHANG → Smart Asset
- ปรับคำเกริ่นหน้า Home/Work ให้เห็นวิธีทำงานจากโจทย์จริง → flow/exception → ทำงานกับทีม → ทบทวนผล โดยไม่เพิ่ม claim ใหม่
- ยังไม่เขียนว่าทรีเคยทำผลิตภัณฑ์ของ INOX หรือ AiNOX และยังไม่เปลี่ยน URL ภายในที่สืบทอดชื่อ `/coda/`

ขั้นถัดไปที่มีน้ำหนักที่สุด: ตรวจภาพหลักฐาน WCF ในหน้าเปิดเรื่องและเลือกหนึ่งช่วงของ flow พร้อมภาพก่อน/หลังและ UAT observation ที่ทรีอธิบายบทบาทตัวเองได้ชัด
