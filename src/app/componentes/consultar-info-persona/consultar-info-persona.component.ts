import { Component } from '@angular/core';
import { ApiPruebaDaviService } from '../../servicios/api-prueba-davi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultar-info-persona',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-info-persona.component.html',
  styleUrl: './consultar-info-persona.component.css'
})
export class ConsultarInfoPersonaComponent {
  resultado: any = null;
  error: string | null = null;
  notFound: boolean = false;

  constructor(private apiPruebaDaviService: ApiPruebaDaviService) {}

  validatePositiveNumber(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  buscarInfoPersona(): void {
    const personId = (document.getElementById('personId') as HTMLInputElement).value;

    if (!personId) {
      this.error = 'Por favor, ingrese un ID válido.';
      return;
    }

    this.apiPruebaDaviService.consultarInfoPersona(+personId).subscribe({
      next: (response) => {
        if (response.resultado && response.resultado.name) {
          this.resultado = response.resultado;
          this.error = null;
          this.notFound = false;
        } else {
          this.resultado = null;
          this.error = null;
          this.notFound = true;
        }
      },
      error: (err) => {
        this.error = err.error.error;
        this.resultado = null;
        this.notFound = false;
      }
    });
  }
}
