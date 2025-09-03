import * as cheerio from "cheerio";

export async function GET() {
  const baseUrl = "https://prsindia.org";
  const url = `${baseUrl}/billtrack/`;
  const response = await fetch(url, { cache: "no-store" });
  const body = await response.text();
  const $ = cheerio.load(body);

  let bills = [];

  // Step 1: Collect bill titles + detail page links
  $(".view-content .views-row").each((i, el) => {
    const billTitle = $(el).find("a").first().text().trim();
    const detailLink = $(el).find("a").first().attr("href");

    if (billTitle && detailLink) {
      bills.push({
        id: i + 1,
        title: billTitle,
        link: baseUrl + detailLink,
        pdf: null,
      });
    }
  });

  // Step 2: Visit each detail page for PDFs
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
  console.log(bills);

  return new Response(JSON.stringify(bills), {
    headers: { "Content-Type": "application/json" },
  });
}
