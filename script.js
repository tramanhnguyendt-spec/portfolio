/* =========================================================
   MEDIA — CHỈ CẦN SỬA TÊN FILE Ở ĐÂY
   Tất cả ảnh + video bỏ chung vào thư mục: media/

   Ví dụ:
   profile: "profile.jpg"
   banner01: "banner-01.jpg"
   video01: "video-01.mp4"

   Không cần sửa HTML khi đổi ảnh.
   ========================================================= */
const MEDIA = {
  // HERO
  profile: "profile.jpg",

  // G OFFICE — 3 ảnh evidence
  gofficeTraffic: "goffice-organic-traffic.png",
  gofficeKeywords: "goffice-organic-keywords.png",
  gofficeRanking: "goffice-keyword-ranking.png",

  // VISA MINH QUÂN — 5 ảnh evidence
  visaRankingOverview: "visa-ranking-overview.png",
  visaKeywordDetail: "visa-keyword-detail.png",
  visaAiOverview: "visa-ai-overview.png",
  visaTraffic: "visa-organic-traffic.png",
  visaProgress: "visa-seo-progress.png",

  // CREATIVE
  banner01: "banner-01.jpg",
  thumbnail01: "thumbnail-01.jpg",
  social01: "social-01.jpg",
  video01: "video-01.mp4"
};

const MEDIA_PATH = "media/";
const mediaUrl = key => MEDIA[key] ? MEDIA_PATH + MEDIA[key] : "";

function loadImageSlot(slot, key, alt){
  const src = mediaUrl(key);
  if(!src || !slot) return;

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "Nguyễn Trâm Anh — Portfolio";
  img.loading = "lazy";
  img.decoding = "async";

  img.addEventListener("error", () => {
    slot.classList.add("media-missing");
    img.remove();
  });

  slot.prepend(img);
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
    img.addEventListener("error", () => img.remove());
    heroPortrait.prepend(img);
  }
}

// Evidence
const evidenceAlt = {
  gofficeTraffic: "G Office Organic Traffic",
  gofficeKeywords: "G Office Organic Keywords",
  gofficeRanking: "G Office Keyword Ranking",
  visaRankingOverview: "Visa Minh Quân Ranking Overview",
  visaKeywordDetail: "Visa Minh Quân Keyword Detail",
  visaAiOverview: "Visa Minh Quân SERP AI Overview",
  visaTraffic: "Visa Minh Quân Organic Traffic",
  visaProgress: "Visa Minh Quân SEO Progress"
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
  img.src = src;
  img.alt = creativeAlt[key] || "Creative work — Nguyễn Trâm Anh";
  img.loading = "lazy";
  img.decoding = "async";
  img.addEventListener("error", () => img.remove());
  slot.innerHTML = "";
  slot.appendChild(img);
});

// Creative video
const videoCard = document.querySelector("[data-video-media]");
if(videoCard){
  const key = videoCard.dataset.videoMedia;
  const src = mediaUrl(key);
  if(src){
    const videoSlot = videoCard.querySelector(".video-slot");
    if(videoSlot){
      videoSlot.innerHTML = `
        <video class="creative-video" controls preload="metadata" playsinline>
          <source src="${src}" type="video/mp4">
          Trình duyệt của bạn không hỗ trợ video.
        </video>`;
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
   IMAGE MODAL
   ========================================================= */
const modal=document.getElementById("imageModal");
const modalImage=document.getElementById("modalImage");

document.querySelectorAll("[data-modal-media]").forEach(card=>{
  card.addEventListener("click",()=>{
    const key=card.dataset.modalMedia;
    const src=mediaUrl(key);
    if(!src) return;
    modalImage.src=src;
    modalImage.alt=creativeAlt[key] || "Tác phẩm Creative của Nguyễn Trâm Anh";
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
