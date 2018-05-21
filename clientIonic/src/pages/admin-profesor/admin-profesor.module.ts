import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminProfesorPage } from './admin-profesor';

@NgModule({
  declarations: [
    AdminProfesorPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminProfesorPage),
  ],
})
export class AdminProfesorPageModule {}
