/* ===== SHARED DATA: edit team here once; Team page and booking dropdown both use it ===== */
const TEAM = [
  {n:"Mahabat Alieva",r:"Director / Doula",doc:true},
  {n:"Jonathan Williams",r:"Chief Doctor / Pediatrics",doc:true},
  {n:"Irina Pak",r:"Pediatrics / Family Medicine",doc:true},
  {n:"Nasyikat Dononbaeva",r:"Internal Medicine / Pulmonology",doc:true},
  {n:"Nabat Gasimova",r:"Pediatric / Intensivist",doc:true},
  {n:"Nancy Yau",r:"Pediatrics",doc:true},
  {n:"Lukas Meyer-Landholt",r:"Pediatrics / Oncology",doc:true},
  {n:"Madison Smith",r:"Physical Therapist",doc:true},
  {n:"Simbat Sadyrbaeva",r:"Gynecology",doc:true},
  {n:"Nargiza Islamova",r:"Ultrasound",doc:true},
  {n:"[Name awaiting client]",r:"Nurse and videographer",doc:false},
  {n:"[Name awaiting client]",r:"Receptionist",doc:false}
];
/* ===== TRANSLATIONS (EN = text in HTML; missing keys fall back to EN) ===== */
const T = {
 ru:{skip:"К содержанию",menu:"Меню",nav_home:"Главная",nav_about:"О клинике",nav_services:"Услуги",nav_team:"Команда",nav_org:"Для организаций",nav_contact:"Контакты",
  cta:"Записаться на приём",discover:"Узнать о MercyMed",org_cta:"Связаться по вопросам сотрудничества",
  h1:"Доказательная медицина для всей семьи — в одном месте",lead:"Частная амбулаторная клиника в Бишкеке с международными и местными специалистами.",
  uniq_h:"Чем отличается MercyMed",pending:"Перевод ожидает проверки",foot:"Частный медицинский центр, Бишкек",foot2:"Прототип сайта. Реальные данные пациентов не собираются и не отправляются.",
  notice:"Прототип: ничего не отправлено. Используйте только вымышленные данные.",notice0:"Прототип: ничего не отправлено",
  f_name:"Фамилия и имя",f_dob:"Дата рождения",f_phone:"Номер телефона",f_doc:"Консультация или специалист (необязательно)",
  send:"Показать заявку (прототип)",
  e_empty:"заполните поле.",e_future:"дата рождения не может быть в будущем.",e_old:"укажите дату не раньше 1900 года.",e_phone:"введите от 7 до 15 цифр, например +996 555 123 456.",
  g_adult:"Общая консультация для взрослых",g_ped:"Общая консультация для детей"},
 ky:{skip:"Мазмунга өтүү",menu:"Меню",nav_home:"Башкы бет",nav_about:"Биз жөнүндө",nav_services:"Кызматтар",nav_team:"Команда",nav_org:"Уюмдар үчүн",nav_contact:"Байланыш",
  cta:"Кабылдоого жазылуу",discover:"MercyMed тууралуу билүү",org_cta:"Кызматташуу боюнча байланышуу",
  h1:"Бүтүндөй үй-бүлө үчүн далилдүү медицина — бир жерде",lead:"Бишкектеги эл аралык жана жергиликтүү адистери бар жеке амбулатордук клиника.",
  uniq_h:"MercyMed эмнеси менен айырмаланат",pending:"Котормо текшерүүнү күтүүдө",foot:"Жеке медициналык борбор, Бишкек",foot2:"Сайттын прототиби. Бейтаптардын чыныгы маалыматы чогултулбайт жана жөнөтүлбөйт.",
  notice:"Прототип: эч нерсе жөнөтүлгөн жок. Ойдон чыгарылган маалыматты гана колдонуңуз.",notice0:"Прототип: эч нерсе жөнөтүлгөн жок",
  f_name:"Фамилиясы жана аты",f_dob:"Туулган күнү",f_phone:"Телефон номери",f_doc:"Консультация же адис (милдеттүү эмес)",
  send:"Өтүнүчтү көрсөтүү (прототип)",
  e_empty:"талааны толтуруңуз.",e_future:"туулган күн келечекте болушу мүмкүн эмес.",e_old:"1900-жылдан кечиктирбеген күндү көрсөтүңүз.",e_phone:"7ден 15ке чейин цифра киргизиңиз, мисалы +996 555 123 456.",
  g_adult:"Чоңдор үчүн жалпы консультация",g_ped:"Балдар үчүн жалпы консультация"}
};
let lang = "en";
try { lang = localStorage.getItem("mm-lang") || "en"; } catch(e){}
const tr = k => (T[lang] && T[lang][k]) || null;
const EN_ERR = {e_empty:"please fill in this field.",e_future:"the date cannot be in the future.",e_old:"enter a date no earlier than 1900.",e_phone:"enter 7 to 15 digits, for example +996 555 123 456."};
const EN_NAMES = {dob:"Date of Birth",phone:"Phone Number",name:"Surname and name"};

/* ===== Render shared data ===== */
const grid = document.getElementById("team-grid");
if(grid) grid.innerHTML = TEAM.map(p=>
 `<article class="card"><div class="placeholder" role="img" aria-label="Photo of ${p.n} awaiting client">[Photo awaiting client]</div><h2>${p.n}</h2><p><strong>${p.r}</strong></p><p class="note">[Short bio, max 2 sentences, awaiting client]</p></article>`).join("");

const sel = document.getElementById("doctor");
if(sel){
  const add = (v,t,k)=>{const o=document.createElement("option");o.value=v;o.textContent=t;if(k)o.dataset.i18n=k;sel.appendChild(o);};
  add("General Adult Consultation","General Adult Consultation","g_adult");
  add("General Pediatric Consultation","General Pediatric Consultation","g_ped");
  TEAM.filter(p=>p.doc).forEach(p=>add(`${p.n} — ${p.r}`,`${p.n} — ${p.r}`));
}

/* ===== Language ===== */
function applyLang(l){
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    if(!el.dataset.en) el.dataset.en = el.textContent;
    el.textContent = tr(el.dataset.i18n) || el.dataset.en;
  });
  document.querySelectorAll(".lang button").forEach(b=>b.setAttribute("aria-pressed", b.dataset.lang===l));
  const p = document.getElementById("pending"); if(p) p.hidden = (l==="en");
  document.querySelectorAll(".err").forEach(e=>e.textContent=""); 
  try { localStorage.setItem("mm-lang", l); } catch(e){}
}
document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>applyLang(b.dataset.lang)));

/* ===== Menu ===== */
const mb = document.getElementById("menuBtn"), nav = document.getElementById("nav");
mb.addEventListener("click",()=>{ const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });

/* ===== Booking form ===== */
const form = document.getElementById("form");
if(form){
  const dob = document.getElementById("dob"), phone = document.getElementById("phone");
  const d = new Date(), today = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  dob.max = today; dob.min = "1900-01-01";
  phone.addEventListener("input",()=>{ phone.value = phone.value.replace(/[^0-9+\-() ]/g,""); });

  const fieldName = id => document.querySelector(`label[for=${id}]`).textContent;
  const setErr = (id,key)=>{
    const f = document.getElementById(id), e = document.getElementById("e_"+id);
    e.textContent = key ? `${fieldName(id)}: ${tr(key)||EN_ERR[key]}` : "";
    f.setAttribute("aria-invalid", !!key);
    return !key;
  };
  function validate(){
    const r = [];
    r.push(setErr("name", document.getElementById("name").value.trim() ? "" : "e_empty"));
    let k = "";
    if(!dob.value) k = "e_empty";
    else if(dob.value > today) k = "e_future";
    else if(dob.value < "1900-01-01") k = "e_old";
    r.push(setErr("dob", k));
    const pv = phone.value.trim(), digits = pv.replace(/\D/g,"").length;
    k = "";
    if(!pv) k = "e_empty";
    else if(!/^\+?[0-9 ()\-]+$/.test(pv) || digits < 7 || digits > 15) k = "e_phone";
    r.push(setErr("phone", k));
    return r.every(Boolean);
  }
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const prev = document.getElementById("preview");
    if(!validate()){ prev.hidden = true; form.querySelector("[aria-invalid=true]").focus(); return; }
    const v = id => document.getElementById(id).value.trim();
    document.getElementById("msg").textContent =
`Hello! I would like to request an appointment.
Name: ${v("name")}
Date of birth: ${v("dob")}
Phone: ${v("phone")}
Consultation / specialist: ${v("doctor") || "Not specified"}`;
    prev.hidden = false;
  });
}
applyLang(lang);
