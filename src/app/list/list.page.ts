import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController} from '@ionic/angular';
import {Subscription} from 'rxjs';
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

    constructor(private model: ModelService, private route: ActivatedRoute, public actionSheetController: ActionSheetController, private changeRef: ChangeDetectorRef) {
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

    presentActionSheet(id: number) {
        this.actionSheetController.create({
            header: 'Todo',
            buttons: [
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        console.log('Edit clicked');
                    }
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => this.deleteItem(id)
                },
                {
                    text: 'Cancel',
                    icon: 'close',
                    role: 'cancel'
                }
            ]
        }).then((actionSheet: HTMLIonActionSheetElement) => actionSheet.present());
    }
}
