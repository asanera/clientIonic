import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminPistaPage } from './admin-pista';

@NgModule({
  declarations: [
    AdminPistaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminPistaPage),
  ],
})
export class AdminPistaPageModule {}
