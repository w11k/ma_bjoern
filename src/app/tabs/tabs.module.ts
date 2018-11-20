import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ListComponentModule} from '../list/list.module';
import {MaterialModule} from '../material.module';
import {ModalsModule} from '../modals/modals.module';
import {TabsComponent} from './tabs.component';
import {TabsComponentRoutingModule} from './tabs.router.module';

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TabsComponentRoutingModule,
    ListComponentModule
  ]
})
export class TabsComponentModule {
}
