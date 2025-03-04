document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");
  const inputs = form.querySelectorAll("input, select");

  inputs.forEach((input) => {
    input.addEventListener("blur", validateInput);
  });

  function validateInput(event) {
    const input = event.target;
    const errorMessage = input.nextElementSibling;

    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove();
    }

    if (!input.checkValidity()) {
      input.classList.add("error");
      const message = document.createElement("div");
      message.classList.add("error-message");
      message.textContent = getErrorMessage(input);
      input.after(message);
    } else {
      input.classList.remove("error");
    }
  }

  function getErrorMessage(input) {
    if (input.validity.valueMissing) {
      return "Este campo é obrigatório.";
    }
    if (input.validity.typeMismatch) {
      return "Por favor, insira um valor válido.";
    }
    if (input.validity.patternMismatch) {
      return "Por favor, siga o formato solicitado.";
    }
    return "Valor inválido.";
  }
});
