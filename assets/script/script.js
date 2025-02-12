const btn = document.querySelector(".reg-form__btn");
const regForm = document.getElementById("regForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const radioGroups = document.querySelectorAll(".reg-form__radio-group");
const occupationSelect = document.getElementById("occupation");
const consentCheckbox = document.getElementById("consent");

let sexChecked = false;
let consentChecked = false;

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ageError = document.getElementById("ageError");
const consentError = document.getElementById("consentError");

const firstCharErrorMsg = "Имя должно начинаться с буквы!";
const noNameErrorMsg = "Пожалуйста, введите имя";
// const nameTooLongErrorMsg = "Длина имени не должна превышать 20 символов";
const nameTooShortErrorMsg = "Длина имени не должна быть меньше 2 символов";
const noEmailErrorMsg = "Пожалуйста, введите адрес электронной почты";
const invalidEmailErrorMsg =
  "Пожалуйста, введите верный адрес электронной почты";
const noAgeErrorMsg = "Пожалуйста, введите возраст.";
const invalidAgeErrorMsg = "Возраст не может быть меньше 1 или больше 110.";
const noConsentErrorMsg =
  "Пожалуйста, подтвердите согласие на обработку персональных данных.";

function checkFirstChar(str) {
  const regex = /^[A-Za-zА-Яа-я]/;
  return str.length > 0 && !regex.test(str);
}

function pasteMsg(element, message) {
  element.textContent = message;
}

function hideOrShowElem(elem, hide = true) {
  if (!hide) {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

function changeNameOnInput() {
  const name = nameInput.value;
  if (checkFirstChar(name)) {
    nameInput.value = name.slice(1);
    pasteMsg(nameError, firstCharErrorMsg);
    hideOrShowElem(nameError, false);
  } else {
    pasteMsg(nameError, "");
    hideOrShowElem(nameError);
  }
}

function validateName() {
  const name = nameInput.value;
  let valid = true;
  if (!name) {
    pasteMsg(nameError, noNameErrorMsg);
    hideOrShowElem(nameError, false);
    valid = false;
  } else if (name.length < 2) {
    pasteMsg(nameError, nameTooShortErrorMsg);
    hideOrShowElem(nameError, false);
    valid = false;
    //   } else if (name.length > 20) {
    //     pasteMsg(nameError, nameTooLongErrorMsg);
    //     hideOrShowElem(nameError, false);
    //     valid = false;
  } else {
    hideOrShowElem(nameError);
  }

  return valid;
}

function validateEmail() {
  const email = emailInput.value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  valid = true;

  if (!email) {
    pasteMsg(emailError, noEmailErrorMsg);
    hideOrShowElem(emailError, false);
    valid = false;
  } else if (!regex.test(email)) {
    pasteMsg(emailError, invalidEmailErrorMsg);
    hideOrShowElem(emailError, false);
    valid = false;
  } else {
    hideOrShowElem(emailError);
  }
  return valid;
}

function changeAgeOnInput() {
  hideOrShowElem(ageError);
  const age = ageInput.value;
  ageInput.value = age.replace(/[^1-9]/g, "");
}

function validateAge() {
  const age = ageInput.value;
  let valid = true;

  if (!age) {
    pasteMsg(ageError, noAgeErrorMsg);
    hideOrShowElem(ageError, false);
    valid = false;
  } else if (!ageInput.checkValidity()) {
    pasteMsg(ageError, invalidAgeErrorMsg);
    hideOrShowElem(ageError, false);
    valid = false;
  } else {
    hideOrShowElem(ageError);
  }

  return valid;
}

function markChecked(evt) {
  if (evt.target.type === "radio") {
    sexChecked = true;
  } else if (evt.target.type === "checkbox") {
    consentChecked = consentCheckbox.checked;
    toggleBtnsErrorMsg(consentChecked, consentError, noConsentErrorMsg);
  }
}

function toggleBtnsErrorMsg(condition, element, msg) {
  if (condition) {
    pasteMsg(element, "");
    hideOrShowElem(element);
  } else {
    pasteMsg(element, msg);
    hideOrShowElem(element, false);
  }
}

function submitForm(evt) {
  evt.preventDefault();
  alert("Данные формы успешно отправлены");
  regForm.reset();
}

btn.addEventListener("click", submitForm);
nameInput.addEventListener("input", changeNameOnInput);
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("input", () => hideOrShowElem(emailError));
emailInput.addEventListener("blur", validateEmail);
ageInput.addEventListener("input", changeAgeOnInput);
ageInput.addEventListener("blur", validateAge);
radioGroups.forEach(function (item) {
  item.addEventListener("input", markChecked);
});
consentCheckbox.addEventListener("input", markChecked);
// occupationSelect.addEventListener("blur", listener)
