import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatBottomSheet, MatCheckboxChange, MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ActionSheetComponent} from '../modals/action-sheet.component';
import {TitlePromptComponent} from '../modals/title-prompt.component';
import {ModelService} from '../model.service';
import {ITodo, ListType, TodoActions} from '../typings';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private type: ListType = ListType.NONE;
  private todos: Array<ITodo> = [];
  private subscription: Subscription;

  constructor(private model: ModelService, private route: ActivatedRoute, private bottomSheet: MatBottomSheet, public dialog: MatDialog, /*public actionSheetController: ActionSheetController, public alertController: AlertController,*/ private changeRef: ChangeDetectorRef) {
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

  toggleItem(id: number, event: MatCheckboxChange): void {
    this.model.updateItem(id, {completed: !!event.checked});
  }

  deleteItem(id: number) {
    this.model.removeItem(id);
  }

  presentActionSheet(item: ITodo) {
    const bottomSheetRef = this.bottomSheet.open(ActionSheetComponent, {autoFocus: false});
    bottomSheetRef.afterDismissed().subscribe((action: TodoActions) => {
      switch (action) {
        case TodoActions.EDIT:
          return this.presentAlertPrompt(item);
        case TodoActions.DELETE:
          return this.deleteItem(item.id);
        case TodoActions.NONE:
        default:
          return;
      }
    });
  }

  presentAlertPrompt(item?: ITodo) {
    const dialogRef = this.dialog.open(TitlePromptComponent, {
      data: {
        title: !!item ? 'Edit Item' : 'Create Item',
        value: !!item ? item.title : ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        if (!!item) {
          this.model.updateItem(item.id, {title: result});
        } else {
          this.model.createItem(result);
        }
      }
    });
  }
}
