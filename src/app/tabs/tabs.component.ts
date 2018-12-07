import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ModelService} from '../model.service';
import {ITodoCount, ListType} from '../typings';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  currentTab: Observable<-1 | 0 | 1 | 2>;
  private subscription: Subscription;
  private count: ITodoCount = {
    active: 0,
    completed: 0,
    total: 0
  };

  constructor(private model: ModelService, private changeRef: ChangeDetectorRef, route: ActivatedRoute) {
    this.currentTab = route.url
      .pipe(map(() => route.snapshot.children[0].data.type))
      .pipe(map((type) => {
        switch (type) {
          case ListType.ALL:
            return 0;
          case ListType.ACTIVE:
            return 1;
          case ListType.COMPLETED:
            return 2;
          case ListType.NONE:
          default:
            return -1;
        }
      }));
  }

  ngOnInit(): void {
    this.subscription = this.model.getCount().subscribe((count) => {
      this.count = count;
      this.changeRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCount(): ITodoCount {
    return this.count;
  }
}
