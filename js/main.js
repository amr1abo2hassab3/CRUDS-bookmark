var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");

var arraySite = [];

// check if the localStorage is has data or not
if (localStorage.getItem("items")) {
  arraySite = JSON.parse(localStorage.getItem("items"));
  display(arraySite);
} else {
  arraySite = [];
}
// this function add new site
function addNewSite() {
  // check the values is valid or not
  if (validation(bookmarkName) && validation(bookmarkURL)) {
    // check the site name is exists or not
    if (isFinded(bookmarkName.value.trim().toLowerCase(), arraySite)) {
      Swal.fire({
        icon: "error",
        title: "This site exists please enter site that dose not exist",
      });
    } else {
      var site = {
        name: bookmarkName.value.trim().toLowerCase(),
        url: bookmarkURL.value.trim().toLowerCase(),
      };
      arraySite.push(site);
      window.localStorage.setItem("items", JSON.stringify(arraySite));
      clearValue();
      display(arraySite);
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Input",
      html: `
        <p><strong>Site Name or URL is not valid. Please follow the rules below:</strong></p>
        <ul style="text-align: left;">
          <li>Site name must contain at least 3 characters and less than 15 characters.</li>
          <li>Site URL must be a valid one.</li>
        </ul>
      `,
    });
  }
}
// this function clear input
function clearValue() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
  bookmarkName.classList.remove("is-valid");
  bookmarkURL.classList.remove("is-valid");
}
// this function delete one site
function deleteItem(index) {
  arraySite.splice(index, 1);
  window.localStorage.setItem("items", JSON.stringify(arraySite));
  display(arraySite);
}
// this function display the list of site in dom
function display(array) {
  var tableContent = document.getElementById("tableContent");
  var box = "";
  for (var i = 0; i < array.length; i++) {
    box += `
      <tr>
                        <td>${i + 1}</td>
                        <td>${array[i].name}</td>
                        <td>
                            <a href="${
                              array[i].url
                            }" target="_blank" class="btn btn-warning text-white" data-index="0" fdprocessedid="3r20jm">
                                <i class="fa-solid fa-eye pe-2"></i>Visit
                            </a>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" class="btn btn-danger pe-2" data-index="0" fdprocessedid="ponere">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>
    `;
  }
  tableContent.innerHTML = box;
}
// this function validation the value in input
function validation(input) {
  var regex = {
    bookmarkName: /^[\w]{3,15}$/,
    bookmarkURL: /^((https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,})$/,
  };

  if (regex[input.id]?.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}
// this function search in array and if the name of site is exists return true else return false
function isFinded(nameOfSite, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name == nameOfSite) {
      return true;
    }
  }
  return false;
}
