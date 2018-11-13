import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { TodoPage } from './todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'all'
      },
      {
        path: 'all',
        component: TodoPage
      },
      {
        path: 'active',
        component: TodoPage
      },
      {
        path: 'completed',
        component: TodoPage
      }
    ])
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
