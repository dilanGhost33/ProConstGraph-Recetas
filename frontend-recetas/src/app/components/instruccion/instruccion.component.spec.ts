import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruccionComponent } from './instruccion.component';

describe('InstruccionComponent', () => {
  let component: InstruccionComponent;
  let fixture: ComponentFixture<InstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
