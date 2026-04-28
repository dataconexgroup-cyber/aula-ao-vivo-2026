# PRD - Sistema de Pesquisa de Satisfação Chora API Revolution

## 1. Descrição do Projeto
Criar uma Landing Page de pesquisa de satisfação para alunos com 2 meses de curso.

## 2. Pilha Tecnológica
- **Frontend:** Next.js + Tailwind (Hospedagem na Vercel).
- **Backend:** Serverless Functions da Vercel.
- **Data Store:** Google Sheets API.

## 3. Configuração Google Cloud (Step-by-Step)
1. **Projeto:** Criar projeto no Google Cloud Console.
2. **API:** Ativar 'Google Sheets API'.
3. **Credenciais:** Criar 'Service Account'.
4. **Chave:** Gerar chave JSON e salvar variáveis de ambiente na Vercel (`GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`).
5. **Permissão:** Compartilhar a planilha com o e-mail da Service Account (acesso de Editor).

## 4. Métricas de Sucesso
- **Taxa de Resposta:** > 40% dos alunos atingidos.
- **NPS Benchmark:** Zona de Qualidade (> 50).
- **Performance:** Nota A no Lighthouse (LCP < 1.2s).
