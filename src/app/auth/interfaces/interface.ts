import { Contribuyente } from "src/app/dashboard/interfaces/contribuyente.interface";
import { Tipo_Documento } from "src/app/dashboard/interfaces/tipo-documento.interface";
import { Tipo_Contribuyente } from '../../dashboard/interfaces/tipo-contribuyente.interface';

export interface AuthResponse{
    ok?: boolean,
    uid?: string,
    nombre?: string,
    email?: string,
    password?: string,
    token?: string,
    msg?: string,
    usuariosDB?: Usuario[],
    tipoDocumentoDB?: Tipo_Documento[],
    tipoContribuyenteDB?: Tipo_Contribuyente[],
    contribuyenteDB?: Contribuyente[],
    contribuyenteDataDB?: Contribuyente,
}

export interface Usuario{
    uid?: string,
    nombre: string,
    email: string,
    password?: string,
    token?: string
}
