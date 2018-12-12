import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-badge/paper-badge';
import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-fab/paper-fab';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-ripple/paper-ripple';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-tabs/paper-tabs';
import '@vaadin/vaadin-context-menu/vaadin-context-menu';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'app-drawer-layout': any;
            'app-drawer': any;
            'app-menu': any;
            'app-header-layout': any;
            'app-header': any;
            'app-toolbar': any;
            'paper-icon-button': any;
            'paper-item': any;
            'iron-icon': any;
            'paper-ripple': any;
            'paper-tabs': any;
            'paper-tab': any;
            'paper-badge': any;
            'paper-fab': any;
            'vaadin-context-menu': any;
            'template': any;
            'paper-checkbox': any;
        }
    }
}
