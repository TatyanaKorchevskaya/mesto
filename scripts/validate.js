function enableValidation(config) {
  //   const showInputError = (form, input) => {};
  //   const hideInputError = (form, input) => {};
  //   const isValid = (form, input) => {
  //     if (input.validity.valid) {
  //       showInputError(form, input);
  //     } else {
  //       hideInputError(form, input);
  //     }
  //   };
  //
  //   const forms = Array.from(document.querySelectorAll(formSelector));
  //   forms.forEach((form) => {
  //     setEventListeners(form);
  //   });

  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

function hasInvalidValue(inputs) {
  return inputs.some((input) => !input.validity.valid);
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function isValid(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function showInputError(form, input, config) {
  input.classList.add(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  console.log("show");
  span.textContent = input.validationMessage;
  span.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  input.classList.remove(config.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  console.log(span);
  span.textContent = "";
  span.classList.remove(config.errorClass);
}

function toggleButtonState(inputs, button, config) {
  if (hasInvalidValue(inputs)) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

export { enableValidation };
