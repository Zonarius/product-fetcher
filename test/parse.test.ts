import { parseNumber } from "../src/parse"

describe("Parse", () => {
  describe("Number", () => {
    test("price", () => {
      expect(parseNumber("899,90 €")).toBe(899.90);
    })

    test("weight", () => {
      expect(parseNumber("9 kg ohne Pedale in Größe M")).toBe(9);
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

    test("thousand separator", () => {
      expect(parseNumber("2.200,00 €")).toBe(2200);
    })
  })
})