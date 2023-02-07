import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material/material.module';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TableVariationComponent } from './table-variation/table-variation.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LineChartComponent,
    TableVariationComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
  ],
})
export class DashboardModule {}
