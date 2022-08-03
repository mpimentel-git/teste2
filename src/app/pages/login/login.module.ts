import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PoPageLoginModule } from '@po-ui/ng-templates';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    PoPageLoginModule,
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
