import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {DialogService} from '../dialog.service';
import {ModelService} from '../model.service';
import {ITodoCount} from '../typings';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
    public isIOS = this.platform.is('ios');
    private subscription: Subscription;
    private count: ITodoCount = {
        active: 0,
        completed: 0,
        total: 0
    };

    constructor(private model: ModelService, private changeRef: ChangeDetectorRef, private dialogService: DialogService, private platform: Platform) {
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

    presentAlertPrompt() {
        this.dialogService.presentAlertPrompt().subscribe((title: string) => {
            this.model.createItem(title);
        });
    }
}
