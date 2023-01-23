const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const submitBtn = document.getElementById("submit-btn");
const confirmation = document.getElementById("confirmation");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const special = document.getElementById("special");
const long = document.getElementById("validLength");
const show = document.querySelector(".show");
const hide = document.querySelector(".hide");

username.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
password.addEventListener("focus", function () {
  confirmation.classList.add("display");
});

show.addEventListener("click", () => {
  show.style.display = "none";
  hide.style.display = "block";
  password.type = "text";
});

hide.addEventListener("click", () => {
  hide.style.display = "none";
  show.style.display = "block";
  password.type = "password";
});

confirmPassword.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", validateForm);

function validateForm(e) {
  let error = 0;

  if (!validateName()) {
    error++;
  }

  if (!validateEmail()) {
    error++;
  }

  if (!validatePassword()) {
    error++;
  }

  if (!validateConfirmPassword()) {
    error++;
  }

  if (error > 0) {
    e.preventDefault();
    submitBtn.disabled = true;
  }
}

function displayError(element, message) {
  const inputContainer = element.parentElement;
  const errorMessage = inputContainer.querySelector(".error");

  errorMessage.innerText = message;
  inputContainer.classList.add("error");
  inputContainer.classList.remove("success");
}

function showSuccess(element) {
  const inputContainer = element.parentElement;
  const errorMessage = inputContainer.querySelector(".error");

  errorMessage.innerText = "";
  inputContainer.classList.add("success");
  inputContainer.classList.remove("error");
}

function validateName() {
  const usernameValue = username.value;
  submitBtn.disabled = true;

  if (usernameValue === "") {
    displayError(username, "Username is required");
  } else if (usernameValue.length < 5) {
    displayError(username, "Username is short");
  } else {
    showSuccess(username);
    return true;
  }
}

function validateEmail() {
  const emailValue = email.value;
  submitBtn.disabled = true;

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailValue === "") {
    displayError(email, "Email is required");
  } else if (!re.test(String(emailValue).toLowerCase())) {
    displayError(email, "Email is not valid");
  } else {
    showSuccess(email);
    return true;
  }
}

function validatePassword() {
  const passwordValue = password.value;

  submitBtn.disabled = true;

  const containsUppercase = /^(?=.*[A-Z])/g;
  const containsLowercase = /^(?=.*[a-z])/g;
  const containsNumber = /^(?=.*[0-9])/g;
  const containsSymbol = /^(?=.*[~`!@#$%^&*()--+={}:;"'<>,.?/_₹])/g;
  const validLength = /^.{8,}$/g;

  if (passwordValue !== "") {
    if (containsUppercase.test(passwordValue)) {
      upper.classList.add("valid");
    } else {
      upper.classList.add("invalid");
      upper.classList.remove("valid");
    }

    if (containsLowercase.test(passwordValue)) {
      lower.classList.add("valid");
    } else {
      lower.classList.add("invalid");
      lower.classList.remove("valid");
    }

    if (containsNumber.test(passwordValue)) {
      number.classList.add("valid");
    } else {
      number.classList.add("invalid");
      number.classList.remove("valid");
    }

    if (containsSymbol.test(passwordValue)) {
      special.classList.add("valid");
    } else {
      special.classList.add("invalid");
      special.classList.remove("valid");
    }

    if (validLength.test(passwordValue)) {
      long.classList.add("valid");
    } else {
      long.classList.add("invalid");
      long.classList.remove("valid");
    }

    if (
      upper.classList.contains("valid") &&
      lower.classList.contains("valid") &&
      number.classList.contains("valid") &&
      special.classList.contains("valid") &&
      long.classList.contains("valid")
    ) {
      showSuccess(password);
      validateConfirmPassword();
      return true;
    } else {
      displayError(password, "Password is not valid");
      validateConfirmPassword();
    }
  } else {
    displayError(password, "Password is required");
    upper.classList.add("invalid");
    upper.classList.remove("valid");

    lower.classList.add("invalid");
    lower.classList.remove("valid");

    number.classList.add("invalid");
    number.classList.remove("valid");

    special.classList.add("invalid");
    special.classList.remove("valid");

    long.classList.add("invalid");
    long.classList.remove("valid");
    return false;
  }
}

function validateConfirmPassword() {
  const confirmPasswordValue = confirmPassword.value;
  const passwordValue = password.value;
  submitBtn.disabled = true;

  if (confirmPasswordValue === "") {
    displayError(confirmPassword, "Please retype the password");
  } else if (confirmPasswordValue !== passwordValue) {
    displayError(confirmPassword, "Password do not match");
  } else {
    showSuccess(confirmPassword);
    submitBtn.disabled = false;
    return true;
  }
}
