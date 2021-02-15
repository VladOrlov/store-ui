import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(category: string | null): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/by-category?id=${category}`;

    if (category == null) {
      return this.httpClient
        .get <Product[]>(this.baseUrl)
        .pipe(map(response => response));
    } else {
      return this.httpClient
        .get <Product[]>(searchUrl)
        .pipe(map(response => response));
    }
  }

  getProductCategories(): Observable<string[]> {
    const searchUrl = `${this.baseUrl}/categories`;

    return this.httpClient
      .get<string[]>(searchUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this.baseUrl}/${id}`)
      .pipe(map(response => response));
  }

  updateProduct(product: Product): Observable<Product> {
    const updateUrl = `${this.baseUrl}/${product.id}`;
    console.log('Call Put HTTP method to update product URl : ' + updateUrl);
    return this.httpClient
      .put<Product>(updateUrl, product);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient
      .post<Product>(this.baseUrl, product);
  }

  deleteProduct(product: Product): void {
    this.httpClient
      .delete(`${this.baseUrl}/${product.id}`)
      .subscribe((result) => console.log(result), error => console.log(error));
  }
}
