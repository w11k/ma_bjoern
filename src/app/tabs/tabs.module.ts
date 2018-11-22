import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ListComponentModule} from '../list/list.module';
import {MaterialModule} from '../material.module';
import {TabsComponent} from './tabs.component';
import {TabsComponentRoutingModule} from './tabs.router.module';

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TabsComponentRoutingModule,
    ListComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsComponentModule {
}
