import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from '../list/list.component';
import {ListType} from '../typings';

import {TabsComponent} from './tabs.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: '/todos/all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        component: ListComponent,
        data: {
          type: ListType.ALL
        }
      },
      {
        path: 'active',
        component: ListComponent,
        data: {
          type: ListType.ACTIVE
        }
      },
      {
        path: 'completed',
        component: ListComponent,
        data: {
          type: ListType.COMPLETED
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/todos/all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsComponentRoutingModule {
}
