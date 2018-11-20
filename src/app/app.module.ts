import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ActionSheetComponent} from './modals/action-sheet.component';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {ModalsModule} from './modals/modals.module';
import {ModelService} from './model.service';
import {StoreService} from './store.service';
import {TitlePromptComponent} from './modals/title-prompt.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ModalsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    ModelService,
    StoreService
  ],
  entryComponents: [
    ActionSheetComponent,
    TitlePromptComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
