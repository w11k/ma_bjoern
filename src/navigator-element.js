import '@polymer/iron-pages/iron-pages';
import {qs} from './helper';
import './tabs-element';

class NavigatorElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        const styles = `
            :host {
                display: block;
                height: calc(100vh - 64px);
            }
            
            iron-pages {
                height: 100%;
            }
        `;
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <iron-pages>
                <my-tabs id="page_tabs"></my-tabs>
                <div id="page_settings">Test1</div>
                <div id="page_about">Test2</div>
            </iron-pages>
        `;

        this.$pages = qs('iron-pages', this.shadowRoot);
    }

    static get is() {
        return 'my-navigator';
    }

    connectedCallback() {
        this.dispatchEvent(new CustomEvent('init', {bubbles: true, composed: true, detail: this}));
    }

    render(viewCmd, parameter) {
        const viewCommands = {
            loadPage: () => {
                return this._loadPage(parameter);
            }
        };

        return viewCommands[viewCmd]();
    };

    _loadPage(pageID) {
        return this.$pages.selectIndex(pageID);
    }
}

customElements.define(NavigatorElement.is, NavigatorElement);