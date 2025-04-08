document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");
  const inputs = form?.querySelectorAll("input, select");
  const loginForm = document.getElementById("login-form"); // Formulário de login

  // Dados de exemplo pré-salvos
  const exampleUser = {
    nome: "Usuário Teste",
    dataNascimento: "01/01/2000",
    cpf: "000.000.000-00",
    sexo: "masculino",
    email: "teste@gmail.com",
    senha: "teste123",
    telefone: "(00) 00000-0000",
    cep: "00000000",
    rua: "Rua Existente X",
    cidade: "Imperatriz",
    estado: "Maranhão",
  };
  localStorage.setItem("users", JSON.stringify([exampleUser]));

  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener("blur", validateInput);
    });
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (validateForm()) {
        console.log("Formulário válido. Salvando dados...");
        saveUserData();
      } else {
        console.log("Formulário inválido.");
        showPopup("Erro: Preencha todos os campos obrigatórios corretamente.");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      verifyLogin();
    });
  }

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

  console.log("Form encontrado:", form);

  console.log("Inputs encontrados:", inputs);

  function validateForm() {
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        console.log("Campo inválido:", input.name, input.value);
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });
    return isValid;
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

  function saveUserData() {
    const userData = {
      nome: document.getElementById("nome").value,
      dataNascimento: document.getElementById("data-nascimento").value,
      cpf: document.getElementById("cpf").value,
      sexo: document.getElementById("sexo").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
      telefone: document.getElementById("telefone").value,
      cep: document.getElementById("cep").value,
      rua: document.getElementById("rua").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    showPopup("Usuário cadastrado com sucesso!");
  }

  function showPopup(message) {
    alert(message);
  }

  function verifyLogin() {
    const email = document.getElementById("login-email").value;
    const senha = document.getElementById("login-senha").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email && user.senha === senha);

    if (userExists) {
      showPopup("Login bem-sucedido! Usuário encontrado.");
    } else {
      showPopup("Erro: Usuário não encontrado ou credenciais inválidas.");
    }
  }
});

function preencherCampos() {
  const cep = document.getElementById("cep").value;
  if (cep / 1 == cep && cep / 1 != 0) {
    document.getElementById("rua").value = "Rua Existente X";
    document.getElementById("cidade").value = "Imperatriz";
    document.getElementById("estado").value = "Maranhão";

    document.getElementById("rua").readOnly = true;
    document.getElementById("cidade").readOnly = true;
    document.getElementById("estado").readOnly = true;
  }
}
