import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilidadesService } from 'src/app/shared/services/utilidades.service';
import { Contribuyente } from '../../interfaces/contribuyente.interface';
import { ContribuyenteService } from '../../services/contribuyente.service';
import { ContribuyenteFormComponent } from '../../components/contribuyente-form/contribuyente-form.component';
import { EliminarComponent } from '../../components/eliminar/eliminar.component';

@Component({
  selector: 'app-contribuyente',
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.css']
})
export class ContribuyenteComponent implements OnInit {

  contribuyente: Contribuyente[];

  //Paginator
  length: number = 100;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['tipo_documento', 'nro_documento', 'razon_social', 'nombre_comercial', 'tipo_contribuyente', 'direccion', 'telefono', 'estado', 'accion'];
  dataSource: MatTableDataSource<any>;

  constructor(private contribuyenteService: ContribuyenteService, 
              private dialog: MatDialog,
              private utilidadesService: UtilidadesService) {}

  ngOnInit(): void {
    this.contribuyenteService.listarContribuyente()
      .subscribe(resp => {
        this.contribuyente = resp.contribuyenteDB;
        this.dataSource = new MatTableDataSource(this.contribuyente);
        this.dataSource.paginator = this.paginator;
      });
  }

  Editar(row: Contribuyente){
    const dialogRef = this.dialog.open(ContribuyenteFormComponent, {
      width: '60%',
      data: row
    })

    dialogRef.afterClosed()
      .subscribe(contribuyente=> {
        if(!contribuyente){
          return;
        }
        console.log(contribuyente);
        this.contribuyenteService.editarContribuyente(row._id, contribuyente)
          .subscribe(resp => {
            console.log(resp);
            this.dataSource.data = this.dataSource.data.map(contri => {
              if(contri._id === row._id){
                contri = {_id: row._id, tipo_documento: resp.contribuyenteDataDB.tipo_documento, nro_documento: contribuyente.nro_documento,
                          razon_social: contribuyente.razon_social, nombre_comercial: contribuyente.nombre_comercial, tipo_contribuyente: resp.contribuyenteDataDB.tipo_contribuyente,
                          direccion: contribuyente.direccion, telefono: contribuyente.telefono, estado: contribuyente.estado};
              }
              return contri;
            });
            this.utilidadesService.openSnackBar('Actualizado con éxito');
          });
      })
  }

  Eliminar(row: Contribuyente){

    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed()
      .subscribe(resp => {
        if(!resp){
          return;
        }
        this.contribuyenteService.eliminarContribuyente(row._id)
          .subscribe(resp => {
            if(resp.ok){
              this.dataSource.data = this.dataSource.data.filter(i => i !== row);
              this.utilidadesService.openSnackBar('Eliminado correctamente');
            }
          });
      });
  }

  agregarContribuyente(){
    const dialogRef = this.dialog.open(ContribuyenteFormComponent,{
      width: '60%',
      data: ''
    })

    dialogRef.afterClosed()
      .subscribe(contribuyente=> {
        if(!contribuyente){
          return;
        }
        this.contribuyenteService.agregarContribuyente(contribuyente)
          .subscribe(resp => {
            this.dataSource.data.push(resp.contribuyenteDB);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;
            this.utilidadesService.openSnackBar('Agregado con éxito');
          });
      });
  }


  //Filtro para la busqueda
  aplicarFiltro(event: KeyboardEvent ){
    const searchText = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchText.trim().toLowerCase();
  }
  
}
