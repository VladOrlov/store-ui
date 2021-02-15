import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  constructor(private productListService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(() => this.handleProductDetails());
  }

  handleProductDetails(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId != null) {
      this.productListService
        .getProduct(productId)
        .subscribe( data => this.product = data);
    }
  }
}
