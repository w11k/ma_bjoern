import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, AlertController} from '@ionic/angular';
import {noop, Subscription} from 'rxjs';
import {ModelService} from '../model.service';
import {ITodo, ListType} from '../typings';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {
    private type: ListType = ListType.NONE;
    private todos: Array<ITodo> = [];
    private subscription: Subscription;

    constructor(private model: ModelService, private route: ActivatedRoute, public actionSheetController: ActionSheetController, public alertController: AlertController, private changeRef: ChangeDetectorRef) {
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
        this.alertController
            .create({
                header: !!item ? 'Edit Item' : 'Create Item',
                inputs: [
                    {
                        name: 'title',
                        type: 'text',
                        value: !!item ? item.title : '',
                        placeholder: 'Title'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary'
                    }, {
                        text: 'Ok',
                        cssClass: 'submit',
                        handler: (result) => {
                            if (!!item) {
                                this.model.updateItem(item.id, {title: result.title});
                            } else {
                                this.model.createItem(result.title);
                            }
                        }
                    }
                ]
            })
            .then((alert: HTMLIonAlertElement) => alert.present().then(() => {
                const input = alert.querySelector('input');
                const button = alert.querySelector('button.submit') as HTMLButtonElement;
                input.addEventListener('keypress', (event) => event.which === 13 ? button.click() : noop);
                input.focus();
            }));
    }
}
