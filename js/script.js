// =========================
// 💅 GLOBAL STATE
// =========================
let selected = [];

// =========================
// 💅 ADD SERVICE
// =========================
function addService(name, price){
  selected.push({ name, price });
  renderSummary();
}

// =========================
// 💅 TOGGLE DROPDOWN
// =========================
function toggleDropdown(id){
  const el = document.getElementById(id);

  if(el.style.maxHeight){
    el.style.maxHeight = null;
  } else {
    el.style.maxHeight = el.scrollHeight + "px";
  }
}

// =========================
// ❌ REMOVE SERVICE
// =========================
function removeService(index){
  selected.splice(index,1);
  renderSummary();
}

// =========================
// 💅 RENDER SUMMARY (UPDATED - NO PRICE)
// =========================
function renderSummary(){

  const summary = document.getElementById("summary");
  const selectedDiv = document.getElementById("selectedServices");

  if(!summary || !selectedDiv) return;

  if(selected.length === 0){
    selectedDiv.innerHTML = "No services added yet 💅";
    summary.innerHTML = "No services selected yet.";
    return;
  }

  // ✅ Selected services (no price)
  selectedDiv.innerHTML = selected.map((s,index) => `
    <div class="selected-item">
      <span>✨ ${s.name}</span>
      <button class="delete-btn" onclick="removeService(${index})">🗑</button>
    </div>
  `).join("");

  // ✅ Clean summary (no total, no price)
  summary.innerHTML = `
    <div class="summary-box">
      <h4>💖 Selected Services</h4>
      ${selected.map(s=>`
        <div class="summary-item">
          <span>${s.name}</span>
        </div>
      `).join("")}
    </div>
  `;
}

// =========================
// 🔙 BACK BUTTON
// =========================
function goBack(){
  window.history.back();
}

// =========================
// 📲 WHATSAPP BOOKING (UPDATED)
// =========================
function submitBooking(){

  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("userPhone").value.trim();

  if(!name || !phone || selected.length === 0){
    alert("Please fill all details properly 💖");
    return;
  }

  const serviceList = selected.map(s=>`✨ ${s.name}`).join("\n");

  const message = `💅 *New Appointment Request* 💅

🌸 *Name:* ${name}
📞 *Phone:* ${phone}

💖 *Services Selected:*
${serviceList}

✨ Looking forward to your response!`;

  const whatsappURL = `https://wa.me/919967563940?text=${encodeURIComponent(message)}`;

  const modal = document.getElementById("thankYouModal");
  if(modal){
    modal.style.display = "flex";
  }

  setTimeout(()=>{
    window.location.href = whatsappURL;
  },1200);

  setTimeout(()=>{
    window.location.href = "index.html";
  },4000);
}

// =========================
// 🖼️ GALLERY MODAL (PREMIUM)
// =========================
function openImage(img){
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display="flex";
  modalImg.src = img.src;

  // animation
  modalImg.style.transform = "scale(0.7)";
  modalImg.style.opacity = "0";

  setTimeout(()=>{
    modalImg.style.transform = "scale(1)";
    modalImg.style.opacity = "1";
  },100);
}

function closeImage(){
  const modal = document.getElementById("imageModal");
  modal.style.display="none";
}

// close on outside click
window.addEventListener("click",(e)=>{
  const modal = document.getElementById("imageModal");
  if(e.target === modal){
    closeImage();
  }
});


// =========================
// 🔁 PERFECT INFINITE SLIDER
// =========================
document.querySelectorAll(".gallery-grid").forEach(grid => {

  // duplicate content for smooth infinite loop
  grid.innerHTML += grid.innerHTML;

  let scrollAmount = 0;

  function autoSlide(){
    scrollAmount += 0.5;

    if(scrollAmount >= grid.scrollWidth / 2){
      scrollAmount = 0;
    }

    grid.scrollLeft = scrollAmount;

    requestAnimationFrame(autoSlide);
  }

  autoSlide();
});

// =========================
// 💅 SERVICES DROPDOWN
// =========================
function toggleService(header){
  const content = header.nextElementSibling;
  const arrow = header.querySelector(".arrow");

  if(content.style.maxHeight){
    content.style.maxHeight = null;
    arrow.innerText = "+";
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    arrow.innerText = "−";
  }
}

// =========================
// ✨ SCROLL ANIMATION (IMPROVED)
// =========================
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold: 0.2 });

document.querySelectorAll(".animate, .card, .service-box, .gallery-section").forEach(el=>{
  observer.observe(el);
});

// =========================
// ✨ PERFECT TYPING (FIXED)
// =========================
const textElement = document.getElementById("typingText");

if(textElement){
  const text = textElement.getAttribute("data-text");

  let i = 0;

  function type(){
    if(i < text.length){
      textElement.textContent += text[i]; // FIXED (keeps spaces + emoji)
      i++;
      setTimeout(type, 35); // FAST + SMOOTH
    }
  }

  type();
}