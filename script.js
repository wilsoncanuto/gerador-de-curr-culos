const campos = [
  "nome", "email", "telefone", "github", "linkedin",
  "objetivo", "resumo", "formacao", "experiencia", "habilidades", "projetos"
];

const banco = [];

function getDados() {
  const dados = {};
  campos.forEach(id => dados[id] = document.getElementById(id).value.trim());
  dados.secoes = {
    objetivo: document.getElementById("sec_objetivo").checked,
    resumo: document.getElementById("sec_resumo").checked,
    formacao: document.getElementById("sec_formacao").checked,
    experiencia: document.getElementById("sec_experiencia").checked,
    habilidades: document.getElementById("sec_habilidades").checked,
    projetos: document.getElementById("sec_projetos").checked
  };
  return dados;
}

function setDados(dados) {
  campos.forEach(id => document.getElementById(id).value = dados[id] || "");
  for (const sec in dados.secoes) {
    document.getElementById(`sec_${sec}`).checked = dados.secoes[sec];
  }
  updatePreview();
}

function updatePreview() {
  const d = getDados();
  let html = `
    <div><strong>${d.nome}</strong></div>
    <div>${d.email} | ${d.telefone}</div>
    <div>GitHub: ${d.github}</div>
    <div>LinkedIn: ${d.linkedin}</div><br/>
  `;

  const blocos = [
    ["objetivo", "Objetivo"],
    ["resumo", "Resumo Profissional"],
    ["formacao", "Formação Acadêmica"],
    ["experiencia", "Experiência Profissional"],
    ["habilidades", "Habilidades"],
    ["projetos", "Projetos Pessoais"]
  ];

  blocos.forEach(([campo, titulo]) => {
    if (d.secoes[campo]) {
      html += `<p><strong>${titulo}:</strong></p><hr/><p>${d[campo]}</p><br/>`;
    }
  });

  html += `<hr class="border-t-2 border-gray-600 mt-4"/>`;
  document.getElementById("preview").innerHTML = html;
}

campos.forEach(id => document.getElementById(id).addEventListener("input", updatePreview));
["sec_objetivo", "sec_resumo", "sec_formacao", "sec_experiencia", "sec_habilidades", "sec_projetos"]
  .forEach(id => document.getElementById(id).addEventListener("change", updatePreview));

function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const d = getDados();
  let y = 20;

  doc.setFont("Times", "normal");
  doc.setFontSize(12);
  doc.text(d.nome, 20, y); y += 8;
  doc.text(`${d.email} | ${d.telefone}`, 20, y); y += 8;
  doc.text(`GitHub: ${d.github}`, 20, y); y += 8;
  doc.text(`LinkedIn: ${d.linkedin}`, 20, y); y += 12;

  const blocos = [
    ["objetivo", "Objetivo"],
    ["resumo", "Resumo Profissional"],
    ["formacao", "Formação Acadêmica"],
    ["experiencia", "Experiência Profissional"],
    ["habilidades", "Habilidades"],
    ["projetos", "Projetos Pessoais"]
  ];

  blocos.forEach(([campo, titulo]) => {
    if (d.secoes[campo]) {
      doc.setFont(undefined, "bold");
      doc.text(titulo + ":", 20, y); y += 2;
      doc.setDrawColor(150);
      doc.line(20, y, 190, y); y += 5;
      doc.setFont(undefined, "normal");
      const linhas = doc.splitTextToSize(d[campo] || "", 170);
      doc.text(linhas, 20, y); y += linhas.length * 7 + 5;
    }
  });

  doc.line(20, y, 190, y);
  doc.save("curriculo.pdf");
}

async function gerarWord() {
  const { Document, Packer, Paragraph, BorderStyle } = window.docx;
  const d = getDados();

  const blocos = [
    ["objetivo", "Objetivo"],
    ["resumo", "Resumo Profissional"],
    ["formacao", "Formação Acadêmica"],
    ["experiencia", "Experiência Profissional"],
    ["habilidades", "Habilidades"],
    ["projetos", "Projetos Pessoais"]
  ];

  const linhas = [
    new Paragraph({ text: d.nome, heading: "Heading1" }),
    new Paragraph(`${d.email} | ${d.telefone}`),
    new Paragraph(`GitHub: ${d.github}`),
    new Paragraph(`LinkedIn: ${d.linkedin}`),
    new Paragraph("")
  ];

  blocos.forEach(([campo, titulo]) => {
    if (d.secoes[campo]) {
      linhas.push(new Paragraph({ text: titulo + ":" }));
      linhas.push(new Paragraph({
        border: {
          bottom: { color: "999999", value: BorderStyle.SINGLE, size: 6 }
        }
      }));
      linhas.push(new Paragraph(d[campo]));
      linhas.push(new Paragraph(""));
    }
  });

  linhas.push(new Paragraph({
    border: {
      bottom: { color: "000000", value: BorderStyle.SINGLE, size: 12 }
    }
  }));

  const doc = new Document({ sections: [{ children: linhas }] });
  const blob = await Packer.toBlob(doc);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "curriculo.docx";
  a.click();
}

function salvarNoBanco() {
  const dados = getDados();
  banco.push(dados);
  atualizarSelectBanco();
  alert("Currículo salvo!");
}

function atualizarSelectBanco() {
  const select = document.getElementById("bancoSelect");
  select.innerHTML = "";
  banco.forEach((item, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.text = `${item.nome} (${item.email})`;
    select.appendChild(opt);
  });
}

function carregarDoBanco() {
  const index = document.getElementById("bancoSelect").value;
  if (index !== "") setDados(banco[index]);
}

function limparCampos() {
  campos.forEach(id => document.getElementById(id).value = "");
  ["sec_objetivo", "sec_resumo", "sec_formacao", "sec_experiencia", "sec_habilidades", "sec_projetos"]
    .forEach(id => document.getElementById(id).checked = true);
  updatePreview();
}

updatePreview();
