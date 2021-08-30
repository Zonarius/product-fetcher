import { Observable } from "rxjs";

export interface Fetcher<T extends Record<string, any>> {
  matches(url: string): boolean;
  fetchProducts(url: string): Observable<T>
}
