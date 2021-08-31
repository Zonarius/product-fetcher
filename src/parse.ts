export function parseNumber(input: string | undefined): number | undefined {
  if (!input) {
    return undefined;
  }
  const match = input.match(/[\d,\.]+/);
  if (match) {
    const found = match[0];
    let result = "";
    let commaFound = false;
    for (let i = found.length - 1; i >= 0; i--) {
      if (found[i] === "," || found[i] === ".") {
        if (!commaFound) {
          result = "." + result;
          commaFound = true;
        }
      } else {
        result = found[i] + result;
      }
    }
    return Number(result);
  } else {
    return undefined;
  }
}