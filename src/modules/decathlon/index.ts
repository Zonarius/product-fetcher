import { from, mergeMap, Observable, of, switchMap } from "rxjs";
import { getCheerioObs } from "../../fetch";
import { Fetcher } from "../../model";
import { DecathlonProduct } from "./model";

export function matches(url: string) {
  return /^https?:\/\/www.decathlon./.test(url);
}

export function fetchProducts(url: string): Observable<DecathlonProduct> {
  return getCheerioObs(url).pipe(
    switchMap($ => {
      if ($("#category-hits").length > 0) {
        return from(getProductListUrls($))
          .pipe(
            mergeMap(fetchProducts)
          )
      } else {
        return of(parseProduct($));
      }
    })
  )
}

export function getProductListUrls($: cheerio.Root): string[] {
  return $(".ais-InfiniteHits-item a.thumbnail").toArray()
    .map(el => $(el).attr("href")!);
}

export function parseProduct($: cheerio.Root): DecathlonProduct {
  throw new Error();
}

const moduletypeCheck = { matches, fetchProducts } as Fetcher<DecathlonProduct>
