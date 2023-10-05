document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contato-form");
  const table = document.getElementById("contato-tabela");
  const nomeInput = document.getElementById("nome");
  const telefoneInput = document.getElementById("telefone");

  form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = nomeInput.value;
      const telefone = telefoneInput.value;

      // Verifica se o número de telefone está no formato correto "(xx) xxxxx-xxxx"
      if (!validarTelefone(telefone)) {
          alert("Por favor, insira um número de telefone no formato (xx) xxxxx-xxxx.");
          return;
      }

      // Verifica se o nome já existe na tabela
      if (nomeJaExiste(nome)) {
          alert("Este nome já está na lista de contatos. Por favor, insira um nome diferente.");
          return;
      }

      const row = table.insertRow(-1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);

      cell1.innerHTML = nome;
      cell2.innerHTML = telefone;

      form.reset();
  });

  // Adiciona formatação automática ao campo de telefone
  telefoneInput.addEventListener("input", function () {
      const telefoneFormatado = formatarTelefone(telefoneInput.value);
      telefoneInput.value = telefoneFormatado;
  });

  // Função para validar o formato do número de telefone
  function validarTelefone(telefone) {
      return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
  }

  // Função para formatar o número de telefone
  function formatarTelefone(telefone) {
      const numeros = telefone.replace(/\D/g, "");
      const formatado = `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7, 11)}`;
      return formatado.substring(0, 15); // Limita o comprimento para "(xx) xxxxx-xxxx"
  }

  // Função para verificar se o nome já existe na tabela
  function nomeJaExiste(nome) {
      const linhas = table.rows;
      for (let i = 1; i < linhas.length; i++) {
          const nomeNaTabela = linhas[i].cells[0].innerHTML;
          if (nomeNaTabela === nome) {
              return true;
          }
      }
      return false;
  }
});
