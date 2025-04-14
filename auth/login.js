// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBX7mbz90rM7_J5C_WuRveE2Ti3EQ8jqtA",
  authDomain: "mockmate-e4f6c.firebaseapp.com",
  projectId: "mockmate-e4f6c",
  storageBucket: "mockmate-e4f6c.appspot.com",
  messagingSenderId: "504287671092",
  appId: "1:504287671092:web:85114fa3eacb20e730ab61",
  measurementId: "G-T012YFYT2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("✅ Login successful!");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 300);
    })
    .catch((error) => {
      alert("❌ " + error.message);
      console.error("Login error:", error);
    });
});
