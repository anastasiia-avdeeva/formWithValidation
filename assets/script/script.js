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
    pasteMsg(nameError, "Имя должно начинаться с буквы!");
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
    pasteMsg(nameError, "Пожалуйста, введите имя");
    hideOrShowElem(nameError, false);
    valid = false;
  } else if (name.length < 2) {
    pasteMsg(nameError, "Длина имени не должна быть меньше 2 символов");
    hideOrShowElem(nameError, false);
    valid = false;
  } else if (name.length > 20) {
    pasteMsg(nameError, "Длина имени не должна быть больше 20 символов");
    hideOrShowElem(nameError, false);
    valid = false;
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
    pasteMsg(emailError, "Пожалуйста, введите адрес электронной почты");
    hideOrShowElem(emailError, false);
    valid = false;
  } else if (!regex.test(email)) {
    pasteMsg(emailError, "Пожалуйста, введите верный адрес электронной почты");
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
    pasteMsg(ageError, "Пожалуйста, введите возраст!");
    hideOrShowElem(ageError, false);
    valid = false;
  } else if (!ageInput.checkValidity()) {
    pasteMsg(ageError, "Возраст не может быть меньше 1 или больше 110!");
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
    toggleConsentErrorMsg();
  }
}

function toggleConsentErrorMsg() {
  if (consentChecked) {
    pasteMsg(consentError, "");
    hideOrShowElem(consentError);
  } else {
    pasteMsg(
      consentError,
      "При отказе от обработки персональных данных, регистрация невозможна!"
    );
    hideOrShowElem(consentError, false);
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
