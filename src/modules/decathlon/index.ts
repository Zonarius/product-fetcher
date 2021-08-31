import { HTMLElement } from "node-html-parser";
import { from, mergeMap, Observable, of, switchMap } from "rxjs";
import { getParsedObs } from "../../fetch";
import { Fetcher } from "../../model";
import { parseNumber } from "../../parse";
import { createRecord } from "../../util";
import { DecathlonProduct } from "./model";

export function matches(url: string) {
  return /^https?:\/\/www.decathlon./.test(url);
}

export function fetchProducts(url: string): Observable<DecathlonProduct> {
  return getParsedObs(url).pipe(
    switchMap(document => {
      if (document.querySelector("#category-hits")) {
        return from(getProductListUrls(document))
          .pipe(
            mergeMap(fetchProducts)
          )
      } else {
        return of({ ...parseProduct(document), url } as DecathlonProduct);
      }
    })
  )
}

export function getProductListUrls(document: HTMLElement): string[] {
  return document.querySelectorAll(".thumbnail--product a.thumbnail")
    .map(el => el.getAttribute("href")!);
}

export function parseProduct(document: HTMLElement): Partial<DecathlonProduct> {
  const technicalData = parseTechnicals(document);
  return {
    name: document.querySelector("h1.js-title").rawText,
    price: parseNumber(document.querySelector(".price-text").rawText)!,
    weight: getWeight(technicalData),
    technicalData
  }
}

function getWeight(data: Record<string, string>): number | undefined {
  const key = Object.keys(data).find(key => key.toLocaleLowerCase().includes("gewicht"));
  if (!key) {
    return undefined;
  }
  return parseNumber(data[key]);
}

function parseTechnicals(document: HTMLElement): Record<string, string> {

  return createRecord(document.querySelectorAll("#product-technicals .row")
    .map(parseTechnicalsRow));
}

function parseTechnicalsRow(row: HTMLElement): [string, string] {
  const [rawTitle, rawText] = row.querySelectorAll("div")
  return [rawTitle.rawText.trim(), rawText.rawText.trim()];
}

const moduletypeCheck = { matches, fetchProducts } as Fetcher<DecathlonProduct>
