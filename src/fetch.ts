import fetch from 'node-fetch';
import { HTMLElement, parse } from 'node-html-parser';
import { defer, from, map, Observable } from 'rxjs';
import { logger } from './logger';

export function getText(url: string): Promise<string> {
  logger.info(`Getting ${url}`);
  return fetch(url).then(r => r.text());
}

export function getParsed(url: string): Promise<HTMLElement> {
  return getText(url).then(parse);
}

export function getParsedObs(url: string): Observable<HTMLElement> {
  return defer(() => from(getParsed(url)));
}