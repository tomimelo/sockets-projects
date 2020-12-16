import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './pages/chart/chart.component';
import { SharedModule } from './shared/shared.module';
import { PollComponent } from './pages/poll/poll.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    PollComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
