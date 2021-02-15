import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, NgForm} from '@angular/forms';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-admin-details',
  templateUrl: './product-admin-details.component.html',
  styleUrls: ['./product-admin-details.component.css']
})
export class ProductAdminDetailsComponent implements OnInit {

  productId = '';
  product: Product = new Product();
  productBeforeChanges: Product = new Product();
  // @ts-ignore
  productEditForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    sku: new FormControl(null),
    name: new FormControl(null),
    category: new FormControl(null),
    amount: new FormControl(null),
    price: new FormControl(null),
    imageUrl: new FormControl(null),
    description: new FormControl(null),
  });

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('Init form for product edit');
    this.route.params
      .subscribe((params: Params) => {
        console.log('Editing product id: ' + params.id);
        this.productId = params.id;
        this.initProductEdit();
      });
  }

  initForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.product.id),
      sku: new FormControl(this.product.sku),
      name: new FormControl(this.product.name),
      category: new FormControl(this.product.category),
      amount: new FormControl(this.product.amount),
      price: new FormControl(this.product.price),
      imageUrl: new FormControl(this.product.imageUrl),
      description: new FormControl(this.product.description),
    });
  }

  initProductEdit(): void {
    console.log('Checking current product id: ' + this.productId);
    if (this.productId != null) {
      this.productService.getProduct(this.productId)
        .subscribe(data => {
          console.log('Init edit form for product!');
          this.product = data;
          this.productBeforeChanges = Object.assign({}, data);
          this.productEditForm = this.initForm();
        });
    } else {
      console.log('Failed to init edit form for product! No product id!');
    }
  }

  updateProduct(): void {
    const updatedProductValues = this.productEditForm.value;

    if (this.productEditForm.dirty) {
      console.log('Product values were updated. Saving changes');

      this.product.sku = updatedProductValues.sku;
      this.product.name = updatedProductValues.name;
      this.product.category = updatedProductValues.category;
      this.product.price = updatedProductValues.price;
      this.product.amount = updatedProductValues.amount;
      this.product.imageUrl = updatedProductValues.imageUrl;
      this.product.description = updatedProductValues.description;

      console.log('Update current product: ' + this.product.amount);

      this.highlightChanges();

      const updateResult = this.productService.updateProduct(this.product);

      updateResult.subscribe((result) => {
        console.log(result);
        this.navigateToProductList();
      }, error => console.log(error));
    } else {
      console.log('No product values were updated. Skip save changes');
      this.navigateToProductList();
    }
  }

  highlightChanges(): void {
    console.log('****** Checking values were changed!!! *******');
    if (this.product.amount !== this.productBeforeChanges.amount) {
      console.log('Amount values was changed');
    }
  }

  navigateToProductList(): Promise<boolean> {
    return this.router.navigate([`/admin-panel/products`]);
  }

  cancelChanges(): Promise<boolean> {
    return this.router
      .navigate([`/admin-panel/products`]);
  }
}
