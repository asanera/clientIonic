import { BaseEntity } from "./baseEntity";

export class Material extends BaseEntity {

    constructor(
        public id:number,
        public nombre:string,
    ){
        super(id);
    }
    
}