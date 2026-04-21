function updateRealEstateContent() {
  const path = window.location.pathname.toLowerCase();
  const h1 = document.querySelector("h1");
  const lead = document.querySelector(".section.alt p");
  const cards = Array.from(document.querySelectorAll(".grid .card"));
  if (!h1 || !lead || !cards.length) return;

  const map = {
    "buyers": {
      lead: "A concierge buying experience with clear strategy, private tours, and confident negotiations.",
      cards: [
        ["Step 1: Financing", "We connect you with lending partners and define a comfort-zone budget before tours begin."],
        ["Step 2: Private Tours", "Curated tours with neighborhood context, resale outlook, and total-cost visibility."]
      ]
    },
    "sellers": {
      lead: "Sell with premium presentation, data-backed pricing, and a process designed to minimize stress.",
      cards: [
        ["Pre-Launch Prep", "Staging guidance, photography planning, and timeline mapping before listing day."],
        ["Offer Positioning", "We evaluate every offer by price, certainty, timeline, and concession impact."]
      ]
    },
    "communities": {
      lead: "Explore North Atlanta communities with lifestyle highlights, school context, and price band snapshots.",
      cards: [
        ["Downtown + Mixed Use", "Walkability, dining, and lock-and-leave options for busy professionals."],
        ["Suburban Estates", "Larger lots, quiet streets, and family-friendly amenities near top commuter routes."]
      ]
    },
    "team": {
      lead: "Principal-led representation with trusted vendor partners and high-communication transaction support.",
      cards: [
        ["James Ashford", "Lead advisor with 22 years of luxury market expertise and disciplined deal execution."],
        ["Client Support Team", "Contract coordination, showing logistics, and updates so you always know the next step."]
      ]
    },
    "testimonials": {
      lead: "Client feedback from recent buyer and seller engagements across North Atlanta.",
      cards: [
        ["Seller", "\"Our home launched beautifully and closed above ask with a smooth timeline.\""],
        ["Buyer", "\"We had clarity on every decision and never felt rushed or uninformed.\""]
      ]
    },
    "contact": {
      lead: "Tell us your timeline, goals, and preferred neighborhoods. We respond quickly with next steps.",
      cards: [
        ["Office", "8500 Windward Parkway, Suite 210, Alpharetta, GA"],
        ["Direct Line", "(770) 555-0192"]
      ]
    },
    "home-search": {
      lead: "Filter by price, beds, and neighborhood priorities. We can also source private inventory.",
      cards: [
        ["Featured Search", "Luxury homes over $1.5M near top-ranked schools and commuter corridors."],
        ["Off-Market Access", "Request private inventory alerts through our network."]
      ]
    },
    "home-valuation": {
      lead: "Receive a custom valuation report with comps, timing recommendations, and value drivers.",
      cards: [
        ["Market Position", "Current demand, competition level, and realistic buyer expectations."],
        ["Action Plan", "Recommendations for prep, launch timing, and price strategy."]
      ]
    },
    "blog": {
      lead: "Market insights and practical guidance for buyers and sellers navigating luxury transactions.",
      cards: [
        ["Pricing in a Shifting Market", "How to avoid stale listings while still protecting your equity position."],
        ["Offer Terms That Matter", "Beyond price: timelines, contingencies, and clean-close structure."]
      ]
    }
  };

  const key = Object.keys(map).find((k) => path.includes("/" + k + "/"));
  if (!key) return;
  lead.textContent = map[key].lead;
  cards.slice(0, 2).forEach((card, i) => {
    const h3 = card.querySelector("h3");
    const p = card.querySelector("p");
    if (h3) h3.textContent = map[key].cards[i][0];
    if (p) p.textContent = map[key].cards[i][1];
  });
}

function setupForms() {
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const thanks = form.querySelector(".thanks");
      if (thanks) {
        thanks.style.display = "block";
        thanks.textContent = "Thank you. We received your request and will contact you shortly.";
      }
      form.reset();
    });
  });
}

function setActiveNav() {
  const path = window.location.pathname.toLowerCase();
  document.querySelectorAll("nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    const isIndex = href.endsWith("index.html") || href === "../index.html" || href === "index.html";
    const match = isIndex
      ? (path.endsWith("/index.html") && href.endsWith("index.html")) || path.endsWith("/")
      : path.includes(href.replace("../", ""));
    if (match) a.classList.add("is-active");
  });
}

function initSliders() {
  document.querySelectorAll("[data-slider]").forEach((root) => {
    const track = root.querySelector(".slider-track");
    const slides = Array.from(root.querySelectorAll(".slide"));
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    if (!track || slides.length < 2) return;
    let idx = 0;
    const draw = () => { track.style.transform = "translateX(-" + idx * 100 + "%)"; };
    if (prev) prev.addEventListener("click", () => { idx = (idx - 1 + slides.length) % slides.length; draw(); });
    if (next) next.addEventListener("click", () => { idx = (idx + 1) % slides.length; draw(); });
    draw();
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateRealEstateContent();
  setActiveNav();
  initSliders();
  setupForms();
  setYear();
});
