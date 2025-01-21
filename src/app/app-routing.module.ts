import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './views/auth/component/login/login.page';
import { RegisterPage } from './views/auth/component/register/register.component';


const routes: Routes = [
  { path: '', 
    redirectTo: 'tabs', 
    pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'tabs',
    loadChildren: () => import('./views/pages/menu/tabs/tabs.module')
      .then(m => m.TabsPageModule)
  },
  {
    path: 'register',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
