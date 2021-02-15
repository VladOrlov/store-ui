import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-product-edit-list',
  templateUrl: './product-edit-list.component.html',
  styleUrls: ['./product-edit-list.component.css']
})
export class ProductEditListComponent implements OnInit {

  productsChanged = new Subject<Product[]>();
  products: Product [] = [];

  constructor(private productListService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.productListService
      .getProductList(null)
      .subscribe(data => {
        this.products.push(...data);
        this.productsChanged.next(this.getProducts());
      }
    );
  }

  getProducts(): Product[] {
    return this.products.slice();
  }

  deleteProduct(product: Product): void {
    this.productListService.deleteProduct(product);

    const deletedIndex = this.products?.findIndex(el => el.id === product.id);

    if (deletedIndex != null) {
      this.products?.splice(deletedIndex, 1);
    }
  }

  openEditForm(id: string): Promise<boolean> {
    return this.router
      .navigate([`/admin-panel/products/${id}`]);
  }

  openAddNewProductForm(): Promise<boolean> {
    return this.router.navigate(['admin-panel/add-new-product']);
  }

  handleAddNewProduct(products: Product[]): Promise<boolean> {
    this.products.push(...products);
    this.productsChanged.next(this.getProducts());
    return this.router
      .navigate(['/admin-panel/products']);
  }
}
