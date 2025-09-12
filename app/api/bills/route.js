import * as cheerio from "cheerio";
import { promises as fs } from "fs";

const baseUrl = "https://prsindia.org";

export async function GET() {
  const url = `${baseUrl}/billtrack/`;
  const response = await fetch(url, { cache: "no-store" });
  const body = await response.text();
  const $ = cheerio.load(body);

  let bills = [];

  // Step 1: Collect bill data directly from the main page
  $(".view-content .views-row").each((i, el) => {
    const billTitle = $(el).find("a").first().text().trim();
    const detailLink = $(el).find("a").first().attr("href");

    // Scrape the status with the corrected selector
    const statusText = $(el)
      .find(".views-field-field-bill-status span")
      .text()
      .trim();

    if (billTitle && detailLink) {
      bills.push({
        id: i + 1,
        title: billTitle,
        link: baseUrl + detailLink,
        pdf: null,
        status: statusText,
      });
    }
  });

  // Step 2: Visit each detail page to scrape PDFs
  for (let bill of bills) {
    try {
      const res = await fetch(bill.link);
      const html = await res.text();
      const $$ = cheerio.load(html);

      const pdfLink = $$("a[href$='.pdf']").attr("href");
      if (pdfLink) {
        bill.pdf = pdfLink.startsWith("http") ? pdfLink : baseUrl + pdfLink;
      }
    } catch (err) {
      console.error(`Error fetching ${bill.link}:`, err);
    }
  }

  // Step 3: Store the data into a JSON file
  const jsonData = JSON.stringify(bills, null, 2);
  try {
    await fs.writeFile("bills.json", jsonData);
    console.log("Data successfully written to bills.json");
  } catch (err) {
    console.error("Error writing to file:", err);
  }

  return new Response(JSON.stringify(bills), {
    headers: { "Content-Type": "application/json" },
  });
}
