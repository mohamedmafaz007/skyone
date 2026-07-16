import mammoth from "mammoth";
// @ts-ignore
import pdfParse from "pdf-parse";

/**
 * Extracts plain text from Microsoft Word (.docx) file buffer
 */
export async function parseDocx(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error("Error parsing Word document:", error);
    throw new Error("Failed to parse Word (.docx) document: " + (error as Error).message);
  }
}

/**
 * Extracts plain text from PDF file buffer
 */
export async function parsePdf(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF document:", error);
    throw new Error("Failed to parse PDF document: " + (error as Error).message);
  }
}
