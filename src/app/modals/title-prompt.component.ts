import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-title-prompt',
  templateUrl: './title-prompt.component.html',
  styleUrls: ['./title-prompt.component.scss']
})
export class TitlePromptComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<TitlePromptComponent>) {
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.which === 13) {
      this.dialogRef.close(this.data.value);
    }
  }
}
