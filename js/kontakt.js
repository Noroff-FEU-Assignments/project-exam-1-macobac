//Name (Should be more than 5 characters long)
//Email address (Must be a valid email address)
//Subject (Should be more than 15 characters long)
//Message content (Should be more than 25 characters long)
//show error messages if the values in the textboxes do not meet the requirements

const form = document.querySelector("#form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const submitBtn = document.querySelector("#submitBtn");
const nameErr = document.querySelector("#nameErr");
const emailErr = document.querySelector("#emailErr");
const subjectErr = document.querySelector("#subjectErr");
const messageErr = document.querySelector("#messageErr");
const btnErr = document.querySelector("#btnErr");
const emailRegex = /\S+@\S+\.\S+/;


submitBtn.addEventListener("click", validateForm);
username.addEventListener("input", clearErrMsg);
email.addEventListener("input", clearErrMsg);
subject.addEventListener("input", clearErrMsg);
message.addEventListener("input", clearErrMsg);
submitBtn.addEventListener("input", clearErrMsg);

function validateForm() {
  clearErrMsg()

  if (username.value === "") {
    nameErr.innerHTML = "<p>Navn kan ikke være blank.</p>";
    return false;
  } else if (username.value.length < 5) {
    nameErr.innerHTML = "<p>Navn må være lengre enn 5 bokstaver.</p>";
    return false;
  }

  if (email.value === "") {
    emailErr.innerHTML = "<p>Epost kan ikke være blank.</p>";
    return false;
  } else {
    if (!emailRegex.test(email.value)) {
      emailErr.innerHTML = "<p>Skriv en gyldig epost.</p>";
      return false;
    }
  }

  if (subject.value === "") {
    subjectErr.innerHTML = "<p>Melding kan ikke være blank.</p>";
    return false;
  } else {
    if (subject.value.length < 15) {
      subjectErr.innerHTML = "<p>Melding må være minst 15 bokstaver lang.</p>";
      return false;
    }
  }

  if (message.value === "") {
    messageErr.innerHTML = "<p>Tekstfeltet kan ikke være blank.</p>";
    return false;
  } else {
    if (message.value.length < 25) {
      messageErr.innerHTML = "<p>Meldingen må være minst 25 bokstaver lang.</p>";
      return false;
    }
  }

  btnErr.innerHTML = "<p>Kontaktformularet ble sendt.</p>";
  form.reset();
  return true;
}


function clearErrMsg() {
  nameErr.innerHTML = "";
  emailErr.innerHTML = "";
  subjectErr.innerHTML = "";
  messageErr.innerHTML = ""; 
}