import { Catalogo } from "./catalogo.model";

export interface Solicitud {
    id?: number;
    fechaCreacion: Date;
    monto: number;
    plazo: number;
    persona : {
        id : number
    }
    formaPago: Catalogo;
}
