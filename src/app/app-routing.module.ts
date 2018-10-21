import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { environment } from '@env/environment';

const debugMode = (environment.production) ? false : true;
const baseHref = environment.BASE_HREF;

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: baseHref, loadChildren: 'app/home/home.module#HomeModule'},
  { path: '**', redirectTo: '/home' }
];

// if (baseHref) {
//   routes.unshift({ path: '', redirectTo: `/${baseHref}`, pathMatch: 'full' });
// }

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      // enableTracing: debugMode,
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
