import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPage} from '../list/list.page';

import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'todos',
        component: TabsPage,
        children: [
            {
                path: '',
                redirectTo: '/todos/(all:all)',
                pathMatch: 'full'
            },
            {
                path: 'all',
                outlet: 'all',
                component: ListPage,
                data: {
                    type: 'ALL'
                }
            },
            {
                path: 'active',
                outlet: 'active',
                component: ListPage,
                data: {
                    type: 'ACTIVE'
                }
            },
            {
                path: 'completed',
                outlet: 'completed',
                component: ListPage,
                data: {
                    type: 'COMPLETED'
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
export class TabsPageRoutingModule {
}
