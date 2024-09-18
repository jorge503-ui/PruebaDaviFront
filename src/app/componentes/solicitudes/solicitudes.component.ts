import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPruebaDaviService } from '../../servicios/api-prueba-davi.service';
import { Solicitud } from '../../modelos/solicitud.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Catalogo } from '../../modelos/catalogo.model';
import { Cliente } from '../../modelos/cliente.model';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  formasDePago: Catalogo[] = [];
  personaId: number;
  errorMessage: string = '';

  solicitud: Solicitud = {
    fechaCreacion: new Date(),
    monto: 0,
    plazo: 0,
    formaPago: this.getCatalog(),
    persona: {
      id: 0
    }
  }

  constructor(private route: ActivatedRoute, private apiPruebaDaviService: ApiPruebaDaviService) {
    this.personaId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getSolicitudes();
    this.getFormasDePago();
  }

  getSolicitudes(): void {
    this.apiPruebaDaviService.getSolicitudesByPerson(this.personaId).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
    });
  }

  saveSolicitud(): void {
    this.solicitud.persona.id = this.personaId;
    this.apiPruebaDaviService.postSolicitud(this.solicitud).subscribe((data: Solicitud) => {
      this.getSolicitudes();
      this.resetForm();
    });
  }

  resetForm(): void {
    this.solicitud = {
        fechaCreacion: new Date(),
        monto: 0,
        plazo: 0,
        formaPago: this.getCatalog(),
        persona: {
          id: 0
        }
    };
  }

  editSolicitud(solicitud: Solicitud): void {
    this.solicitud = { ...solicitud };
  }

  getFormasDePago(): void {
    this.apiPruebaDaviService.getFormasDePago().subscribe((data: Catalogo[]) => {
      this.formasDePago = data;
    });
  }

  validatePositiveNumber(event: any): void {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  getCatalog(): Catalogo{
    return {
      id: 0,
      descripcion : ''
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
        this.errorMessage = 'Faltan campos obligatorios';
      });
    } else {
      if(this.solicitud.formaPago.id!=0){
        this.saveSolicitud();
        this.errorMessage = '';
      }else{
        this.errorMessage = 'Faltan campos obligatorios';
      }
    }
  }
}
