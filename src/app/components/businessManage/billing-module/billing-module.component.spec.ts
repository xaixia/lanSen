import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingModuleComponent } from './billing-module.component';

describe('BillingModuleComponent', () => {
  let component: BillingModuleComponent;
  let fixture: ComponentFixture<BillingModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
