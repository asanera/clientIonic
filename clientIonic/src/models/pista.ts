import { BaseEntity } from "./baseEntity";

export class Pista extends BaseEntity {

    constructor(
        public id:number,
        public nombre:string,
    ){
        super(id);
    }
    
}