// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDyI2ZbSNvroxft3lpAjdQkfinMeJqd5vA",
//   authDomain: "carepalmoney-website.firebaseapp.com",
//   databaseURL: "https://carepalmoney-website-default-rtdb.firebaseio.com",
//   projectId: "carepalmoney-website",
//   storageBucket: "carepalmoney-website.appspot.com",
//   messagingSenderId: "194255814168",
//   appId: "1:194255814168:web:3f97f66841212f8ed64d6d",
//   measurementId: "G-199P31Y6J8"
// };

// export const app = initializeApp(firebaseConfig);

export function failMessage(err) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text:
      err ||
      "Something went wrong! Please try again later Or reach us via email/phone.",
    timerProgressBar: true, timer: 5000,
    confirmButtonColor: '#1E75BB',      
  }).then(() => location.reload());
}

export function successMessage() {
  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: "Thank you for reaching out to us! Our team will get back to you soon",
    timerProgressBar: true, timer: 5000,
    confirmButtonColor: '#1E75BB',
  }).then(() => location.reload());
}
