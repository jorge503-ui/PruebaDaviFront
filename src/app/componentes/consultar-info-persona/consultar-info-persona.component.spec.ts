import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarInfoPersonaComponent } from './consultar-info-persona.component';

describe('ConsultarInfoPersonaComponent', () => {
  let component: ConsultarInfoPersonaComponent;
  let fixture: ComponentFixture<ConsultarInfoPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarInfoPersonaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarInfoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
