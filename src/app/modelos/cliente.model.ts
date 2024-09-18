import { Catalogo } from "./catalogo.model";

export interface Cliente {
    id?: number;
    dui: string;
    nit: string;
    nombres: string;
    apellidos: string;
    sexo: string;
    actividadEconomica: Catalogo;
    estadoCivil: Catalogo;
}
