import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent, HomeComponent } from '@app/home/pages';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':ppgid', component: MainComponent },
  { path: ':ppgid/:pgid', component: MainComponent },
  { path: ':ppgid/:pgid/:postid', component: MainComponent },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
