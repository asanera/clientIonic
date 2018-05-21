import { BaseEntity } from "./baseEntity";
import { Alumno } from "./alumno";
import { Clase } from "./clase";
import { Asignacion } from "./asignacion";

export class Caballo extends BaseEntity {

    constructor(
        public id:number,
        public nombre:String,
        public raza: String,
        public fechaNacimiento: Date,
        public asigaciones: Asignacion[]
    ){
        super(id);
    }


}