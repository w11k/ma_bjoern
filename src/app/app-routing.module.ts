import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsComponentModule'
  },
  {
    path: 'settings',
    loadChildren: './empty/empty.module#EmptyComponentModule'
  },
  {
    path: 'about',
    loadChildren: './empty/empty.module#EmptyComponentModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
