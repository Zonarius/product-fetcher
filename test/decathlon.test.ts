import { getParsed } from "../src/fetch"
import { getProductListUrls } from "../src/modules/decathlon";

describe("decathlon", () => {
  test("parse single product", async () => {

  })

  test("parse product list", async () => {
    const doc = await getParsed("https://www.decathlon.at/6873-rennrader");
    expect(getProductListUrls(doc).length).toBeGreaterThan(0);
  })
})