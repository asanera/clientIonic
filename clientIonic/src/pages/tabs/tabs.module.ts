import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
    
  ],
  imports: [
    FormsModule,
    HttpModule,
    IonicPageModule.forChild(LoginPage),
  ],
})
export class TabPageModule {}
