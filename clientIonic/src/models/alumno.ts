import { Person } from "./person";
import { Pago } from "./pago";
import { Asignacion } from "./asignacion";
import { Grupo } from "./grupo";

export class Alumno extends Person {

    
    constructor(
        public galope: number,
        public salto: number,
        public cuentaBancaria: string,
        public pagos: Pago[],
        public asignaciones:Asignacion[],
        public grupos: Grupo[],
        public nombre: string,
        public apellidos: string,
        public dni: string,
        public direccion: string,
        public email: string,
        public password: string,
        public id: number,
        public fechaNacimiento?: any ){
        super(nombre,apellidos,password,dni,direccion,email,id,fechaNacimiento)
    }
    
   
}