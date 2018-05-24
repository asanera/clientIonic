import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrupoPage } from './grupo';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    HttpModule,
    IonicPageModule.forChild(GrupoPage),
  ],
})
export class GrupoPageModule {}
