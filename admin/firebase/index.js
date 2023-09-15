import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyI2ZbSNvroxft3lpAjdQkfinMeJqd5vA",
  authDomain: "carepalmoney-website.firebaseapp.com",
  databaseURL: "https://carepalmoney-website-default-rtdb.firebaseio.com",
  projectId: "carepalmoney-website",
  storageBucket: "carepalmoney-website.appspot.com",
  messagingSenderId: "194255814168",
  appId: "1:194255814168:web:3f97f66841212f8ed64d6d",
  measurementId: "G-199P31Y6J8"
};

initializeApp(firebaseConfig);

const auth = getAuth();

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Service has been disabled by the Admin.")
    // const formProps = new FormData(event.target);
    // const formData = Object.fromEntries(formProps);
    // signInWithEmailAndPassword(auth, formData.email, formData.password)
    //   .then(() => (location.href = "/admin/contact.html"))
    //   .catch(() => failMessage());
  });
}

const loginOutButton = document.getElementById("loginOutButton");
if (loginOutButton) {
  loginOutButton.addEventListener("click", () => signOut(auth));
}

onAuthStateChanged(auth, (user) => {
  signOut(auth)
  const index = "/admin/index";
  const contact = "/admin/contact";
  const currentPage = location.pathname;

  if (user) {
    if (user.uid != "5ZF5o8ZWcVdpZly2KlA1l65TPHA2") signOut(auth);
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
