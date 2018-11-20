import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-title-prompt',
  templateUrl: './title-prompt.component.html',
  styleUrls: ['./title-prompt.component.scss']
})
export class TitlePromptComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}
