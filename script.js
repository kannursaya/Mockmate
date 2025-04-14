
  
document.addEventListener("DOMContentLoaded", () => {
  // ==================== MATRIX ANIMATION ====================
  const canvas = document.getElementById("matrixCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = Array(256).join("1").split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#b847ff";
      ctx.font = fontSize + "px monospace";

      drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }

    setInterval(drawMatrix, 50);
  }

  // ==================== INTRO TYPE + PROGRESS ====================
  const bar = document.getElementById("bar");
  const percent = document.getElementById("percentage");
  const typingText = document.getElementById("typingText");
  const introSection = document.getElementById("intro");

  const message = "ARE YOU\nREADY TO\nACE YOUR\nINTERVIEW?";
  let displayText = "";
  let textIndex = 0;
  let progress = 0;

  function typeLetter() {
    if (textIndex < message.length) {
      displayText += message[textIndex];
      typingText.innerText = displayText;
      textIndex++;
      setTimeout(typeLetter, 40);
    }
  }

  if (typingText) typeLetter();

  const loadInterval = setInterval(() => {
    if (bar && percent) {
      progress++;
      bar.style.width = progress + "%";
      percent.innerText = progress + "%";
    }

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        if (introSection) {
          setTimeout(() => {
            introSection.style.position = "fixed";
            introSection.style.top = "-100vh";
            introSection.style.opacity = "0";
            introSection.style.pointerEvents = "none";
          }, 1000);
        }
      }, 1000);
    }
  }, 30);

  // ==================== CAROUSEL ====================
  const track = document.querySelector(".carousel-track");
  if (track) {
    const slides = Array.from(track.children);
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });
  }

  // ==================== NAVBAR UNDERLINE ====================
  const links = document.querySelectorAll(".nav-link");
  const underline = document.querySelector(".nav-underline");
  const currentPage = window.location.pathname.split("/").pop();
  let activeLink = document.querySelector(".nav-link.active");

  function setUnderline(el) {
    const rect = el.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${el.offsetLeft}px`;
  }

  if (activeLink) setUnderline(activeLink);

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      activeLink = link;
      setUnderline(link);
    }

    link.addEventListener("mouseenter", () => setUnderline(link));
    link.addEventListener("mouseleave", () => setUnderline(activeLink));
  });


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  document.addEventListener("DOMContentLoaded", () => {
    const authLinks = document.getElementById("auth-links");
  
    onAuthStateChanged(auth, (user) => {
      if (!authLinks) return;
  
      if (user) {
        // Logged in — show My Profile + Log Out
        authLinks.innerHTML = `
          <a href="my_profile.html" class="nav-link">My Profile</a>
          <a href="#" class="nav-link" id="logout-btn">Log Out</a>
        `;
  
        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          signOut(auth).then(() => {
            alert("You are logged out!");
            window.location.href = "index.html";
          });
        });
      } else {
        // Not logged in — show Sign In / Log In
        authLinks.innerHTML = `
          <a href="auth/signup.html" class="nav-link">Sign In</a>
          <a href="auth/login.html" class="nav-link">Log In</a>
        `;
      }
    });
  });
  

});
