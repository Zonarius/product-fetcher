export function parseNumber(input: string | undefined): number | undefined {
  if (!input) {
    return undefined;
  }
  const match = input.match(/\d+([,\.]\d+)/);
  if (match) {
    return Number(match[0].replaceAll(",", "."));
  } else {
    return undefined;
  }
}