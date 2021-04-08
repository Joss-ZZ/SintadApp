import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo_Documento } from '../../interfaces/tipo-documento.interface';
import { Tipo_Contribuyente } from '../../interfaces/tipo-contribuyente.interface';
import { Contribuyente } from '../../interfaces/contribuyente.interface';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminarComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  borrar(){
    this.dialogRef.close(true);
  }

  cerrar(){
    this.dialogRef.close();
  }

}
