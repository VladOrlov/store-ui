import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {Route, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductEditListComponent } from './components/product-edit-list/product-edit-list.component';
import { ProductAdminDetailsComponent } from './components/product-admin-details/product-admin-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';

const routes: Route[] = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'users/login', component: UserLoginComponent},
  {path: 'admin-panel/products/:id', component: ProductAdminDetailsComponent},
  {path: 'admin-panel/add-new-product', component: AddNewProductComponent},
  {path: 'admin-panel/products', component: ProductEditListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductDetailsComponent,
    ProductEditListComponent,
    ProductAdminDetailsComponent,
    UserLoginComponent,
    AddNewProductComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
