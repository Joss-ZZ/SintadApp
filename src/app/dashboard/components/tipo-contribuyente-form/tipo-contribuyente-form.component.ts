import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo_Contribuyente } from '../../interfaces/tipo-contribuyente.interface';

@Component({
  selector: 'app-tipo-contribuyente-form',
  templateUrl: './tipo-contribuyente-form.component.html',
  styleUrls: ['./tipo-contribuyente-form.component.css']
})
export class TipoContribuyenteFormComponent implements OnInit {

  estados = [
    { value: true, texto: 'Habilitado' },
    { value: false, texto: 'Deshabilitado' }
  ];

  miFormulario: FormGroup = this.fb.group({
    nombre: [this.data.nombre, [Validators.required]],
    estado: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<TipoContribuyenteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tipo_Contribuyente) { }

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
