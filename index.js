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

function validateName() {
  if (nameInput.validity.valid) {
    nameErrorSpan.textContent = "";
  } else {
    if (nameInput.validity.valueMissing) {
      nameErrorSpan.textContent = REQUIRED_ERROR_MSG;
    }
  }
}

function validateEmail() {
  if (mailInput.validity.valid) {
    mailErrorSpan.textContent = "";
  } else {
    if (mailInput.validity.valueMissing) {
      mailErrorSpan.textContent = REQUIRED_ERROR_MSG;
    } else if (mailInput.validity.typeMismatch) {
      mailErrorSpan.textContent = "Formato de e-mail incorreto";
    }
  }
}

function formatPhoneNumber() {
  // Removes any NaN character
  let phoneNumber = phoneInput.value.replace(/\D/g, "");
  let formattedPhoneNumber;

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

  phoneInput.value = formattedPhoneNumber;
}

function validatePhone() {
  const PHONE_ERROR_MSG = "O telefone precisa ter 11 dígitos";

  formatPhoneNumber();

  phoneInput.setCustomValidity(
    phoneInput.value.length !== 15 ? PHONE_ERROR_MSG : ""
  );

  if (phoneInput.validity.valid) {
    phoneErrorSpan.textContent = "";
  } else {
    if (phoneInput.validity.valueMissing) {
      phoneErrorSpan.textContent = REQUIRED_ERROR_MSG;
    } else if (phoneInput.validity.customError) {
      phoneErrorSpan.textContent = PHONE_ERROR_MSG;
    }
  }
}

function checkPasswordMatch() {
  const CUSTOM_ERROR =
    passwordInput.value === passwordCheckInput.value
      ? ""
      : "As senhas são diferentes";

  passwordCheckInput.setCustomValidity(CUSTOM_ERROR);
  passwordCheckErrorSpan.textContent = CUSTOM_ERROR;
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

function validatePassword() {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.{8,})\S+$/;
  const passwordPass = passwordRegex.test(passwordInput.value);

  passwordInput.setCustomValidity(
    passwordPass ? "" : "A senha não atende aos requisitos"
  );

  togglePasswordRules();
  checkPasswordMatch();
}

function showPassword(btn) {
  const input = btn.parentElement.querySelector("input");
  input.type = input.type === "password" ? "text" : "password";
}

function handleReset() {
  // reset event only clear inputs after the function
  passwordInput.value = "";
  togglePasswordRules();
}

function validateForm(event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    formErrorSpan.textContent = "Há erros no formulário";
  }
}

function addEventListeners() {
  nameInput.addEventListener("input", validateName);
  mailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  passwordInput.addEventListener("input", validatePassword);
  passwordCheckInput.addEventListener("input", checkPasswordMatch);

  [showPasswordBtn, showPasswordCheckBtn].forEach((btn) => {
    btn.addEventListener("click", () => showPassword(btn));
  });

  form.addEventListener("reset", handleReset);
  form.addEventListener("submit", validateForm);
}

window.onload = addEventListeners;
