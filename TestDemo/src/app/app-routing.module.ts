import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: '0',
    component: LayoutComponent,
    loadChildren: () => import('./registration/registration.module').then(x => x.RegistrationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
