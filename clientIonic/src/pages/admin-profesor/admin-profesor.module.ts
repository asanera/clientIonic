import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProfesorPage } from './admin-profesor';
import { ProfesorDetallePage } from '../profesor-detalle/profesor-detalle';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(AdminProfesorPage),
  ],
})
export class AdminProfesorPageModule {}
