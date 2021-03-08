import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ChartComponent } from './pages/chart/chart.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GMapComponent } from './pages/g-map/g-map.component';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './pages/map/map.component';
import { PollComponent } from './pages/poll/poll.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", canActivateChild: [AuthGuard], children: [
    {path: "", pathMatch: "full", redirectTo: "chat"},
    {path: "chat", component: ChatComponent},
    {path: "chart", component: ChartComponent},
    {path: "poll", component: PollComponent},
    {path: "map", component: MapComponent},
    {path: "gmap", component: GMapComponent}
  ]},
  {path: "**", pathMatch: "full", redirectTo: "chat"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
