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
const errDiv = document.querySelector("#show-error");

const inputArr = [username, email, subject, message];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let errInput = [];

    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i].value.trim() === "") {
            errInput.push(inputArr[i].id);
        }
    }

    if (errInput.length > 0) {
        const errMsg = errInput.map(inputId => "<p>Felt " + inputId + " er tomt. Du må fylle ut alle felt for å sende formularet.</p>").join("");
        errDiv.innerHTML = errMsg;
    } else {
        errDiv.innerHTML = "";
    }
});