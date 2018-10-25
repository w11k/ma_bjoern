import {TemplateGenerator} from './helper';

export class Template {
    constructor() {
        this.defaultTemplate = TemplateGenerator(() => `
            <vaadin-context-menu>
                <template>
                    <div role="listbox" class="menu_list">
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
                    </div>
                </template>
                <paper-item data-id="${id}" class="${completed} border_bottom">
                    <paper-checkbox ${checked}></paper-checkbox>
                    <span class="label">${title}</span>
                </paper-item>
            </vaadin-context-menu>
        `);
    }

    static escapeHtmlChar(chr) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#x27;',
            '`': '&#x60;'
        }[chr];
    };

    static escape(string) {
        const reUnescapedHtml = /[&<>"'`]/g;
        return (string && reUnescapedHtml.test(string))
            ? string.replace(reUnescapedHtml, Template.escapeHtmlChar)
            : string;
    };

    show(data = []) {
        return data.reduce((view, item) => {
            const templateVars = Object.assign({}, item);
            templateVars.title = Template.escape(templateVars.title);
            if (templateVars.completed) {
                templateVars.completed = 'completed';
                templateVars.checked = 'checked';
            } else {
                templateVars.completed = 'active';
                templateVars.checked = '';
            }
            return view + this.defaultTemplate(templateVars);
        }, '');
    };
}
