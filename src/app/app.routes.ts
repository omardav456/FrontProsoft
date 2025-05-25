import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },

  {
    path: 'create-project',
    loadComponent: () => import('./pages/create-project/create-project.page').then( m => m.CreateProjectPage)
  },  {
    path: 'account-activation',
    loadComponent: () => import('./pages/account-activation/account-activation.page').then( m => m.AccountActivationPage)
  },{
    path: 'account-activation/:uid/:code',
    loadComponent: () => import('./pages/account-activation/account-activation.page').then(m => m.AccountActivationPage)
  },{
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar.page').then( m => m.CalendarPage)
  },  {
    path: 'project-detail',
    loadComponent: () => import('./pages/project-detail/project-detail.page').then( m => m.ProjectDetailPage)
  },]
 

