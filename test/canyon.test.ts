import parse from "node-html-parser";
import { getText } from "../src/fetch"
import { getProductListUrls, parseProduct } from "../src/modules/canyon";
import { testCache } from "./cache";

describe("canyon", () => {
  test("parse single product", async () => {
    const doc = await getParsed("https://www.canyon.com/en-at/road-bikes/endurance-bikes/endurace/cf-sl/endurace-cf-sl-8-disc-di2/2949.html");
    const parsed = parseProduct(doc);
    expect(parsed).toMatchSnapshot();
  })

  test("parse product list", async () => {
    const doc = await getParsed("https://www.canyon.com/en-at/road-bikes/endurance-bikes/endurace/cf-sl/");
    expect(getProductListUrls(doc).length).toBeGreaterThan(0);
  })
})

async function getParsed(url: string) {
  const text = await testCache(() => getText(url));
  return parse(text);
}