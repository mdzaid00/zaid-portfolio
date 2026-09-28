(() => {
  "use strict";

  const projects = [
    {
      id: "zaidbiotrack",
      title: "ZaidBioTrack",
      category: "biotech",
      label: "BIOTECHNOLOGY",
      status: "In Development",
      image: "assets/project1.png",
      description: "A smart academic and lab management platform designed to help biotechnology students track syllabus progress, practicals, notes and academic activities.",
      tools: "Flask · Python · SQLite",
      type: "Platform Concept",
      link: "",
      action: "Explore Project"
    },
    {
      id: "nexus",
      title: "NEXUS-AI",
      category: "ai",
      label: "ARTIFICIAL INTELLIGENCE",
      status: "In Development",
      image: "assets/project2.png",
      description: "A biotechnology research copilot concept connecting literature research, genetics, data analysis and scientific report creation into one workflow.",
      tools: "Python · AI · Research",
      type: "AI Research Concept",
      link: "https://github.com/mdzaid00/NEXUS-AI",
      action: "View GitHub"
    },
    {
      id: "automation",
      title: "AI YouTube Automation",
      category: "ai",
      label: "AI AUTOMATION",
      status: "Workflow Project",
      image: "assets/project3.png",
      description: "An automation workflow concept for turning topic ideas into Hindi or Hinglish video scripts, titles, hashtags and organized content records.",
      tools: "n8n · Gemini · Google Sheets",
      type: "Automation Workflow",
      link: "",
      action: "Explore Project"
    },
    {
      id: "portfolio",
      title: "Creative Portfolio",
      category: "web",
      label: "WEB DESIGN",
      status: "Live Website",
      image: "",
      description: "A personal portfolio showcasing creative services, AI experiments, development work and biotechnology interests in a responsive dark interface.",
      tools: "HTML · CSS · JavaScript",
      type: "Personal Website",
      link: "https://github.com/mdzaid00/zaid-portfolio",
      action: "View GitHub"
    },
    {
      id: "ebook",
      title: "Python Starter E-Book",
      category: "education",
      label: "EDUCATION",
      status: "Learning Resource",
      image: "",
      description: "A beginner-friendly Python learning resource planned for students who are starting programming from zero, with clear explanations and practical examples.",
      tools: "Python · Educational Design",
      type: "Educational Content",
      link: "",
      action: "Explore Project"
    }
  ];

  const existing = document.querySelector("#projects") ||
    document.querySelector(".projects-section");

  let section = existing;
  if (!section) {
    section = document.createElement("section");
    section.id = "projects";
    const contact = document.querySelector("#contact, .contact-section");
    if (contact) contact.before(section);
    else document.body.appendChild(section);
  }

  section.id = "projects";
  section.classList.add("pg-section");

  section.innerHTML = `
    <div class="pg-shell">
      <header class="pg-heading">
        <div class="pg-eyebrow"><span></span> SELECTED WORK / 2026</div>
        <div class="pg-heading-row">
          <div>
            <h2>Ideas into <span>Reality.</span></h2>
            <p class="pg-intro">A collection of experiments, digital products and creative solutions I'm building.</p>
          </div>
          <div class="pg-counter"><strong>05</strong><span>PROJECTS<br>SHOWCASED</span></div>
        </div>
      </header>

      <nav class="pg-filters" aria-label="Filter projects">
        <button class="pg-filter active" data-filter="all">All work <span>05</span></button>
        <button class="pg-filter" data-filter="ai">AI & Automation</button>
        <button class="pg-filter" data-filter="biotech">Biotechnology</button>
        <button class="pg-filter" data-filter="web">Web Design</button>
        <button class="pg-filter" data-filter="education">Education</button>
      </nav>

      <div class="pg-grid">
        ${projects.map((p, i) => `
          <article class="pg-card ${i === 0 ? "pg-featured" : ""}" data-category="${p.category}">
            <div class="pg-art pg-art-${p.id}">
              ${p.image
                ? `<img src="${p.image}" alt="${p.title} project preview" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('pg-no-image')">`
                : ""}
              <div class="pg-art-overlay"></div>
              <span class="pg-art-index">0${i + 1} / 05</span>
              <span class="pg-art-symbol">${{
                zaidbiotrack: "⌬",
                nexus: "N<span>•</span>AI",
                automation: "↗",
                portfolio: "✳",
                ebook: "{ }"
              }[p.id]}</span>
              <span class="pg-art-label">${p.label}</span>
              <button class="pg-open" data-details="${p.id}" aria-label="View ${p.title} details">↗</button>
            </div>
            <div class="pg-card-body">
              <div class="pg-meta"><span>${p.type}</span><span class="pg-status">${p.status}</span></div>
              <h3>${p.title}</h3>
              <p>${p.description}</p>
              <div class="pg-tools">${p.tools.split(" · ").map(t => `<span>${t}</span>`).join("")}</div>
              <button class="pg-details" data-details="${p.id}">${p.action}<span>↗</span></button>
            </div>
          </article>
        `).join("")}
      </div>

      <div class="pg-bottom">
        <span><i></i> BUILT WITH CURIOSITY. DESIGNED TO SOLVE.</span>
        <span>MORE EXPERIMENTS IN PROGRESS ↘</span>
      </div>
    </div>

    <div class="pg-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="pg-modal-title">
      <div class="pg-modal-backdrop" data-close></div>
      <div class="pg-modal-box">
        <button class="pg-modal-close" data-close aria-label="Close details">×</button>
        <div class="pg-modal-eyebrow">PROJECT OVERVIEW / <span class="pg-modal-number">01</span></div>
        <h3 id="pg-modal-title"></h3>
        <p class="pg-modal-description"></p>
        <div class="pg-modal-info"></div>
        <a class="pg-modal-link" href="#" target="_blank" rel="noopener noreferrer">Open Project ↗</a>
        <p class="pg-modal-note">Personal project showcase. Features and availability may evolve during development.</p>
      </div>
    </div>
  `;

  const cards = [...section.querySelectorAll(".pg-card")];
  const filters = [...section.querySelectorAll(".pg-filter")];
  const modal = section.querySelector(".pg-modal");
  const modalTitle = section.querySelector("#pg-modal-title");
  const modalDesc = section.querySelector(".pg-modal-description");
  const modalInfo = section.querySelector(".pg-modal-info");
  const modalLink = section.querySelector(".pg-modal-link");
  let previousFocus = null;

  filters.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filters.forEach(b => b.classList.toggle("active", b === button));
      cards.forEach(card => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) {
          card.classList.remove("pg-card-in");
          requestAnimationFrame(() => card.classList.add("pg-card-in"));
        }
      });
    });
  });

  function openDetails(id) {
    const p = projects.find(item => item.id === id);
    if (!p) return;
    previousFocus = document.activeElement;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.description;
    modalInfo.innerHTML = `
      <div><span>TYPE</span><strong>${p.type}</strong></div>
      <div><span>STATUS</span><strong>${p.status}</strong></div>
      <div><span>TOOLS</span><strong>${p.tools}</strong></div>
    `;
    modalLink.hidden = !p.link;
    if (p.link) {
      modalLink.href = p.link;
      modalLink.textContent = p.action + " ↗";
    }
    section.querySelector(".pg-modal-number").textContent =
      String(projects.indexOf(p) + 1).padStart(2, "0");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("pg-modal-open");
    section.querySelector(".pg-modal-close").focus();
  }

  function closeDetails() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pg-modal-open");
    if (previousFocus && previousFocus.focus) previousFocus.focus();
  }

  section.querySelectorAll("[data-details]").forEach(button => {
    button.addEventListener("click", () => openDetails(button.dataset.details));
  });
  section.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", closeDetails);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeDetails();
  });

  // Subtle pointer glow and tilt only on desktop.
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    cards.forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--card-x", (e.clientX - r.left) + "px");
        card.style.setProperty("--card-y", (e.clientY - r.top) + "px");
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        card.style.setProperty("--card-rx", (-y * 2.5) + "deg");
        card.style.setProperty("--card-ry", (x * 3) + "deg");
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--card-rx", "0deg");
        card.style.setProperty("--card-ry", "0deg");
      });
    });
  }

  cards.forEach((card, i) => {
    card.style.setProperty("--card-delay", (i * 75) + "ms");
    card.classList.add("pg-card-in");
  });
})();
