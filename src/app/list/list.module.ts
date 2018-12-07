import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {WebComponentsModule} from '../web-components.module';

import {ListComponent} from './list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WebComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent
      }
    ])
  ],
  declarations: [ListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListComponentModule {
}
