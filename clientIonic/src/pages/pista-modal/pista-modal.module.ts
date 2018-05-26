import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PistaModalPage } from './pista-modal';

@NgModule({
  declarations: [
    PistaModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PistaModalPage),
  ],
})
export class PistaModalPageModule {}
