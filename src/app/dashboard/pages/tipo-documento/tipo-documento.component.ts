import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDocumentoFormComponent } from '../../components/tipo-documento-form/tipo-documento-form.component';
import { Tipo_Documento } from '../../interfaces/tipo-documento.interface';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { UtilidadesService } from '../../../shared/services/utilidades.service';
import { EliminarComponent } from '../../components/eliminar/eliminar.component';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  tipo_documento: Tipo_Documento[];

  //Paginator
  length: number = 100;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'estado', 'accion'];
  dataSource: MatTableDataSource<any>;

  constructor(private dialog: MatDialog,
              private tipoDocumentoService: TipoDocumentoService,
              private utilidadesService: UtilidadesService) {}

  ngOnInit(): void {
    this.tipoDocumentoService.listarTipoDocumento()
      .subscribe(resp => {
        this.tipo_documento = resp.tipoDocumentoDB;
        this.dataSource = new MatTableDataSource(this.tipo_documento);
        this.dataSource.paginator = this.paginator;
      });
  }

  Editar(row: Tipo_Documento){
    const dialogRef = this.dialog.open(TipoDocumentoFormComponent, {
      width: '60%',
      data: row
    })

    dialogRef.afterClosed()
      .subscribe(tipoDocumento=> {
        if(!tipoDocumento){
          return;
        }

        this.tipoDocumentoService.editarTipoDocumento(row._id, tipoDocumento)
          .subscribe(resp => {
            this.dataSource.data = this.dataSource.data.map(tipoDoc => {
              if(tipoDoc._id === row._id){
                tipoDoc = {_id: row._id, codigo: tipoDocumento.codigo, nombre: tipoDocumento.nombre, descripcion: tipoDocumento.descripcion, estado: tipoDocumento.estado};
              }
              return tipoDoc;
            });
            console.log(this.dataSource.data);
            this.utilidadesService.openSnackBar('Actualizado con éxito');
          })
      })
  }

  Eliminar(row: Tipo_Documento){

    const dialogRef = this.dialog.open(EliminarComponent, {
      width: '250px',
      data: row
    });

    dialogRef.afterClosed()
      .subscribe(resp => {
        if(!resp){
          return;
        }
        this.tipoDocumentoService.eliminarTipoDocumento(row._id)
          .subscribe(resp => {
            if(resp.ok){
              this.dataSource.data = this.dataSource.data.filter(i => i !== row);
              this.utilidadesService.openSnackBar('Eliminado correctamente');
            }
          });
      });
  }

  agregarTipoDocumento(){
    const dialogRef = this.dialog.open(TipoDocumentoFormComponent,{
      width: '60%',
      data: ''
    })

    dialogRef.afterClosed()
      .subscribe(tipoDocumento=> {
        if(!tipoDocumento){
          return;
        }
        this.tipoDocumentoService.agregarTipoDocumento(tipoDocumento)
          .subscribe(resp => {
            this.dataSource.data.push(resp.tipoDocumentoDB);
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
