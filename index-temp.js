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

const phone = document.querySelector("#phone");
phone.addEventListener("input", () => {
  showMessage(
    phone,
    "error",
    "Telefone inválido. Precisa incluir DDD + número com 9 dígitos"
  );
});

const cep = document.querySelector("#cep");
cep.addEventListener("input", () => {
  showMessage(cep, "error", "CEP inválido. Deve conter 8 dígitos");
});

const password = document.querySelector("#password");
password.addEventListener("input", () => {
  showMessage(
    password,
    "error",
    "Senha não autorizada. Deve conter de 8 a 10 caracteres, com pelo menos uma letra minúscula, uma letra maiúscula e um número"
  );
});

const passwordCheck = document.querySelector("#password-check");
passwordCheck.addEventListener("input", () => {
  const inputMsg = passwordCheck.parentElement.querySelector(".input-msg");
  if (passwordCheck.value !== password.value) {
    inputMsg.classList.add("error");
    inputMsg.innerText = "As senhas não são iguais!";
  } else {
    inputMsg.classList.remove("error");
    inputMsg.classList.innerText = "";
  }
});
