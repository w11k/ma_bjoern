import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmptyComponent} from '../empty/empty.component';
import {ListType} from '../typings';

import {TabsComponent} from './tabs.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: '/todos/(all:all)',
        pathMatch: 'full'
      },
      {
        path: 'all',
        outlet: 'all',
        component: EmptyComponent,
        data: {
          type: ListType.ALL
        }
      },
      {
        path: 'active',
        outlet: 'active',
        component: EmptyComponent,
        data: {
          type: ListType.ACTIVE
        }
      },
      {
        path: 'completed',
        outlet: 'completed',
        component: EmptyComponent,
        data: {
          type: ListType.COMPLETED
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/todos/(all:all)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsComponentRoutingModule {
}
