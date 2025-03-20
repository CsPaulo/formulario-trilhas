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

      const icon = document.createElement("img");
      icon.classList.add("error-icon");
      icon.src = "assets/icons/alert-circle.png";
      icon.alt = "Erro";
      message.appendChild(icon);
      message.appendChild(document.createTextNode(getErrorMessage(input)));
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

function preencherCampos() {
  const cep = document.getElementById("cep").value;
  if (cep % 1 == 0) {
    document.getElementById("rua").value = "Rua Existente X";
    document.getElementById("cidade").value = "Imperatriz";
    document.getElementById("estado").value = "Maranhão";

    document.getElementById("rua").readOnly = true;
    document.getElementById("cidade").readOnly = true;
    document.getElementById("estado").readOnly = true;
  }
}
