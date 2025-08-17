
const barra = document.getElementById("barra");
const header = document.getElementById("header");
const footer = document.getElementById("footer");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      barra.classList.add("hidden"); // esconde
    } else {
      barra.classList.remove("hidden"); // mostra
    }
  });
}, { threshold: 0.1 });

observer.observe(header);
observer.observe(footer);