import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PistaDetallePage } from './pista-detalle';

@NgModule({
  declarations: [
    PistaDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PistaDetallePage),
  ],
})
export class PistaDetallePageModule {}
