import 'dotenv/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// O process.env agora carrega as variáveis do arquivo .env via dotenv
const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env;

if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
  console.error("Faltam credenciais do Google Sheets no arquivo .env.");
  process.exit(1);
}

const serviceAccountAuth = new JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  // Limpa aspas do início e fim caso o dotenv as tenha mantido, e garante as quebras de linha
  key: GOOGLE_PRIVATE_KEY.replace(/^"|"$/g, '').replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);

async function testConnection() {
  try {
    console.log("Tentando conectar à planilha do Google Sheets...");
    await doc.loadInfo(); 
    console.log("\n✅ Sucesso! Conectado à planilha:");
    console.log("Título: " + doc.title);
    console.log("Quantidade de abas: " + doc.sheetCount);

    // Pegando a primeira aba (index 0)
    const sheet = doc.sheetsByIndex[0];
    console.log("Nome da aba: " + sheet.title);
    
    console.log("\nCarregando as células da aba...");
    // Carrega a região necessária (por exemplo, A1 até A5 para garantir)
    await sheet.loadCells('A1:A5'); 
    
    // Pega a célula A2
    const cellA2 = sheet.getCellByA1('A2');
    
    console.log(`Valor atual da célula A2: ${cellA2.value || '(vazia)'}`);
    
    // Altera o valor
    cellA2.value = 'Cleiton Freire';
    
    // Salva a alteração
    console.log("Salvando o novo valor 'Cleiton Freire' na célula A2...");
    await sheet.saveUpdatedCells();
    
    console.log("✅ Valor salvo com sucesso na planilha!");
  } catch (error) {
    console.error("\n❌ Erro ao conectar no Google Sheets:");
    console.error(error.message || error);
  }
}

testConnection();
