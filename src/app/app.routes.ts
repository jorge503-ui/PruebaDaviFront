import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultarInfoPersonaComponent } from './componentes/consultar-info-persona/consultar-info-persona.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { SolicitudesComponent } from './componentes/solicitudes/solicitudes.component';

export const routes: Routes = [
    { path: 'consultarInfoPersona', component: ConsultarInfoPersonaComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'solicitudes/:id', component: SolicitudesComponent },
    { path: '', redirectTo: '/consultarInfoPersona', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { }
