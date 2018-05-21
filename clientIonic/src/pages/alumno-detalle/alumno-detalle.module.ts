import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnoDetallePage } from './alumno-detalle';

@NgModule({
  declarations: [
    AlumnoDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnoDetallePage),
  ],
})
export class AlumnoDetallePageModule {}
