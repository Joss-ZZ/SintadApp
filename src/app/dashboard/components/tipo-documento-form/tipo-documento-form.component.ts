import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo_Documento } from '../../interfaces/tipo-documento.interface';

@Component({
  selector: 'app-tipo-documento-form',
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.css']
})
export class TipoDocumentoFormComponent implements OnInit {

  estados = [
    { value: true, texto: 'Habilitado' },
    { value: false, texto: 'Deshabilitado' }
  ];

  miFormulario: FormGroup = this.fb.group({
    codigo: [this.data.codigo, [Validators.required]],
    nombre: [this.data.nombre, [Validators.required]],
    descripcion: [this.data.descripcion, [Validators.required]],
    estado: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<TipoDocumentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tipo_Documento) { }

  ngOnInit(): void {
    this.miFormulario.get('estado').setValue(this.data.estado, {onlySelf:true});
  }

  onSubmit(){
    this.dialogRef.close(this.miFormulario.value);
  }

  cerrarModal(){
    this.dialogRef.close();
  }

}
