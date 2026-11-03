/* ===== EDIT HERE: team data lives in one place (add photo URL later) ===== */
const TEAM = [
  ["Mahabat Alieva","Director / Doula"],
  ["Jonathan Williams","Chief Doctor / Pediatrics"],
  ["Irina Pak","Pediatrics / Family Medicine"],
  ["Nasyikat Dononbaeva","Internal Medicine / Pulmonology"],
  ["Nabat Gasimova","Pediatric / Intensivist"],
  ["Nancy Yau","Pediatrics"],
  ["Lukas Meyer-Landholt","Pediatrics / Oncology"],
  ["Madison Smith","Physical Therapist"],
  ["Simbat Sadyrbaeva","Gynecology"],
  ["Nargiza Islamova","Ultrasound"]
];
/* ===== Translations (EN is the HTML text). Missing keys fall back to EN. ===== */
const T = {
 ru:{skip:"К содержанию",menu:"Меню",nav_home:"Главная",nav_about:"О клинике",nav_services:"Услуги",nav_team:"Команда",nav_org:"Для организаций",nav_contact:"Контакты",
  cta:"Записаться на приём",discover:"Узнать о MercyMed",
  h1:"Доказательная медицина для всей семьи — в одном месте",lead:"Частная амбулаторная клиника в Бишкеке с международными и местными специалистами.",
  uniq_h:"Чем отличается MercyMed",pending:"Перевод ожидает проверки",foot:"Частный медицинский центр, Бишкек",
  notice:"Прототип: ничего не отправлено. Используйте только вымышленные данные.",notice0:"Прототип: ничего не отправлено",
  f_name:"Фамилия и имя",f_dob:"Дата рождения",f_phone:"Номер телефона",f_doc:"Желаемый врач или общая консультация (необязательно)",
  send:"Показать заявку (прототип)",req:"Заполните поле: "},
 ky:{skip:"Мазмунга өтүү",menu:"Меню",nav_home:"Башкы бет",nav_about:"Биз жөнүндө",nav_services:"Кызматтар",nav_team:"Команда",nav_org:"Уюмдар үчүн",nav_contact:"Байланыш",
  cta:"Кабылдоого жазылуу",discover:"MercyMed тууралуу билүү",
  h1:"Бүтүндөй үй-бүлө үчүн далилдүү медицина — бир жерде",lead:"Бишкектеги эл аралык жана жергиликтүү адистери бар жеке амбулатордук клиника.",
  uniq_h:"MercyMed эмнеси менен айырмаланат",pending:"Котормо текшерүүнү күтүүдө",foot:"Жеке медициналык борбор, Бишкек",
  notice:"Прототип: эч нерсе жөнөтүлгөн жок. Ойдон чыгарылган маалыматты гана колдонуңуз.",notice0:"Прототип: эч нерсе жөнөтүлгөн жок",
  f_name:"Фамилиясы жана аты",f_dob:"Туулган күнү",f_phone:"Телефон номери",f_doc:"Каалаган дарыгер же жалпы консультация (милдеттүү эмес)",
  send:"Өтүнүчтү көрсөтүү (прототип)",req:"Талааны толтуруңуз: "}
};
let lang = "en";
try { lang = localStorage.getItem("mm-lang") || "en"; } catch(e){}

function applyLang(l){
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    if(!el.dataset.en) el.dataset.en = el.textContent;
    el.textContent = (T[l] && T[l][el.dataset.i18n]) || el.dataset.en;
  });
  document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.lang===l));
  const p = document.getElementById("pending"); if(p) p.hidden = (l==="en");
  try { localStorage.setItem("mm-lang", l); } catch(e){}
}

const grid = document.getElementById("team-grid");
if(grid) grid.innerHTML = TEAM.map(([n,r])=>
  `<article class="card"><div class="placeholder" role="img" aria-label="Photo of ${n} awaiting client">[Photo awaiting client]</div><h3>${n}</h3><p>${r}</p><p class="note">[Short bio awaiting client]</p></article>`).join("");

document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>applyLang(b.dataset.lang)));
const mb = document.getElementById("menuBtn"), nav = document.getElementById("nav");
mb.addEventListener("click",()=>{ const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");mb.setAttribute("aria-expanded","false");}));

const form = document.getElementById("form");
if(form) form.addEventListener("submit",e=>{
  e.preventDefault();
  let ok = true;
  ["name","dob","phone"].forEach(id=>{
    const f = document.getElementById(id), er = document.getElementById("e_"+id);
    const empty = !f.value.trim();
    const label = form.querySelector(`label[for=${id}]`).textContent;
    er.textContent = empty ? ((T[lang]&&T[lang].req)||"Please fill in: ")+label : "";
    f.setAttribute("aria-invalid", empty);
    if(empty && ok){ f.focus(); }
    if(empty) ok = false;
  });
  const prev = document.getElementById("preview");
  if(!ok){ prev.hidden = true; return; }
  const v = id => document.getElementById(id).value.trim();
  document.getElementById("msg").textContent =
`Hello! I would like to request an appointment.
Name: ${v("name")}
Date of birth: ${v("dob")}
Phone: ${v("phone")}
Preferred: ${v("doctor") || "—"}`;
  prev.hidden = false;
});
applyLang(lang);
