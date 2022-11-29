const fName = document.querySelector("#first-name");
const lName = document.querySelector("#last-name");
const email = document.querySelector("#e-mail");
const phone = document.querySelector("#phone");
const cep = document.querySelector("#cep");
const password = document.querySelector("#password");
const passwordCheck = document.querySelector("#password-check");
const bikeBrand = document.querySelector("#bike-brand");

const allFields = [
  fName,
  lName,
  email,
  phone,
  cep,
  password,
  passwordCheck,
  bikeBrand,
];

allFields.forEach((field) => field.addEventListener("click", test));

function test(e) {
  console.log(e.target);
}
