import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAttributeComponent } from './label-attribute.component';

describe('LabelAttributeComponent', () => {
  let component: LabelAttributeComponent;
  let fixture: ComponentFixture<LabelAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
