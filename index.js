window.onload = function () {
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

  const passwordCheckInput = document.querySelector("input#password-check");
  const passwordCheckErrorSpan = document.querySelector(
    "#password-check + span.error"
  );

  nameInput.addEventListener("input", () => {
    if (nameInput.validity.valid) {
      nameErrorSpan.textContent = "";
    } else {
      if (nameInput.validity.valueMissing) {
        nameErrorSpan.textContent = REQUIRED_ERROR_MSG;
      }
    }
  });

  mailInput.addEventListener("input", () => {
    if (mailInput.validity.valid) {
      mailErrorSpan.textContent = "";
    } else {
      if (nameInput.validity.valueMissing) {
        nameErrorSpan.textContent = REQUIRED_ERROR_MSG;
      } else if (mailInput.validity.typeMismatch) {
        mailErrorSpan.textContent = "Formato de e-mail incorreto";
      }
    }
  });

  phoneInput.addEventListener("input", () => {
    const CUSTOM_ERROR = "O telefone precisa ter 11 dígitos";

    formatPhoneNumber();
    phoneInput.setCustomValidity(
      phoneInput.value.length !== 15 ? CUSTOM_ERROR : ""
    );

    if (phoneInput.validity.valid) {
      phoneErrorSpan.textContent = "";
    } else {
      if (nameInput.validity.valueMissing) {
        nameErrorSpan.textContent = REQUIRED_ERROR_MSG;
      } else if (phoneInput.validity.customError) {
        phoneErrorSpan.textContent = CUSTOM_ERROR;
      }
    }
  });

  passwordInput.addEventListener("input", () => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.{8,})\S+$/;
    const passwordPass = passwordRegex.test(passwordInput.value);
    const classAndRegex = {
      "minimum-characters": /.{8,}/,
      "contains-number": /.*[0-9]/,
      "contains-uppercase": /.*[A-Z]/,
      "contains-lowercase": /.*[a-z]/,
      "contains-special-character": /.*[!@#$%^&*()_+}{":;'?/>.<,]/,
      "no-whitespace": /^\S*$/,
    };
    const passwordRules = document.querySelectorAll("ul.password-rules > li");

    passwordInput.setCustomValidity(
      passwordPass ? "" : "A senha não atende aos requisitos"
    );

    // Add a "pass" class for each li that has a passed password rule
    passwordRules.forEach((li) => {
      const passwordPass = classAndRegex[li.id].test(passwordInput.value);
      li.classList[passwordPass ? "add" : "remove"]("pass");
    });

    checkPasswordMatch();
  });

  passwordCheckInput.addEventListener("input", checkPasswordMatch);

  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      formErrorSpan.textContent = "Há erros no formulário";
    }
  });

  // Add * to required fields
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.required) {
      const label = document.querySelector(`label[for=${input.id}]`);
      label.textContent += " *";
    }
  });

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

  function checkPasswordMatch() {
    const CUSTOM_ERROR =
      passwordInput.value === passwordCheckInput.value
        ? ""
        : "As senhas são diferentes";

    passwordCheckInput.setCustomValidity(CUSTOM_ERROR);
    passwordCheckErrorSpan.textContent = CUSTOM_ERROR;
  }
};
