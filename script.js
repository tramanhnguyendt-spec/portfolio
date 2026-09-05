const nav=document.querySelector(".nav");
const toggle=document.querySelector(".menu-toggle");
toggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav a")];
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  })
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>sectionObserver.observe(s));

const modal=document.getElementById("imageModal");
const modalImage=document.getElementById("modalImage");
document.querySelectorAll("[data-modal]").forEach(card=>{
  card.addEventListener("click",()=>{
    const src=card.dataset.modal;
    modalImage.src=src;
    modalImage.alt="Tác phẩm Creative của Nguyễn Trâm Anh";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    document.body.classList.add("no-scroll");
  });
});
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  modalImage.src="";
  document.body.classList.remove("no-scroll");
}
document.querySelector(".modal-close")?.addEventListener("click",closeModal);
modal?.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
