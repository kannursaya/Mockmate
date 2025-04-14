
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

    const firebaseConfig = {
      apiKey: "AIzaSyBX7mbz90rM7_J5C_WuRveE2Ti3EQ8jqtA",
      authDomain: "mockmate-e4f6c.firebaseapp.com",
      projectId: "mockmate-e4f6c",
      storageBucket: "mockmate-e4f6c.firebasestorage.app",
      messagingSenderId: "504287671092",
      appId: "1:504287671092:web:85114fa3eacb20e730ab61",
      measurementId: "G-T012YFYT2G"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const submit = document.getElementById("submit");
    submit.addEventListener("click", (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("🎉 Account created successfully!");
          window.location.href = "login.html"; 
          // Optional: redirect to profile or login
          // window.location.href = "login.html";
        })
        .catch((error) => {
          alert("❌ " + error.message);
          console.error("Error:", error);
        });
    });
