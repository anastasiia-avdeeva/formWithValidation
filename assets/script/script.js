const btn = document.querySelector(".reg-form__btn");
const regForm = document.getElementById("regForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const radioGroups = document.querySelectorAll(".reg-form__radio-group");
const occupationSelect = document.getElementById("occupation");
const passInput = document.getElementById("pass1");
const passTips = document.getElementById("passTips");
const passRepeatInput = document.getElementById("pass2");
const consentCheckbox = document.getElementById("consent");

let sexChecked = false;
let consentChecked = false;

const lengthTip = document.getElementById("length");
const upperCaseTip = document.getElementById("upperCaseLetter");
const lowerCaseTip = document.getElementById("lowerCaseLetter");
const digitTip = document.getElementById("digit");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ageError = document.getElementById("ageError");
const sexError = document.getElementById("sexError");
const occupationError = document.getElementById("occupationError");
const passError = document.getElementById("pass1Error");
const passRepeatError = document.getElementById("pass2Error");
const consentError = document.getElementById("consentError");

const firstCharErrorMsg = "Имя должно начинаться с буквы";
const noNameErrorMsg = "Пожалуйста, введите имя";
const nameTooShortErrorMsg = "Длина имени не должна быть меньше 2 символов";
const noEmailErrorMsg = "Пожалуйста, введите адрес электронной почты";
const invalidEmailErrorMsg =
  "Пожалуйста, введите верный адрес электронной почты";
const noAgeErrorMsg = "Пожалуйста, введите возраст.";
const invalidAgeErrorMsg = "Возраст не может быть меньше 1 или больше 110.";
const noSexError = "Пожалуйста, выберете пол";
const noOccupationErrorMsg = "Пожалуйста, выберете профессию из списка";
const noPassError = "Пожалуйста, введите пароль";
const invalidPassError = "Пароль не соответствует требованиям";
const noRepeatPassError = "Пожалуйста, повторите пароль";
const invalidRepeatPassError = "Пароли не совпадают";
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

function toggleErrorMsg(condition, element, msg) {
  if (condition) {
    pasteMsg(element, "");
    hideOrShowElem(element);
  } else {
    pasteMsg(element, msg);
    hideOrShowElem(element, false);
  }
}

function changeNameOnInput() {
  const name = nameInput.value;
  let valid = true;
  let erMsg = "";

  if (checkFirstChar(name)) {
    nameInput.value = name.slice(1);
    valid = false;
    erMsg = firstCharErrorMsg;
  }

  toggleErrorMsg(valid, nameError, erMsg);
}

function isNameValid(showErrorMsg = true) {
  const name = nameInput.value;
  let valid;
  let erMsg = "";

  if (!name) {
    erMsg = noNameErrorMsg;
    valid = false;
  } else if (name.length < 2) {
    valid = false;
    erMsg = nameTooShortErrorMsg;
  } else {
    valid = true;
  }
  if (showErrorMsg) {
    toggleErrorMsg(valid, nameError, erMsg);
  }

  return valid;
}

function isEmailValid(showErrorMsg = true) {
  const email = emailInput.value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let valid = true;
  let erMsg = "";

  if (!email) {
    valid = false;
    erMsg = noEmailErrorMsg;
  } else if (!regex.test(email)) {
    valid = false;
    erMsg = invalidEmailErrorMsg;
  } else {
    valid = true;
  }

  if (showErrorMsg) {
    toggleErrorMsg(valid, emailError, erMsg);
  }

  return valid;
}

function changeAgeOnInput() {
  hideOrShowElem(ageError);
  const age = ageInput.value;
  ageInput.value = age.replace(/[^1-9]/g, "");
}

function isAgeValid(showErrorMsg = true) {
  const age = ageInput.value;
  let valid;
  let erMsg = "";

  if (!age) {
    valid = false;
    erMsg = noAgeErrorMsg;
  } else if (!ageInput.checkValidity()) {
    valid = false;
    erMsg = invalidAgeErrorMsg;
  } else {
    valid = true;
  }

  if (showErrorMsg) {
    toggleErrorMsg(valid, ageError, erMsg);
  }

  return valid;
}

function markChecked(evt) {
  if (evt.target.type === "radio") {
    sexChecked = true;
    toggleErrorMsg(sexChecked, sexError, "");
  } else if (evt.target.type === "checkbox") {
    consentChecked = consentCheckbox.checked;
    toggleErrorMsg(consentChecked, consentError, noConsentErrorMsg);
  }
}

function isOccupationValid(showErrorMsg = true) {
  let valid = true;
  let erMsg = "";

  if (occupationSelect.selectedIndex === 0) {
    valid = false;
    erMsg = noOccupationErrorMsg;
  }

  if (showErrorMsg) {
    toggleErrorMsg(valid, occupationError, erMsg);
  }

  return valid;
}

function markUnmarkTipAsDone(elem, condition) {
  if (condition) {
    elem.classList.add("done");
  } else {
    elem.classList.remove("done");
  }
}

function checkPassOnInput() {
  toggleErrorMsg(true, passError, "");
  hideOrShowElem(passTips, false);
  const pass = passInput.value;
  const upperCaseLetterRegex = /[A-Z]/;
  const lowerCaseLetterRegex = /[a-z]/;
  const digitRegex = /[1-9]/;

  markUnmarkTipAsDone(lengthTip, pass.length >= 8);
  markUnmarkTipAsDone(upperCaseTip, upperCaseLetterRegex.test(pass));
  markUnmarkTipAsDone(lowerCaseTip, lowerCaseLetterRegex.test(pass));
  markUnmarkTipAsDone(digitTip, digitRegex.test(pass));
}

function resetTips() {
  hideOrShowElem(passTips);
  const allTips = document.querySelectorAll(".reg-form__tips > li");
  allTips.forEach(function (item) {
    markUnmarkTipAsDone(item, false);
  });
}

function isPassValid(showErrorMsg = true) {
  const pass = passInput.value;
  let valid;
  let erMsg = "";
  if (!pass) {
    valid = false;
    erMsg = noPassError;
  } else if (!passInput.checkValidity()) {
    valid = false;
    erMsg = invalidPassError;
  } else {
    valid = true;
  }

  if (showErrorMsg) {
    toggleErrorMsg(valid, passError, erMsg);
  }

  return valid;
}

function processPassOnBlur() {
  resetTips();
  isPassValid();
}

function isPassRepeatValid(showErrorMsg = true) {
  const pass = passInput.value;
  const passRepeat = passRepeatInput.value;
  let valid;
  let erMsg = "";

  if (!passRepeat) {
    valid = false;
    erMsg = noRepeatPassError;
  } else if (passRepeat !== pass) {
    valid = false;
    erMsg = invalidRepeatPassError;
  } else {
    valid = true;
  }

  if (showErrorMsg) {
    toggleErrorMsg(valid, passRepeatError, erMsg);
  }

  return valid;
}

function isFormValid(toSubmit = false) {
  let formValid = true;

  if (!isNameValid(toSubmit)) {
    btn.setAttribute("disabled", true);
    formValid = false;
    if (!toSubmit) return formValid;
  }

  if (!isEmailValid(toSubmit)) {
    btn.setAttribute("disabled", true);
    formValid = false;
    if (!toSubmit) return formValid;
  }

  if (!isAgeValid(toSubmit)) {
    btn.setAttribute("disabled", true);
    formValid = false;
    if (!toSubmit) return formValid;
  }

  if (!sexChecked) {
    formValid = false;
    toggleErrorMsg(!sexChecked, sexError, noSexError);
    btn.setAttribute("disabled", true);
    if (!toSubmit) return formValid;
  }

  if (!consentChecked) {
    formValid = false;
    toggleErrorMsg(!consentChecked, consentError, noConsentErrorMsg);
    btn.setAttribute("disabled", true);
    if (!toSubmit) return formValid;
  }

  if (!isOccupationValid(toSubmit)) {
    btn.setAttribute("disabled", true);
    formValid = false;
    if (!toSubmit) return formValid;
  }

  if (!isPassValid(toSubmit)) {
    btn.setAttribute("disabled", true);
    formValid = false;
    if (!toSubmit) return formValid;
  }

  if (!isPassRepeatValid(toSubmit)) {
    btn.setAttribute("disabled", true);
    formValid = false;
    if (!toSubmit) return formValid;
  }

  return formValid;
}

function toggleBtnState() {
  if (isFormValid()) {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", true);
  }
}

// function submitForm(evt) {
//   evt.preventDefault();
//   const formValid = isFormValid(true);
//   if (formValid) {
//     alert("Данные успешно отправлены");
//     regForm.reset();
//   }
// }

function submitForm(evt) {
  evt.preventDefault();
  console.log("here");
  const formValid = isFormValid(true);

  if (!formValid) {
    return;
  }

  alert("Данные успешно отправлены");
  regForm.reset();
}

btn.addEventListener("click", submitForm);
nameInput.addEventListener("input", changeNameOnInput);
nameInput.addEventListener("blur", isNameValid);

emailInput.addEventListener("input", () =>
  toggleErrorMsg(true, emailError, "")
);
emailInput.addEventListener("blur", isEmailValid);

ageInput.addEventListener("input", changeAgeOnInput);
ageInput.addEventListener("blur", isAgeValid);
radioGroups.forEach(function (item) {
  item.addEventListener("input", markChecked);
});
consentCheckbox.addEventListener("input", markChecked);
occupationSelect.addEventListener("blur", isOccupationValid);

passInput.addEventListener("input", checkPassOnInput);
passInput.addEventListener("blur", processPassOnBlur);

passRepeatInput.addEventListener("input", () =>
  toggleErrorMsg(true, passRepeatError, "")
);
passRepeatInput.addEventListener("blur", isPassRepeatValid);

regForm.addEventListener("input", toggleBtnState);
regForm.addEventListener("submit", submitForm);
