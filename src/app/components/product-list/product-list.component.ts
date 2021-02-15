import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductCategory} from '../../common/product-category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] | undefined;
  currentCategory!: string | null;

  constructor(private productListService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategory) {
      this.currentCategory = this.route.snapshot.paramMap.get('id');
    }

    this.productListService.getProductList(this.currentCategory).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
