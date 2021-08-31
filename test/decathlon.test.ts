import parse from "node-html-parser";
import { getText } from "../src/fetch"
import { getProductListUrls, parseProduct } from "../src/modules/decathlon";
import { testCache } from "./cache";

describe("decathlon", () => {
  test("parse single product", async () => {
    const doc = await getParsed("https://www.decathlon.at/sport-rennrad/301734-69509-rennrad-triban-rc520-disc.html");
    const parsed = parseProduct(doc);
    expect(parsed).toMatchSnapshot();
  })

  test("parse product list", async () => {
    const doc = await getParsed("https://www.decathlon.at/6873-rennrader");
    expect(getProductListUrls(doc).length).toBeGreaterThan(0);
  })
})

async function getParsed(url: string) {
  const text = await testCache(() => getText(url));
  return parse(text);
}