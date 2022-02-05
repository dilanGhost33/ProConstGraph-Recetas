import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngTipoComponent } from './ing-tipo.component';

describe('IngTipoComponent', () => {
  let component: IngTipoComponent;
  let fixture: ComponentFixture<IngTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
