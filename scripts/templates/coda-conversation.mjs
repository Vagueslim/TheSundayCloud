import { escapeHtml as esc } from '../lib/html.js';

const copy = {
  th: {
    label: 'ก่อนจบ / คุยเรื่องการทำงาน', title: 'ถ้าเราได้ทำงานด้วยกัน',
    intro: '5 คำถาม ว่าฉันคิดอย่างไร รับฟังอย่างไร และทำงานร่วมกับคนอื่นอย่างไร',
    items: [
      ['เมื่องานติดข้อจำกัด คุณพาทีมไปต่ออย่างไร?', 'ฉันจะกลับมาดูจุดหมายร่วมกัน แล้วระดมความคิดว่ามีทางไหนยังเป็นไปได้ วิธีแก้แต่ละครั้งมักไม่เหมือนกัน', 'อย่าง Smart Asset ผู้ใช้คุ้นกับระบบเดิม จึงสร้าง SKU เสมือนเป็น Asset แต่ละชิ้น ทำให้เกิด SKU ซ้ำ เมื่อปรับ SKU โดยตรงไม่ได้ ทางออกคือทำเครื่องมือช่วยย้ายข้อมูลจาก SKU ไปเป็น Asset ด้วยการ mapping'],
      ['คำแนะนำไหนเปลี่ยนวิธีคิดของคุณ?', '“อย่ายึดติดกับเทคนิค หรือเชื่อผลสรุปมากกว่าความจริง”', 'เป็นคำแนะนำที่ฉันจำได้ และใช้เตือนตัวเองให้กลับมาดูสิ่งที่เกิดขึ้นจริง พร้อมรับคำแนะนำและทบทวนสิ่งที่คิดไว้'],
      ['คุณช่วยให้ดีไซเนอร์คนอื่นเติบโตอย่างไร?', 'ส่วนใหญ่ฉันดูแลดีไซเนอร์ครั้งละสองคน ฉันอยากให้น้องเติบโตตามแนวทางของตัวเอง และระวังที่จะไม่ให้น้องโตมาเป็นฉัน เพราะประสบการณ์ของฉันผสมหลายด้าน', 'มีน้องที่เปลี่ยนเส้นทางจากการอยากเป็น Team Lead มาทำงานด้าน Design Operations ฉันก็แนะนำตามทางนั้น และเห็นว่าเขาทำได้ดีในแบบของเขา ส่วนคนที่ยังไม่ถนัดด้านธุรกิจ ฉันจะย่อยโจทย์และแบ่งส่วนให้เข้ามาช่วยทำงานร่วมกัน'],
      ['คุณออกแบบอย่างไร เมื่อเวลาและกำลังคนจำกัด?', 'ในงาน G11 งานส่งเสริม เรามีเวลาจำกัดในการเก็บความต้องการผู้ใช้ และเป็นส่วนขยายที่บริษัทเพิ่มกำลังคนให้ไม่ได้', 'ฉันจึงออกแบบภายใต้ข้อจำกัดที่มี ตรวจทานความเข้าใจ และคุยกับทีมหลังบ้านถึงข้อจำกัดต่าง ๆ เพื่อให้อีกทีมพัฒนาต่อได้'],
      ['ถ้าหลายงานต้องเดินพร้อมกัน คุณเลือกอะไรทำก่อน?', 'ฉันจะปรึกษา PO และทีมบริหาร เพื่อดูว่าทางไหนพอเป็นไปได้ภายใต้ทรัพยากรที่มี', 'อีกคำถามที่ใช้พิจารณาคือ งานไหนเมื่อทำเสร็จแล้วจะนำไปต่อยอดได้ เพื่อช่วยกันจัดลำดับงานที่ต้องทำ']
    ],
    quote: 'I find inspiration in fun, challenges, and problems to solve.',
    translation: 'ฉันพบแรงบันดาลใจในความสนุก ความท้าทาย และปัญหาที่รอให้แก้'
  },
  en: {
    label: 'Before we wrap up / A conversation about work', title: 'If we work together',
    intro: 'Five questions about how I think, listen, and work with others.',
    items: [
      ['How do you help a team move forward when work gets stuck?', 'I return to our shared goal, then brainstorm the options that are still possible. The solution is rarely the same from one situation to another.', 'In Smart Asset, habits from the previous system led users to create a SKU for each physical asset, producing duplicate SKUs. When we could not change the SKUs directly, the solution was a tool to map and migrate the data from SKUs into assets.'],
      ['What advice changed the way you think?', '“Do not become attached to a technique, or trust a conclusion more than reality.”', 'That advice stayed with me. It reminds me to return to what is actually happening, listen to feedback, and reconsider my assumptions.'],
      ['How do you help other designers grow?', 'I usually mentor two designers at a time. I want them to grow in their own direction. My experience combines several disciplines, so I am careful not to expect everyone to follow my path.', 'One designer shifted their focus from becoming a Team Lead to Design Operations. I supported that direction and saw them do well in their own way. For someone less comfortable with business topics, I break the work into smaller parts and involve them in working through it together.'],
      ['How do you design with limited time and people?', 'On the G11 promotion project, time for gathering user requirements was limited, and the company could not add people for the extension.', 'I designed within those constraints, rechecked our understanding, and discussed limitations with the backend team so another team could continue development.'],
      ['How do you prioritize when several projects need attention?', 'I consult the PO and leadership to understand which options are feasible with the resources available.', 'I also ask which completed work can become a foundation for what comes next. That helps us decide the order together.']
    ],
    quote: 'I find inspiration in fun, challenges, and problems to solve.', translation: ''
  }
};

export function renderCodaConversation(route, wrapped = false) {
  const c = copy[route.locale];
  return `<section class="co-conversation${wrapped ? ' co-wrap' : ''}" id="conversation" aria-labelledby="conversation-title">
    <div class="co-conversation__grid">
      <header><p class="co-kicker">${esc(c.label)}</p><h2 id="conversation-title">${esc(c.title)}</h2><p class="co-conversation__intro">${esc(c.intro)}</p><span class="co-conversation__count" aria-hidden="true">Q&amp;A / 05</span></header>
      <div class="co-conversation__list">${c.items.map(([q, ...paragraphs], i) => `<details${i === 0 ? ' open' : ''}><summary><span class="co-conversation__number">${String(i + 1).padStart(2, '0')}</span><h3>${esc(q)}</h3><span class="co-conversation__toggle" aria-hidden="true"></span></summary><div class="co-conversation__answer">${paragraphs.map(p => `<p>${esc(p)}</p>`).join('')}</div></details>`).join('')}</div>
    </div>
    <blockquote class="co-conversation__quote"><p lang="en">${esc(c.quote)}</p>${c.translation ? `<p class="co-conversation__translation">${esc(c.translation)}</p>` : ''}<cite>Dhittawat Thongkhum</cite></blockquote>
  </section>`;
}
