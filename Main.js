document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-container");
  const inputs = form?.querySelectorAll("input, select");
  const loginForm = document.getElementById("login-form"); // Formulário de login

  // Verifica se já existem usuários no localStorage
  if (!localStorage.getItem("users")) {
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
  }
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
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const cpf = document.getElementById("cpf").value;
    const userExists = users.some((user) => user.cpf === cpf);

    if (userExists) {
      showPopup("Erro: Já existe um usuário com este CPF.");
      return;
    }

    const userId = Date.now();

    const userData = {
      id: userId,
      nome: document.getElementById("nome").value,
      dataNascimento: document.getElementById("data-nascimento").value,
      cpf: cpf,
      sexo: document.getElementById("sexo").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
      telefone: document.getElementById("telefone").value,
      cep: document.getElementById("cep").value,
      rua: document.getElementById("rua").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
      trilhaEscolhida: document.querySelector('input[name="curso"]:checked')?.value || "Nenhuma", // Obtém a trilha escolhida
      imagens: {
        identidade: identidadeInput.files[0] ? URL.createObjectURL(identidadeInput.files[0]) : null, // Salva a URL da imagem de identidade
        comprovanteResidencia: comprovanteResidencalInput.files[0] ? URL.createObjectURL(comprovanteResidencalInput.files[0]) : null, // Salva a URL da imagem de residência
      },
    };

    // Adiciona o novo usuário à lista e salva no localStorage
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    showPopup("Usuário cadastrado com sucesso!");
  }

  function showPopup(message) {
    alert(message);
  }

  function verifyLogin() {
    const cpf = document.getElementById("login-cpf").value;
    const senha = document.getElementById("login-senha").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.cpf === cpf && user.senha === senha);

    if (userExists) {
      showPopup("Login bem-sucedido! Usuário encontrado.");
    } else {
      showPopup("Erro: Usuário não encontrado ou credenciais inválidas.");
    }
  }

  const identidadeInput = document.getElementById("identidade");
  const identidadeUploadContent = identidadeInput.closest(".custom-file-upload").querySelector(".upload-content");
  const identidadeStatus = document.getElementById("identidade-status");

  const comprovanteResidencalInput = document.getElementById("comprovanteResidencal");
  const comprovanteResidencalUploadContent = comprovanteResidencalInput.closest(".custom-file-upload").querySelector(".upload-content");
  const comprovanteResidencalStatus = document.getElementById("comprovanteResidencal-status");

  // Função para exibir a imagem selecionada
  function previewImage(input, uploadContent) {
    if (input.files.length > 0) {
      const file = input.files[0];

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          let previewImage = uploadContent.querySelector(".upload-preview");
          if (!previewImage) {
            previewImage = document.createElement("img");
            previewImage.classList.add("upload-preview");
            previewImage.style.maxWidth = "100%";
            previewImage.style.maxHeight = "150px";
            previewImage.style.borderRadius = "5px";
            previewImage.style.marginBottom = "0.5rem";
            uploadContent.prepend(previewImage); // Adiciona a imagem acima do texto
          }
          previewImage.src = e.target.result;

          const uploadText = uploadContent.querySelector("p");
          if (uploadText) {
            uploadText.style.display = "none";
          }

          const uploadIcon = uploadContent.querySelector(".upload-icon");
          if (uploadIcon) {
            uploadIcon.style.display = "none";
          }
          const customFileUpload = uploadContent.closest(".custom-file-upload");
          customFileUpload.style.padding = "0"; // Remove o padding
        };
        reader.readAsDataURL(file);
      } else {
        const uploadText = uploadContent.querySelector("p");
        if (uploadText) {
          uploadText.textContent = "Arquivo selecionado não é uma imagem.";
          uploadText.style.display = "block";
        }
      }
    }
  }
  identidadeInput.addEventListener("change", () => {
    previewImage(identidadeInput, identidadeUploadContent);
    identidadeStatus.textContent = identidadeInput.files.length > 0 ? "Documento anexado: " + identidadeInput.files[0].name : "";
  });

  comprovanteResidencalInput.addEventListener("change", () => {
    previewImage(comprovanteResidencalInput, comprovanteResidencalUploadContent);
    comprovanteResidencalStatus.textContent =
      comprovanteResidencalInput.files.length > 0 ? "Documento anexado: " + comprovanteResidencalInput.files[0].name : "";
  });
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
