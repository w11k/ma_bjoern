import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ModelService} from './model.service';
import {StoreService} from './store.service';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {scope: '/ma_bjoern/angular-nui/', enabled: environment.production})
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        ModelService,
        StoreService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
