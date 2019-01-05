import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLogComponent } from './register-log.component';

describe('RegisterLogComponent', () => {
  let component: RegisterLogComponent;
  let fixture: ComponentFixture<RegisterLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
