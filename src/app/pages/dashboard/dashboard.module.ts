import { PoMenuModule } from '@po-ui/ng-components';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [MenuComponent, DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, PoMenuModule],
})
export class DashboardModule { }
