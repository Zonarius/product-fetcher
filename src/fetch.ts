import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { defer, from, map, Observable } from 'rxjs';

export async function getCheerio(url: string): Promise<cheerio.Root> {
  console.log(`Fetching ${url}...`)
  const resp = await fetch(url);
  const text = await resp.text();
  return cheerio.load(text);
}

export function getCheerioObs(url: string): Observable<cheerio.Root> {
  return defer(() => from(getCheerio(url)));
}