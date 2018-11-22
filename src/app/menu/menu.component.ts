import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  appPages = [
    {
      title: 'Todos',
      url: '/todos',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'info'
    }
  ];

  constructor(private elementRef: ElementRef) {
  }

  menuItemClicked() {
    this.elementRef.nativeElement.dispatchEvent(new Event('clicked'));
  }

}
