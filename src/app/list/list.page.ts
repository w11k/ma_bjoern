import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {DialogService} from '../dialog.service';
import {ModelService} from '../model.service';
import {ITodo, ListType} from '../typings';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {
    public isIOS = this.platform.is('ios');
    private type: ListType = ListType.NONE;
    private todos: Array<ITodo> = [];
    private subscription: Subscription;

    constructor(private model: ModelService, private route: ActivatedRoute, public actionSheetController: ActionSheetController, public dialogService: DialogService, private changeRef: ChangeDetectorRef, private platform: Platform) {
    }

    ngOnInit(): void {
        const type = this.route.snapshot.data.type as ListType;
        if (type in ListType) {
            this.type = type;
            this.subscription = this.model.getItems().subscribe((items) => {
                this.todos = items.filter((item: ITodo) => {
                    switch (this.type) {
                        case ListType.ALL:
                            return true;
                        case ListType.ACTIVE:
                            return !item.completed;
                        case ListType.COMPLETED:
                            return item.completed;
                        case ListType.NONE:
                        default:
                            return false;
                    }
                });
                this.changeRef.detectChanges();
            });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getItems(): Array<ITodo> {
        return this.todos;
    }

    toggleItem(id: number, event: CustomEvent): void {
        this.model.updateItem(id, {completed: !!event.detail.checked});
    }

    deleteItem(id: number) {
        this.model.removeItem(id);
    }

    presentActionSheet(item: ITodo) {
        this.actionSheetController.create({
            header: 'Todo',
            buttons: [
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        this.presentAlertPrompt(item);
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => this.deleteItem(item.id)
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        }).then((actionSheet: HTMLIonActionSheetElement) => actionSheet.present());
    }

    presentAlertPrompt(item?: ITodo) {
        this.dialogService.presentAlertPrompt(item).subscribe((title: string) => {
            if (!!item) {
                this.model.updateItem(item.id, {title});
            } else {
                this.model.createItem(title);
            }
        });
    }
}
