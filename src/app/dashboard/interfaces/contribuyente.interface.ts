import { Tipo_Documento } from './tipo-documento.interface';
import { Tipo_Contribuyente } from './tipo-contribuyente.interface';

export interface Contribuyente {
    _id?: string,
    tipo_documento?: Tipo_Documento,
    nro_documento: string,
    razon_social: string,
    nombre_comercial: string,
    tipo_contribuyente?: Tipo_Contribuyente,
    direccion: string,
    telefono: string,
    estado: boolean
} 