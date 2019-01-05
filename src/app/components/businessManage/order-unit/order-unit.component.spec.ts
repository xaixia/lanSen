import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUnitComponent } from './order-unit.component';

describe('OrderUnitComponent', () => {
  let component: OrderUnitComponent;
  let fixture: ComponentFixture<OrderUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
