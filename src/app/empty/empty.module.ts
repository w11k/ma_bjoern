import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {EmptyComponent} from './empty.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmptyComponent
      }
    ])
  ],
  declarations: [EmptyComponent]
})
export class EmptyComponentModule {
}
