// auth/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBX7mbz90rM7_J5C_WuRveE2Ti3EQ8jqtA",
  authDomain: "mockmate-e4f6c.firebaseapp.com",
  projectId: "mockmate-e4f6c",
  storageBucket: "mockmate-e4f6c.appspot.com",  // <- FIXED THIS TOO!
  messagingSenderId: "504287671092",
  appId: "1:504287671092:web:85114fa3eacb20e730ab61",
  measurementId: "G-T012YFYT2G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
