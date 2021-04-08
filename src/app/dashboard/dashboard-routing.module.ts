import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { TipoContribuyenteComponent } from './pages/tipo-contribuyente/tipo-contribuyente.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'principal', component: PrincipalComponent },
      { path: 'tipo-documento', component: TipoDocumentoComponent },
      { path: 'tipo-contribuyente', component: TipoContribuyenteComponent },
      { path: 'contribuyente', component: ContribuyenteComponent },
      { path: '**', redirectTo: 'principal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
