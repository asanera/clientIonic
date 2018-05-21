import { BaseEntity } from './baseEntity';
import {Profesor} from './profesor'; 
import {Pista} from './pista'; 
import { Asignacion } from './asignacion';
import { Material } from './material';

export class Clase extends BaseEntity {

    constructor(
        public id:number,
        public nombre:string,
        public especialidad:string,
        public fecha: Date,
        public pista:Pista,
        public profesor: Profesor,
        public asignaciones: Asignacion[],
        public materiales: Material,
    ){
        super(id);
    }
    
}