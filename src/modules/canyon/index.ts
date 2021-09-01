import { HTMLElement } from "node-html-parser";
import { from, mergeMap, Observable, of, switchMap } from "rxjs";
import { getParsedObs } from "../../fetch";
import { Fetcher } from "../../model";
import { parseNumber } from "../../parse";
import { createRecord } from "../../util";
import { CanyonProduct } from "./model";

export function matches(url: string) {
  return /^https?:\/\/www\.canyon\.com/.test(url);
}

export function fetchProducts(url: string): Observable<CanyonProduct> {
  return getParsedObs(url).pipe(
    switchMap(document => {
      if (document.querySelector("#section-product-grid")) {
        return from(getProductListUrls(document))
          .pipe(
            mergeMap(fetchProducts)
          )
      } else {
        return of({ ...parseProduct(document), url } as CanyonProduct);
      }
    })
  )
}

export function getProductListUrls(document: HTMLElement): string[] {
  return document.querySelectorAll("a.productTile__link")
    .map(el => el.getAttribute("href")!);
}

export function parseProduct(document: HTMLElement): Partial<CanyonProduct> {
  return {
    name: document.querySelector("h1.productDescription__productName").rawText.trim(),
    price: parseNumber(document.querySelector(".productDescription__priceSale").rawText)!,
    weight: getWeight(document),
  }
}

function getWeight(document: HTMLElement): number {
  return parseNumber(getCharacteristics(document)["Weight"])!;
}

function getCharacteristics(document: HTMLElement): Record<string, string> {
  return createRecord(
    document.querySelectorAll(".productDescription__characteristicsListItem")
      .map(item => {
        const [label, detail] = item.querySelectorAll("div");
        return [label.rawText.trim(), detail.rawText.trim()];
      })
  );
}

const moduletypeCheck = { matches, fetchProducts } as Fetcher<CanyonProduct>