import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjjcGqcDnquyTmeHlfXn7N6zJORGHJ7Bg",
  authDomain: "care-pal-aantariksh.firebaseapp.com",
  databaseURL: "https://care-pal-aantariksh-default-rtdb.firebaseio.com",
  projectId: "care-pal-aantariksh",
  storageBucket: "care-pal-aantariksh.appspot.com",
  messagingSenderId: "129436487219",
  appId: "1:129436487219:web:3ed0daf6f919c59ba81d46",
};

export const app = initializeApp(firebaseConfig);

export function failMessage(err) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text:
      err ||
      "Something went wrong! Please try again later Or reach us via email/phone.",
  }).then(() => location.reload());
}

export function successMessage() {
  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: "Thank you for reaching out to us! Our team will get back to you soon",
  }).then(() => location.reload());
}
