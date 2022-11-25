const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
[firstName, lastName].forEach((element) => {
  element.addEventListener("input", (e) => {
    showMessage(element, "error", "Há caracteres inválidos neste campo");
  });
});

const email = document.querySelector("#e-mail");
email.addEventListener("input", (e) => {
  showMessage(email, "alert", "O formato de email pode estar incorreto!");
});

function showMessage(element, type, message) {
  const inputMsg = element.parentElement.querySelector(".input-msg");
  if (element.validity.patternMismatch) {
    inputMsg.classList.add(type);
    inputMsg.innerText = message;
  } else {
    inputMsg.classList.remove(type);
    inputMsg.classList.innerText = "";
  }
}
