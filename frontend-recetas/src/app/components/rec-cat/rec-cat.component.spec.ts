import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecCatComponent } from './rec-cat.component';

describe('RecCatComponent', () => {
  let component: RecCatComponent;
  let fixture: ComponentFixture<RecCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
