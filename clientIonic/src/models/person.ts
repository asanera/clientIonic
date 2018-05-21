import { BaseEntity } from "./baseEntity";


export class Person extends BaseEntity {
    constructor( 
        public nombre: string,
        public apellidos: string,
        public dni: string,
        public direccion: string,
        public email: string,
        public password: string,
        public id: number,
        public fechaNacimiento?: any) {
        super(id);
    }
} 