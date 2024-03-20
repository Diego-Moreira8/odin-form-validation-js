const REQUIRED_ERROR_MSG = "Este campo é obrigatório";

const form = document.querySelector("form");
const formErrorSpan = document.querySelector(".form-error");
const nameInput = document.querySelector("input#name");
const nameErrorSpan = document.querySelector("#name + span.error");
const mailInput = document.querySelector("input#mail");
const mailErrorSpan = document.querySelector("#mail + span.error");
const phoneInput = document.querySelector("input#phone");
const phoneErrorSpan = document.querySelector("#phone + span.error");
const passwordInput = document.querySelector("input#password");
const showPasswordBtn = document.querySelector("#show-password");
const passwordCheckInput = document.querySelector("input#password-check");
const showPasswordCheckBtn = document.querySelector("#show-password-check");
const passwordCheckErrorSpan = document.querySelector(".error.password-check");

function formatPhoneNumber(phoneNumber) {
  // Converts a string of numbers to a brazillian phone format:
  // (11) 98765-4321

  let formattedPhoneNumber;

  // Removes any NaN character
  phoneNumber = phoneNumber.replace(/\D/g, "");

  if (phoneNumber.length > 11) {
    phoneNumber = phoneNumber.slice(0, 11);
  }

  if (phoneNumber.length === 11) {
    formattedPhoneNumber = `(${phoneNumber.substring(
      0,
      2
    )}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7, 11)}`;
  } else if (phoneNumber.length > 2) {
    formattedPhoneNumber = `(${phoneNumber.substring(
      0,
      2
    )}) ${phoneNumber.substring(2, 6)}-${phoneNumber.substring(6)}`;
  } else {
    formattedPhoneNumber = phoneNumber;
  }

  return formattedPhoneNumber;
}

function showErrorMessage(input, errorsAndMessages) {
  const errorSpan = input.parentElement.querySelector(".error");

  if (input.validity.valid) {
    errorSpan.textContent = "";
  } else {
    for (let validation in input.validity) {
      if (validation === "valid") continue;

      if (input.validity[validation]) {
        errorSpan.textContent = errorsAndMessages[validation];
        break;
      }
    }
  }
}

function togglePasswordRules() {
  // Add a "pass" class for each li that has a passed password rule
  const passwordRules = document.querySelectorAll("ul.password-rules > li");
  const classAndRegex = {
    "minimum-characters": /.{8,}/,
    "contains-number": /.*[0-9]/,
    "contains-uppercase": /.*[A-Z]/,
    "contains-lowercase": /.*[a-z]/,
    "contains-special-character": /.*[!@#$%^&*()_+}{":;'?/>.<,]/,
    "no-whitespace": /^\S*$/,
  };

  passwordRules.forEach((li) => {
    const rulePass = classAndRegex[li.id].test(passwordInput.value);
    li.classList[rulePass ? "add" : "remove"]("pass");
  });
}

function showPassword(btn) {
  const input = btn.parentElement.querySelector("input");
  input.type = input.type === "password" ? "text" : "password";
}

function validateName() {
  showErrorMessage(nameInput, { valueMissing: REQUIRED_ERROR_MSG });
}

function validateEmail() {
  showErrorMessage(mailInput, {
    valueMissing: REQUIRED_ERROR_MSG,
    typeMismatch: "Formato de e-mail incorreto",
  });
}

function validatePhone() {
  const PHONE_ERROR_MSG = "O telefone precisa ter 11 dígitos";

  phoneInput.value = formatPhoneNumber(phoneInput.value);

  phoneInput.setCustomValidity(
    phoneInput.value.length === 15 ? "" : PHONE_ERROR_MSG
  );

  showErrorMessage(phoneInput, {
    valueMissing: REQUIRED_ERROR_MSG,
    customError: PHONE_ERROR_MSG,
  });
}

function validatePassword() {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.{8,})\S+$/;
  const passwordPass = passwordRegex.test(passwordInput.value);

  passwordInput.setCustomValidity(
    passwordPass ? "" : "A senha não atende aos requisitos"
  );

  // No need to show error messages, rules list it's enough

  togglePasswordRules();
  validatePasswordMatch();
}

function validatePasswordMatch() {
  const match = passwordInput.value === passwordCheckInput.value;
  const CUSTOM_ERROR = match ? "" : "As senhas são diferentes";

  passwordCheckInput.setCustomValidity(CUSTOM_ERROR);
  passwordCheckErrorSpan.textContent = CUSTOM_ERROR;
}

function handleReset() {
  // reset event only clear inputs after the function
  passwordInput.value = "";
  togglePasswordRules();
}

function validateForm(event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    formErrorSpan.textContent =
      "Há erros no formulário. Verifique os campos e tente novamente.";
  }
}

function addEventListeners() {
  nameInput.addEventListener("input", validateName);
  mailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  passwordInput.addEventListener("input", validatePassword);
  passwordCheckInput.addEventListener("input", validatePasswordMatch);

  [showPasswordBtn, showPasswordCheckBtn].forEach((btn) => {
    btn.addEventListener("click", () => showPassword(btn));
  });

  form.addEventListener("reset", handleReset);
  form.addEventListener("submit", validateForm);
}

window.onload = addEventListeners;
