import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAdminDetailsComponent } from './product-admin-details.component';

describe('ProductAdminDetailsComponent', () => {
  let component: ProductAdminDetailsComponent;
  let fixture: ComponentFixture<ProductAdminDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAdminDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
