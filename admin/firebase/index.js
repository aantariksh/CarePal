import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBjjcGqcDnquyTmeHlfXn7N6zJORGHJ7Bg",
    authDomain: "care-pal-aantariksh.firebaseapp.com",
    databaseURL: "https://care-pal-aantariksh-default-rtdb.firebaseio.com",
    projectId: "care-pal-aantariksh",
    storageBucket: "care-pal-aantariksh.appspot.com",
    messagingSenderId: "129436487219",
    appId: "1:129436487219:web:3ed0daf6f919c59ba81d46",
  };

initializeApp(firebaseConfig);

const auth = getAuth();

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formProps = new FormData(event.target);
    const formData = Object.fromEntries(formProps);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => (location.href = "/CarePal/admin/contact.html"))
      .catch(() => failMessage());
  });
}

const loginOutButton = document.getElementById("loginOutButton");
if (loginOutButton) {
  loginOutButton.addEventListener("click", () => signOut(auth));
}

onAuthStateChanged(auth, (user) => {
  const index = "/CarePal/admin/index";
  const contact = "/CarePal/admin/contact";
  const currentPage = location.pathname;

  if (user) {
    if (user.uid != "LyLRyuc4tUMrFZoIgwh29SRhs6s2") signOut(auth);
    if (currentPage.startsWith(index)) {
      location.pathname = contact + ".html";
    }
  } else {
    if (!currentPage.startsWith(index)) {
      location.pathname = index + ".html";
    }
  }
});

export function failMessage() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Login Failed",
  }).then(() => location.reload());
}
