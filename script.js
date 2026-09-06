// PORTFOLIO MEDIA FIX v4 — exact filenames + clean hero placeholder
/* =========================================================
   MEDIA — CHỈ CẦN SỬA TÊN FILE Ở ĐÂY
   Tất cả ảnh + video bỏ chung vào thư mục: media/

   Ví dụ:
   profile: "profile.png"
   banner01: "banner-01.png"
   video01: "LINK TIKTOK"

   Ảnh nằm trong media/. Video TikTok chỉ cần dán link, không cần tải MP4.
   ========================================================= */
const MEDIA = {
  // HERO
  profile: "profile.png",

  // G OFFICE — 2 ảnh evidence
  gofficeKeywords: "goffice-organic-keywords.png",
  gofficeRanking: "goffice-keyword-ranking.png",

  // VISA MINH QUÂN — 4 ảnh evidence
  visaRankingOverview: "visa-ranking-overview.png",
  visaKeywordDetail: "visa-keyword-detail.png",
  visaAiOverview: "visa-seo-progress.png",
  visaTraffic: "visa-organic-traffic.png",

  // CREATIVE
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

function loadImageSlot(slot, key, alt){
  const src = mediaUrl(key);
  if(!src || !slot) return;

  const img = document.createElement("img");
  img.className = "portfolio-zoomable";
  img.src = src;
  img.alt = alt || "Nguyễn Trâm Anh — Portfolio";
  img.decoding = "async";

  img.addEventListener("error", () => {
    slot.classList.add("media-missing");
    slot.innerHTML = '<span class="media-placeholder">Không tải được ảnh</span>';
    console.warn("Không tải được media:", src);
  });

  slot.innerHTML = "";
  slot.appendChild(img);
}

// Hero
const heroPortrait = document.querySelector(".portrait-placeholder[data-media]");
if(heroPortrait){
  const key = heroPortrait.dataset.media;
  const src = mediaUrl(key);
  if(src){
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Nguyễn Trâm Anh — SEO Executive";
    img.fetchPriority = "high";
    img.decoding = "async";
    img.addEventListener("error", () => {
      img.remove();
      console.warn("Không tải được media:", src);
    });
    // Xóa hoàn toàn chữ placeholder "ẢNH TRÂM ANH" trước khi chèn ảnh
    heroPortrait.innerHTML = "";
    heroPortrait.appendChild(img);
  }
}

// Evidence
const evidenceAlt = {
  gofficeKeywords: "G Office Organic Traffic and Keywords",
  gofficeRanking: "G Office Keyword Ranking",
  visaRankingOverview: "Visa Minh Quân Ranking Overview",
  visaKeywordDetail: "Visa Minh Quân Keyword Growth",
  visaAiOverview: "Visa Minh Quân SERP AI Overview",
  visaTraffic: "Visa Minh Quân Organic and Referral Traffic"
};

document.querySelectorAll(".evidence-media[data-media]").forEach(slot => {
  loadImageSlot(slot, slot.dataset.media, evidenceAlt[slot.dataset.media]);
});

// Creative images
const creativeAlt = {
  banner01: "Banner / Visual — Nguyễn Trâm Anh",
  thumbnail01: "Thumbnail — Nguyễn Trâm Anh",
  social01: "Social Post — Nguyễn Trâm Anh"
};

document.querySelectorAll(".media-slot[data-media]").forEach(slot => {
  const key = slot.dataset.media;
  const src = mediaUrl(key);
  if(!src) return;

  const img = document.createElement("img");
  img.className = "portfolio-zoomable";
  img.src = src;
  img.alt = creativeAlt[key] || "Creative work — Nguyễn Trâm Anh";
  img.decoding = "async";
  img.addEventListener("error", () => {
    img.remove();
    console.warn("Không tải được media:", src);
  });
  slot.innerHTML = "";
  slot.appendChild(img);
});

// Creative video — TikTok Embed
const videoCard = document.querySelector("[data-video-media]");
if(videoCard){
  const key = videoCard.dataset.videoMedia;
  const src = MEDIA[key];
  const videoSlot = videoCard.querySelector(".video-slot");

  if(src && videoSlot){
    const match = String(src).match(/video\/(\d+)/);
    const videoId = match ? match[1] : "";

    if(videoId){
      videoSlot.innerHTML = `
        <div class="tiktok-embed-wrap">
          <iframe
            src="https://www.tiktok.com/player/v1/${videoId}?description=1&music_info=1"
            title="TikTok video — Creative work — Nguyễn Trâm Anh"
            loading="lazy"
            allow="fullscreen"
            allowfullscreen>
          </iframe>
        </div>`;
    } else {
      videoSlot.innerHTML = `<a class="video-link" href="${src}" target="_blank" rel="noopener noreferrer">Xem video trên TikTok</a>`;
    }
  }
}

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
