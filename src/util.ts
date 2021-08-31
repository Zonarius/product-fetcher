export function createRecord<K extends keyof any, V>(arr: [K, V][]): Record<K, V> {
  return arr.reduce((obj, entry) => {
    obj[entry[0]] = entry[1];
    return obj;
  }, {} as Record<K, V>)
}