const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

const validateForm = () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === "") {
    displayError(username, "Username is required");
  } else {
    showSuccess(username);
  }

  if (emailValue === "") {
    displayError(email, "Email is required");
  } else if (!validEmail(emailValue)) {
    displayError(email, "Email is not valid");
  } else {
    showSuccess(email);
  }

  if (passwordValue === "") {
    displayError(password, "Password is required");
  } else if (!validPassword(passwordValue)) {
    displayError(
      password,
      "Password must be 8 characters long and must include special characters, lowercase and uppercase letters"
    );
  } else {
    showSuccess(password);
  }

  if (confirmPasswordValue === "") {
    displayError(confirmPassword, "Please retype password");
  } else if (confirmPasswordValue !== passwordValue) {
    displayError(confirmPassword, "Passwords do not match");
  } else {
    showSuccess(confirmPassword);
  }
};

const displayError = (element, message) => {
  const inputContainer = element.parentElement;
  const errorMessage = inputContainer.querySelector(".error");

  errorMessage.innerText = message;
  inputContainer.classList.add("error");
  inputContainer.classList.remove("success");
};

const showSuccess = (element) => {
  const inputContainer = element.parentElement;
  const errorMessage = inputContainer.querySelector(".error");

  errorMessage.innerText = "";
  inputContainer.classList.add("success");
  inputContainer.classList.remove("error");
};

const validEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validPassword = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};
