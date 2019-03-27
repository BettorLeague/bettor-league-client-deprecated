import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material';
import {Error500Component} from './500/error-500.component';
import {Error404Component} from './404/error-404.component';


const routes = [
  {
    path     : 'error-404',
    component: Error404Component
  },
  {
    path     : 'error-500',
    component: Error500Component
  },
  {
    path      : '**',
    redirectTo: 'error-404'
  }

];

@NgModule({
  declarations: [
    Error404Component,
    Error500Component
  ],
  imports     : [
    RouterModule.forChild(routes),
    MatIconModule,
  ]
})
export class ErrorModule
{
}
