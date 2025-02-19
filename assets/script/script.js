const btn = document.getElementById("submitBtn");
const regForm = document.getElementById("regForm");
const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const ageInput = document.getElementById("age");
const ageError = document.getElementById("ageError");
const sexInputs = document.querySelectorAll('input[name="sex"]');
const sexError = document.getElementById("sexError");
const occupationSelect = document.getElementById("occupation");
const occupationError = document.getElementById("occupationError");
const passInput = document.getElementById("pass1");
const passError = document.getElementById("pass1Error");
const passTips = document.getElementById("passTips");
const passRepeatInput = document.getElementById("pass2");
const passRepeatError = document.getElementById("pass2Error");
const consentCheckbox = document.getElementById("consent");
const consentError = document.getElementById("consentError");

const formValidity = {
  name: false,
  email: false,
  age: false,
  sex: false,
  occupation: false,
  password: false,
  passwordRepeat: false,
  consent: false,
};

const errorMsgs = {
  firstCharErrorMsg: "Имя должно начинаться с буквы",
  noNameErrorMsg: "Пожалуйста, введите имя",
  nameTooShortErrorMsg: "Длина имени не должна быть меньше 2 символов",
  noEmailErrorMsg: "Пожалуйста, введите адрес электронной почты",
  invalidEmailErrorMsg: "Пожалуйста, введите верный адрес электронной почты",
  noAgeErrorMsg: "Пожалуйста, введите возраст",
  invalidAgeErrorMsg: "Возраст не может быть меньше 1 или больше 110.",
  noOccupationErrorMsg: "Пожалуйста, выберете профессию из списка",
  noPassErrorMsg: "Пожалуйста, введите пароль",
  invalidPassErrorMsg: "Пароль не соответствует требованиям",
  noRepeatPassErrorMsg: "Пожалуйста, повторите пароль",
  invalidRepeatPassErrorMsg: "Пароли не совпадают",
  noConsentErrorMsg:
    "Пожалуйста, подтвердите согласие на обработку персональных данных.",
};

const lengthTip = document.getElementById("length");
const upperCaseTip = document.getElementById("upperCaseLetter");
const lowerCaseTip = document.getElementById("lowerCaseLetter");
const digitTip = document.getElementById("digit");

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
    erMsg = errorMsgs["firstCharErrorMsg"];
  }
  return [valid, erMsg];
}

function updateValidity(key, isValid) {
  formValidity[key] = isValid;
  toggleBtnState();
}

function isNameValid() {
  const name = nameInput.value;
  let valid;
  let erMsg = "";

  if (!name) {
    erMsg = errorMsgs["noNameErrorMsg"];
    valid = false;
  } else if (name.length < 2) {
    valid = false;
    erMsg = errorMsgs["nameTooShortErrorMsg"];
  } else {
    valid = true;
  }
  return [valid, erMsg];
}

function isEmailValid() {
  const email = emailInput.value;
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  let valid = true;
  let erMsg = "";

  if (!email) {
    valid = false;
    erMsg = errorMsgs["noEmailErrorMsg"];
  } else if (!regex.test(email)) {
    valid = false;
    erMsg = errorMsgs["invalidEmailErrorMsg"];
  } else {
    valid = true;
  }
  return [valid, erMsg];
}

function changeAgeOnInput() {
  const age = ageInput.value;
  ageInput.value = age.replace(/[^1-9]/g, "");
}

function isAgeValid() {
  const age = ageInput.value;
  let valid;
  let erMsg = "";

  if (!age) {
    valid = false;
    erMsg = errorMsgs["noAgeErrorMsg"];
  } else if (!ageInput.checkValidity()) {
    valid = false;
    erMsg = errorMsgs["invalidAgeErrorMsg"];
  } else {
    valid = true;
  }
  return [valid, erMsg];
}

function markChecked(input) {
  if (input.type === "radio") {
    const sexChecked = true;
    updateValidity("sex", sexChecked);
  } else if (input.type === "checkbox") {
    const consentChecked = consentCheckbox.checked;
    updateValidity("consent", consentChecked);
  }
}

function isOccupationValid() {
  let valid = true;
  let erMsg = "";

  if (occupationSelect.selectedIndex === 0) {
    valid = false;
    erMsg = errorMsgs["noOccupationErrorMsg"];
  }

  return [valid, erMsg];
}

function markUnmarkTipAsDone(elem, condition) {
  if (condition) {
    elem.classList.add("done");
  } else {
    elem.classList.remove("done");
  }
}

function checkPassOnInput() {
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

function isPassValid() {
  const pass = passInput.value;
  let valid;
  let erMsg = "";
  if (!pass) {
    valid = false;
    erMsg = errorMsgs["noPassErrorMsg"];
  } else if (!passInput.checkValidity()) {
    valid = false;
    erMsg = errorMsgs["invalidPassErrorMsg"];
  } else {
    valid = true;
  }

  toggleErrorMsg(valid, passError, erMsg);
  return valid;
}

function processPassOnInput() {
  toggleErrorMsg(true, passError, "");
  hideOrShowElem(passTips, false);
  checkPassOnInput();
}

function processPassOnBlur() {
  resetTips();
  const passValidity = isPassValid();
  updateValidity("password", passValidity);
}

function isPassRepeatValid() {
  const pass = passInput.value;
  const passRepeat = passRepeatInput.value;
  let valid;
  let erMsg = "";

  if (!passRepeat) {
    valid = false;
    erMsg = errorMsgs["noRepeatPassErrorMsg"];
  } else if (passRepeat !== pass) {
    valid = false;
    erMsg = errorMsgs["invalidRepeatPassErrorMsg"];
  } else {
    valid = true;
  }

  return [valid, erMsg];
}

function isFormValid() {
  return Object.values(formValidity).every(Boolean);
}

function toggleBtnState() {
  if (isFormValid()) {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", true);
  }
}

function submitForm(evt) {
  evt.preventDefault();
  alert("Данные успешно отправлены");
  regForm.reset();
}

function processInput(evt) {
  const input = evt.target;

  if (input === nameInput) {
    const [valid, erMsg] = changeNameOnInput();
    toggleErrorMsg(valid, nameError, erMsg);
  } else if (input === emailInput) {
    toggleErrorMsg(true, emailError, "");
  } else if (input === ageInput) {
    hideOrShowElem(ageError);
    changeAgeOnInput();
  } else if (input === sexInputs[0] || input === sexInputs[1]) {
    markChecked(input);
  } else if (input === occupationSelect) {
    updateValidity("occupation", true);
  } else if (input === passInput) {
    processPassOnInput();
  } else if (input === passRepeatInput) {
    toggleErrorMsg(true, passRepeatError, "");
  } else if (input === consentCheckbox) {
    markChecked(input);
    toggleErrorMsg(
      consentCheckbox.checked,
      consentError,
      errorMsgs["noConsentErrorMsg"]
    );
  } else {
    return;
  }
}

function processBlur(evt) {
  const input = evt.target;

  if (input === nameInput) {
    const [valid, erMsg] = isNameValid();
    toggleErrorMsg(valid, nameError, erMsg);
    updateValidity("name", valid);
  } else if (input === emailInput) {
    const [valid, erMsg] = isEmailValid();
    toggleErrorMsg(valid, emailError, erMsg);
    updateValidity("email", valid);
  } else if (input === ageInput) {
    const [valid, erMsg] = isAgeValid();
    toggleErrorMsg(valid, ageError, erMsg);
    updateValidity("age", valid);
  } else if (input === occupationSelect) {
    const [valid, erMsg] = isOccupationValid();
    toggleErrorMsg(valid, occupationError, erMsg);
    updateValidity("occupation", valid);
  } else if (input === passInput) {
    processPassOnBlur();
  } else if (input === passRepeatInput) {
    const [valid, erMsg] = isPassRepeatValid();
    toggleErrorMsg(valid, passRepeatError, erMsg);
    updateValidity("passwordRepeat", valid);
  } else {
    return;
  }
}

regForm.addEventListener("input", processInput);
regForm.addEventListener("blur", processBlur, true);
regForm.addEventListener("submit", submitForm);
