import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "chart"},
  {path: "chart", component: ChartComponent},
  {path: "**", pathMatch: "full", redirectTo: "chart"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
