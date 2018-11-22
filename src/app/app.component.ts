import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('drawer') drawer: ElementRef;

  constructor() {
  }

  closeMenu() {
    if (this.drawer.nativeElement.opened && !this.drawer.nativeElement.persistent) {
      this.drawer.nativeElement.close();
    }
  }
}
