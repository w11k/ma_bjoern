import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private readonly _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public appPages = [
    {
      title: 'Todos',
      url: '.',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '.',
      icon: 'settings'
    },
    {
      title: 'About',
      url: '.',
      icon: 'information-circle'
    }
  ];

  constructor(public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
