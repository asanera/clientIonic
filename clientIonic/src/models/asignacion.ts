import { BaseEntity } from "./baseEntity";
import { Alumno } from "./alumno";
import { Clase } from "./clase";
import { Caballo } from "./caballo";

export class Asignacion extends BaseEntity {

    constructor(
        public id:number,
        public alumno:Alumno,
        public clase: Clase,
        public caballo: Caballo
    ){
        super(id);
    }


}