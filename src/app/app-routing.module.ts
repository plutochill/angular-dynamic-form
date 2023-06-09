import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Demo1Component } from './demo1/demo1.component';


const routes: Routes = [
  { path: '', redirectTo: 'demo1', pathMatch: 'full' },
  { path: 'demo1', component: Demo1Component },
  { path: 'form', loadChildren: () => import('./dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
