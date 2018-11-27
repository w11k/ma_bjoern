import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ActionSheetComponent} from '../modals/action-sheet.component';
import {ModelService} from '../model.service';
import {ITodo, ListType, TodoActions} from '../typings';

@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ListComponent implements OnInit, OnDestroy {
  private type: ListType = ListType.NONE;
  private todos: Array<ITodo> = [];
  private subscription: Subscription;

  @ViewChildren('menu', {read: ElementRef}) menus: QueryList<ElementRef>;

  constructor(private model: ModelService, private route: ActivatedRoute, private changeRef: ChangeDetectorRef) {
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

    this.setContextMenuRenderer(this.menus.toArray());
    this.menus.changes.subscribe((currentMenus: QueryList<ElementRef>) => {
      this.setContextMenuRenderer(currentMenus.toArray());
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems(): Array<ITodo> {
    return this.todos;
  }

  toggleItem(id: number, event: Event): void {
    this.model.updateItem(id, {completed: !!(<any>event.srcElement).checked});
  }

  private deleteItem(id: number) {
    this.model.removeItem(id);
  }

  presentAlertPrompt(item?: ITodo) {
    const oldTitle = !!item ? item.title : '';
    setTimeout(() => {
      const newTitle = window.prompt(oldTitle !== '' ? 'Edit Item' : 'Create Item', oldTitle);
      if (typeof newTitle !== 'string') {
        return;
      } else if (newTitle.trim() === '') {
        return window.alert('No input!');
      } else if (oldTitle === newTitle) {
        return window.alert('No change!');
      }
      if (!!item) {
        this.model.updateItem(item.id, {title: newTitle});
      } else {
        this.model.createItem(newTitle);
      }
    }, 300);
  }

  private setContextMenuRenderer(menus: Array<ElementRef>): void {
    menus.forEach((nativeElement) => {
      nativeElement.nativeElement.renderer = (root, contextMenu, context) => {
        let listBox = root.firstElementChild;
        if (!listBox) {
          listBox = document.createElement('div');
          listBox.setAttribute('role', 'listbox');
          listBox.classList.add('menu_list');
          listBox.innerHTML = `
            <style>
                div.menu_list paper-item {
                    --paper-item-min-height: 32px;
                    cursor: pointer;
                }
            </style>
            <paper-item data-id="0">
                Edit
                <paper-ripple></paper-ripple>
            </paper-item>
            <paper-item data-id="1">
                Delete
                <paper-ripple></paper-ripple>
            </paper-item>
            <hr>
            <paper-item data-id="2">
                Cancel
                <paper-ripple></paper-ripple>
            </paper-item>
          `;
          listBox.querySelectorAll('paper-item').forEach((item) => {
            item.addEventListener('click', (event) => {
              this.handleContextMenuClick(event);
            });
          });
          root.appendChild(listBox);
        }
      };
    });
  }

  private getItemId(element): number {
    return parseInt(element.dataset.id, 10);
  }

  private handleContextMenuClick(event: MouseEvent) {
    const menu = (<any>event.target).parentNode.parentNode;
    const button = this.getItemId(event.target);
    const id = this.getItemId(menu.model.target);
    switch (button) {
      case 0:
        this.model.getItemById(id).then((item) => this.presentAlertPrompt(item));
        break;
      case 1:
        this.deleteItem(id);
        break;
      case 2:
      default:
        return;
    }
  }
}
