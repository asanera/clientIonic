import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CerrarSesionPage } from './cerrar-sesion';
import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicPageModule.forChild(CerrarSesionPage),
  ],
})
export class CerrarSesionPageModule {}
