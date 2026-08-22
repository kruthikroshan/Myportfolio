const roles = [
  "Full-Stack Development",
  "AI & ML Engineering",
  "Agentic AI Systems",
];

document.documentElement.classList.add("js");

const roleNode = document.getElementById("role-text");
let roleIndex = 0;

function rotateRoles() {
  if (!roleNode) {
    return;
  }

  roleNode.style.opacity = "0";
  roleNode.style.transform = "translateY(4px)";

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleNode.textContent = roles[roleIndex];
    roleNode.style.opacity = "1";
    roleNode.style.transform = "translateY(0)";
  }, 220);
}

if (roleNode) {
  roleNode.style.transition = "opacity 0.22s ease, transform 0.22s ease";
  setInterval(rotateRoles, 2200);
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearNode = document.getElementById("current-year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

/* --- Chatbot Logic --- */
const chatToggle = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const chatClose = document.getElementById("chatbot-close");
const chatForm = document.getElementById("chatbot-form");
const chatInput = document.getElementById("chatbot-input");
const chatMessages = document.getElementById("chatbot-messages");

if (chatToggle && chatWindow && chatClose) {
  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
    if (!chatWindow.classList.contains("hidden")) {
      chatInput.focus();
    }
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
  });
}

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Add user message
    appendMessage(text, "user-msg");
    chatInput.value = "";
    
    // Process bot response
    setTimeout(() => {
      const response = getBotResponse(text.toLowerCase());
      appendMessage(response, "bot-msg");
    }, 500);
  });
}

function appendMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-msg ${className}`;
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
  if (input.includes("contact") || input.includes("email") || input.includes("whatsapp") || input.includes("reach") || input.includes("phone")) {
    return "You can reach Kruthik via Email: godishalakruthikroshan7@gmail.com or WhatsApp: +91 8919611228. Check the Contact section for quick links!";
  } else if (input.includes("project") || input.includes("work") || input.includes("portfolio")) {
    return "Kruthik has built several amazing projects including MAEPS (AI Multi-Agent System), EduTrack AI, and the SRU Agentic AI RAG System. Scroll to the Featured Projects section to see them!";
  } else if (input.includes("skill") || input.includes("tech") || input.includes("stack") || input.includes("know")) {
    return "Kruthik is a Full Stack & AI/ML Engineer skilled in Java, Python, React.js, Node.js, Spring Boot, and AI pipelines like RAG and LangChain.";
  } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
    return "Hello! How can I help you learn more about Kruthik today?";
  } else if (input.includes("who") || input.includes("about") || input.includes("kruthik")) {
    return "Kruthik Roshan is a Computer Science undergraduate, Full-Stack Developer, and AI/ML Engineer passionate about building intelligent, scalable systems.";
  } else {
    return "I'm a simple AI assistant! I can tell you about Kruthik's skills, projects, or how to contact him. Could you rephrase your question?";
  }
}