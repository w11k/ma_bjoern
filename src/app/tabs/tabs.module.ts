import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material';
import {EmptyComponentModule} from '../empty/empty.module';
import {TabsComponent} from './tabs.component';
import {TabsComponentRoutingModule} from './tabs.router.module';

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    TabsComponentRoutingModule,
    EmptyComponentModule
  ]
})
export class TabsComponentModule {
}
