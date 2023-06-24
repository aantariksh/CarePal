import { successMessage, failMessage, app } from "./index.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getDatabase(app);
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formProps = new FormData(event.target);
  const formData = Object.fromEntries(formProps);
  
  const { name, telephone, email, salary, loanAmount, treatment } = formData;

  if (!formData?.terms) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please accept the terms to proceed.",
    });
  } else if (!name || !telephone || !email || !salary || 
    !loanAmount || !treatment || !name.trim() || !treatment.trim()
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the details correctly.",
    });
  } else {
    submitContactForm(formData);
  }
});

function submitContactForm(formData) {
  const id = new Date().getTime();

  const formContents = {
    name: formData.name,
    telephone: formData.telephone,
    email: formData.email,
    salary: formData.salary,
    treatment: formData.treatment,
    loanAmount: formData.loanAmount
  }

  // Save to Firebase
  set(ref(db, `contact/${id}`), formContents)
    // Send Email
    .then(() => axios.post('https://carepalmoney.com/send-email', formContents))
    .then(successMessage)
    .catch((err) => console.log(err));
}
