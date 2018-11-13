import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
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
            icon: 'information-circle'
        }
    ];

    constructor() {
        this.initializeApp();
    }

    initializeApp() {
    }
}
