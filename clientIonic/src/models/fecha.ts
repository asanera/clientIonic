import { BaseEntity } from './baseEntity';
import {Profesor} from './profesor'; 
import {Pista} from './pista'; 
import { Asignacion } from './asignacion';
import { Material } from './material';

export class Fecha {

    constructor(
        public year:number,
        public dayOfMonth:number,
        public monthOfYear: number
        
    ){
       
    }
    
    
}