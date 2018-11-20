import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {ModalsModule} from '../modals/modals.module';

import {ListComponent} from './list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ModalsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ])
  ],
  declarations: [ListComponent]
})
export class ListComponentModule {
}
