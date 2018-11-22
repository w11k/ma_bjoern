import {NgModule} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';


import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-badge/paper-badge';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-ripple/paper-ripple';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-ripple/paper-ripple';


@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule
  ]
})
export class MaterialModule {
}
