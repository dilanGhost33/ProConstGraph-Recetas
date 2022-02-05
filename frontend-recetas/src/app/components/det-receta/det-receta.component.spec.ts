import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetRecetaComponent } from './det-receta.component';

describe('DetRecetaComponent', () => {
  let component: DetRecetaComponent;
  let fixture: ComponentFixture<DetRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
