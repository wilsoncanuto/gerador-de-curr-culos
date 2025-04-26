
📝 Documentação do Projeto — Gerador de Currículos:

📌 Descrição:

Este projeto é um gerador de currículos online que permite ao usuário preencher dados pessoais, profissionais e acadêmicos, visualizar uma prévia do currículo e exportá-lo em formato PDF ou Word. O sistema também permite salvar e carregar currículos temporariamente na memória.

📁 Estrutura de Arquivos:

```
/Gerador-curriculos/
│
├── index.html        → Página principal com layout e componentes
├── style.css         → Estilos customizados (opcional, se necessário)
└── script.js         → Lógica de geração, pré-visualização e exportação
```

🧩 Tecnologias Utilizadas:

- HTML5 — Estrutura semântica da aplicação
- Tailwind CSS (via CDN) — Estilização rápida e moderna
- JavaScript (Vanilla) — Manipulação de dados e geração de arquivos
- jsPDF — Exportação do currículo para formato PDF
- docx.js — Exportação do currículo para formato DOCX (Word)

🧰 Funcionalidades:

| Funcionalidade                  | Descrição |
|-------------------------------|-----------|
| 🧑 Cadastro de Dados           | Nome, Email, Telefone, GitHub, LinkedIn |
| 🗂️ Seções do Currículo         | Objetivo, Resumo, Formação, Experiência, Habilidades |
| 📋 Pré-visualização            | Mostra o currículo em tempo real no lado direito |
| 📄 Exportar PDF                | Gera um arquivo `.pdf` usando jsPDF |
| 📝 Exportar Word               | Gera um arquivo `.docx` usando docx.js |
| 💾 Salvar no Banco (temporário) | Armazena os dados na memória (array local) |
| 🔄 Carregar Currículo          | Permite recarregar um currículo salvo da lista |
| 🧹 Limpar Campos               | Limpa todos os campos do formulário |

🖼️ Interface:

- Interface simples e responsiva dividida em dois painéis:

  - Esquerda: Formulário para preencher os dados
  - Direita: Pré-visualização do currículo em tempo real

- Botões coloridos com feedback visual (hover)
- Campos com placeholders explicativos

🔧 Como Usar:

1. Abra o arquivo `index.html` em um navegador moderno.
2. Preencha os dados nas seções do formulário.
3. Marque ou desmarque as seções que deseja incluir.
4. Veja a prévia ao lado.
5. Clique nos botões:

   - PDF para exportar
   - Word para salvar como `.docx`
   - Salvar no Banco** para guardar localmente
   - Carregar para recuperar currículos salvos
   - Limpar para recomeçar

🚀 Possíveis Melhorias Futuras:

- Persistência em banco de dados real (Firebase, Supabase, etc.)
- Autenticação de usuário
- Adicionar opção de upload de foto
- Templates personalizados de currículo
- Exportação para HTML ou Markdown

