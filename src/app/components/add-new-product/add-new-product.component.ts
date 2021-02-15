import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductEditListComponent} from '../product-edit-list/product-edit-list.component';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = new Product();

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  saveProduct(adminForm: NgForm): void {
    const updatedProductValues = adminForm.value;

    this.product.sku = updatedProductValues.sku;
    this.product.name = updatedProductValues.name;
    this.product.category = updatedProductValues.category;
    this.product.price = updatedProductValues.price;
    this.product.amount = updatedProductValues.amount;
    this.product.imageUrl = updatedProductValues.imageUrl;
    this.product.description = updatedProductValues.description;

    const createResult = this.productService.createProduct(this.product);
    createResult
      .subscribe((result) => {
        console.log(result);
        this.router
          .navigate([`/admin-panel/products`]);
      }, error => console.log(error));
  }

  cancelChanges(): Promise<boolean> {
    this.product = new Product();
    return this.router.navigate(['admin-panel/products']);
  }
}
