import { getCheerio } from "../src/fetch"
import { getProductListUrls } from "../src/modules/decathlon";

describe("decathlon", () => {
  test("parse single product", async () => {

  })

  test("parse product list", async () => {
    const $ = await getCheerio("https://www.decathlon.at/6873-rennrader");
    expect(getProductListUrls($).length).toBeGreaterThan(0);
  })
})