import {TemplateGenerator} from './helper';

export class Template {
    constructor() {
        this.defaultTemplate = TemplateGenerator(() => `
            <ons-list-item data-id="${id}" tappable class="${completed}">
                <div class="left">
                    <ons-checkbox ${checked}></ons-checkbox>
                </div>
                <label class="center">
                    ${title}
                </label>
            </ons-list-item>
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
        let view = '';

        for (const templateVars of data) {
            templateVars.title = Template.escape(templateVars.title);
            if (templateVars.completed) {
                templateVars.completed = 'completed';
                templateVars.checked = 'checked';
            } else {
                templateVars.completed = 'active';
                templateVars.checked = '';
            }
            view += this.defaultTemplate(templateVars);
        }
        return view;
    };
}
