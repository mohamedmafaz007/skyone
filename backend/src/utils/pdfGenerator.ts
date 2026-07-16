import puppeteer from "puppeteer";
import PDFDocument from "pdfkit";

/**
 * Uses Puppeteer to render raw HTML content to a PDF document (ideal for highly designed luxury travel proposals)
 */
export async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    
    const page = await browser.newPage();
    // Set HTML content and wait for assets to load
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        bottom: "15mm",
        left: "15mm",
        right: "15mm"
      }
    });
    
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("Puppeteer PDF generation error:", error);
    throw new Error("Failed to generate PDF from HTML: " + (error as Error).message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Programmatically builds a standard travel itinerary PDF using PDFKit
 */
export async function generateStandardItineraryPdf(packageDetails: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: "A4" });
      const buffers: Buffer[] = [];
      
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (err) => reject(err));

      // Brand Header
      doc.fillColor("#0f172a") // Deep Navy
         .fontSize(22)
         .text("SkyNow Premier Travel", { align: "center" })
         .fontSize(10)
         .fillColor("#d97706") // Gold
         .text("Bespoke Travel Studio - Handcrafted Luxury Holidays", { align: "center" })
         .moveDown(1);

      // Section divider line
      doc.strokeColor("#e2e8f0")
         .moveTo(50, doc.y)
         .lineTo(545, doc.y)
         .stroke()
         .moveDown(1.5);

      // Travel Package details Header
      doc.fillColor("#0f172a")
         .fontSize(18)
         .text(packageDetails.name || "Custom Travel Package", { lineGap: 4 })
         .fontSize(11)
         .fillColor("#475569")
         .text(`Destination: ${packageDetails.country || "International"}`)
         .text(`Duration: ${packageDetails.duration || "N/A"}`)
         .text(`Pricing: ${packageDetails.price || "On Request"}`)
         .moveDown(1.5);

      // Overview
      doc.fillColor("#0f172a")
         .fontSize(13)
         .text("Overview", { underline: true })
         .moveDown(0.5)
         .fontSize(10)
         .fillColor("#334155")
         .text(packageDetails.overview || "No overview provided.", { align: "justify", lineGap: 2 })
         .moveDown(1.5);

      // Highlights
      if (packageDetails.highlights && Array.isArray(packageDetails.highlights) && packageDetails.highlights.length > 0) {
        doc.fillColor("#0f172a")
           .fontSize(13)
           .text("Key Highlights", { underline: true })
           .moveDown(0.5);

        packageDetails.highlights.forEach((hl: string) => {
          doc.fontSize(10)
             .fillColor("#334155")
             .text(`  •  ${hl}`, { lineGap: 1.5 });
        });
        doc.moveDown(1.5);
      }

      // Day by Day Itinerary
      if (packageDetails.itinerary && Array.isArray(packageDetails.itinerary) && packageDetails.itinerary.length > 0) {
        doc.fillColor("#0f172a")
           .fontSize(13)
           .text("Detailed Day-by-Day Itinerary", { underline: true })
           .moveDown(0.8);

        packageDetails.itinerary.forEach((item: any) => {
          // Keep day heading on same page as first lines if possible
          doc.fontSize(11)
             .fillColor("#d97706")
             .text(`${item.day || "Day"}: ${item.title || "Activity"}`, { lineGap: 3 })
             .fontSize(10)
             .fillColor("#334155")
             .text(item.desc || "", { align: "justify", lineGap: 2 })
             .moveDown(1);
        });
      }

      // Add a page for terms & exclusions
      doc.addPage();

      // Inclusions & Exclusions
      doc.fillColor("#0f172a")
         .fontSize(13)
         .text("Inclusions & Exclusions", { underline: true })
         .moveDown(0.8);

      doc.fontSize(11)
         .fillColor("#16a34a") // Green
         .text("What's Included:", { lineGap: 4 });

      if (packageDetails.inclusions && Array.isArray(packageDetails.inclusions) && packageDetails.inclusions.length > 0) {
        packageDetails.inclusions.forEach((inc: string) => {
          doc.fontSize(10)
             .fillColor("#334155")
             .text(`  ✓  ${inc}`, { lineGap: 2 });
        });
      } else {
        doc.fontSize(10).fillColor("#64748b").text("Standard inclusions apply.");
      }
      doc.moveDown(1.5);

      doc.fontSize(11)
         .fillColor("#dc2626") // Red
         .text("What's Excluded:", { lineGap: 4 });

      if (packageDetails.exclusions && Array.isArray(packageDetails.exclusions) && packageDetails.exclusions.length > 0) {
        packageDetails.exclusions.forEach((exc: string) => {
          doc.fontSize(10)
             .fillColor("#334155")
             .text(`  ✗  ${exc}`, { lineGap: 2 });
        });
      } else {
        doc.fontSize(10).fillColor("#64748b").text("Standard exclusions apply.");
      }
      doc.moveDown(1.5);

      // Accommodation List
      if (packageDetails.hotels && Array.isArray(packageDetails.hotels) && packageDetails.hotels.length > 0) {
        doc.fillColor("#0f172a")
           .fontSize(13)
           .text("Recommended Luxury Stays", { underline: true })
           .moveDown(0.5);

        packageDetails.hotels.forEach((hotel: any) => {
          const starRating = "★".repeat(hotel.stars || 5);
          doc.fontSize(10)
             .fillColor("#334155")
             .text(`•  ${hotel.name || "Luxury Stay"} - ${starRating} (${hotel.location || "Prime Location"})`, { lineGap: 2 });
        });
        doc.moveDown(1.5);
      }

      // Transports, Visas, Best Time
      if (packageDetails.transportation || packageDetails.visaInfo || packageDetails.bestTime) {
        doc.fillColor("#0f172a")
           .fontSize(13)
           .text("Additional Information", { underline: true })
           .moveDown(0.5);

        if (packageDetails.transportation) {
          doc.fontSize(10).fillColor("#334155").text(`Transportation: ${packageDetails.transportation}`, { lineGap: 2 });
        }
        if (packageDetails.visaInfo) {
          doc.fontSize(10).fillColor("#334155").text(`Visa Information: ${packageDetails.visaInfo}`, { lineGap: 2 });
        }
        if (packageDetails.bestTime) {
          doc.fontSize(10).fillColor("#334155").text(`Best Time to Visit: ${packageDetails.bestTime}`, { lineGap: 2 });
        }
      }

      // Global Footer at bottom of both pages
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc.strokeColor("#e2e8f0")
           .moveTo(50, 770)
           .lineTo(545, 770)
           .stroke();

        doc.fontSize(8)
           .fillColor("#94a3b8")
           .text("SkyNow Premier Travel  •  25A/1, 2nd Floor, Panagal Road, Madurai, TN, India 625020", 50, 778, { align: "center" })
           .text("Email: hello@skynowhollidays.com  |  WhatsApp: +91 76392 77770  |  Page " + (i + 1) + " of " + pageCount, { align: "center" });
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
