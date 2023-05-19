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
const emailRegex = /\S+@\S+\.\S+/;
const inputArr = [username, email, subject, message];
const errArr = [nameErr, emailErr, subjectErr, messageErr];

submitBtn.addEventListener("click", checkInput);

function checkInput() {
    if (username.value.length === 0) {

    }
}


/* 
const validEmail = emailRegex.test()




function checkForm() {
  if (emailEl.value.length === 0) {
    alert("Please fill in your email");
  } else if (!emailEl.value.match(validEmail)) {
    alert("Invalid Email address");
  } else if (inqEl.value.length === 0) {
    alert("Please fill in your inquiry");
  } else {
    alert("Inquiry is sent");
    inputsArr.forEach(input => {
        input.value = '';
      });
    return true;
  }
}
 */