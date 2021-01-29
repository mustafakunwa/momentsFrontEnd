import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthGuard } from './services/authGaurd.service';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,

    children: [
      {
        path: 'new-moment',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/add-moment/add-moment.module').then(m => m.AddMomentModule)
      },
      {
        path: 'edit-moment/:id',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/add-moment/add-moment.module').then(m => m.AddMomentModule)
      },
      {
        path: 'moment-list',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/momentlist/momentlist.module').then(m => m.MomentlistModule)
      },
      {
        path: '',
        redirectTo: 'new-moment',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'new-moment'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
