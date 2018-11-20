import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {ActionSheetComponent} from './action-sheet.component';
import {TitlePromptComponent} from './title-prompt.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ActionSheetComponent,
    TitlePromptComponent
  ]
})
export class ModalsModule {
}
