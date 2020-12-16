import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './pages/chart/chart.component';
import { MapComponent } from './pages/map/map.component';
import { PollComponent } from './pages/poll/poll.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "chart"},
  {path: "chart", component: ChartComponent},
  {path: "poll", component: PollComponent},
  {path: "map", component: MapComponent},
  {path: "**", pathMatch: "full", redirectTo: "chart"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
