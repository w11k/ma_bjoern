import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {noop, Observable} from 'rxjs';
import {ITodo} from './typings';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(public alertController: AlertController) {
    }

    presentAlertPrompt(item?: ITodo): Observable<string> {
        return new Observable(subscriber => {
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
                            cssClass: 'secondary',
                            handler: () => subscriber.complete()
                        }, {
                            text: 'Ok',
                            cssClass: 'submit',
                            handler: (result) => {
                                subscriber.next(result.title);
                                subscriber.complete();
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
        });
    }
}
