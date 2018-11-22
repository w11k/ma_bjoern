import {Injectable} from '@angular/core';
import {BehaviorSubject, noop, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StoreService} from './store.service';
import {ITodo, ITodoCount} from './typings';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private todos: BehaviorSubject<Array<ITodo>> = new BehaviorSubject([]);

  constructor(private storage: StoreService) {
    this.storage.findAll((items: Array<ITodo>) => this.todos.next(items));
  }

  public createItem(title: string = '') {
    this.storage.save({
      title: title.trim(),
      completed: false
    }, (items) => {
      this.todos.next(items);
    });
  }

  public getItems(): Observable<Array<ITodo>> {
    return this.todos.asObservable();
  }

  public getItemById(id: number): Promise<ITodo> {
    return new Promise<ITodo>((resolve, reject) => {
      this.storage.find({id}, (items: Array<ITodo>) => items.length === 1 ? resolve(items[0]) : reject());
    });
  }

  public updateItem(id: number, changes: ITodo): void {
    const liveItems = this.todos.getValue();
    const index = liveItems.findIndex(item => item.id === id);
    if (index > -1) {
      Object.assign(liveItems[index], changes);
      this.todos.next(liveItems);
      this.storage.save(changes, (storageItems: Array<ITodo>) => this.todos.next(storageItems), id);
    }
  }

  public removeItem(id: number): void {
    const liveItems = this.todos.getValue();
    const index = liveItems.findIndex(item => item.id === id);
    if (index > -1) {
      liveItems.splice(index, 1);
      this.todos.next(liveItems);
      this.storage.remove(id, (storageItems: Array<ITodo>) => this.todos.next(storageItems));
    }
  }

  public removeAll(): void {
    this.todos.next([]);
    this.storage.drop(noop);
  }

  public getCount(): Observable<ITodoCount> {
    return this.todos.asObservable().pipe(map((todos: Array<ITodo>) => {
      return todos.reduce((count: ITodoCount, currentTodo: ITodo) => {
        return {
          active: count.active + +!currentTodo.completed,
          completed: count.completed + +currentTodo.completed,
          total: ++count.total
        };
      }, {
        active: 0,
        completed: 0,
        total: 0
      });
    }));
  }
}
