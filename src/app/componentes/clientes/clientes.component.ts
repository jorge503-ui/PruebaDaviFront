import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../modelos/cliente.model';
import { ApiPruebaDaviService } from '../../servicios/api-prueba-davi.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Catalogo } from '../../modelos/catalogo.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[] = [];
  actividadesEconomicas : Catalogo[] = [];
  estadosCiviles : Catalogo[] = [];
  errorMessage: string = '';
  
  cliente: Cliente = {
    dui: '',
    nit: '',
    nombres: '',
    apellidos: '',
    sexo: '',
    actividadEconomica: this.getCatalog(),
    estadoCivil: this.getCatalog()
  };

  constructor(private apiPruebaDaviService: ApiPruebaDaviService, private router: Router) {}

  ngOnInit(): void {
    this.getClientes();
    this.ordenarClientesPorId();
    this.getActividadesEconomicas();
    this.getEstadosCiviles();
    this.resetForm();
  }

  ordenarClientesPorId(): void {
    this.clientes.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }

  getClientes(): void {
    this.apiPruebaDaviService.getClientes().subscribe((data: Cliente[]) => {
      this.clientes = data;
    });
  }

  saveCliente(): void {
    this.apiPruebaDaviService.postCliente(this.cliente).subscribe((data: Cliente) => {
      this.getClientes();
      this.resetForm();
    });
  }

  editCliente(cliente: Cliente): void {
    this.cliente = { ...cliente };
  }

  viewSolicitudes(id: number): void {
    this.router.navigate(['/solicitudes', id]);
  }
  
  resetForm(): void {
    this.cliente = {
      dui: '',
      nit: '',
      nombres: '',
      apellidos: '',
      sexo: '',
      actividadEconomica: this.getCatalog(),
      estadoCivil: this.getCatalog()
    };
  }

  getActividadesEconomicas(): void{
    this.apiPruebaDaviService.getActividadesEconomicas().subscribe((data: Catalogo[]) => {
      this.actividadesEconomicas = data;
    });
  }
  
  getEstadosCiviles(): void{
    this.apiPruebaDaviService.getEstadosCiviles().subscribe((data: Catalogo[]) => {
      this.estadosCiviles = data;
    });
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
      });
      this.errorMessage = 'Faltan campos obligatorios';
    } else {
      if(this.cliente.actividadEconomica.id!=0 && this.cliente.estadoCivil.id!=0){
        this.saveCliente();
        this.errorMessage = '';
      }else{
        this.errorMessage = 'Faltan campos obligatorios';
      }
    }
  }

}
