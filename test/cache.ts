import { ensureFile, readJson, writeJson } from 'fs-extra';
import path from 'path';

export type Awaitable<T> = T | PromiseLike<T>

type FileName = string;
type TestName = string;
const counter: Record<FileName, Record<TestName, number>> = {};

function getCacheNr(fileName: FileName, testName: string) {
  if (!counter[fileName]) {
    counter[fileName] = { testName: 1 };
    return 0;
  }
  if (counter[fileName][testName] === undefined) {
    counter[fileName][testName] = 1;
    return 0;
  }
  return counter[fileName][testName]++;
}

function cacheFilePath(testPath: string): string {
  return path.join(
    path.dirname(testPath),
    "__cache__",
    path.basename(testPath) + ".json"
  );
}


async function getCachedValue(fileName: FileName, testName: TestName, nr: number) {
  try {
    const path = cacheFilePath(fileName);
    const cached = await readJson(path);
    return cached[testName]?.[nr];
  } catch (err: any) {
    if (err?.code === 'ENOENT') {
      return undefined;
    } else {
      throw err;
    }
  }
}

async function writeCache(fileName: FileName, testName: TestName, nr: number, value: any) {
  if (value === undefined) {
    throw new Error("Undefined cache value not allowed");
  }

  const path = cacheFilePath(fileName);

  let cached;
  try {
    cached = await readJson(path);
  } catch (err: any) {
    if (err?.code === 'ENOENT') {
      cached = {};
      await ensureFile(path);
    } else {
      throw err;
    }
  }

  if (!cached[testName]) {
    cached[testName] = { [nr]: value };
  } else {
    cached[testName][nr] = value;
  }

  await writeJson(path, cached);
}

export async function testCache<T>(factory: () => Awaitable<T>): Promise<T> {
  const filePath = expect.getState().testPath;
  const testName = expect.getState().currentTestName;
  const testNr = getCacheNr(path.basename(filePath), testName);

  let result = await getCachedValue(filePath, testName, testNr);
  if (result === undefined) {
    result = await factory();
    await writeCache(filePath, testName, testNr, result);
  }
  return result;
}
