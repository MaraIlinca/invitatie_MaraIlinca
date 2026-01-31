// =====================
// CONFIG
// =====================

// Data evenimentului: slujba începe la 16:00
const EVENT_DATE = new Date("2026-05-09T16:00:00");

// Confirmări pe WhatsApp + telefon contact
const PHONE_INTL = "+40754857249";
const WHATSAPP_NUMBER = "40754857249"; // fără +

// Locații (query text – funcționează bine pentru Maps/Waze)
const CHURCH_QUERY = "Biserica Oborul Nou Bucuresti";
const REST_QUERY = "Simposio Events Bucuresti";

// =====================
// HELPERS
// =====================
const $ = (id) => document.getElementById(id);

function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function wazeLink(query) {
  return `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;
}

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// =====================
// LOCAȚII: Maps + Waze
// =====================
$("mapsChurch").href = mapsLink(CHURCH_QUERY);
$("wazeChurch").href = wazeLink(CHURCH_QUERY);

$("mapsRest").href = mapsLink(REST_QUERY);
$("wazeRest").href = wazeLink(REST_QUERY);

// =====================
// RSVP: WhatsApp
// =====================
$("waYes").href = waLink(
  "Bună! Confirmăm cu drag prezența la botezul Marei-Ilinca, în data de 9 mai 2026. 🤍"
);

$("waMaybe").href = waLink(
  "Bună! Este posibil să ajungem la botezul Marei-Ilinca, 9 mai 2026. 🤍"
);

$("waNo").href = waLink(
  "Bună! Din păcate nu putem ajunge la botezul Marei-Ilinca, 9 mai 2026. 🤍"
);

// =====================
// CONTACT: call + copy
// =====================
const callBtn = $("callBtn");
if (callBtn) callBtn.href = `tel:${PHONE_INTL}`;

const copyBtn = $("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const hint = $("copyHint");
    try {
      await navigator.clipboard.writeText(PHONE_INTL);
      if (hint) hint.textContent = "Numărul a fost copiat ✅";
      setTimeout(() => {
        if (hint) hint.textContent = "Numărul se copiază în clipboard.";
      }, 2200);
    } catch {
      if (hint) hint.textContent = "Nu am putut copia automat. Copiază manual: " + PHONE_INTL;
    }
  });
}

// =====================
// COUNTDOWN
// =====================
function updateCountdown() {
  const el = $("countdownValue");
  if (!el) return;

  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    el.textContent = "Astăzi";
    return;
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.floor(diff / dayMs);
  const hours = Math.floor((diff % dayMs) / (60 * 60 * 1000));

  el.textContent = `${days} zile • ${hours} ore`;
}

updateCountdown();
setInterval(updateCountdown, 60_000);
