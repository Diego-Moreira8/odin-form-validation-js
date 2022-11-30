// form
const form = document.querySelector("form");
// Inputs
const fName = document.querySelector("#first-name");
const lName = document.querySelector("#last-name");
const email = document.querySelector("#e-mail");
const phone = document.querySelector("#phone");
const cep = document.querySelector("#cep");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#password-check");
const bikeBrand = document.querySelector("#bike-brand");

const allInputs = [
  fName,
  lName,
  email,
  phone,
  cep,
  password,
  passwordCheck,
  bikeBrand,
];

// Functions for toggle error messages
function showErrorMsg(input, message) {
  const inputMsg = input.parentElement.querySelector(".input-msg");
  inputMsg.classList.add("error");
  inputMsg.innerText = message;
  input.setCustomValidity(message);
}

function removeErrorMsg(input) {
  const inputMsg = input.parentElement.querySelector(".input-msg");
  inputMsg.classList.remove("error");
  inputMsg.innerText = "";
  input.setCustomValidity("");
}

// Called on input change in password and password-check
function checkRepeatPassword() {
  if (password.value !== passwordCheck.value) {
    showErrorMsg(passwordCheck, "As senhas estão diferentes!");
  } else {
    removeErrorMsg(passwordCheck);
  }
}

// Choose message to appear on #input-msg
function chooseMessage(e) {
  const input = e.target;
  // Special condition for the passwordCheck and bikeBrand
  if (input.id === "password-check" || input.id === "password") {
    checkRepeatPassword();
  } else if (input.id === "bike-brand") {
    if (input.value === "") {
      showErrorMsg(input, "É necessário escolher a marca!");
    } else {
      removeErrorMsg(input);
    }
  } else {
    // Condition for the other inputs
    // Calls showMessage function with the respective message
    if (input.validity.patternMismatch) {
      switch (input.id) {
        case "first-name":
          showErrorMsg(
            input,
            `Há caracteres inválidos neste campo! Apenas letras e os caracteres , . ' -  são permitidos.`
          );
          break;
        case "last-name":
          showErrorMsg(
            input,
            `Há caracteres inválidos neste campo! Apenas letras e os caracteres , . ' -  são permitidos.`
          );
          break;
        case "e-mail":
          showErrorMsg(
            input,
            `E-mail inválido, favor verificar! Exemplo de e-mail válido: joaosilva@gmail.com`
          );
          break;
        case "phone":
          showErrorMsg(
            input,
            `Telefone inválido, favor verificar! Deve conter 11 dígitos (DDD + 9 dígitos), apenas números.`
          );
          break;
        case "cep":
          showErrorMsg(
            input,
            `CEP inválido, favor verificar! Deve conter 8 dígitos, apenas números.`
          );
          break;
        case "password":
          showErrorMsg(
            input,
            `Senha não permitida. Deve conter de 8 a 10 caracteres.`
          );
          checkRepeatPassword();
          break;
      }
    } else {
      removeErrorMsg(input);
    }
  }
}

allInputs.forEach((input) => {
  input.addEventListener("input", chooseMessage);
});

function checkForm(e) {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
  }
}

form.addEventListener("submit", checkForm);
