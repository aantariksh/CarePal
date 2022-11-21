import {} from "./index.js";
import {
  getDatabase,
  child,
  get,
  ref,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const dbRef = ref(getDatabase());
const contactTable = document.getElementById("contact-table");

get(child(dbRef, `CarePal/contact`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      displayData(snapshot.val());
    } else {
      displayMessage("No data available");
    }
  })
  .catch((error) => {
    displayMessage(error);
  });

function displayData(data) {
  let tableValues = "";
  const ids = Object.keys(data);
  ids.forEach((id, ctr) => {
    const row = data[id];
    const date = new Date(+id);
    tableValues += `
      <tr class="text-center">
        <td> ${ctr + 1} </td>
        <td> ${date.toDateString()} </td>
        <td> ${row.name} </td>
        <td> ${row.telephone} </td>
        <td> ${row.email} </td>
        <td> ${row.loanAmount} </td>
        <td> ${row.salary} </td>
        <td> ${row.treatment} </td>
      </tr>`;
  });

  contactTable.innerHTML = tableValues;
}

function displayMessage(msg) {
  contactTable.innerHTML = `
    <tr>
      <td colspan="5" class="text-center">
        ${msg}
      </td>
    </tr>`;
}
