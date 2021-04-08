import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilidadesService } from 'src/app/shared/services/utilidades.service';
import { Tipo_Contribuyente } from '../../interfaces/tipo-contribuyente.interface';
import { TipoContribuyenteService } from '../../services/tipo-contribuyente.service';
import { TipoContribuyenteFormComponent } from '../../components/tipo-contribuyente-form/tipo-contribuyente-form.component';
import { EliminarComponent } from '../../components/eliminar/eliminar.component';

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent implements OnInit {

  tipo_contribuyente: Tipo_Contribuyente[];

  //Paginator
  length: number = 100;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['nombre', 'estado', 'accion'];
  dataSource: MatTableDataSource<any>;

  constructor(private dialog: MatDialog,
              private tipoContribuyenteService: TipoContribuyenteService,
              private utilidadesService: UtilidadesService) {}

  ngOnInit(): void {
    this.tipoContribuyenteService.listarTipoContribuyente()
      .subscribe(resp => {
        this.tipo_contribuyente = resp.tipoContribuyenteDB;
        this.dataSource = new MatTableDataSource(this.tipo_contribuyente);
        this.dataSource.paginator = this.paginator;
      });
  }

  Editar(row: Tipo_Contribuyente){
    const dialogRef = this.dialog.open(TipoContribuyenteFormComponent, {
      width: '60%',
      data: row
    })

    dialogRef.afterClosed()
      .subscribe(tipoContribuyente=> {
        if(!tipoContribuyente){
          return;
        }

        this.tipoContribuyenteService.editarTipoContribuyente(row._id, tipoContribuyente)
          .subscribe(resp => {
            this.dataSource.data = this.dataSource.data.map(tipoContri => {
              if(tipoContri._id === row._id){
                tipoContri = {_id: row._id, nombre: tipoContribuyente.nombre, estado: tipoContribuyente.estado};
              }
              return tipoContri;
            });
            this.utilidadesService.openSnackBar('Actualizado con éxito');
          })
      })
  }

  Eliminar(row: Tipo_Contribuyente){

    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed()
      .subscribe(resp => {
        if(!resp){
          return;
        }
        this.tipoContribuyenteService.eliminarTipoContribuyente(row._id)
          .subscribe(resp => {
            if(resp.ok){
              this.dataSource.data = this.dataSource.data.filter(i => i !== row);
              this.utilidadesService.openSnackBar('Eliminado correctamente');
            }
          });
      });
  }

  agregarTipoContribuyente(){
    const dialogRef = this.dialog.open(TipoContribuyenteFormComponent,{
      width: '60%',
      data: ''
    })

    dialogRef.afterClosed()
      .subscribe(tipoContribuyente=> {
        if(!tipoContribuyente){
          return;
        }
        this.tipoContribuyenteService.agregarTipoContribuyente(tipoContribuyente)
          .subscribe(resp => {
            this.dataSource.data.push(resp.tipoContribuyenteDB);
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
