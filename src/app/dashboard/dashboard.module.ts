import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './pages/principal/principal.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from './pages/tipo-contribuyente/tipo-contribuyente.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { TipoDocumentoFormComponent } from './components/tipo-documento-form/tipo-documento-form.component';
import { TipoContribuyenteFormComponent } from './components/tipo-contribuyente-form/tipo-contribuyente-form.component';
import { ContribuyenteFormComponent } from './components/contribuyente-form/contribuyente-form.component';
import { EstadoPipe } from './pipes/estado.pipe';


@NgModule({
  declarations: [
    DashboardComponent, 
    PrincipalComponent, 
    EliminarComponent, TipoDocumentoComponent, TipoContribuyenteComponent, ContribuyenteComponent, TipoDocumentoFormComponent, TipoContribuyenteFormComponent, ContribuyenteFormComponent, EstadoPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
