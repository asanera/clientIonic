import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrarPage } from './registrar';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    HttpModule,
    IonicPageModule.forChild(RegistrarPage),
  ],
})
export class RegistrarPageModule {}
