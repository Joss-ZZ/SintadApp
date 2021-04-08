import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contribuyente } from '../../interfaces/contribuyente.interface';
import { Tipo_Documento } from '../../interfaces/tipo-documento.interface';
import { Tipo_Contribuyente } from '../../interfaces/tipo-contribuyente.interface';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoContribuyenteService } from '../../services/tipo-contribuyente.service';

@Component({
  selector: 'app-contribuyente-form',
  templateUrl: './contribuyente-form.component.html',
  styleUrls: ['./contribuyente-form.component.css']
})
export class ContribuyenteFormComponent implements OnInit {

  estados = [
    { value: true, texto: 'Habilitado' },
    { value: false, texto: 'Deshabilitado' }
  ];

  tipo_documento: Tipo_Documento[];
  tipo_contribuyente: Tipo_Contribuyente[];

  miFormulario: FormGroup = this.fb.group({
    tipo_documento: [null, [Validators.required]],
    nro_documento: [this.data.nro_documento, [Validators.required]],
    razon_social: [this.data.razon_social, [Validators.required]],
    nombre_comercial: [this.data.nombre_comercial, [Validators.required]],
    tipo_contribuyente: [null, [Validators.required]],
    direccion: [this.data.direccion, [Validators.required]],
    telefono: [this.data.telefono, [Validators.required]],
    estado: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private tipoDocumentoService: TipoDocumentoService,
              private tipoContribuyenteService: TipoContribuyenteService,
              public dialogRef: MatDialogRef<ContribuyenteFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Contribuyente) { }

  ngOnInit(): void {
    this.tipoDocumentoService.listarTipoDocumentoHabilitado()
        .subscribe(resp => {
          this.tipo_documento = resp.tipoDocumentoDB;
        });
    this.tipoContribuyenteService.listarTipoContribuyenteHabilitado()
        .subscribe(resp => {
          this.tipo_contribuyente = resp.tipoContribuyenteDB;       
        });

    if(this.data){
      this.miFormulario.get('tipo_documento').setValue(this.data.tipo_documento._id, {onlySelf:true});
      this.miFormulario.get('tipo_contribuyente').setValue(this.data.tipo_contribuyente._id, {onlySelf:true});
    }
    this.miFormulario.get('estado').setValue(this.data.estado, {onlySelf:true});
  }

  onSubmit(){
    this.dialogRef.close(this.miFormulario.value);
  }

  cerrarModal(){
    this.dialogRef.close();
  } 
  
}
