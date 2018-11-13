import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    loadChildren: './todo/todo.module#TodoPageModule'
  },
  {
    path: 'settings',
    loadChildren: './empty/empty.module#EmptyPageModule'
  },
  {
    path: 'about',
    loadChildren: './empty/empty.module#EmptyPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
