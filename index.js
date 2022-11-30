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
}

function removeErrorMsg(input) {
  const inputMsg = input.parentElement.querySelector(".input-msg");
  inputMsg.classList.remove("error");
  inputMsg.innerText = "";
}

allInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    // Special condition for the passwordCheck
    if (e.target.id === "password-check") {
      if (e.target.value !== password.value) {
        console.log(e.target.value !== password.value);
        showErrorMsg(e.target, "As senhas estão diferentes!");
      } else {
        removeErrorMsg(e.target);
      }
    } else {
      // Condition for the other inputs
      // Calls showMessage function with the respective message
      if (e.target.validity.patternMismatch) {
        switch (e.target.id) {
          case "first-name":
            showErrorMsg(
              e.target,
              `Há caracteres inválidos neste campo! Apenas letras e os 
            caracteres , . ' -  são permitidos.`
            );
            break;
          case "last-name":
            showErrorMsg(
              e.target,
              `Há caracteres inválidos neste campo! Apenas letras e os 
            caracteres , . ' -  são permitidos.`
            );
            break;
          case "e-mail":
            showErrorMsg(
              e.target,
              `E-mail inválido, favor verificar! Exemplo de e-mail válido: 
            joaosilva@gmail.com`
            );
            break;
          case "phone":
            showErrorMsg(
              e.target,
              `Telefone inválido, favor verificar! Deve conter 11 dígitos 
            (DDD + 9 dígitos), apenas números.`
            );
            break;
          case "cep":
            showErrorMsg(
              e.target,
              `CEP inválido, favor verificar! Deve conter 8 dígitos, apenas 
            números.`
            );
            break;
          case "password":
            showErrorMsg(
              e.target,
              `Senha não permitida. Deve conter de 8 a 10 caracteres.`
            );
            break;
          case "bike-brand":
            showErrorMsg(e.target, ``);
            break;
        }
      } else {
        removeErrorMsg(e.target);
      }
    }
  });
});

// Validation for first and last name
// [fName, lName].forEach((input) => {
//   input.addEventListener("input", (e) => {
//     if (e.target.validity.patternMismatch)
//       showErrorMsg(e.target, "Há caracteres inválidos neste campo.");
//     else removeErrorMsg(e.target);
//   });
// });
