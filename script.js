"use strict";

// No API, dependencies or storage: every interaction stays in the browser.
const robots = {
  scoutbot: {
    name: "ScoutBot",
    category: "Compact & isotherme",
    image: "image.png",
    alt: "Un client récupère un colis dans son ScoutBot LoadBot",
    id: "LB — 001",
    destination: "Un repas chaud. Un client heureux.",
    description: "Le plus proche de vos clients. ScoutBot accompagne les livraisons de repas et de petits colis avec une chambre thermique active. Chaud ou froid, chaque commande garde la bonne température jusqu’à destination.",
    specs: [
      ["Mission", "Repas & petits colis"],
      ["Plage thermique", "−4 °C à +65 °C"],
      ["Rayon d’action", "15 km / charge"],
      ["Service", "Location & maintenance intégrée"],
    ],
  },
  colbot: {
    name: "ColBot",
    category: "Urbain & grande capacité",
    image: "AH0tHeouxTXQAAAAAElFTkSuQmCC.png",
    alt: "ColBot, le véhicule autonome LoadBot, dans une rue urbaine",
    id: "LB — 002",
    destination: "Au plus près de vos clients.",
    description: "La capacité qui fait avancer vos tournées. ColBot est conçu pour transporter plusieurs colis et des volumes importants jusqu’à la porte de vos clients. Une solution électrique pour les missions logistiques urbaines.",
    specs: [
      ["Mission", "Colis & grands volumes"],
      ["Capacité", "Transport multi-colis"],
      ["Motorisation", "100 % électrique"],
      ["Service", "Location & maintenance intégrée"],
    ],
  },
  aerobot: {
    name: "AéroBot",
    category: "Aérien & express",
    image: "ciMizlIY7i6mTo0ZB7JkRnGlyynBl5utDlSgS6vbxeijNlGHJ7pCM7eUrDR1z4bxmvN1zdf1uq5JwiNoHVSSMlU2FdglsMzM8CGzf8XJzT8HUxwUZEAAAAASUVORK5CYII.png",
    alt: "AéroBot, le drone de livraison LoadBot, en vol dans un ciel bleu",
    id: "LB — 003",
    destination: "Les distances prennent de la hauteur.",
    description: "Une autre façon de rapprocher les distances. AéroBot est le drone du concept LoadBot, pensé pour les livraisons express et médicales, les zones enclavées et les trajets où le trafic fait perdre un temps précieux.",
    specs: [
      ["Mission", "Livraison aérienne express"],
      ["Usage", "Colis urgents & médical"],
      ["Terrain", "Zones isolées ou congestionnées"],
      ["Service", "Location & maintenance intégrée"],
    ],
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileNav = document.getElementById("mobile-nav");
const menuToggle = document.querySelector(".menu-toggle");

function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  menuToggle.querySelector("use").setAttribute("href", "#i-menu");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  menuToggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
});
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia("(min-width: 760px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

// Manual hero selection keeps the presentation under the speaker's control.
const heroImage = document.getElementById("hero-image");
const heroButtons = document.querySelectorAll("[data-hero-model]");
heroButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const robot = robots[button.dataset.heroModel];
    heroButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    heroImage.src = robot.image;
    heroImage.alt = robot.alt;
    document.getElementById("hero-visual-id").textContent = robot.id;
    document.getElementById("hero-destination").textContent = robot.destination;
  });
});

// Native dialogs provide focus trapping, Escape handling and focus restoration.
const dialogs = document.querySelectorAll("dialog");
function openDialog(dialog) {
  closeMenu();
  dialog.showModal();
  document.body.classList.add("modal-open");
}
dialogs.forEach((dialog) => {
  dialog.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.body.classList.toggle("modal-open", Array.from(dialogs).some((item) => item.open));
  });
  // Close only when both pointer down and up are on the backdrop.
  let pointerStartedOutside = false;
  const outside = (event) => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener("pointerdown", (event) => { pointerStartedOutside = outside(event); });
  dialog.addEventListener("click", (event) => {
    if (pointerStartedOutside && outside(event)) dialog.close();
    pointerStartedOutside = false;
  });
});

const robotDialog = document.getElementById("robot-dialog");
let selectedRobot = "fleet";
document.querySelectorAll("[data-robot]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedRobot = button.dataset.robot;
    const robot = robots[selectedRobot];
    const image = document.getElementById("robot-dialog-image");
    image.src = robot.image;
    image.alt = robot.alt;
    document.getElementById("robot-dialog-category").textContent = robot.category;
    document.getElementById("robot-dialog-title").textContent = robot.name;
    document.getElementById("robot-dialog-description").textContent = robot.description;
    const specs = document.getElementById("robot-dialog-specs");
    specs.replaceChildren();
    robot.specs.forEach(([label, value]) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      specs.append(row);
    });
    openDialog(robotDialog);
    robotDialog.scrollTop = 0;
  });
});

const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");
document.getElementById("robot-contact").addEventListener("click", () => {
  robotDialog.close();
  form.hidden = false;
  formSuccess.hidden = true;
  document.getElementById("robot-interest").value = selectedRobot;
  document.querySelector(".contact-panel").scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "start" });
  document.getElementById("name").focus({ preventScroll: true });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const companyInput = document.getElementById("company");
  nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Merci d’indiquer votre nom.");
  companyInput.setCustomValidity(companyInput.value.trim() ? "" : "Merci d’indiquer votre entreprise.");
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const interest = data.get("robot");
  const robotName = interest === "fleet" ? "la flotte LoadBot" : robots[interest].name;
  document.getElementById("success-message").textContent = `Merci ${data.get("name").trim()}. Votre demande de démonstration pour ${robotName}, au nom de ${data.get("company").trim()}, a bien été simulée.`;
  form.hidden = true;
  formSuccess.hidden = false;
  form.reset();
  formSuccess.focus({ preventScroll: true });
});
["name", "company"].forEach((id) => {
  document.getElementById(id).addEventListener("input", (event) => event.target.setCustomValidity(""));
});
document.getElementById("reset-form").addEventListener("click", () => {
  form.reset();
  formSuccess.hidden = true;
  form.hidden = false;
  document.getElementById("name").focus({ preventScroll: true });
});

// A short, pausable delivery simulation; no live location or network request.
const demoDialog = document.getElementById("demo-dialog");
const demoControl = document.getElementById("demo-control");
const demoRoute = document.getElementById("demo-route");
const demoMarker = document.getElementById("demo-marker");
const demoProgress = document.getElementById("demo-progress");
const routeLength = demoRoute.getTotalLength();
const stages = [
  { title: "Prêt à partir.", copy: "Un repas à livrer. Une mission simple : arriver à la bonne température." },
  { title: "En route vers le client.", copy: "ScoutBot traverse le quartier. La chambre thermique préserve la commande." },
  { title: "Vous êtes à destination.", copy: "ScoutBot est arrivé. Le client peut récupérer sa commande dans le compartiment." },
  { title: "Livré. Et un sourire de plus.", copy: "La commande a été récupérée. ScoutBot est prêt pour son prochain mouvement." },
];
let progress = 0;
let running = false;
let frame = null;
let previousTime = null;
let currentStage = -1;
const duration = 14000;

function updateDemo() {
  const point = demoRoute.getPointAtLength(routeLength * Math.min(progress, 1));
  demoMarker.setAttribute("transform", `translate(${point.x} ${point.y})`);
  const percent = progress >= 1 ? 100 : Math.floor(progress * 100);
  document.getElementById("demo-progress-fill").style.width = `${percent}%`;
  demoProgress.setAttribute("aria-valuenow", String(percent));
  document.getElementById("demo-percent").textContent = `${percent} % du trajet`;
  const stage = progress >= 1 ? 3 : progress >= .84 ? 2 : progress > .1 ? 1 : 0;
  if (stage !== currentStage) {
    currentStage = stage;
    document.getElementById("demo-status").textContent = stages[stage].title;
    document.getElementById("demo-status-copy").textContent = stages[stage].copy;
    document.querySelectorAll("[data-step]").forEach((step) => {
      const index = Number(step.dataset.step);
      step.classList.toggle("is-current", index === stage);
      step.classList.toggle("is-complete", index < stage);
    });
  }
}

function setDemoButton(label, icon) {
  demoControl.replaceChildren(document.createTextNode(label));
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", icon);
  svg.append(use);
  demoControl.append(svg);
}

function stopDemo() {
  running = false;
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null;
  previousTime = null;
}

function animateDemo(timestamp) {
  if (!running) return;
  if (previousTime !== null) progress = Math.min(1, progress + Math.min(timestamp - previousTime, 100) / duration);
  previousTime = timestamp;
  updateDemo();
  if (progress >= 1) {
    stopDemo();
    setDemoButton("Rejouer la livraison", "#i-arrow");
    return;
  }
  frame = requestAnimationFrame(animateDemo);
}

function resetDemo() {
  stopDemo();
  progress = 0;
  currentStage = -1;
  updateDemo();
  setDemoButton("Lancer la livraison", "#i-play");
}

document.querySelectorAll("[data-open-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    resetDemo();
    openDialog(demoDialog);
    demoDialog.scrollTop = 0;
  });
});
demoDialog.addEventListener("close", stopDemo);
demoControl.addEventListener("click", () => {
  if (running) {
    stopDemo();
    setDemoButton("Reprendre la livraison", "#i-play");
    return;
  }
  if (progress >= 1) resetDemo();
  // Users requesting reduced motion can step through the four delivery states.
  if (reducedMotion.matches) {
    const milestones = [.2, .85, 1];
    progress = milestones.find((value) => value > progress) ?? 1;
    updateDemo();
    setDemoButton(progress >= 1 ? "Rejouer la livraison" : "Étape suivante", "#i-arrow");
    return;
  }
  running = true;
  setDemoButton("Mettre en pause", "#i-clock");
  frame = requestAnimationFrame(animateDemo);
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && running) {
    stopDemo();
    setDemoButton("Reprendre la livraison", "#i-play");
  }
});

// Reveal content progressively; it remains visible when JavaScript is disabled.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
  document.documentElement.classList.add("js-ready");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(`.desktop-nav a[href="#${entry.target.id}"]`);
      if (link) {
        link.classList.toggle("is-active", entry.isIntersecting);
        if (entry.isIntersecting) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-15% 0px -55% 0px" });
  ["flotte", "solution", "impact"].forEach((id) => navObserver.observe(document.getElementById(id)));
}

document.getElementById("year").textContent = new Date().getFullYear();
