import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceUnitComponent } from './price-unit.component';

describe('PriceUnitComponent', () => {
  let component: PriceUnitComponent;
  let fixture: ComponentFixture<PriceUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
