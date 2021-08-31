import { parseNumber } from "../src/parse"

describe("Parse", () => {
  describe("Number", () => {
    test("price", () => {
      expect(parseNumber("899,90 €")).toBe(899.90);
    })

    test("bogus", () => {
      expect(parseNumber("asdfg")).toBe(undefined);
    })

    test("empty", () => {
      expect(parseNumber("")).toBe(undefined);
    })

    test("undefined", () => {
      expect(parseNumber(undefined)).toBe(undefined);
    })
  })
})