import fetch from 'node-fetch';
import { HTMLElement, parse } from 'node-html-parser';
import { defer, from, map, Observable } from 'rxjs';

export function getParsed(url: string): Promise<HTMLElement> {
  console.log(`Fetching ${url}...`)
  return fetch(url).then(r => r.text()).then(parse);
}

export function getParsedObs(url: string): Observable<HTMLElement> {
  return defer(() => from(getParsed(url)));
}