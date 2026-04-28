# 🚀 Fluxo de Aprendizado: Curso Chora API

Este documento estabelece o roteiro técnico e conceitual para a integração entre IA, Low-code e Infraestrutura de Nuvem, focando no uso do Google Sheets como banco de dados.

---

## 🏗️ O Ecossistema Tecnológico

| Ferramenta | Papel no Fluxo |
| :--- | :--- |
| **Gemini** | Brainstorming, arquitetura da solução e geração de lógica. |
| **Markmap** | Visualização de mapas mentais a partir de Markdown para organizar o conhecimento. |
| **Lovable** | Desenvolvimento acelerado da aplicação (Front-end e Integrações). |
| **Google Sheets** | Nossa base de dados ágil e visual. |
| **Google Cloud** | Camada de segurança, gerenciamento de APIs e autenticação. |
| **GitHub** | Versionamento e repositório central do código. |
| **Vercel** | Hospedagem e deploy contínuo da aplicação. |
| **Antigravity** | Exploração de novas fronteiras em desenvolvimento e automação. |

---

## 🛠️ Fluxo de Aprendizado (Passo a Passo)

### 1. Ideação e Estrutura com Gemini
Iniciamos com o **Gemini** para definir o que vamos construir.
- Definir o escopo da aplicação.
- Estruturar quais campos de dados são necessários para o cadastro.
- Gerar o esqueleto do Markdown que será usado no Markmap.

### 2. Organização Mental com Markmap
Transformamos as ideias soltas em um mapa visual.
- Colar o roteiro gerado pelo Gemini no **Markmap**.
- Validar a hierarquia da aplicação (Páginas > Componentes > Dados).

### 3. Estruturação de Dados no Google Sheets
Preparamos o "banco de dados".
- Criar a planilha com os cabeçalhos corretos.
- Definir tipos de dados (Texto, Data, Número).

### 4. Segurança e API no Google Cloud
Esta é a parte crítica para o **Chora API**.
- Criar um projeto no **Google Cloud Console**.
- Ativar a **Google Sheets API**.
- Criar uma **Conta de Serviço (Service Account)**.
- Gerar a chave JSON de credenciais.
- **Importante:** Compartilhar a planilha com o e-mail da Service Account.

### 5. Construção no Lovable
Onde a mágica acontece.
- Usar o prompt do Gemini para guiar o **Lovable** na criação da interface.
- Configurar a conexão com a API do Google Sheets para realizar o `POST` (Cadastro) e `GET` (Leitura).

### 6. Versionamento no GitHub
- Sincronizar o projeto do Lovable com o **GitHub**.
- Garantir que as variáveis de ambiente (as chaves do Google) estejam protegidas.

### 7. Publicação na Vercel
- Conectar o repositório do GitHub à **Vercel**.
- Configurar as `Environment Variables` na Vercel.
- Colocar a aplicação em produção.

---

## 💡 Por que este fluxo?
O uso do **Lovable** permite focar na experiência do usuário e na regra de negócio, enquanto o **Google Sheets** oferece uma interface de banco de dados amigável para quem está começando. A segurança via **Google Cloud** garante que o aluno aprenda o padrão de mercado para autenticação de APIs.

---
*Documento preparado para o ecossistema Chora API.*
