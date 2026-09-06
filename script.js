/* =========================================================
   MEDIA — CHỈ CẦN SỬA TÊN FILE Ở ĐÂY
   Tất cả ảnh + video bỏ chung vào thư mục: media/

   Ví dụ:
   profile: "profile.jpg"
   banner01: "banner-01.png"
   video01: "LINK TIKTOK"

   Ảnh nằm trong media/. Video TikTok chỉ cần dán link, không cần tải MP4.
   ========================================================= */
const MEDIA = {
  profile: "profile.png",
  gofficeKeywords: "goffice-organic-keywords.png",
  gofficeRanking: "goffice-keyword-ranking.png",
  visaRankingOverview: "visa-ranking-overview.png",
  visaKeywordDetail: "visa-keyword-detail.png",
  visaAiOverview: "visa-seo-progress.png",
  visaTraffic: "visa-organic-traffic.png",
  banner01: "banner-01.png",
  thumbnail01: "thumbnail-01.png",
  social01: "social-01.jpg",
  video01: "https://www.tiktok.com/@butterbbakery/video/7546107781745626386"
};

const MEDIA_PATH = "media/";

// Ảnh: tự động tìm trong media/. URL ngoài (ví dụ TikTok): giữ nguyên URL.
const mediaUrl = key => {
  const value = MEDIA[key];
  if(!value) return "";
  return /^https?:\/\//i.test(value) ? value : MEDIA_PATH + value;
};

/* Media is rendered directly in index.html. This script only handles navigation, reveal, and image zoom. */
/* =========================================================
   NAV / REVEAL
   ========================================================= */
const nav=document.querySelector(".nav");
const toggle=document.querySelector(".menu-toggle");
toggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded",open);
});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target)
    }
  })
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

/* =========================================================
   IMAGE MODAL — CLICK ANY PORTFOLIO IMAGE TO READ DATA
   Click image = zoom 2x
   Mouse wheel = zoom in/out
   Drag = move when zoomed
   ========================================================= */
const modal=document.getElementById("imageModal");
const modalImage=document.getElementById("modalImage");

let zoomScale=1;
let isDragging=false;
let startX=0;
let startY=0;
let offsetX=0;
let offsetY=0;

function applyZoom(){
  if(!modalImage) return;
  modalImage.style.transform=`translate(${offsetX}px, ${offsetY}px) scale(${zoomScale})`;
  modalImage.classList.toggle("is-zoomed", zoomScale>1);
}

function openImageModal(src, alt=""){
  if(!modal || !modalImage || !src) return;
  zoomScale=1;
  offsetX=0;
  offsetY=0;
  modalImage.src=src;
  modalImage.alt=alt || "Portfolio — Nguyễn Trâm Anh";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("no-scroll");
  applyZoom();
}

function closeModal(){
  if(!modal || !modalImage) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  modalImage.src="";
  modalImage.style.transform="";
  document.body.classList.remove("no-scroll");
}

/* Any real image inside the portfolio can be opened full-size */
document.addEventListener("click", e=>{
  const img=e.target.closest("img.portfolio-zoomable");
  if(!img || modal?.classList.contains("open")) return;
  e.preventDefault();
  e.stopPropagation();
  openImageModal(img.currentSrc || img.src, img.alt);
});

/* Click the opened image to toggle readable 2x zoom */
modalImage?.addEventListener("click", e=>{
  e.stopPropagation();
  if(zoomScale===1){
    zoomScale=2;
  }else{
    zoomScale=1;
    offsetX=0;
    offsetY=0;
  }
  applyZoom();
});

/* Mouse wheel zoom */
modalImage?.addEventListener("wheel", e=>{
  if(!modal?.classList.contains("open")) return;
  e.preventDefault();
  zoomScale += e.deltaY < 0 ? 0.25 : -0.25;
  zoomScale=Math.min(4,Math.max(1,zoomScale));
  if(zoomScale===1){offsetX=0;offsetY=0;}
  applyZoom();
},{passive:false});

/* Drag the image while zoomed */
modalImage?.addEventListener("pointerdown", e=>{
  if(zoomScale<=1) return;
  isDragging=true;
  modalImage.setPointerCapture?.(e.pointerId);
  startX=e.clientX-offsetX;
  startY=e.clientY-offsetY;
  modalImage.classList.add("is-dragging");
});

modalImage?.addEventListener("pointermove", e=>{
  if(!isDragging) return;
  offsetX=e.clientX-startX;
  offsetY=e.clientY-startY;
  applyZoom();
});

function stopDragging(){
  isDragging=false;
  modalImage?.classList.remove("is-dragging");
}
modalImage?.addEventListener("pointerup",stopDragging);
modalImage?.addEventListener("pointercancel",stopDragging);
modalImage?.addEventListener("pointerleave",()=>{ if(isDragging) stopDragging(); });

modal?.addEventListener("click",e=>{
  if(e.target===modal) closeModal();
});

document.querySelector(".modal-close")?.addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeModal();
});
