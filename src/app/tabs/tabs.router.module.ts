import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmptyPage} from '../empty/empty.page';

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
                component: EmptyPage
            },
            {
                path: 'active',
                outlet: 'active',
                component: EmptyPage
            },
            {
                path: 'completed',
                outlet: 'completed',
                component: EmptyPage
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
