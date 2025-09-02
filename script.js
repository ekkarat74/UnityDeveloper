// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 🌙 Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  
  if (body.classList.contains('dark')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

// Typing Effect
const roles = ["Game Programmer", "Unity Developer"];
let roleIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (roles.length) setTimeout(type, 500);
});

// 🚀 Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 800);
});

// Smooth Scroll Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section, .card, .project-card").forEach(el => observer.observe(el));

// Sticky Navbar + Active Link Highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 100;
    if (pageYOffset >= secTop) current = sec.getAttribute("id");
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// 🌌 Particle Effect for Hero Section
const canvas = document.getElementById("heroParticles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = document.getElementById("mainHeader").offsetHeight;

let particles = [];
const neonColors = ["#00f5ff", "#ff00ff", "#ff007f"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas if window size changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("mainHeader").offsetHeight;
  initParticles();
});
