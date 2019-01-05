import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseLogComponent } from './database-log.component';

describe('DatabaseLogComponent', () => {
  let component: DatabaseLogComponent;
  let fixture: ComponentFixture<DatabaseLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
