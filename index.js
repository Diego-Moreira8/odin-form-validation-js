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
};
