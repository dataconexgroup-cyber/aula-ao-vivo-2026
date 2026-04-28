import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const surveyResponseSchema = z.object({
  studentName: z.string().trim().min(2).max(80),
  studentEmail: z.string().trim().email().max(160),
  courseDays: z.number().int().min(0).max(60),
  nps: z.number().int().min(0).max(10),
  ces: z.number().int().min(1).max(7),
  csat: z.enum(["muito-ruim", "ruim", "ok", "bom", "excelente"]),
  improvement: z.string().trim().min(8).max(700),
});

export type SurveyResponseInput = z.infer<typeof surveyResponseSchema>;

export const submitSurveyResponse = createServerFn({ method: "POST" })
  .inputValidator((data) => surveyResponseSchema.parse(data))
  .handler(async ({ data }) => {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID || process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

    if (!spreadsheetId || !clientEmail || !privateKey) {
      return {
        ok: true,
        mode: "preview" as const,
        message:
          "Resposta validada. Configure as credenciais do Google Sheets para gravar na planilha.",
      };
    }

    // Initialize auth - replacing escaped newlines and stripping trailing/leading quotes or commas
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey.replace(/^"|"$/g, '').replace(/",?$/g, '').replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    try {
      const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
      await doc.loadInfo();
      
      const sheet = doc.sheetsByIndex[0]; // Gets the first sheet
      
      await sheet.addRow([
        new Date().toISOString(),
        data.studentName,
        data.studentEmail,
        data.courseDays,
        data.nps,
        data.ces,
        data.csat,
        data.improvement,
        data.nps >= 9 ? "promotor" : data.nps >= 7 ? "neutro" : "detrator",
        "CHora API",
        "60 dias",
      ]);

      return {
        ok: true,
        mode: "configured" as const,
        message: "Resposta registrada com segurança na planilha do CHora API.",
        receivedAt: new Date().toISOString(),
        responseId: crypto.randomUUID(),
      };
    } catch (error) {
      console.error("Google Sheets append failed:", error);
      throw new Error(`Google Sheets append failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });
