import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAlumnoPage } from './admin-alumno';

@NgModule({
  declarations: [
    AdminAlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAlumnoPage),
  ],
})
export class AdminAlumnoPageModule {}
