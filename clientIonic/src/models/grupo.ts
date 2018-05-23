import { BaseEntity } from "./baseEntity";
import { Alumno } from "./alumno";

export class Grupo extends BaseEntity {
    constructor(
        public id:number,
        public nombre:string,
        public alumnos: Alumno[]
    ){
        super(id);
    }
    
}