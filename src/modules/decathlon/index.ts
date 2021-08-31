import { HTMLElement } from "node-html-parser";
import { from, mergeMap, Observable, of, switchMap } from "rxjs";
import { getParsedObs } from "../../fetch";
import { Fetcher } from "../../model";
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
        return of(parseProduct(document));
      }
    })
  )
}

export function getProductListUrls(document: HTMLElement): string[] {
  return document.querySelectorAll(".thumbnail--product a.thumbnail")
    .map(el => el.getAttribute("href")!);
}

export function parseProduct(document: HTMLElement): DecathlonProduct {
  throw new Error();
}

const moduletypeCheck = { matches, fetchProducts } as Fetcher<DecathlonProduct>
