import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {TodoActions} from '../typings';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss']
})
export class ActionSheetComponent {
  TodoActions = TodoActions;

  constructor(private bottomSheetRef: MatBottomSheetRef<ActionSheetComponent>) {
  }

  closeSheet(action: TodoActions, event: MouseEvent): void {
    this.bottomSheetRef.dismiss(action);
    console.log(event);
    event.preventDefault();
  }
}


